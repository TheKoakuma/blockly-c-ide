import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { toolbox } from '@/blocks/toolbox';
import { loadWorkspace, saveWorkspace } from '@/state/persistence';

interface BlocklyWorkspaceProps {
  /** Chamado a cada mudança no workspace, com a instância pronta para gerar código. */
  onChange?: (workspace: Blockly.WorkspaceSvg) => void;
}

/**
 * Monta e gerencia o ciclo de vida do workspace Blockly.
 * Persiste mudanças em localStorage (com debounce) e restaura no carregamento.
 */
export function BlocklyWorkspace({ onChange }: BlocklyWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const workspace = Blockly.inject(container, {
      toolbox,
      grid: { spacing: 20, length: 3, colour: '#e3e7ee', snap: true },
      zoom: { controls: true, wheel: true, startScale: 1.0 },
      trashcan: true,
      move: { scrollbars: true, drag: true, wheel: true },
    });
    workspaceRef.current = workspace;

    loadWorkspace(workspace);

    let saveTimer: number | undefined;
    const handleChange = (event: Blockly.Events.Abstract) => {
      if (event.isUiEvent) return;
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => saveWorkspace(workspace), 400);
      onChange?.(workspace);
    };
    workspace.addChangeListener(handleChange);

    const resize = () => Blockly.svgResize(workspace);
    window.addEventListener('resize', resize);

    return () => {
      window.clearTimeout(saveTimer);
      window.removeEventListener('resize', resize);
      workspace.removeChangeListener(handleChange);
      workspace.dispose();
      workspaceRef.current = null;
    };
    // onChange é estável (useCallback no pai); roda apenas na montagem.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
