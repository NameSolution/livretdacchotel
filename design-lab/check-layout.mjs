// Contrôles de mise en page des maquettes : zones tactiles ≥ 44 px, débordements horizontaux, texte coupé hors troncatures prévues.
// Usage : node design-lab/check-layout.mjs [planche.html ...]  (par défaut : toutes les planches d-*.html)
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const dir = path.join(import.meta.dirname, 'concepts');
const files = process.argv.length > 2 ? process.argv.slice(2) : readdirSync(dir).filter((f) => /^d-.*\.html$/.test(f) && f !== 'd-fonts.html' && f !== 'd-kit.html');
const browser = await chromium.launch();
let problems = 0;
for (const f of files) {
  const page = await browser.newPage({ viewport: { width: 2400, height: 1400 } });
  await page.goto(`file://${path.join(dir, f)}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const res = await page.evaluate(() => {
    const out = [];
    const SEL = '.btn-light,.call,.back,.lang,.nav a,.svc a,.ah,.chips span,.sec-h a,.more,.sos a,.dh nav a,.info,.near,.reception';
    document.querySelectorAll('.dframe').forEach((fr) => {
      const fb = fr.getBoundingClientRect();
      const bottomLimit = fr.classList.contains('f667') || fr.classList.contains('f844') ? fb.bottom : Infinity;
      const nav = fr.querySelector('.nav');
      const navTop = nav && bottomLimit !== Infinity ? nav.getBoundingClientRect().top : Infinity;
      fr.querySelectorAll(SEL).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height || el.closest('.nav') && el.tagName !== 'A') return;
        const hidden = r.top >= navTop - 1 && !el.closest('.nav'); // sous la barre de navigation : hors de l'écran
        if (hidden) return;
        if (r.bottom > navTop + 1 && !el.closest('.nav')) return; // partiellement masqué par le bas de l'écran (page défilante)
        const label = (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 28);
        if (r.height < 43.5 && !el.matches('.info,.near,.reception')) out.push(`${fr.id}: cible ${Math.round(r.width)}×${Math.round(r.height)} « ${label} »`);
      });
      fr.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width && r.right > fb.right + 1 && !el.closest('.foldmark') && !el.closest('.sb') && !el.closest('.chips')) out.push(`${fr.id}: débordement à droite (${el.className || el.tagName}) +${Math.round(r.right - fb.right)}px`);
        if (r.width && r.left < fb.left - 1 && !el.closest('.hero') && !el.closest('.dhero')) out.push(`${fr.id}: débordement à gauche (${el.className || el.tagName})`);
      });
      // aucune ligne de texte ne doit être coupée verticalement sans ellipse volontaire : on contrôle les zones critiques
      fr.querySelectorAll('.wifi code,.wcard code,.wcard .ssid,.wifi .lbl b,.hours b,.info .v').forEach((el) => {
        if (el.scrollWidth > el.clientWidth + 1) out.push(`${fr.id}: texte critique tronqué (${el.className || el.tagName} « ${el.textContent.slice(0, 20)} »)`);
      });
    });
    return out;
  });
  const uniq = [...new Set(res)];
  console.log(`${f}: ${uniq.length ? `${uniq.length} point(s)` : 'ok'}`);
  uniq.slice(0, 12).forEach((u) => console.log('   -', u));
  problems += uniq.length;
  await page.close();
}
await browser.close();
console.log(problems ? `\n${problems} point(s) à traiter` : '\nMise en page : aucun problème détecté.');
process.exit(problems ? 1 : 0);
