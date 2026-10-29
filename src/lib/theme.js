// Design tokens dérivés de la configuration d'un hôtel.
// Seule `accent` est obligatoire ; tout le reste est calculé pour garantir des contrastes lisibles.

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export const rgbToHex = ([r, g, b]) =>
  `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')}`;

const lin = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

export const luminance = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

/** Rapproche `fg` de `toward` jusqu'à atteindre le contraste `min` contre `bg`. */
export function ensureContrast(fg, bg, min, toward) {
  let out = fg;
  for (let t = 0; t <= 1.0001 && contrast(out, bg) < min; t += 0.04) out = mix(fg, toward, t);
  return out;
}

const DEFAULTS = { paper: '#F7F6F2', ink: '#222724' };

export function buildTheme({ accent = '#40584C', paper = DEFAULTS.paper, ink = DEFAULTS.ink } = {}) {
  const P = hexToRgb(paper);
  const I = hexToRgb(ink);
  const A = hexToRgb(accent);
  const WHITE = [255, 255, 255];

  // Accent « texte » : toujours ≥ 4.5:1 sur le papier.
  const accentInk = ensureContrast(A, P, 4.5, I);
  // Accent « fond » (boutons) : doit porter du texte clair ou foncé à ≥ 4.5:1.
  const onAccent = contrast(A, WHITE) >= 4.5 ? WHITE : contrast(A, I) >= 4.5 ? I : null;
  const fill = onAccent ? A : ensureContrast(A, WHITE, 4.5, I);
  const inkSoft = ensureContrast(mix(I, P, 0.38), P, 4.8, I);

  const ch = (c) => c.map(clamp).join(' ');
  return {
    '--paper': ch(P),
    '--paper-2': ch(mix(P, I, 0.045)),
    '--ink': ch(I),
    '--ink-2': ch(inkSoft),
    '--line': ch(mix(P, I, 0.14)),
    '--accent': ch(fill),
    '--accent-ink': ch(accentInk),
    '--accent-soft': ch(mix(P, A, 0.11)),
    '--on-accent': ch(onAccent ?? WHITE),
  };
}

/** Variantes typographiques contrôlées (une seule famille, axes variables de Fraunces). */
export const DISPLAY_STYLES = {
  crisp: { '--display-soft': '0', '--display-wonk': '0', '--display-weight': '360', '--display-track': '-0.022em' },
  soft: { '--display-soft': '100', '--display-wonk': '0', '--display-weight': '420', '--display-track': '-0.012em' },
};

export function applyTheme(el, theme) {
  const vars = { ...buildTheme(theme), ...(DISPLAY_STYLES[theme.display] ?? DISPLAY_STYLES.crisp) };
  Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme.paper ?? DEFAULTS.paper);
}
