import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Blockly from 'blockly';
import { BlocklyWorkspace } from '@/components/BlocklyWorkspace';
import { CodePanel } from '@/components/CodePanel';
import { OutputConsole } from '@/components/OutputConsole';
import { cGenerator } from '@/generators/c';
import { runner, type RunResult, type RunStatus } from '@/runner';
import './App.css';

export default function App() {
  const { t, i18n } = useTranslation();
  const [code, setCode] = useState('');
  const [stdin, setStdin] = useState('');
  const [status, setStatus] = useState<RunStatus | 'idle'>('idle');
  const [result, setResult] = useState<RunResult | null>(null);

  // Gera o código C a partir do estado atual dos blocos.
  const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
    try {
      setCode(cGenerator.workspaceToCode(workspace));
    } catch (err) {
      // Não deixa um erro de geração travar o listener (e o autosave).
      console.error('Falha ao gerar código C:', err);
    }
  }, []);

  const running = status !== 'idle';

  const handleRun = async () => {
    if (running) return;
    setResult(null);
    try {
      const r = await runner.run(code, { stdin, onStatus: setStatus });
      setResult(r);
    } catch (err) {
      setResult({ stdout: '', stderr: String(err), exitCode: -1 });
    } finally {
      setStatus('idle');
    }
  };

  const toggleLanguage = () => {
    void i18n.changeLanguage(i18n.language === 'pt-BR' ? 'en' : 'pt-BR');
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <h1>{t('app.title')}</h1>
          <span className="app__subtitle">{t('app.subtitle')}</span>
        </div>
        <button className="app__lang" onClick={toggleLanguage} title={t('actions.language')}>
          {i18n.language === 'pt-BR' ? 'EN' : 'PT'}
        </button>
      </header>

      <main className="app__main">
        <section className="panel panel--blocks">
          <h2 className="panel__title">{t('panels.blocks')}</h2>
          <div className="panel__body">
            <BlocklyWorkspace onChange={handleWorkspaceChange} />
          </div>
        </section>

        <div className="app__right">
          <section className="panel panel--code">
            <h2 className="panel__title">{t('panels.code')}</h2>
            <div className="panel__body">
              <CodePanel code={code} />
            </div>
          </section>

          <section className="panel panel--output">
            <div className="panel__bar">
              <h2 className="panel__title panel__title--inbar">{t('panels.output')}</h2>
              <button className="btn btn--run" onClick={handleRun} disabled={running}>
                ▶ {t('actions.run')}
              </button>
            </div>
            <div className="panel__body panel__body--console">
              <OutputConsole status={status} result={result} />
            </div>
            <label className="stdin">
              <span className="stdin__label">{t('exec.stdinLabel')}</span>
              <textarea
                className="stdin__input"
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder={t('exec.stdinPlaceholder')}
                rows={2}
                spellCheck={false}
              />
            </label>
          </section>
        </div>
      </main>
    </div>
  );
}
