# Direction D — rapport de vérification

Date des mesures : session de finalisation. **Tout a été fait dans Chromium (Playwright) avec des tailles de fenêtre simulées. Aucun test n'a été fait sur un téléphone physique, ni sur Safari/iOS ni sur Firefox.** Les maquettes sont des pages HTML/CSS statiques : les interactions (copie, accordéons, feuilles) y sont représentées par des états figés, pas exécutées ; elles le sont dans le prototype React V1 (`scripts/interactions.mjs`, 21/21).

## Ce qui a été contrôlé et comment

| Contrôle | Outil | Résultat |
| --- | --- | --- |
| Essentiels au premier écran (Wi‑Fi, petit-déjeuner, départ, réception) | captures 320×667, 375×667, 390×844 (`captures/01`, `02`) | visibles en entier dès 320×667 pour les quatre établissements ; le titre « Aujourd'hui » apparaît juste sous le pli |
| Contraste du texte blanc sur photographie | `design-lab/check-photos.mjs` : masque le texte, capture l'en-tête, prend le 95ᵉ centile de luminance sous chaque zone de texte | **pire cas 4,9:1** (nom de l'hôtel sur la photo de l'Hôtel du Parc) ; 5,1:1 sur photo très claire ; 7,3 à 19:1 ailleurs. Pastilles de langue ≥ 13:1 |
| Zones tactiles ≥ 44 px, débordements horizontaux, textes critiques tronqués | `design-lab/check-layout.mjs` sur 14 planches | **0 problème** (a détecté 4 puces de catégorie à 40 px et une pastille de langue à 36 px, corrigées à 44) |
| Contrastes des jetons | `design-lab/lib/tokens.test.js` (Vitest) | 27 combinaisons marque × ambiance + cas limites, tous ≥ 4,5:1 ; marque jaune pâle assombrie automatiquement (`captures/14`) |
| Règle de recevabilité des photos | tests unitaires + `captures/08` | 7 cas : photo ordinaire, sombre, très claire, verticale, trop petite sans/avec garde-fou, absente |
| Contenus longs | `captures/09` (320 et 375 px) | nom de 52 caractères sur 3 lignes, message de ~400 caractères limité à 3 lignes + « Lire la suite », SSID de 38 caractères et mot de passe de 38 caractères repliés sans troncature, lieu de petit-déjeuner de 57 caractères |
| Application React V1 non régressée | `npm test`, `npm run build` | 57 tests passent, build OK (l'application n'est pas modifiée) |

## Ce qui a été corrigé pendant cette passe

1. **Accueil trop long** : le mot de l'hôtelier est passé de 5–6 lignes à 3 lignes maximum, l'en-tête photo de 330 à 176 px (228 px sur écran haut), le Wi‑Fi tient sur une ligne de libellé + mot de passe.
2. **320 px** : mot de passe coupé en deux (« Soie-Pierre-/42 ») → taille réduite à 16,5 px ; « poste/9 » coupé dans la réception → bouton Appeler sans icône sous 360 px ; valeurs horaires réduites à 17 px.
3. **Nom d'hôtel long** tronqué à 2 lignes → réduit à 16,5 px sur 3 lignes.
4. **Initiale de l'avatar** fausse pour « de la Tour d'Auvergne » et « La famille Delorme » → règle d'articles + champ `mono` optionnel.
5. **Pastille de langue** sur photo claire à 3,9:1 (estimation) → fond renforcé (`.64`), mesuré ≥ 13:1.
6. **Zones tactiles** < 44 px (puces, langue, liens de section, « Lire la suite »).
7. **Sans photo** : repli de marque créé ; l'ancienne version laissait un trou ou une image floue.
8. **Texte atténué sur teinte** : ajouté à la dérivation (le contrôle précédent ne le mesurait pas) ; la teinte « atténué » est plus foncée.
9. **Fond de la ligne « aujourd'hui » du petit-déjeuner** pris pour le style de la liste d'horaires du jour (collision de classes) → renommée.

## Limites connues (à tester plus tard, pas résolues ici)

- **Pas de téléphone réel** : rendu des polices (Wix Madefor, Newsreader), hinting Android, interlignage, zone de sécurité, barre d'URL mobile, clavier.
- **Tablette (768 px) et 1024 px non maquettés** ; bureau vérifié à 1440 px seulement. Pastilles (nom/`kind`) de la version bureau non mesurées par `check-photos.mjs` (elles utilisent `.dhero`).
- **Lecteur d'écran / navigation clavier** non testés sur les maquettes (la V1 React a un lien d'évitement, des repères et Radix pour accordéon/dialogue).
- **Textes dans les langues non françaises** : les maquettes sont en français seulement ; allemand et polonais, plus longs, peuvent casser les tuiles (à tester à l'intégration).
- Les photographies sont des illustrations Unsplash (non représentatives des hôtels fictifs) ; la photo « sombre », « verticale » et « trop petite » sont dérivées de ces images par recadrage/assombrissement, pas de vraies photos de mauvaise qualité.
- Les états « en cours » et la date sont fictifs ; le calcul réel (fuseau, jours, horaires exceptionnels, minuit) n'est pas implémenté.
- Le message « Lire la suite » est déclenché par une heuristique de longueur dans la maquette ; en production, détecter le débordement réel.
- Aucune météo dans D (retirée volontairement) ; la V1 utilise Open-Meteo (usage non commercial).

## Reproduire

```bash
npm install && (cd design-lab && npm install)
node design-lab/build.mjs d && node design-lab/capture.mjs d-
node design-lab/check-photos.mjs d-photos.html     # contrastes sur photos
node design-lab/check-layout.mjs                   # cibles tactiles, débordements
npx vitest run design-lab                          # jetons et règle photo
```
