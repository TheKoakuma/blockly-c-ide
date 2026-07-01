import type { CRunner } from './CRunner';
import { wasmerRunner } from './wasmerRunner';

/** Runner ativo. Trocar aqui se mudar de motor de execução (ver D2/D8). */
export const runner: CRunner = wasmerRunner;

if (import.meta.env.DEV) {
  (window as unknown as { __runner?: unknown }).__runner = runner;
}

export type { CRunner, RunOptions, RunResult, RunStatus } from './CRunner';
