// Mesure réelle du contraste du texte blanc posé sur les photographies (nom de l'hôtel, sélecteur de langue).
// Méthode : on masque le texte, on capture l'en-tête, puis on prend le 95e centile de luminance sous chaque zone de texte
// (cas défavorable ; pour les pastilles on exclut les coins arrondis, hors du fond) pour calculer le ratio WCAG avec du blanc. Usage : node design-lab/check-photos.mjs [planche.html]
import path from 'node:path';
import { chromium } from 'playwright';

const file = process.argv[2] ?? 'd-photos.html';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 2400, height: 1400 }, deviceScaleFactor: 2 });
await page.goto(`file://${path.join(import.meta.dirname, 'concepts', file)}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: '.hero .wm{color:transparent!important;text-shadow:none!important}.hero .lang{color:transparent!important}.hero .lang svg{visibility:hidden}.hero .kind,.hero .chip{color:transparent!important}.sb{visibility:hidden}' });
const heroes = await page.$$('.dframe .hero:not(.fb):not(.fbl):not(.sk)');
const calc = await browser.newPage();
const results = [];
for (let i = 0; i < heroes.length; i += 1) {
  const hb = await heroes[i].boundingBox();
  if (!hb) continue;
  const buf = await heroes[i].screenshot();
  const zones = await heroes[i].evaluate((el) => {
    const r = el.getBoundingClientRect();
    return ['.wm', '.lang', '.kind', '.chip'].flatMap((s) => [...el.querySelectorAll(s)].map((n) => { const b = n.getBoundingClientRect(); const pill = s === '.lang' || s === '.chip'; const ix = pill ? b.height * 0.5 : 0; const iy = pill ? b.height * 0.2 : 0; return { s, x: b.x - r.x + ix, y: b.y - r.y + iy, w: Math.max(2, b.width - 2 * ix), h: Math.max(2, b.height - 2 * iy) }; }));
  });
  const out = await calc.evaluate(async ({ b64, zones, scale }) => {
    const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    const lin = (v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
    return zones.map((z) => {
      const d = g.getImageData(Math.round(z.x * scale), Math.round(z.y * scale), Math.max(1, Math.round(z.w * scale)), Math.max(1, Math.round(z.h * scale))).data;
      const L = []; for (let p = 0; p < d.length; p += 4) L.push(0.2126 * lin(d[p]) + 0.7152 * lin(d[p + 1]) + 0.0722 * lin(d[p + 2]));
      L.sort((a, b) => a - b); const p95 = L[Math.floor(L.length * 0.95)];
      return { s: z.s, ratio: 1.05 / (p95 + 0.05) };
    });
  }, { b64: buf.toString('base64'), zones, scale: 2 });
  const frameId = await heroes[i].evaluate((el) => el.closest('.dframe')?.id);
  results.push({ frameId, out });
}
let worst = 99;
for (const r of results) { const min = Math.min(...r.out.map((o) => o.ratio)); worst = Math.min(worst, min); console.log(`${r.frameId.padEnd(26)} ${r.out.map((o) => `${o.s} ${o.ratio.toFixed(1)}`).join(' · ')}`); }
console.log(`\npire cas : ${worst.toFixed(2)} : 1 (seuil 4,5)`);
await browser.close();
process.exit(worst >= 4.5 ? 0 : 1);
