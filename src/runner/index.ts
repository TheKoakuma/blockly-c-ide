import type { CRunner } from './CRunner';
import { wasmerRunner } from './wasmerRunner';

/** Runner ativo. Trocar aqui se mudar de motor de execução (ver D2/D8). */
export const runner: CRunner = wasmerRunner;

export type { CRunner, RunOptions, RunResult, RunStatus } from './CRunner';
