import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import '@/blocks/cBlocks'; // registra os blocos de C antes do inject
import { toolbox } from '@/blocks/toolbox';
import { loadWorkspace, saveWorkspace } from '@/state/persistence';

/** Estado inicial: um bloco `main` vazio, para o aluno ter por onde começar. */
const SEED_STATE = { blocks: { blocks: [{ type: 'c_main', x: 40, y: 40 }] } };

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

    const hadState = loadWorkspace(workspace);
    if (!hadState) {
      Blockly.serialization.workspaces.load(SEED_STATE, workspace);
    }
    // Renderiza o código inicial logo após montar.
    onChange?.(workspace);

    // Em desenvolvimento, expõe o workspace para depuração/testes manuais.
    // (eliminado no build de produção.)
    if (import.meta.env.DEV) {
      (window as unknown as { __ws?: unknown; __Blockly?: unknown }).__ws = workspace;
      (window as unknown as { __ws?: unknown; __Blockly?: unknown }).__Blockly = Blockly;
    }

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
