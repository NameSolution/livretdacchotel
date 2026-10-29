import { describe, expect, it } from 'vitest';
import fr from './locales/fr';
import en from './locales/en';
import { translate, localize } from './index.jsx';

const keys = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) => (v && typeof v === 'object' ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]));

describe('traductions', () => {
  it('le français et l’anglais ont exactement les mêmes clés', () => {
    expect(keys(en).sort()).toEqual(keys(fr).sort());
  });

  it('toutes les clés suivent le préfixe stable guest.*', () => {
    keys(fr).forEach((k) => expect(k.startsWith('guest.')).toBe(true));
  });

  it('interpole les variables', () => {
    expect(translate('fr', 'guest.wifi.step2', { network: 'Réseau-X' })).toBe('Choisissez le réseau Réseau-X.');
  });

  it('retombe sur l’anglais puis le français pour une langue partielle', () => {
    expect(translate('es', 'guest.nav.discover')).toBe('Descubrir');
    expect(translate('es', 'guest.breakfast.goodToKnow')).toBe('Good to know');
  });

  it('localise les contenus d’hôtel avec repli', () => {
    expect(localize('de', { fr: 'Bonjour', en: 'Hello' })).toBe('Hello');
    expect(localize('fr', { fr: 'Bonjour', en: 'Hello' })).toBe('Bonjour');
    expect(localize('fr', undefined)).toBe('');
  });
});
