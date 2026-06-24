import { useTranslation } from 'react-i18next';
import type { RunResult, RunStatus } from '@/runner';

interface OutputConsoleProps {
  status: RunStatus | 'idle';
  result: RunResult | null;
}

/** Mostra o progresso da execução e o resultado (stdout/stderr/erros). */
export function OutputConsole({ status, result }: OutputConsoleProps) {
  const { t } = useTranslation();

  if (status !== 'idle') {
    const key =
      status === 'loading-toolchain'
        ? 'exec.loadingToolchain'
        : status === 'compiling'
          ? 'exec.compiling'
          : 'exec.running';
    return (
      <div className="console console--status">
        <span className="console__spinner" aria-hidden /> {t(key)}
      </div>
    );
  }

  if (!result) {
    return <div className="console console--hint">{t('exec.idleHint')}</div>;
  }

  if (result.compileError) {
    return (
      <div className="console">
        <div className="console__label console__label--error">{t('exec.compileError')}</div>
        <pre className="console__block console__block--error">{result.compileError}</pre>
      </div>
    );
  }

  const hasOut = result.stdout.length > 0;
  const hasErr = result.stderr.length > 0;
  return (
    <div className="console">
      <pre className="console__block">{hasOut ? result.stdout : t('exec.noOutput')}</pre>
      {hasErr && <pre className="console__block console__block--error">{result.stderr}</pre>}
      <div className="console__exit">{t('exec.exitCode', { code: result.exitCode })}</div>
    </div>
  );
}
