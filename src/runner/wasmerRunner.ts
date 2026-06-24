import type { CRunner, RunOptions, RunResult } from './CRunner';

/**
 * Implementação de CRunner usando @wasmer/sdk + clang (compilador C real em WASM).
 * Ver docs/DECISIONS.md → D8.
 *
 * O SDK é carregado dinamicamente do CDN para evitar atrito do bundler com o
 * Web Worker e o .wasm internos do SDK. Tanto o SDK quanto o pacote clang são
 * carregados de forma preguiçosa (só na primeira execução) e cacheados.
 */

const SDK_URL = 'https://unpkg.com/@wasmer/sdk@0.10.0/dist/index.mjs';

// Tipagem mínima da parte do SDK que usamos (o módulo vem do CDN, sem tipos).
interface WasmerOutput {
  ok: boolean;
  code: number;
  stdout: string;
  stderr: string;
}
interface WasmerInstance {
  wait(): Promise<WasmerOutput>;
}
interface WasmerCommand {
  run(opts?: Record<string, unknown>): Promise<WasmerInstance>;
}
interface WasmerPackage {
  entrypoint?: WasmerCommand;
}
interface WasmerDirectory {
  writeFile(path: string, contents: string | Uint8Array): Promise<void>;
  readFile(path: string): Promise<Uint8Array>;
}
interface WasmerSDK {
  init(opts?: unknown): Promise<unknown>;
  Wasmer: {
    fromRegistry(specifier: string): Promise<WasmerPackage>;
    fromFile(binary: Uint8Array): Promise<WasmerPackage>;
  };
  Directory: new () => WasmerDirectory;
}

let sdkPromise: Promise<WasmerSDK> | null = null;
let clangPromise: Promise<WasmerPackage> | null = null;

async function loadSdk(): Promise<WasmerSDK> {
  if (!sdkPromise) {
    sdkPromise = (async () => {
      const sdk = (await import(/* @vite-ignore */ SDK_URL)) as unknown as WasmerSDK;
      await sdk.init();
      return sdk;
    })();
  }
  return sdkPromise;
}

function loadClang(sdk: WasmerSDK): Promise<WasmerPackage> {
  if (!clangPromise) clangPromise = sdk.Wasmer.fromRegistry('clang/clang');
  return clangPromise;
}

export const wasmerRunner: CRunner = {
  async run(source: string, options: RunOptions = {}): Promise<RunResult> {
    const { stdin, onStatus } = options;

    if (typeof crossOriginIsolated !== 'undefined' && !crossOriginIsolated) {
      throw new Error(
        'Execução indisponível: a página precisa de isolamento cross-origin ' +
          '(headers COOP/COEP). Verifique a configuração do servidor.',
      );
    }

    onStatus?.('loading-toolchain');
    const sdk = await loadSdk();
    const clang = await loadClang(sdk);
    if (!clang.entrypoint) throw new Error('Compilador clang indisponível.');

    // Compila main.c -> main.wasm.
    onStatus?.('compiling');
    const project = new sdk.Directory();
    await project.writeFile('main.c', source);
    const compile = await clang.entrypoint.run({
      args: ['/project/main.c', '-o', '/project/main.wasm'],
      mount: { '/project': project },
    });
    const compileOut = await compile.wait();
    if (!compileOut.ok) {
      return {
        stdout: '',
        stderr: '',
        exitCode: compileOut.code || 1,
        compileError: compileOut.stderr || 'Falha na compilação.',
      };
    }

    // Executa o binário gerado.
    onStatus?.('running');
    const wasm = await project.readFile('main.wasm');
    const program = await sdk.Wasmer.fromFile(wasm);
    if (!program.entrypoint) throw new Error('Binário compilado inválido.');
    const exec = await program.entrypoint.run(stdin ? { stdin } : undefined);
    const out = await exec.wait();
    return {
      stdout: out.stdout,
      stderr: out.stderr,
      exitCode: out.code,
    };
  },
};
