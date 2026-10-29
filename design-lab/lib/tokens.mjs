// Dérivation des jetons Pristi Guest (direction D) à partir des paramètres de l'hôtelier.
// Module pur, sans dépendance : il peut être repris tel quel dans l'application (voir docs/v3/DESIGN-SYSTEM.md).

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
export const hexToRgb = (h) => { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
export const rgbToHex = (c) => '#' + c.map((v) => clamp(v).toString(16).padStart(2, '0')).join('');
export const mix = (a, b, t) => rgbToHex(hexToRgb(a).map((v, i) => v + (hexToRgb(b)[i] - v) * t));
const lin = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
export const luminance = (h) => { const [r, g, b] = hexToRgb(h); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
export const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

/** Trois ambiances neutres : fond + encre. L'hôtelier en choisit une. */
export const AMBIANCES = {
  froide: { surface: '#F2F5F5', ink: '#141A1D' },
  neutre: { surface: '#F4F4F1', ink: '#16181F' },
  chaude: { surface: '#F6F2F0', ink: '#241816' },
};

/** Arrondis autorisés (px) : le reste est borné pour éviter les rendus incohérents. */
export const RADIUS_RANGE = [8, 20];

/** Rapproche `color` de `toward` jusqu'à atteindre `min` contre `bg` (jamais plus loin que nécessaire). */
export function ensure(color, bg, min, toward) {
  let out = color;
  for (let t = 0; t <= 1.0001 && contrast(out, bg) < min; t += 0.03) out = mix(color, toward, t);
  return out;
}

/**
 * @param {{brand:string, ambiance?:'froide'|'neutre'|'chaude', radius?:number}} p
 * Renvoie les jetons utilisés par l'interface. Garanties (testées) :
 *  - texte blanc sur `brand` ≥ 4,5:1 ; `brandInk` (texte de marque) ≥ 4,5:1 sur fond, teinte et teinte forte ;
 *  - `muted` (texte atténué) ≥ 4,5:1 sur fond, carte et teinte.
 */
export function deriveTokens({ brand, ambiance = 'neutre', radius = 14 }) {
  const { surface, ink } = AMBIANCES[ambiance] ?? AMBIANCES.neutre;
  const white = '#FFFFFF';
  const fill = ensure(brand, white, 4.5, ink);
  const tint = mix(surface, fill, 0.085);
  const tint2 = mix(surface, fill, 0.16);
  let brandInk = fill;
  for (const bg of [surface, tint, tint2, white]) brandInk = ensure(brandInk, bg, 4.5, ink);
  let muted = mix(ink, surface, 0.33);
  for (const bg of [surface, tint, white]) muted = ensure(muted, bg, 4.5, ink);
  return {
    brand: fill, brandInk, onBrand: white, surface, card: white, ink, muted,
    line: mix(ink, surface, 0.86), tint, tint2,
    radius: Math.max(RADIUS_RANGE[0], Math.min(RADIUS_RANGE[1], radius)),
  };
}

/**
 * Règle de recevabilité d'une photographie d'accueil (utilisée en pleine largeur) :
 * côté court ≥ 800 px, côté long ≥ 1200 px, format entre 0,6 (portrait) et 2,4 (panorama).
 * Absente, inconnue (dimensions non renseignées), trop petite ou illisible → repli de marque.
 */
export const PHOTO_RULES = { minShort: 800, minLong: 1200, minAspect: 0.6, maxAspect: 2.4 };
export function photoUsable(p) {
  if (!p?.src || !p.w || !p.h) return false;
  const a = p.w / p.h;
  return Math.min(p.w, p.h) >= PHOTO_RULES.minShort && Math.max(p.w, p.h) >= PHOTO_RULES.minLong && a >= PHOTO_RULES.minAspect && a <= PHOTO_RULES.maxAspect;
}
