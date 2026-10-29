import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import fr from './locales/fr';
import en from './locales/en';
import es from './locales/es';
import it from './locales/it';
import de from './locales/de';
import pt from './locales/pt';
import pl from './locales/pl';

/** `complete` : interface et contenus fournis par l'hôtel. `partial` : interface seulement. */
export const LANGUAGES = [
  { code: 'fr', label: 'Français', status: 'complete' },
  { code: 'en', label: 'English', status: 'complete' },
  { code: 'es', label: 'Español', status: 'partial' },
  { code: 'it', label: 'Italiano', status: 'partial' },
  { code: 'de', label: 'Deutsch', status: 'partial' },
  { code: 'pt', label: 'Português', status: 'partial' },
  { code: 'pl', label: 'Polski', status: 'partial' },
];

function flatten(obj, prefix = '', out = {}) {
  Object.entries(obj).forEach(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') flatten(v, key, out);
    else out[key] = v;
  });
  return out;
}

const DICTIONARIES = Object.fromEntries(
  Object.entries({ fr, en, es, it, de, pt, pl }).map(([code, tree]) => [code, flatten(tree)]),
);

const interpolate = (str, vars) =>
  vars ? str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`)) : str;

/** Résolution d'une clé : langue active → anglais → français. */
export function translate(lang, key, vars) {
  const str = DICTIONARIES[lang]?.[key] ?? DICTIONARIES.en[key] ?? DICTIONARIES.fr[key];
  if (str === undefined) {
    if (import.meta.env?.DEV) console.warn(`[i18n] clé manquante : ${key}`);
    return key;
  }
  return interpolate(str, vars);
}

/** Résolution d'un champ localisé d'un hôtel : `"texte"` ou `{ fr, en, … }`. */
export function localize(lang, value) {
  if (value == null || typeof value === 'string') return value ?? '';
  return value[lang] ?? value.en ?? value.fr ?? '';
}

const I18nContext = createContext(null);
const STORAGE_KEY = 'pristi-guest:lang';

const readStored = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

function detectLanguage(defaultLang) {
  const codes = LANGUAGES.map((l) => l.code);
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  const candidates = [fromUrl, readStored(), ...(navigator.languages ?? [navigator.language]).map((l) => l?.split('-')[0])];
  return candidates.find((c) => c && codes.includes(c)) ?? defaultLang;
}

export function I18nProvider({ defaultLang = 'fr', children }) {
  const [lang, setLangState] = useState(() => detectLanguage(defaultLang));

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((code) => {
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* stockage indisponible : le choix reste valable pour la session */
    }
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key, vars) => translate(lang, key, vars),
      L: (v) => localize(lang, v),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n doit être utilisé dans <I18nProvider>');
  return ctx;
};
