/** Fase atual da execução, para feedback na UI. */
export type RunStatus = 'loading-toolchain' | 'compiling' | 'running';

export interface RunOptions {
  /** Entrada padrão (stdin) fornecida ao programa. */
  stdin?: string;
  /** Callback de progresso (baixando compilador, compilando, executando). */
  onStatus?: (status: RunStatus) => void;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  /** Mensagem de erro de compilação, se o programa não compilou. */
  compileError?: string;
}

/**
 * Abstração de execução de C. Isola a escolha do motor (WASM/clang, interpretador,
 * backend) do resto da aplicação — ver docs/ARCHITECTURE.md e docs/DECISIONS.md (D2/D8).
 */
export interface CRunner {
  run(source: string, options?: RunOptions): Promise<RunResult>;
}
