// Outils communs des maquettes : icônes Lucide (ISC) en SVG inline, QR réel, cadre de téléphone, planche.
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import QRCode from '../../node_modules/qrcode/lib/index.js';

const root = path.resolve(import.meta.dirname, '../..');
const cache = {};
export async function loadIcons(names) {
  for (const n of names) {
    if (cache[n]) continue;
    const mod = await import(pathToFileURL(path.join(root, `node_modules/lucide-react/dist/esm/icons/${n}.mjs`)).href);
    cache[n] = mod.__iconData.node;
  }
}
export function icon(name, size = 20, stroke = 1.75, attrs = '') {
  const node = cache[name];
  if (!node) throw new Error(`icône non chargée : ${name}`);
  const inner = node.map(([tag, a]) => `<${tag} ${Object.entries(a).filter(([k]) => k !== 'key').map(([k, v]) => `${k}="${v}"`).join(' ')}/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" ${attrs}>${inner}</svg>`;
}
export const ALL_ICONS = ['wifi', 'coffee', 'door-open', 'concierge-bell', 'phone', 'copy', 'check', 'house', 'compass', 'info', 'map-pin', 'arrow-right', 'arrow-up-right', 'chevron-right', 'chevron-left', 'sun', 'cloud', 'snowflake', 'clock', 'globe', 'qr-code', 'utensils', 'flame', 'mountain', 'key-round', 'sparkles', 'thermometer', 'bus', 'wine', 'bed-double', 'x', 'languages', 'plus', 'calendar-days', 'badge-check', 'bell', 'mail', 'cloud-snow', 'cloud-sun', 'shower-head', 'wind', 'footprints'];

export async function qrSvg(text, dark = '#0b0c1b', light = '#ffffff') {
  const QR = QRCode.default ?? QRCode;
  return QR.toString(text, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark, light } });
}

/** Cadre de téléphone minimal : 390×844, barre d'état simulée. */
export function phone({ id, className = '', status = 'dark', body }) {
  return `<div class="phone ${className}" id="${id}">
    <div class="screen">${body}</div>
    <div class="statusbar ${status}"><span>08:20</span><span class="sb-right"><i></i><i></i><i class="batt"></i></span></div>
  </div>`;
}

export function board({ title, kicker, blurb, css, screens, boardBg = '#d9dadd', boardInk = '#111', extraHead = '' }) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="../fonts/fonts.css">
${extraHead}
<style>
*{box-sizing:border-box;margin:0}
body{background:${boardBg};color:${boardInk};font-family:system-ui,sans-serif}
.board{width:max-content;padding:56px 56px 52px}
.board-head{display:flex;align-items:flex-end;justify-content:space-between;gap:60px;margin-bottom:40px}
.board-head h1{font:700 40px/1 system-ui;letter-spacing:-.02em}
.board-head .k{font:600 12px/1 system-ui;letter-spacing:.14em;text-transform:uppercase;opacity:.55;margin-bottom:12px}
.board-head p{max-width:560px;font:400 15px/1.5 system-ui;opacity:.75}
.row{display:flex;gap:48px;align-items:flex-start}
.cell figcaption{font:600 12px/1.4 system-ui;letter-spacing:.1em;text-transform:uppercase;opacity:.6;margin:22px 4px 0;max-width:390px}
.phone{position:relative;width:390px;height:844px;border-radius:46px;overflow:hidden;box-shadow:0 0 0 9px #0c0c0e,0 0 0 10px #2a2a2e,0 30px 60px -20px rgba(0,0,0,.45);isolation:isolate}
.screen{position:absolute;inset:0;overflow:hidden}
.statusbar{position:absolute;top:0;left:0;right:0;height:44px;display:flex;align-items:center;justify-content:space-between;padding:6px 28px 0 30px;font:600 15px/1 system-ui;z-index:50;pointer-events:none}
.statusbar.dark{color:#0b0b0b}.statusbar.light{color:#fff}
.sb-right{display:flex;gap:5px;align-items:center}.sb-right i{display:block;width:16px;height:10px;border-radius:2px;background:currentColor;opacity:.9}.sb-right .batt{width:24px;border-radius:3px}
svg{display:block;flex:none}
button{font:inherit;color:inherit;border:0;background:none;padding:0;cursor:pointer}
a{color:inherit;text-decoration:none}
${css}
</style></head><body><div class="board">
<div class="board-head"><div><div class="k">${kicker}</div><h1>${title}</h1></div><p>${blurb}</p></div>
<div class="row">${screens.map((s) => `<figure class="cell">${s.html}<figcaption>${s.caption}</figcaption></figure>`).join('')}</div>
</div></body></html>`;
}
