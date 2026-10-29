// Capture des planches et de chaque écran : node design-lab/capture.mjs [a|b|c]
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const only = process.argv[2];
const dir = path.join(import.meta.dirname, 'concepts');
const out = path.join(import.meta.dirname, 'shots');
mkdirSync(out, { recursive: true });
const files = { a: 'a-billet', b: 'b-sequence', c: 'c-souvenir' };
const browser = await chromium.launch();
for (const [k, name] of Object.entries(files)) {
  if (only && only !== k) continue;
  const page = await browser.newPage({ viewport: { width: 2000, height: 1200 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(`file://${path.join(dir, name + '.html')}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.locator('.board').screenshot({ path: path.join(out, `${name}-board.png`) });
  for (const id of await page.$$eval('.phone', (els) => els.map((e) => e.id))) {
    await page.locator(`#${id}`).screenshot({ path: path.join(out, `${name}-${id}.png`) });
  }
  console.log(name, errors.length ? `ERREURS: ${errors.join(' | ')}` : 'ok');
  await page.close();
}
await browser.close();
