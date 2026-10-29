# Pristi Guest — passation pour l'intégration future de la direction D

> **Pristi Guest est en pause.** Ce document décrit comment reprendre le travail plus tard ; il n'engage aucune intégration maintenant. Aucun backend, compte, abonnement ni éditeur hôtelier n'a été développé.
> **Réserve importante** : je n'ai pas lu le dépôt `NameSolution/pristi` (hors périmètre, non touché). La section 8 repose donc sur des hypothèses génériques de SaaS multi-hôtels, **à confronter à l'architecture réelle** avant toute décision.

Deux livrables coexistent, volontairement distincts :

| | Où | Statut |
| --- | --- | --- |
| **Prototype fonctionnel V1** (React/Vite/Tailwind) | `src/`, `scripts/`, `public/` | fonctionnel, testé (57 tests, QA scripté), design « ivoire + serif » **à remplacer** |
| **Direction D** (maquettes HTML/CSS) | `design-lab/concepts/d-refined.mjs`, `design-lab/lib/tokens.mjs`, `docs/v3/` | validée, **non intégrée** |

## 1. Composants React existants à conserver

| Élément | Fichier | Pourquoi |
| --- | --- | --- |
| Copie presse-papiers + repli | `src/lib/clipboard.js` (+ test) | logique éprouvée (API Clipboard puis `execCommand`, sinon échec signalé) |
| Charge utile QR Wi‑Fi + génération différée | `wifiPayload` et `WifiQr` dans `src/pages/Wifi.jsx` (+ test d'échappement) | bug d'antislash déjà corrigé ; `qrcode` chargé à la demande |
| Formats et liens | `src/lib/format.js` (`formatTime`, `formatRange`, `telHref`, `mapsHref`) | heures par langue (24 h / am‑pm), liens `tel:` et itinéraire |
| Sélecteurs | `src/lib/selectors.js` (+ test) : `breakfastToday`, `findInfo`, `indexEntries`, `placesByCategory` | à étendre, pas à réécrire |
| i18n | `src/i18n/` (+ test de parité fr/en) | clés stables `guest.*`, repli langue → anglais → français |
| Contexte hôtel + liens qui conservent `?hotel=` | `src/lib/hotel-context.jsx` | utile en prévisualisation ; en SaaS, remplacer la source de données (§8) |
| Feuille modale (langue, fiche lieu) | `src/components/ui/Sheet.jsx` (Radix Dialog) | focus piégé, Échap, ARIA |
| Accordéon | `src/components/ui/Disclosure.jsx` (Radix Accordion) | accessibilité acquise ; restyler seulement |
| Gestion de page | `ScrollManager.jsx`, `Page.jsx` (`useDocumentTitle`), `PreviewBar.jsx` (dev) | retour en haut + focus du contenu ; barre de bascule réservée à la préversion |
| Outillage de test | `scripts/qa.mjs`, `scripts/interactions.mjs`, Vitest | à adapter aux nouveaux sélecteurs |

## 2. Composants à remplacer par le design D

| V1 | Remplacer par (maquette D) |
| --- | --- |
| `pages/Home.jsx` (photo + titre + tableau à filets) | accueil D : en-tête photo ou repli, mot de l'hôtelier, bloc Wi‑Fi, paire petit-déjeuner/départ, réception, « Aujourd'hui », services, « autour » |
| `components/layout/Shell.jsx`, `Aside.jsx`, `TopBar.jsx`, `BottomNav.jsx`, `nav.js`, `PageFooter.jsx` | barre basse D (pastille teintée), barre de retour des pages intérieures, bureau = barre haute + grille 1,5 fr / 1 fr (**plus de colonne photo fixe**) |
| `components/ui/Photo.jsx` | ajouter `photoUsable` + repli de marque + hauteurs d'en-tête (`design-lab/lib/tokens.mjs`) |
| `pages/Wifi.jsx` (mise en page), `Breakfast.jsx`, `Info.jsx`, `Contact.jsx`, `Discover.jsx` | mises en page D ; conserver la logique (copie, deep links `?go=`, onglets, fiche lieu) |
| `lib/theme.js` (+ `theme.test.js`) | `deriveTokens` de `design-lab/lib/tokens.mjs` (marque + ambiance + arrondi) ; porter ses tests |
| Titres `<em>` colorés (`Rich.jsx`) | supprimer : D n'a plus le « mot en italique » |
| `components/WeatherNote.jsx` | **retirer** de l'accueil (D n'affiche pas de météo) ; réintroduire plus tard seulement avec un fournisseur autorisé commercialement (Open‑Meteo est non commercial) |
| `pages/Credits.jsx`, `data/credits.js` | conserver pour les photos de démo, supprimer en production |

## 3. Styles et jetons à transférer

1. **Polices** : remplacer `@fontsource-variable/fraunces` et `dm-sans` par `wix-madefor-display`, `wix-madefor-text`, `newsreader`, `jetbrains-mono` (SIL OFL, déjà installés dans `design-lab/`). Mettre à jour `tailwind.config.js` (`fontFamily`).
2. **Variables CSS** posées au montage depuis `deriveTokens` : `--brand`, `--bi`, `--on`, `--surface`, `--card`, `--ink`, `--muted`, `--line`, `--tint`, `--tint2`, `--r`. Couleurs Tailwind = `rgb(var(--x) / <alpha-value>)` comme en V1 (convertir les hex en canaux).
3. **Valeurs de CSS** à reprendre telles quelles depuis `d-refined.mjs` (bloc `css`) : échelles de taille (`docs/v3/DESIGN-SYSTEM.md` §2), marges (20/16 px), écarts (10/26 px), hauteurs d'en-tête (`clamp(176px, 27svh, 240px)`), dégradés de lisibilité, tailles de cibles.
4. **Mapping des classes** : `wm`→nom, `welcome`, `wifi`, `pair`/`info`, `reception`, `today`, `svc`, `near`, `nav`, `hours`, `prices`, `buf`, `note`, `facts`, `acc`, `sos`, `chips`, `empty`, `hero fb`.
5. **Garder** `prefers-reduced-motion`, `:focus-visible`, `text-wrap`, `overflow-wrap:anywhere`.
6. Supprimer `Fraunces`, `.display em`, `.eyebrow` majuscules, `.page-enter` si non voulu.

## 4. Données des hôtels

Le schéma V1 (`src/data/hotels/verriere.js`, `arolle.js`) est conservé ; modifications nécessaires :

| Champ | Changement |
| --- | --- |
| `theme` `{accent, paper, ink, display}` | → `{brand, ambiance: 'froide'\|'neutre'\|'chaude', radius, nameStyle: 'plain'\|'caps'}` |
| `welcome.title`, `welcome.signature` | supprimer `title` ; → `welcome.message` + `welcome.signer {name, role, mono?}` |
| `images.hero` | exiger `w`, `h` (dimensions d'origine) et `pos` (point focal) ; photo facultative |
| `aside`, `images.*` multiples | `aside` supprimé (plus de colonne photo) ; photos facultatives pour petit-déjeuner et lieux |
| `home.sections` | ne contrôle plus que l'ordre de « Aujourd'hui », « Services », « Autour » (les 4 essentiels sont fixes) |
| `weather` | retiré tant qu'aucun fournisseur autorisé n'est choisi |
| **à ajouter** `timezone` | IANA (ex. `Europe/Paris`) : **indispensable** au calcul des états |
| **à ajouter** horaires structurés | chaque service/ligne « aujourd'hui » doit porter `{weekdays, from, to}` (déjà le cas de `breakfast.hours`) + exceptions datées ; `stay.checkOut` |
| `contact.shortHours`, `contact.always` | conservés |

Les quatre établissements de démonstration de D (`HOTELS` dans `d-refined.mjs`) peuvent être convertis en fichiers de données React ; `longue` sert de **jeu d'essai de contenus longs** (à garder dans les tests).

### États dynamiques (« en cours », « ouvre à… »)
Maquette : valeurs fictives (mer. 08:20). À implémenter : `now` converti dans `timezone`, jour de semaine local, plage applicable (comme `breakfastToday`), exceptions (fermetures, jours fériés), passage minuit, état `fermé / ouvre à 7:00 / en cours / dernier service`. Tests de table obligatoires (§7).

## 5. Multilingue

- Conserver `src/i18n/` et la convention `guest.*` ; fr et en **complets**, es/it/de/pt/pl **interface seulement** (statut affiché dans le sélecteur).
- Clés à **ajouter** pour D : `guest.welcome.from` (« {name} · {role} »), `guest.welcome.readMore`, `guest.today.title`, `guest.today.example` (démo uniquement), `guest.state.inProgress`, `guest.state.closed`, `guest.state.opensAt`, `guest.state.loading`, `guest.empty.title`, `guest.empty.body`, `guest.empty.call`, `guest.wifi.copiedAnnounce`, `guest.quick.*` (libellés de la paire), `guest.photo.fallbackKind`. Les clés V1 de l'accueil (`guest.home.essentials`…) restent utilisables.
- Les contenus propres à l'hôtel restent des objets `{fr, en, …}` avec repli (`localize`). **Tester allemand et polonais** (textes ~20–30 % plus longs).
- Heures : `formatTime` gère 24 h / am‑pm ; ajouter les langues à l'AM/PM si besoin.

## 6. Préserver Wi‑Fi, QR, navigation

- **Wi‑Fi** : garder `copyText` et ses trois états ; la maquette D donne les rendus `copied` et `failed` (`captures/10`). Annonce `aria-live` du succès. Mot de passe jamais tronqué (`overflow-wrap:anywhere`).
- **QR** : garder `wifiPayload` (échappement `\ ; , : "`) ; D l'affiche en permanence dans une carte (V1 : accordéon).
- **Navigation** : routes V1 inchangées (`/`, `/wifi`, `/petit-dejeuner`, `/infos`, `/decouvrir`, `/reception`) ; liens profonds `?go=` et `?cat=&place=` ; `useBack` ; `ScrollManager` (focus sur `<main>`). La barre basse D remplace le style, pas le routage. Conserver le lien d'évitement et `aria-current`.
- Langue : `LanguageSheet` + `Sheet`.

## 7. Tests indispensables après intégration

1. Reporter `design-lab/lib/tokens.test.js` (contrastes de 9 marques × 3 ambiances, `photoUsable`) dans `src/lib/`.
2. **Calcul des états** : tests de table (fuseau ≠ UTC, changement d'heure, minuit, jour férié, horaires exceptionnels, service sans horaire → masqué).
3. Reprise des tests V1 (`clipboard`, `selectors`, `i18n`, QR) ; `scripts/interactions.mjs` (copie, QR, langue, accordéons, fiche lieu, bascule d'hôtel) adapté aux nouveaux libellés.
4. `scripts/qa.mjs` : 320, 375, 390, 430, 768, 1024, 1440 ; zéro débordement, zéro erreur console, cibles ≥ 44 px ; porter `design-lab/check-layout.mjs`.
5. Contraste sur photo : porter `design-lab/check-photos.mjs` (cas sombre, clair, verticale, petite, absente) ; seuil 4,5:1.
6. Contenus longs (`longue`), messages > 3 lignes, SSID et mots de passe de 38 caractères, noms de 50+ caractères.
7. Pièges de la maquette qui n'a pas été testée : **lecteur d'écran** (VoiceOver/TalkBack), **navigation clavier**, zoom texte 200 %, `prefers-reduced-motion`, mode sombre du système (non conçu en D : forcer le thème clair ou le concevoir).
8. **Appareils réels** (iPhone SE/15, Android milieu de gamme) : polices, barre d'URL, zone de sécurité, lecture du QR par l'appareil photo.
9. Performance : poids de l'accueil (polices ≈ 4 sous-ensembles latins, photos 640/1280 WebP), LCP de l'en-tête.

## 8. Adaptations pour le SaaS (`NameSolution/pristi`) — hypothèses à valider

*Non vérifié contre le dépôt principal.* Pistes génériques :

1. **Résolution de l'hôtel** : le QR code de la chambre pointe vers `…/{slug}` (ou un sous-domaine) ; remplacer le registre local `src/data/hotels/index.js` et `?hotel=` par un chargeur `getHotelBySlug(slug)` (API ou JSON publié), avec un état de chargement (squelette D) et d'erreur.
2. **Contrat de données** : le schéma du §4, versionné (`schemaVersion`), validé côté serveur ; les champs facultatifs absents sont masqués.
3. **Thème** : les 6 paramètres sont stockés par hôtel ; le front appelle `deriveTokens` (la validation de contraste peut aussi se faire à l'enregistrement, avec aperçu pour l'hôtelier — l'éditeur est **hors périmètre**).
4. **Images** : téléversement → contrôle `photoUsable` → génération 640/1280 WebP → point focal → CDN. Texte alternatif obligatoire. Droits d'usage à faire attester.
5. **Heure et horaires** : fuseau et horaires structurés par hôtel (voir §4), calcul côté client à partir de l'heure du téléphone, avec l'`timezone` de l'hôtel (jamais celle du voyageur).
6. **Traductions** : contenu par langue stocké par hôtel ; ne jamais présenter comme complète une langue partielle (statut calculé à partir des champs renseignés).
7. **Hors ligne** : le voyageur a besoin du Wi‑Fi… sans Wi‑Fi. Prévoir un service worker qui met en cache la dernière version de l'accueil, de la page Wi‑Fi et des urgences ; défini en priorité si Guest reprend.
8. **Sécurité et vie privée** : pas de compte voyageur ; pas de suivi nominatif ; mot de passe Wi‑Fi servi sans cache partagé non autorisé ; CSP stricte ; aucune clé API dans le front.
9. **Marque Pristi** : « Propulsé par Pristi » reste discret ; option pour le retirer à décider commercialement.
10. **Ce qui ne doit pas venir de la V1** : le mode `?preview`, le registre d'hôtels de démonstration, le crédit photo et `WeatherNote`.

Aucune de ces adaptations n'est commencée.

## 9. Ordre de reprise suggéré (quand Guest redémarre)

1. Décider les 6 paramètres de personnalisation avec un vrai hôtelier et valider D sur téléphones réels.
2. Intégrer tokens + polices + nouveau gabarit d'accueil dans le prototype V1 (garder les tests verts à chaque étape).
3. Pages intérieures, états (chargement, vide, erreur), calcul des états dynamiques.
4. Branchement sur le chargeur de données SaaS.
