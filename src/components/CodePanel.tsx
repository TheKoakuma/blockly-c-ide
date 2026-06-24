import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import { cpp } from '@codemirror/lang-cpp';

interface CodePanelProps {
  /** Código C a exibir (somente leitura no MVP). */
  code: string;
}

/** Painel somente-leitura que exibe o C gerado, com realce de sintaxe. */
export function CodePanel({ code }: CodePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const view = new EditorView({
      parent: container,
      state: EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          cpp(),
          EditorView.editable.of(false),
          EditorState.readOnly.of(true),
          EditorView.theme({ '&': { height: '100%' }, '.cm-scroller': { overflow: 'auto' } }),
        ],
      }),
    });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  // Atualiza o conteúdo quando o código muda, sem recriar o editor.
  useEffect(() => {
    const view = viewRef.current;
    if (!view || view.state.doc.toString() === code) return;
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: code } });
  }, [code]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />;
}
