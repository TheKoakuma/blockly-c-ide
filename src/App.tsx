import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Blockly from 'blockly';
import { BlocklyWorkspace } from '@/components/BlocklyWorkspace';
import { CodePanel } from '@/components/CodePanel';
import { cGenerator } from '@/generators/c';
import './App.css';

export default function App() {
  const { t, i18n } = useTranslation();
  const [code, setCode] = useState('');

  // Gera o código C a partir do estado atual dos blocos.
  const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
    setCode(cGenerator.workspaceToCode(workspace));
  }, []);

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
            <h2 className="panel__title">{t('panels.output')}</h2>
            <div className="panel__body panel__body--output">{t('output.empty')}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
