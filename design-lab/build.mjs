// Génère les planches de maquettes : node design-lab/build.mjs
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { ALL_ICONS, board, loadIcons } from './lib/kit.mjs';

await loadIcons(ALL_ICONS);
const only = process.argv[2];
for (const name of ['a-billet', 'b-sequence', 'c-souvenir', 'd-refined']) {
  if (only && !name.startsWith(only)) continue;
  let mod;
  try { mod = await import(`./concepts/${name}.mjs`); } catch (e) { if (e.code === 'ERR_MODULE_NOT_FOUND') continue; throw e; }
  const built = process.argv[3] === 'fonts' && mod.buildFonts ? await mod.buildFonts() : await mod.build();
  for (const out of [].concat(built)) {
    writeFileSync(path.join(import.meta.dirname, 'concepts', out.file), board(out));
    console.log('écrit', out.file);
  }
}
