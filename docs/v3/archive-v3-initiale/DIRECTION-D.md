# Pristi Guest — Direction D « Refined » (V3)

> État : **maquettes HTML/CSS isolées dans `design-lab/`**. L'application React (`src/`), la V1, les travaux V2 et les concepts A/B/C sont intacts.
> **Pristi Guest est mis en pause après cette livraison** : aucune intégration React, aucune nouvelle fonctionnalité Guest.

## Livrables (captures réelles Playwright, dans ce dossier)

| Fichier | Contenu |
| --- | --- |
| `d-mobile-verriere.jpg` | Maison Verrière : accueil complet, Wi‑Fi, petit-déjeuner, infos pratiques |
| `d-mobile-arolle.jpg` | L'Arolle : mêmes quatre écrans |
| `d-quatre-hotels.jpg` | Même écran d'accueil pour 4 types d'hôtels (boutique urbain, chalet, 3 étoiles, indépendant 2 étoiles) |
| `d-bureau-verriere.jpg`, `d-bureau-arolle.jpg` | Accueil desktop 1440 px |
| `d-jetons-contrastes.jpg` | Jetons dérivés par hôtel + ratios WCAG mesurés |
| `d-comparaison-typo.jpg` | Le même écran avec six appariements typographiques |
| `d-wifi-petitdej-premiers-ecrans.jpg` | Wi‑Fi et petit-déjeuner au premier écran (844 px) |
| `comparaison-a-b-c-d.jpg` | A, B, C, D côte à côte (accueil, Wi‑Fi, petit-déjeuner) |

Sources : `design-lab/concepts/d-refined.mjs`. Régénérer : `node design-lab/build.mjs d && node design-lab/build.mjs d fonts && node design-lab/capture.mjs d-`.

## Recherche complémentaire (réellement faite)

- Captures officielles App Store de **Mr & Mrs Smith** (<https://apps.apple.com/gb/app/mr-mrs-smith-boutique-hotels/id445834586>) et **Nobu** (<https://apps.apple.com/gb/app/nobu/id1529505631>) : fond clair, photos nettes, un vert d'action sobre, texte de description en colonne lisible. Enseignement retenu : la chaleur vient de la **photo + de la sobriété**, pas de la couleur d'interface.
- Recherche web : presets typographiques du « Hotel Studio » de Roam (paire serif titre + sans interface, arrondis/ombres réglables) et étude de cas citizenM (carte contextuelle « prochaine action »). Ce sont des pages éditeur, utilisées comme indications, pas comme spécification.
- Rappel : Behance, Mobbin et Awwwards étaient inaccessibles en V2 ; rien n'a été « vu » de ces sites.

## Typographie : j'ai comparé avant de choisir

Retour reçu : « les polices sont moches ». Les premières maquettes D utilisaient Schibsted Grotesk, que j'ai écartée. J'ai rendu **six appariements** sur le même écran (`d-comparaison-typo.jpg`) : Albert Sans seule, Instrument Serif + Albert, Newsreader + Wix Madefor Text, Wix Madefor Display + Text, Plus Jakarta Sans. (Satoshi/General Sans, de Fontshare, n'a pas été retenue : licence non vérifiée, non incluse.)

**Retenu : Wix Madefor (Display + Text) pour toute l'interface, et Newsreader uniquement pour le mot de l'hôtelier.** Raisons : Wix Madefor est dessinée pour l'interface (chiffres tabulaires nets, bonne lisibilité en petit corps, caractère discret, pas de « look fintech ») ; Newsreader apporte une seule touche humaine, là où la voix de l'hôtel s'exprime. Instrument Serif était élégante mais trop fine en corps 18 px sur mobile ; Plus Jakarta/Albert plus génériques. **Mots de passe en JetBrains Mono** (distinction 0/O et 1/l/I). Toutes sous licence SIL OFL 1.1. C'est un choix de rendu à l'écran ; il reste à valider sur de vrais téléphones (rendu des chiffres, hinting Android).

## Le système D

Ce que l'hôtelier renseigne (6 champs) : **couleur de marque**, **ambiance neutre** (froide / neutre / chaude, = couleur de fond et d'encre), **arrondi** (10 à 18 px), **style du nom** (casse normale ou capitales espacées), **photo d'accueil**, **mot de bienvenue** (+ signature). Tout le reste (teintes, atténué, séparateurs, texte sur marque) est dérivé et ses contrastes sont mesurés (`d-jetons-contrastes.jpg`) : toutes les paires utilisées ≥ 4,6:1.

Composition de l'accueil (identique pour tous) : photo (292 px, pas plein écran) → **carte du mot de l'hôtelier** qui chevauche la photo → **Wi‑Fi + Copier** → **Petit-déjeuner | Départ** → **Réception + Appeler** → « Aujourd'hui à l'hôtel » → services → « Autour de l'hôtel » (photo) → pied discret « Propulsé par Pristi ». Navigation basse à quatre entrées, pastille douce sur l'actif. Aucun noir dominant, aucun cobalt, aucun jaune fluo, aucun contour épais.

### Honnêteté des données
Les heures, la date et les statuts « En cours » sont des **exemples fictifs** : le bandeau « exemple · mer. 08:20 » et les mentions « aujourd'hui · exemple » le disent sur chaque maquette. Aucune météo n'est affichée. En production, les états dynamiques devront être calculés avec **le fuseau horaire de l'hôtel, le jour et ses horaires propres** (jours fériés, horaires exceptionnels, passage minuit).

## Comparaison avec A, B, C

**Objectivement amélioré (par rapport à A, la base)**
- Plus de cobalt/citron/noir : la palette est celle de l'hôtel, avec des teintes douces dérivées ; le contraste agressif a disparu sans perdre la lisibilité (10,9:1 marque/fond à Lyon).
- La même hiérarchie fonctionnelle qu'A (Wi‑Fi copiable, horaires, réception) en **moins de poids visuel** : plus de chiffres géants ; seuls les deux horaires clés sont en gros.
- Le **mot de l'hôtelier** (de C) donne une voix, sans typo fantaisie ni contours.
- La **photo** (de B) cadre l'ambiance sans occuper l'écran, avec un seul recouvrement contrôlé.
- Les quatre exemples montrent un vrai écart d'ambiance (froid/chaud, arrondi 10 → 18 px, nom en capitales), pas un simple changement de couleur.
- Cibles tactiles : Copier 48 px, Appeler 44 px, bouton « Copier le mot de passe » 56 px, onglets 58×30 + libellé.

**Reste discutable**
- Moins mémorable qu'A, B ou C : D est volontairement calme ; le risque est de redevenir « propre mais générique ». Il tient surtout à la qualité des photos et du mot de l'hôtelier.
- Le hero + carte superposée dépend d'un cadrage correct de la photo (testée ici sur 4 photos de qualité variable ; les photos d'hôtels 2 étoiles réelles seront plus difficiles).
- Les listes d'infos restent des accordéons classiques : fonctionnel, pas distinctif.
- La reception n'est visible qu'en bas du premier écran sur 844 px de haut ; sur un iPhone SE (667 px) elle passera sous le pli (Wi‑Fi et petit-déjeuner/départ restent visibles).
- La marque rouge de l'Arolle et le serif sont des choix de goût.

**Pourquoi D s'adapte mieux à plusieurs hôtels** : le système ne contraint que la structure ; l'identité vient de 6 paramètres simples, avec garde-fous de contraste, et d'un texte et d'une photo propres à l'établissement. A imposait son vocabulaire (billet), B sa photo plein écran, C sa palette multicolore : trois esthétiques trop spécifiques pour un 2 étoiles ou un 3 étoiles traditionnel.

## À tester avant toute intégration React
1. **Sur de vrais téléphones** (iPhone SE/15, Android milieu de gamme) : rendu des polices, tailles, pli à 667 px.
2. **Photos réelles d'hôtels modestes** : cadrage du hero, lisibilité du nom sur image, repli sans photo.
3. **Textes longs** : mot de bienvenue de 3× la longueur, noms d'hôtel longs, SSID/mot de passe très longs, horaires multiples.
4. **États dynamiques** : calcul « en cours / fermé / ouvre à… » avec fuseau, jours fériés, horaires exceptionnels ; comportement hors ligne.
5. **Contrastes sur marques imposées** : une couleur de marque trop claire doit être assombrie automatiquement (le garde-fou existe en V1 dans `src/lib/theme.js`).
6. **Lecteur d'écran et navigation clavier**, mode texte agrandi, `prefers-reduced-motion`.
7. **Test utilisateur rapide** : « trouvez le mot de passe Wi‑Fi », « à quelle heure puis-je partir ? » (temps et erreurs).
8. **Desktop** : la vue 1440 px est une version de contrôle ; vérifier 768 et 1024 px.

## Mise en pause
La branche contient maintenant : V1 fonctionnelle (`src/`), V2 (`docs/v2/`, concepts A/B/C dans `design-lab/`) et V3 (`docs/v3/`, concept D). Rien ne sera intégré ni développé côté Guest sans votre accord.
