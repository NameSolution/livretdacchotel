# Pristi Guest — Design system (direction D « Refined »)

Source de vérité visuelle : `design-lab/concepts/d-refined.mjs` (CSS + composants de maquette) et `design-lab/lib/tokens.mjs` (dérivation des jetons, testée). Captures : `docs/v3/captures/`.
Principe : **un seul modèle**, six paramètres par hôtel, tout le reste dérivé.

## 1. Personnalisation par établissement

| Paramètre | Valeurs | Effet |
| --- | --- | --- |
| `brand` | une couleur hexadécimale | fond du bloc Wi‑Fi, boutons d'action, onglet actif, repli sans photo. **Corrigée automatiquement** si le blanc dessus est < 4,5:1 |
| `ambiance` | `froide` · `neutre` · `chaude` | fond de page et encre (voir §3) |
| `radius` | 8 à 20 px (borné) | arrondi de tous les blocs (boutons : `radius − 6`, listes : `radius − 3`) |
| `nameStyle` | `plain` (casse normale, police d'interface) · `caps` (capitales espacées) | affichage du nom de l'hôtel |
| photo d'accueil | image + point focal + dimensions | voir §8 ; sinon repli de marque |
| mot de bienvenue | texte + signataire (nom, rôle) | carte « mot de l'hôtelier » ; 3 lignes max avec « Lire la suite » |

Le reste (teintes, texte atténué, séparateurs, texte de marque) est dérivé par `deriveTokens()` ; ordre des blocs sous les essentiels (aujourd'hui / services / autour) configurable ; langues et contenus par hôtel.

Les quatre exemples (`captures/02…05`) : Maison Verrière (`#1E3A4C`, froide, 18 px), L'Arolle (`#8A2F25`, chaude, 12 px, nom en capitales), Hôtel du Parc (`#24386B`, neutre, 10 px), Beau Séjour (`#2D6A4F`, neutre, 16 px).

## 2. Typographie

| Rôle | Police | Poids | Usage |
| --- | --- | --- | --- |
| Interface et titres | **Wix Madefor Display** (titres, chiffres clés) + **Wix Madefor Text** (texte) | 400–800 ; titres 600 | tout sauf ci-dessous |
| Voix de l'hôtelier | **Newsreader** | 420 | uniquement le mot de bienvenue (seule touche de serif) |
| Données à recopier | **JetBrains Mono** | 600 | mots de passe Wi‑Fi (distinction 0/O, 1/l/I) |

Toutes SIL OFL 1.1, auto-hébergées (`@fontsource-variable/wix-madefor-display`, `…/wix-madefor-text`, `…/newsreader`, `…/jetbrains-mono`), sous-ensemble latin. Six appariements ont été comparés (`captures/15`) ; l'historique du choix est dans `archive-v3-initiale/`.

Échelle (px, téléphone ≥ 360 ; −1 à −3 px sur les valeurs clés à 320) :

| Style | Taille / interligne | Remarques |
| --- | --- | --- |
| Titre de page (H1) | 30 / 1,08 | Display 600, `letter-spacing:-.02em` |
| Titre de section (H2) | 19 / — | Display 600 |
| Valeur clé (horaires) | 20 (17 à 320) | Display 600, chiffres tabulaires, jamais à la ligne |
| Nom de l'hôtel (en-tête) | 21 ; ≥ 27 caractères : 16,5 sur 3 lignes max | `caps` : 16,5 espacé .18em (13,5 si long) |
| Mot de l'hôtelier | 16 / 1,3 (15,5 à 320) | Newsreader, 3 lignes max |
| Corps | 15–15,5 / 1,4–1,5 | |
| Texte secondaire | 12,5–13,5 | couleur `muted`, ≥ 4,5:1 |
| Mot de passe (accueil) | 21 (16,5 à 320 ; 17/14,5 si long) | mono |
| Mot de passe (page Wi‑Fi) | 28 (24 à 320 ; 22/18 si long) | mono, retour à la ligne partout |
| Étiquettes / pastilles | 12–13, poids 650 | |

Règles : jamais moins de 12 px ; chiffres `lining-nums` ; `text-wrap: pretty` sur les paragraphes, `balance` sur les noms ; `overflow-wrap:anywhere` sur SSID, mots de passe, noms et messages (jamais de troncature d'une donnée à recopier).

## 3. Couleurs et contrastes

Jetons (CSS variables) : `--brand` (fond), `--bi` (texte de marque), `--on` (texte sur marque, blanc), `--surface`, `--card` (#FFF), `--ink`, `--muted`, `--line`, `--tint`, `--tint2`.

Ambiances :

| Ambiance | `--surface` | `--ink` |
| --- | --- | --- |
| froide | `#F2F5F5` | `#141A1D` |
| neutre | `#F4F4F1` | `#16181F` |
| chaude | `#F6F2F0` | `#241816` |

Dérivation (`deriveTokens`) : `brand` assombrie vers l'encre jusqu'à 4,5:1 avec du blanc ; `tint = mix(surface, brand, 8,5 %)`, `tint2 = mix(surface, brand, 16 %)` ; `--bi` = marque assombrie jusqu'à 4,5:1 sur fond, carte, teinte et teinte forte ; `muted = mix(ink, surface, 33 %)` renforcé jusqu'à 4,5:1 sur fond, carte et teinte ; `line = mix(ink, surface, 86 %)`. Testé sur 9 marques (dont des jaunes et du blanc) × 3 ambiances (`design-lab/lib/tokens.test.js`). Planche : `captures/14`.

Texte sur photographie : toujours blanc, sur dégradé noir (`rgba(8,12,14,.66)` en haut → `.52` à 96 px → `.14` à 70 % → `.2`), pastilles `rgba(10,14,16,.64)`. Mesuré : ≥ 4,9:1 (`VERIFICATION.md`).

## 4. Espacements et grille

| Élément | Valeur |
| --- | --- |
| Marge latérale | 20 px (16 px si largeur < 360) |
| Écart entre blocs prioritaires (Wi‑Fi, paire, réception) | 10 px |
| Écart entre sections | 26 px (24 px pour les sections de pages intérieures) |
| Rayon des blocs | `--r` (8–20) ; chips et boutons d'action en pilule (99 px) |
| Carte du mot de l'hôtelier | chevauche la photo de 34 px, padding 11/14 |
| Hauteur de l'en-tête photo | 176 px (écran ≤ 700 px de haut), 228 px au-delà ; production : `clamp(176px, 27svh, 240px)` |
| Barre de navigation | 4 colonnes ; pastille 58×30, libellé 12 px ; hauteur 62–76 px selon la zone de sécurité |
| Zones tactiles | ≥ 44 px de haut (mesuré) ; boutons Copier 48, Copier le mot de passe 56 |
| Ombres | une seule, très légère, sous la carte du mot de l'hôtelier ; aucune ailleurs |

Pas de dégradés décoratifs, pas de verre dépoli, pas de contours épais.

## 5. Composants

Toutes les vues reposent sur ces blocs (noms des classes de maquette entre parenthèses) :

1. **En-tête photo** (`hero`) : photo + dégradé, nom de l'hôtel (`wm`) à gauche, sélecteur de langue (`lang`, 44 px de haut) à droite. Variante **repli de marque** (`hero fb`, §8). Pages intérieures : barre de retour (`tb`) avec bouton rond 44 px.
2. **Mot de l'hôtelier** (`welcome`) : avatar-initiale 26 px, « Nom · Rôle », message serif, « Lire la suite » si > 150 caractères (heuristique de maquette ; en production : test de débordement).
3. **Carte Wi‑Fi** (`wifi`) : fond marque ; libellé + SSID (peut passer à la ligne), mot de passe mono, bouton **Copier** blanc. Page dédiée (`wcard`) : même carte en grand + bouton pleine largeur + étapes + carte QR.
4. **Paire d'infos** (`pair`/`info`) : deux tuiles teintées (petit-déjeuner, départ) : icône + libellé, valeur Display, sous-texte (2 lignes max).
5. **Réception** (`reception`) : icône, horaires, bouton **Appeler** (pilule marque, 44 px ; icône masquée < 360 px).
6. **Aujourd'hui** (`today`) : liste horaire + pastille d'état. **Chaque état est calculé** (voir `HANDOFF-INTEGRATION.md`) ; la maquette affiche « exemple · mer. 08:20 ».
7. **Services** (`svc`) : grille 2 colonnes de pastilles blanches icône + libellé (54 px min).
8. **Autour de l'hôtel** (`near`) : carte photo avec légende sur dégradé ; **variante sans photo** : ligne carte avec icône (`near nop`).
9. **Pied de page** (`foot`) : « Propulsé par Pristi » discret + mention de démo.
10. **Navigation** (`nav`) : Accueil · Découvrir · Infos · Réception ; actif = pastille teintée + libellé marque.
11. **Pages** : titre + chapeau ; **horaires** (`hours`, ligne du jour mise en avant) ; **prix** (`prices`) ; liste à coches (`buf`) ; **note** (`note`) ; **faits** (`facts`, pastilles) ; **accordéon** (`acc`, ligne ≥ 60 px) ; **urgences** (`sos`, 4 numéros) ; **chips** de catégories (44 px) ; **état vide** (`empty`).
12. **Bureau** : barre de nav haute (nom à gauche, 4 liens, langue), grille 1,5 fr / 1 fr (photo + mot de l'hôtelier ; colonne d'essentiels), puis services et « autour », marges 120 px sur 1440.

## 6. Comportements responsive

| Largeur | Comportement |
| --- | --- |
| 320–359 | marges 16 ; valeurs clés −3 px ; mots de passe réduits (16,5 px) ; bouton Appeler sans icône ; libellés nav 11,5 px |
| 360–430 | gabarit nominal |
| 768 (tablette) | **non maquetté** : prévoir la disposition mobile centrée, largeur max ≈ 640 px — à valider |
| ≥ 1024 | disposition bureau (§5.12) ; **vérifiée à 1440 uniquement** (1024 à valider) |
| Hauteur 667 | en-tête photo 176 px, barre d'état 24 px, zone de sécurité réduite : Wi‑Fi, petit-déjeuner, départ et réception tiennent entièrement au premier écran dès 320×667 |

La maquette utilise des container queries (`@container (max-width:359px)`) ; en production on peut les conserver ou les remplacer par des media queries.

## 7. Interactions principales

- **Copier le mot de passe** : un geste ; états `idle` → `copied` (bouton « Mot de passe copié », coche, annonce `aria-live`, retour au bout de ~2,6 s) ; `failed` (mot de passe sélectionné + message « appuyez longuement »). Voir `captures/10`.
- **Appeler** : `tel:` direct (réception, urgences). **E‑mail** : `mailto:`.
- **Navigation basse** : 4 destinations permanentes ; retour par bouton « ← » sur les pages intérieures ; liens profonds `?go=<rubrique>` ouvrent l'accordéon.
- **Langue** : feuille modale (focus piégé, Échap) ; les langues partielles sont signalées.
- **QR Wi‑Fi** : visible sur la page Wi‑Fi (carte « Un autre appareil ? »).
- **Animations** : fondu d'entrée de page 280 ms, ouverture des accordéons, feuille modale ; aucune animation continue ; tout désactivé avec `prefers-reduced-motion`.

## 8. Photographies

**Règle de recevabilité** (`photoUsable`) : côté court ≥ 800 px, côté long ≥ 1200 px, rapport largeur/hauteur entre 0,6 et 2,4, dimensions renseignées. Sinon, ou si la photo est absente ou ne se charge pas : **repli de marque** (fond `--brand`, nom, ligne « type · ville », monogramme en filigrane à 10 %, même hauteur que l'en-tête photo : aucun décalage de mise en page).

Autres règles :
- Fournir un **point focal** (`object-position`) et un texte alternatif ; cadrage `object-fit: cover`.
- Formats WebP 640 et 1280 de large (≤ ~200 Ko), sources d'origine conservées ; ne jamais agrandir une image.
- Pas de texte, logo ni filigrane incrusté ; le nom de l'hôtel est toujours du texte.
- Le dégradé garantit la lisibilité sur photo sombre ou claire (mesuré, `captures/08`) ; il n'est pas un effet décoratif.
- Photos de petit-déjeuner et « autour » : mêmes règles ; absentes → en-tête teinté avec icône (petit-déjeuner) ou ligne sans photo (autour).
- Droits : l'hôtelier garantit détenir les droits ; les photos de démo sont des illustrations Unsplash (voir `/credits`).

## 9. États vides, chargement, erreur

- **Chargement** : squelette aux formes des blocs (teinte `--tint2`), sans animation obligatoire (shimmer facultatif, coupé en `prefers-reduced-motion`).
- **Rubrique vide** : carte pointillée, icône, titre, phrase d'explication, bouton « Appeler la réception ».
- **Donnée absente** : le champ est masqué (pas de « — »), jamais de valeur inventée.
- **Photo absente / illisible / trop petite** : repli de marque (§8).
- **Copie impossible** : message + mot de passe sélectionné.
- **Hors ligne / API en échec** : à définir à l'intégration (voir la passation) ; la maquette ne le couvre pas.
