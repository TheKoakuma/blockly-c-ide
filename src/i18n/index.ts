import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ptBR } from './locales/pt-BR';
import { en } from './locales/en';

export const STORAGE_KEY_LANG = 'blockly-c.lang';

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY_LANG) : null;

void i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { translation: ptBR },
    en: { translation: en },
  },
  lng: stored ?? 'pt-BR',
  fallbackLng: 'pt-BR',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY_LANG, lng);
  } catch {
    // localStorage indisponível — ignora
  }
});

export default i18n;
