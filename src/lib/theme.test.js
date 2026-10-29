import { describe, expect, it } from 'vitest';
import { HOTELS } from '../data/hotels';
import { buildTheme, contrast, hexToRgb } from './theme';

const rgb = (channels) => channels.split(' ').map(Number);

describe('buildTheme', () => {
  it.each(Object.values(HOTELS))('garantit des contrastes AA pour $name', ({ theme }) => {
    const v = buildTheme(theme);
    const paper = rgb(v['--paper']);
    expect(contrast(rgb(v['--ink']), paper)).toBeGreaterThanOrEqual(7);
    expect(contrast(rgb(v['--ink-2']), paper)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(rgb(v['--accent-ink']), paper)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(rgb(v['--on-accent']), rgb(v['--accent']))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(rgb(v['--accent-ink']), rgb(v['--accent-soft']))).toBeGreaterThanOrEqual(4.5);
  });

  it('corrige un accent trop clair pour rester lisible', () => {
    const v = buildTheme({ accent: '#E8C547' });
    expect(contrast(rgb(v['--accent-ink']), hexToRgb('#F7F6F2'))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(rgb(v['--on-accent']), rgb(v['--accent']))).toBeGreaterThanOrEqual(4.5);
  });
});
