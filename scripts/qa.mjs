// Contrôle qualité automatisé : captures, erreurs de console, débordement horizontal, zones tactiles.
// Usage : npm run build && npm run qa   (démarre `vite preview` lui-même ; PLAYWRIGHT requis)
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const OUT = process.env.QA_OUT ?? 'qa-output';
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const HOTELS = ['verriere', 'arolle'];
const ROUTES = [
  ['home', '/'],
  ['wifi', '/wifi'],
  ['breakfast', '/petit-dejeuner'],
  ['info', '/infos'],
  ['discover', '/decouvrir'],
  ['contact', '/reception'],
];
const VIEWPORTS = (process.env.QA_VIEWPORTS ?? '320,375,390,430,768,1024,1440').split(',').map(Number);
const SHOTS = process.env.QA_SHOTS ?? 'mobile'; // mobile | all | none

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 40; i += 1) {
  try {
    if ((await fetch(BASE)).ok) break;
  } catch {
    await wait(250);
  }
}

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const problems = [];
const note = (msg) => problems.push(msg);

for (const hotel of HOTELS) {
  for (const width of VIEWPORTS) {
    const height = width < 700 ? 844 : width < 1100 ? 1024 : 900;
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: width < 700 ? 2 : 1, locale: 'fr-FR', hasTouch: width < 700 });
    // Pas de réseau externe : la météo doit échouer proprement.
    await ctx.route('**/api.open-meteo.com/**', (r) => r.abort());
    for (const [name, path] of ROUTES) {
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => ['error', 'warning'].includes(m.type()) && !/Failed to load resource|ERR_FAILED/.test(m.text()) && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
      await page.goto(`${BASE}${path}?hotel=${hotel}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(450);
      const label = `${hotel}/${name}@${width}`;

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 0) note(`${label}: débordement horizontal de ${overflow}px`);
      errors.forEach((e) => note(`${label}: console — ${e}`));

      const small = await page.evaluate(() =>
        [...document.querySelectorAll('a, button, [role=tab]')]
          .filter((el) => el.offsetParent !== null && !el.closest('.sr-only') && getComputedStyle(el).visibility !== 'hidden')
          .map((el) => ({ r: el.getBoundingClientRect(), t: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 30) }))
          .filter(({ r }) => r.width > 0 && (r.height < 44 || r.width < 44) && !(r.width >= 44 || r.height >= 44 && false))
          .filter(({ r }) => r.height < 44)
          .map(({ r, t }) => `${t} (${Math.round(r.width)}×${Math.round(r.height)})`),
      );
      if (width < 700 && small.length) note(`${label}: cibles < 44px de haut — ${small.slice(0, 4).join(' | ')}`);

      const wantShot = SHOTS === 'all' || (SHOTS === 'mobile' && [390, 1440].includes(width)) || (SHOTS === 'extra' && [320, 768].includes(width));
      if (wantShot && SHOTS !== 'none') {
        // Déclenche le chargement différé des photos avant la capture.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 500) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(700);
        await page.screenshot({ path: `${OUT}/${hotel}-${name}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `${OUT}/fold-${hotel}-${name}-${width}.png` });
      }
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();
server.kill();
console.log(problems.length ? `\n${problems.length} point(s) à traiter :\n- ${problems.join('\n- ')}` : '\nQA : aucun problème détecté.');
process.exit(problems.length ? 1 : 0);
