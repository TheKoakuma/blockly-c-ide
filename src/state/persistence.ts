import * as Blockly from 'blockly';

const STORAGE_KEY = 'blockly-c.workspace';

/** Serializa o workspace para localStorage. */
export function saveWorkspace(workspace: Blockly.Workspace): void {
  try {
    const state = Blockly.serialization.workspaces.save(workspace);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Sem persistência disponível — falha silenciosa por ora.
  }
}

/**
 * Restaura o workspace a partir do localStorage.
 * @returns `true` se havia estado salvo e foi carregado; `false` caso contrário.
 */
export function loadWorkspace(workspace: Blockly.Workspace): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const state = JSON.parse(raw) as Parameters<typeof Blockly.serialization.workspaces.load>[0];
    Blockly.serialization.workspaces.load(state, workspace);
    return true;
  } catch {
    // Estado corrompido ou ausente — começa em branco.
    return false;
  }
}

/** Remove o estado salvo. */
export function clearWorkspace(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignora
  }
}
