# design-lab — maquettes des directions graphiques

Maquettes HTML/CSS **isolées de l'application** (aucune dépendance du build principal). Elles servent à comparer et à figer des directions
artistiques avant toute refonte du code React. **Direction D validée** : voir `docs/v3/`.

```bash
npm install && (cd design-lab && npm install)   # lucide-react, qrcode, playwright à la racine ; polices dans design-lab/
node design-lab/build.mjs             # génère toutes les planches HTML (A, B, C, D) dans design-lab/concepts/
node design-lab/build.mjs d           # seulement D
node design-lab/build.mjs d fonts     # planche de comparaison typographique de D
node design-lab/capture.mjs d-        # captures PNG → design-lab/shots/ (ignoré par Git) ; sans argument : toutes
node design-lab/check-photos.mjs d-photos.html   # contraste du texte sur photographies (mesure réelle)
node design-lab/check-layout.mjs                 # cibles tactiles ≥ 44 px, débordements, textes critiques tronqués
npx vitest run design-lab                        # jetons (contrastes) et règle de recevabilité des photos
```

- `concepts/a-billet.mjs`, `b-sequence.mjs`, `c-souvenir.mjs` : directions écartées (conservées pour l'historique).
- `concepts/d-refined.mjs` : **direction D** (CSS, composants, établissements de démonstration, planches).
- `lib/tokens.mjs` : dérivation des jetons D et règle `photoUsable` (module pur, repris tel quel à l'intégration).
- `lib/kit.mjs` : icônes Lucide inline (ISC), QR Wi‑Fi réel, planche.
- `fonts/` : polices SIL OFL 1.1, sous-ensemble latin.
- `photos/` : photos d'essai (chambres ordinaires, sombre, verticale, trop petite) dérivées d'illustrations Unsplash.

Les captures retenues sont copiées dans `docs/v2/` (A, B, C) et `docs/v3/captures/` (D). Tout est fictif ; les captures viennent d'un navigateur simulé, pas d'un téléphone physique.
