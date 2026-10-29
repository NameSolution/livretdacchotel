# Pristi Guest — V2 : trois directions graphiques

> État : **recherche et maquettes uniquement**. L'application (`src/`) n'a pas été modifiée. Rien n'est remplacé avant votre choix.
> Branche : `claude/pristi-guest-visual-overhaul-33ad29` (aucun toucher à `main`, aucun déploiement, aucun service payant).

## 1. Ce que la recherche a réellement permis de voir

Méthode : recherche web, puis ouverture des pages avec Playwright (Chromium) et lecture des captures. Les images d'apps proviennent de l'API publique de l'App Store (captures officielles des éditeurs, c'est-à-dire des visuels **soignés par les marques**, pas des sessions d'utilisation que j'aurais enregistrées moi-même : je n'ai installé ni lancé aucune app).

| Source demandée | Résultat |
| --- | --- |
| Dribbble | Accessible : page de tag `concierge-app`, plusieurs « shots » ouverts. Surtout des concepts de réservation, beaucoup en verre dépoli. |
| Behance | **403** (bloqué). Seuls les extraits de résultats de recherche ont été lus, aucune page de projet vue. |
| Mobbin | **Inaccessible** (connexion requise, page 404 en accès libre). |
| Awwwards | **502** (erreur serveur), rien vu. |
| Figma Community | Résultats visibles ; uniquement des kits de réservation génériques (« Hotel hub », « Grand Hotel UI kit »…), écartés. |
| 21st.dev | Page d'accueil chargée ; aucune composition hôtelière mobile examinée. Non utilisée comme source. |
| SuitePad | Page BYOD chargée mais masquée par un bandeau cookies ; pas de démo visible. |
| Guestnet | Page chargée (titre seul vérifié), non analysée. |
| Touch Stay | **Un guide voyageur réel** consulté sur mobile (les deux autres démos sont bloquées par Cloudflare) + page d'exemples. |
| Duve | Page produit chargée (visuel marketing du guest app) ; pas de démo publique. |

### 1.1 Références retenues (5)

Planche : [`references/references-retenues.jpg`](references/references-retenues.jpg)

| # | Référence (URL exacte) | Ce qui fonctionne | Hiérarchie et navigation | À en retenir pour Pristi Guest |
| --- | --- | --- | --- | --- |
| 1 | **Soho House** — <https://apps.apple.com/us/app/soho-house/id670256744> | L'écran d'accueil est une **photo pleine largeur qui porte l'état du moment** : « Checked in to Soho House New York — Open until 3am », deux boutons en pilule. Le reste est un panneau clair de contenu daté (« What's on », réservations à venir). | État → action → agenda. Onglets textuels en haut des listes (Tables / Events / Bedrooms…). | Une **ligne d'état vivante** plutôt qu'un slogan ; un agenda daté ; la photo sert à situer, pas à décorer. |
| 2 | **Four Seasons** — <https://apps.apple.com/us/app/four-seasons/id980069965> | Écran « Manage stay » : photo + nom de l'établissement + dates, puis **rangée de quatre raccourcis** (réservation, transport, attentions, itinéraire). L'itinéraire est une **frise par jour** avec cartes horaires. Capitales espacées pour les libellés. | Séjour en cours > actions > détail ; interface sombre cohérente. | La **frise du jour** ; une rangée d'actions courtes ; des libellés typographiés (petites capitales) distincts du texte courant. |
| 3 | **Dis-loyalty (Ennismore : Hoxton, Mama Shelter…)** — <https://apps.apple.com/us/app/dis-loyalty/id6496283156> | Chaque écran est un **champ de couleur saturé** (violet, rose, jaune, orange, brun) ; wordmark en script ; photo encadrée dans la couleur. Barre de 5 onglets avec libellés. | Un message par écran ; la couleur fait l'identité. | La couleur comme **identité de marque** (pas un beige neutre) ; un ton de voix ; l'écriture manuscrite/script en accent. |
| 4 | **Experience Baha Mar** — <https://apps.apple.com/us/app/experience-baha-mar/id1380832241> | **Barre flottante en pilule** (Home, Offers, Spa, Dine, More) à portée de pouce ; page restaurant avec **puces Breakfast / Lunch / Dinner** au-dessus de grandes cartes photo ; grille de tuiles photo + libellé. | Service > période > carte. | Les **puces par période** pour le petit-déjeuner/restauration ; la barre flottante ; les tuiles à libellé intégré. |
| 5 | **Marriott Bonvoy — écrans « pendant le séjour » (W Bali)** — <https://apps.apple.com/us/app/marriott-bonvoy-book-hotels/id455004730> | Carte « Enjoy your stay! » : dates, chambre, puis **boutons ronds** (demander un service, message, commander) ; section « While You're Here » en vignettes (Dining / Fitness / Spa). | Information de séjour séparée des actions ; actions en rond, lisibles. | Les **actions rondes** à une main ; la séparation « ce qu'il faut savoir / ce que je peux faire ». |

### 1.2 Autres références consultées (non retenues)

Planche : [`references/references-vues.jpg`](references/references-vues.jpg). Touch Stay (guide réel : photo plein cadre, « Continue », météo, barre Home / Info / Assistant — fonctionnel mais générique, aucun parti pris graphique), Duve (maquette de marketing), Airbnb (services, voyages), Rosewood Mayakoba (menu de tuiles « majordome »), Tablet Hotels, Radisson, Six Senses (App Store), concepts Dribbble (« in-room app » de Bymah, « WoodNest » de Nixtio, « AI Travel Planner » d'Imra : verre dépoli, dégradés, c'est précisément le style générique à éviter), et les sites mobiles de 25hours, Ace, Aman, citizenM, Generator, Hoxton, Mama Shelter et Soho House (identités de marque ; vus à travers leurs bandeaux cookies).

**Constat transversal** : les guides de séjour du marché (Touch Stay, Duve, SuitePad) sont fonctionnels et génériques. Les apps qui ont une vraie identité (Dis-loyalty, Soho House, Baha Mar) l'obtiennent par **une couleur assumée, un ton de voix, et l'état du moment affiché en tête**, pas par une jolie photo posée sur un fond beige.

## 2. Critique précise de la V1

Comparaison : [`comparaison-v1-vs-a-b-c.jpg`](comparaison-v1-vs-a-b-c.jpg) (les deux colonnes de gauche sont la V1).

1. **Recette « luxe minimal » générique** : fond ivoire `#F7F6F2`, titres serif, accent vert ou terracotta. C'est le rendu que produisent par défaut les templates et les générateurs. Aman, par exemple, utilise cette même grammaire.
2. **Tic typographique répété** : chaque H1 est « roman + un mot en italique coloré » (« *Maison Verrière* », « *du chalet* », « *à la française* »). Une fois, c'est élégant ; sur toutes les pages, c'est une formule.
3. **L'accueil est un document, pas un produit** : photo rectangulaire, titre, puis un tableau à filets. Les quatre accès (Wi-Fi, petit-déjeuner, départ, réception) ont le **même poids visuel** alors que leur urgence diffère.
4. **Partout des filets et des listes** : infos, services, découvrir, index. Rythme monotone, pas d'échelle de taille marquée, une seule couleur d'accent.
5. **Photos « plaquées »** : rectangles à coins de 4 px, sans lien avec la typographie ni la couleur ; les photos de banque d'images imposent leur propre ton.
6. **Les deux hôtels sont le même hôtel** : même structure, même ordre, mêmes blocs ; seules la couleur et la photo changent (voir la comparaison). La personnalisation « par paramètres » est restée cosmétique.
7. **Aucune notion de moment** : rien n'indique que le petit-déjeuner est ouvert *maintenant* ou que le départ est *aujourd'hui*.
8. **Bureau en 5/7 avec grande photo fixe** : le gabarit de split-screen le plus courant.
9. **Navigation standard** : quatre onglets à icônes filaires.

À **conserver** : la copie du mot de passe (avec repli), le QR, les liens profonds, le multilingue, la logique de données, les tests, l'accessibilité de base.

## 3. Les trois directions

Planches : [A](concepts/a-billet-planche.jpg) · [B](concepts/b-sequence-planche.jpg) · [C](concepts/c-souvenir-planche.jpg). Chaque planche montre l'accueil, l'accès aux essentiels (sur l'accueil), le Wi-Fi, le petit-déjeuner, et **le même système appliqué à l'autre hôtel**. Écrans individuels dans [`concepts/`](concepts/). Sources : [`design-lab/`](../../design-lab).

### A — « Billet » : le séjour comme un billet d'embarquement

- **Idée** : l'information utile est l'image. Un « billet » cobalt porte trois heures géantes (fin du petit-déjeuner, départ, réception), sous lui une carte Wi-Fi à copier, puis la frise « Aujourd'hui ».
- **Identité** : champ de couleur saturé par hôtel (cobalt pour Lyon ; vert sapin + ambre pour Chamonix, avec un motif de courbes de niveau), fond gris-lilas froid (plus d'ivoire), encre quasi noire, un seul « pop » (citron / ambre).
- **Typographie** : Bricolage Grotesque (titres, chiffres, largeur variable) + Instrument Sans (texte) + Geist Mono (étiquettes, heures, mots de passe).
- **Photographie** : bandeau en **bichromie** aux couleurs de l'hôtel (elle devient un motif de marque, quelle que soit la qualité de la photo d'origine) ; la photo du petit-déjeuner reste en couleurs naturelles (appétence).
- **Navigation** : dock flottant noir à quatre entrées, l'onglet actif se déploie en pilule citron avec son libellé.
- **Forces** : meilleure ergonomie (hiérarchie claire, Wi-Fi copiable depuis l'accueil, heures lisibles à un mètre) ; robuste face à des photos médiocres ; très reconnaissable ; se décline facilement en tokens (couleur de champ, pop, motif).
- **Faiblesses** : peut évoquer une app de transport ou de fintech plutôt qu'une maison d'accueil ; cobalt + citron est une mode actuelle (risque de datation) ; moins chaleureux pour un hôtel de charme sans le mot du patron ; certaines micro-étiquettes mono sont à 10 px dans la maquette (plancher de 11–12 px en production).

### B — « Séquence » : le livret comme une scène de film

- **Idée** : la photo occupe tout l'écran ; un **tiroir** ancré dans la zone du pouce porte la navigation (onglets Séjour / Découvrir / Infos / Réception), l'état « en cours », quatre actions rondes et « Ce soir ».
- **Identité** : nuit + une seule couleur d'action (orange braise pour le chalet, iris pour la ville), tiroir gris neutre.
- **Typographie** : Archivo condensé en capitales (titres d'affiche) + Hanken Grotesk.
- **Photographie** : structurelle (la scène change d'une page à l'autre) ; dégradé uniquement là où il sert la lisibilité.
- **Navigation** : tiroir à poignée, plus de barre d'onglets ; actions rondes (réf. Marriott), ligne d'état vivante (réf. Soho House).
- **Forces** : première impression la plus « haut de gamme » ; accès aux actions à une main ; le titre en affiche donne du caractère.
- **Faiblesses** : **dépend entièrement de la qualité des photos de l'hôtel** (et c'est précisément le point faible des banques d'images) ; texte sur photo à surveiller en contraste ; geste de tiroir (accessibilité clavier/lecteur d'écran, états déployé/réduit) plus coûteux à construire ; la structure « photo + tiroir » est la même pour tous les hôtels — la différence passe presque uniquement par la photo.

### C — « Souvenir » : un carnet de séjour qui a une voix

- **Idée** : le livret parle comme l'hôtelier. Carte postale, **mot manuscrit du patron**, tuiles à contour encre — une couleur par service —, étiquette de bagage pour le Wi-Fi, menu façon brasserie pour le petit-déjeuner.
- **Identité** : palette propre à chaque hôtel (bleu poudre + tomate/moutarde/pin pour le chalet ; rose + cobalt/citron vert pour la ville), contours et ombres décalées.
- **Typographie** : Caprasimo (titres) + Figtree (texte) + Caveat (mot du patron).
- **Photographie** : petite et **fonctionnelle** : carte postale, assiette ronde, vignette.
- **Navigation** : barre à quatre onglets avec pastille colorée sur l'onglet actif.
- **Forces** : la plus distinctive et la plus humaine ; le moins « template » ; les couleurs par service aident à scanner ; peu de dépendance aux photos ; deux hôtels réellement différents.
- **Faiblesses** : trop ludique pour un hôtel haut de gamme classique ; exige une vraie palette par hôtel (cinq couleurs à valider en contraste) ; risque de kitsch si la typographie et le ton ne sont pas maîtrisés ; texte manuscrit à fournir par l'hôtel.

### 3.1 Contrastes mesurés (WCAG, ratio texte/fond)

Mesurés sur les teintes réelles des maquettes.

| Paire | Ratio | Verdict |
| --- | --- | --- |
| A · blanc sur cobalt `#2B3BF5` | 6,9 | AA |
| A · encre sur citron `#D9FF4F` | 17,0 | AA |
| A · gris `#5B5E75` sur `#E9EAF0` | 5,3 | AA |
| A · blanc sur vert `#0F3B2F` / encre sur ambre `#FFB938` | 12,5 / 11,0 | AA |
| B · blanc sur orange `#FF5A1F` | **3,1** | **échec en petit texte** → maquette corrigée : texte encre sur orange (6,0) |
| B · blanc sur iris `#6A4CFF` | 5,1 | AA |
| B · gris `#656A66` sur `#F2F2EF` | 4,9 | AA |
| C · blanc sur tomate `#E5482D` | **4,0** | **échec en petit texte** → maquette corrigée : tomate `#CF3A1E` (4,9) |
| C · encre sur moutarde / rose / citron vert | 9,2 / 9,9 / 11,3 | AA |
| C · blanc sur cobalt / pin | 7,9 / 7,6 | AA |

## 4. Pourquoi ces propositions ne reproduisent pas la V1

| | V1 actuelle | A · Billet | B · Séquence | C · Souvenir |
| --- | --- | --- | --- | --- |
| Fond | Ivoire | Gris-lilas froid + champ cobalt/vert | Photo plein cadre + tiroir gris | Couleur saturée par écran |
| Titres | Serif + italique coloré | Grotesque variable, chiffres géants | Condensé capitales d'affiche | Serif gras rétro |
| Message n° 1 de l'accueil | Photo + titre | **Les heures** | **La scène + l'état du moment** | **La voix de l'hôtelier** |
| Accès essentiels | Tableau à filets | Billet à 3 talons + carte Wi-Fi | 4 actions rondes dans le tiroir | Tuiles colorées, Wi-Fi en bandeau |
| Navigation | 4 onglets filaires | Dock flottant, onglet en pilule | Tiroir à onglets | Onglets à pastille |
| Rôle de la photo | Rectangle décoratif | Motif de marque (bichromie) | Structure de l'écran | Carte postale / assiette |
| Deux hôtels | Même mise en page | Même système : couleur, motif, photo | Même système : photo, accent | Même système : palette de 5 couleurs |
| Notion de moment | Aucune | Frise « Aujourd'hui », « Ouvert » | Ligne d'état, « En cours » | Pastille « en cours » |

## 5. Recommandation : A, enrichie de deux idées de B et C

**Je recommande la direction A (« Billet »)**, pour trois raisons :

1. **Elle règle le vrai problème produit** : le voyageur scanne un QR code et cherche une heure ou un mot de passe. A est la seule où l'information utile *est* la composition ; B et C la rendent plus belle mais pas plus rapide à lire.
2. **Elle supporte des photos moyennes**, ce qui est la réalité d'un SaaS vendu à des hôtels indépendants. B s'effondre sans de belles photos ; A transforme n'importe quelle photo en motif de marque.
3. **Elle se décline sans changer le gabarit** : un hôtel choisit son champ de couleur, son « pop », un motif (courbes de niveau, rayures, aucun) et la largeur de sa typographie ; le contraste est calculé automatiquement comme en V1.

Deux emprunts à intégrer pour corriger ses faiblesses : de **B**, la **ligne d'état vivante** (« poêle allumé · −3 °C ») qui réchauffe le ton ; de **C**, le **mot manuscrit de l'hôtelier** (une signature) qui lui donne une voix. Si votre cible est plutôt « hôtel de charme / lifestyle », C est l'alternative la plus audacieuse ; si elle est « haut de gamme avec photographie professionnelle », B devient crédible.

**Ce que A ne dit pas encore** : un état « ouvert maintenant » exige l'horloge locale du téléphone et les horaires de l'hôtel (aucun backend nécessaire, tout est déjà dans les données), mais il faut définir les cas limites (fuseau horaire, jours fériés, horaires exceptionnels).

## 6. Si vous validez une direction

Je conserve : données, i18n (clés `guest.*`), copie Wi-Fi + QR, tests, outillage de QA. Je remplace : styles, tokens (champ, pop, motif, largeur de titre), pages Accueil / Wi-Fi / Petit-déjeuner / Infos / Découvrir / Réception, navigation, et le responsive bureau. Chaque étape sera comparée aux références retenues, avec captures mobile et bureau.

**Points à trancher avant de commencer** : la direction (A, B, C ou un hybride précis), la palette de départ des deux hôtels, et si le mot de l'hôtelier (signature) doit être prévu dans les données.
