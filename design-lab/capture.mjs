// Capture des planches et de chaque écran : node design-lab/capture.mjs [préfixe de fichier, ex. a- ou d-]
import { mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const only = process.argv[2];
const dir = path.join(import.meta.dirname, 'concepts');
const out = path.join(import.meta.dirname, 'shots');
mkdirSync(out, { recursive: true });
const files = readdirSync(dir).filter((f) => f.endsWith('.html') && (!only || f.startsWith(only)));
const browser = await chromium.launch();
for (const f of files) {
  const name = f.replace('.html', '');
  const page = await browser.newPage({ viewport: { width: 2000, height: 1200 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(`file://${path.join(dir, f)}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.locator('.board').screenshot({ path: path.join(out, `${name}-board.png`) });
  const ids = await page.$$eval('.phone, .dframe, .shot', (els) => els.map((e) => e.id).filter(Boolean));
  for (const id of ids) await page.locator(`#${id}`).first().screenshot({ path: path.join(out, `${name}--${id}.png`) });
  console.log(name, errors.length ? `ERREURS: ${errors.join(' | ')}` : 'ok');
  await page.close();
}
await browser.close();
