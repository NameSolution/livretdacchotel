// Parcours utilisateur automatisés (navigation, copie Wi-Fi, langue, accordéons, fiches, bascule d'hôtel).
// Usage : npm run build && node scripts/interactions.mjs
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const OUT = process.env.QA_OUT ?? 'qa-output';
const PORT = 4174;
const BASE = `http://localhost:${PORT}`;
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
for (let i = 0; i < 40; i += 1) {
  try {
    if ((await fetch(BASE)).ok) break;
  } catch {
    await new Promise((r) => setTimeout(r, 250));
  }
}
mkdirSync(OUT, { recursive: true });

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok });
  console.log(`${ok ? '✔' : '✘'} ${name}${ok ? '' : ` — ${detail}`}`);
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, locale: 'fr-FR', hasTouch: true, permissions: ['clipboard-read', 'clipboard-write'] });
await ctx.route('**/api.open-meteo.com/**', (r) =>
  r.fulfill({ json: { current: { temperature_2m: 14.2, weather_code: 3 } } }),
);
const page = await ctx.newPage();
const consoleErrors = [];
page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
page.on('pageerror', (e) => consoleErrors.push(e.message));

// 1. Accueil : météo, accès essentiels
await page.goto(BASE, { waitUntil: 'networkidle' });
check('Accueil : titre de bienvenue', (await page.locator('h1').innerText()).includes('Maison Verrière'));
check('Accueil : météo affichée quand l’API répond', await page.getByText('14 °C · Nuageux').isVisible());

// 2. Navigation vers le Wi-Fi puis retour
await page.getByRole('link', { name: /Verriere-Guest/ }).click();
await page.waitForURL('**/wifi');
await page.getByRole('heading', { name: 'Wi-Fi', level: 1 }).waitFor();
check('Wi-Fi : page ouverte depuis l’accueil', true);

// 3. Copie du mot de passe
await page.getByRole('button', { name: 'Copier le mot de passe' }).click();
await page.getByRole('button', { name: 'Mot de passe copié' }).waitFor();
const clip = await page.evaluate(() => navigator.clipboard.readText());
check('Wi-Fi : le presse-papiers contient le mot de passe', clip === 'Soie-Pierre-42', clip);
await page.waitForTimeout(350);
await page.screenshot({ path: `${OUT}/state-wifi-copied.png` });

// 4. QR code
await page.getByRole('button', { name: /QR code/ }).click();
await page.getByRole('img', { name: /QR code/ }).waitFor();
check('Wi-Fi : QR code généré', await page.locator('[role=img] svg').first().isVisible());
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/state-wifi-qr.png` });

// 5. Repli quand le presse-papiers est indisponible
const page2 = await ctx.newPage();
await page2.addInitScript(() => {
  Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
  document.execCommand = () => false;
});
await page2.goto(`${BASE}/wifi`, { waitUntil: 'networkidle' });
await page2.getByRole('button', { name: 'Copier le mot de passe' }).click();
check('Wi-Fi : message de repli si la copie est impossible', await page2.getByText(/Copie automatique impossible/).isVisible());
await page2.screenshot({ path: `${OUT}/state-wifi-fallback.png` });
await page2.close();

// 6. Retour
await page.getByRole('button', { name: 'Retour' }).click();
await page.waitForURL(BASE + '/');
check('Retour : revient à l’accueil', true);

// 7. Changement de langue
await page.getByRole('button', { name: /Changer de langue/ }).click();
await page.getByRole('dialog').waitFor();
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/state-language-sheet.png` });
await page.getByRole('button', { name: /English/ }).click();
await page.waitForFunction(() => document.querySelector('h1')?.textContent?.includes('Welcome'));
check('Langue : bascule en anglais (titre, nav, html lang)', (await page.locator('html').getAttribute('lang')) === 'en' && (await page.getByRole('link', { name: 'Discover' }).first().isVisible()));
await page.getByRole('button', { name: /Change language/ }).click();
await page.getByRole('button', { name: /Español/ }).click();
check('Langue : espagnol (interface traduite, contenus en anglais)', await page.getByRole('link', { name: 'Descubrir' }).first().isVisible() && (await page.locator('h1').innerText()).includes('Welcome'));
await page.getByRole('button', { name: /Cambiar de idioma/ }).click();
await page.getByRole('button', { name: /Français/ }).click();

// 8. Lien profond d'infos : accordéon ouvert
await page.goto(`${BASE}/infos?go=checkout`, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const trigger = page.getByRole('button', { name: /Départ/ });
check('Infos : ?go=checkout ouvre l’accordéon Départ', (await trigger.getAttribute('aria-expanded')) === 'true');
await page.screenshot({ path: `${OUT}/state-info-open.png` });

// 9. Découvrir : onglets + fiche lieu
await page.goto(`${BASE}/decouvrir`, { waitUntil: 'networkidle' });
await page.getByRole('tab', { name: 'À découvrir' }).click();
await page.waitForFunction(() => document.querySelector('[role=tab][aria-selected=true]')?.textContent === 'À découvrir');
check('Découvrir : onglet À découvrir sélectionné', true);
await page.getByRole('button', { name: /Basilique Notre-Dame de Fourvière/ }).click();
const dialog = page.getByRole('dialog');
await dialog.waitFor();
const href = await dialog.getByRole('link', { name: /Itinéraire/ }).getAttribute('href');
check('Découvrir : fiche avec lien d’itinéraire réel', /google\.com\/maps\/dir/.test(href ?? ''), href);
await page.waitForTimeout(350);
await page.screenshot({ path: `${OUT}/state-place-sheet.png` });
await page.keyboard.press('Escape');
await dialog.waitFor({ state: 'hidden' });
await page.waitForFunction(() => !location.search.includes('place='));
check('Découvrir : Échap ferme la fiche', true);
await page.getByRole('tab', { name: 'Restaurants' }).click();
await page.getByRole('button', { name: /Bouchon Chez Odette/ }).click();
check('Découvrir : lieu sans adresse → pas de bouton Itinéraire', (await page.getByRole('dialog').getByRole('link', { name: /Itinéraire/ }).count()) === 0);
await page.keyboard.press('Escape');

// 10. Bascule d'hôtel en prévisualisation
await page.goto(`${BASE}/?preview=1`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /L’Arolle/ }).click();
await page.waitForFunction(() => document.querySelector('h1')?.textContent?.includes('Arolle'));
const accent = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
check('Prévisualisation : bascule vers l’hôtel de montagne (thème différent)', accent !== '64 88 76' && page.url().includes('hotel=arolle'), accent);
await page.getByRole('link', { name: /Mot de passe/ }).click();
await page.waitForURL('**/wifi?*');
await page.getByText('Edelweiss-1035').first().waitFor();
check('Prévisualisation : l’hôtel est conservé en naviguant', page.url().includes('hotel=arolle') && (await page.getByText('Edelweiss-1035').isVisible()));

// 11. Météo indisponible : rien d'affiché
const page3 = await ctx.newPage();
await page3.route('**/api.open-meteo.com/**', (r) => r.abort());
await page3.goto(BASE, { waitUntil: 'networkidle' });
check('Météo : aucune donnée affichée en cas d’échec', (await page3.getByText(/°C/).count()) === 0);
await page3.close();

// 12. Accessibilité de base : lien d'évitement, repères, focus visible
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
check('A11y : lien d’évitement atteignable au clavier', await page.getByRole('link', { name: 'Aller au contenu' }).isVisible());
check('A11y : repères main / nav / header présents', (await page.locator('main, nav, header').count()) >= 3);
const imgsWithoutAlt = await page.locator('img:not([alt])').count();
check('A11y : toutes les images ont un attribut alt', imgsWithoutAlt === 0);

check('Console : aucune erreur', consoleErrors.length === 0, consoleErrors.join(' | '));

await browser.close();
server.kill();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} vérifications réussies`);
process.exit(failed ? 1 : 0);
