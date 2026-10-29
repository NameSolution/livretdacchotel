# design-lab — maquettes des directions graphiques V2

Maquettes HTML/CSS **isolées de l'application** (aucune dépendance du build principal). Elles servent à comparer des directions
artistiques avant toute refonte du code React.

```bash
npm install                    # à la racine (lucide-react, qrcode, playwright sont réutilisés)
node design-lab/build.mjs      # génère design-lab/concepts/*.html
node design-lab/capture.mjs    # captures PNG des planches et de chaque écran → design-lab/shots/ (ignoré par Git)
```

- `concepts/a-billet.mjs`, `b-sequence.mjs`, `c-souvenir.mjs` : une direction par fichier (CSS + écrans).
- `lib/kit.mjs` : icônes Lucide inline (ISC), QR Wi-Fi réel, cadre de téléphone, planche.
- `fonts/` : polices libres SIL OFL 1.1, sous-ensemble latin (Bricolage Grotesque, Instrument Sans, Geist Mono, Archivo, Hanken Grotesk, Figtree, Caveat, Caprasimo).
- Les photos viennent de `public/images/` (illustrations Unsplash, voir `/credits` dans l'application).

Les captures retenues sont copiées dans `docs/v2/`.
