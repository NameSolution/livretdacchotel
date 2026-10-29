import { describe, expect, it } from 'vitest';
import { AMBIANCES, contrast, deriveTokens, photoUsable } from './tokens.mjs';

const brands = ['#1E3A4C', '#8A2F25', '#24386B', '#2D6A4F', '#E8C547', '#FFD000', '#FFFFFF', '#00A3FF', '#F2A7B8'];

describe('deriveTokens', () => {
  for (const ambiance of Object.keys(AMBIANCES)) {
    it.each(brands)(`garantit les contrastes (${ambiance}, marque %s)`, (brand) => {
      const t = deriveTokens({ brand, ambiance });
      expect(contrast('#FFFFFF', t.brand)).toBeGreaterThanOrEqual(4.5);
      for (const bg of [t.surface, t.tint, t.tint2, t.card]) expect(contrast(t.brandInk, bg)).toBeGreaterThanOrEqual(4.49);
      for (const bg of [t.surface, t.tint, t.card]) expect(contrast(t.muted, bg)).toBeGreaterThanOrEqual(4.49);
      expect(contrast(t.ink, t.surface)).toBeGreaterThanOrEqual(12);
    });
  }
  it('borne l’arrondi', () => {
    expect(deriveTokens({ brand: '#1E3A4C', radius: 40 }).radius).toBe(20);
    expect(deriveTokens({ brand: '#1E3A4C', radius: 0 }).radius).toBe(8);
  });
  it('conserve une marque déjà conforme', () => {
    expect(deriveTokens({ brand: '#1E3A4C' }).brand.toLowerCase()).toBe('#1e3a4c');
  });
});

describe('photoUsable', () => {
  it('accepte une photo correcte', () => { expect(photoUsable({ src: 'a.webp', w: 1800, h: 1200 })).toBe(true); expect(photoUsable({ src: 'a.webp', w: 900, h: 1200 })).toBe(true); expect(photoUsable({ src: 'a.webp', w: 1600, h: 800 })).toBe(true); });
  it('refuse absente, trop petite, dimensions inconnues, formats extrêmes', () => {
    expect(photoUsable(null)).toBe(false);
    expect(photoUsable({ src: 'a', w: 320, h: 240 })).toBe(false);
    expect(photoUsable({ src: 'a' })).toBe(false);
    expect(photoUsable({ src: 'a', w: 3000, h: 800 })).toBe(false);
    expect(photoUsable({ src: 'a', w: 1200, h: 3000 })).toBe(false);
  });
});
