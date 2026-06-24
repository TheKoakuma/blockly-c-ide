export const en = {
  app: {
    title: 'bloCkly',
    subtitle: 'Learn C by snapping blocks together',
  },
  panels: {
    blocks: 'Blocks',
    code: 'Generated C code',
    output: 'Output',
  },
  actions: {
    run: 'Run',
    clear: 'Clear',
    language: 'Language',
  },
  exec: {
    idleHint: 'Click Run to compile and execute the program.',
    loadingToolchain: 'Preparing the C compiler (may take a while on first use)…',
    compiling: 'Compiling…',
    running: 'Running…',
    compileError: 'Compilation error',
    exitCode: 'Exit code: {{code}}',
    noOutput: '(no output)',
    stdinLabel: 'Input (stdin)',
    stdinPlaceholder: 'Data read by the program (scanf), one line per read…',
  },
} as const;
