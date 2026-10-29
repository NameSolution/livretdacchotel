// Direction D — « Pristi Guest Refined » (VALIDÉE). Un seul système, six paramètres par hôtel.
// Aucune valeur dynamique n'est présentée comme réelle : heures, date et statuts « en cours » sont des EXEMPLES
// calculés à une heure simulée (mer. 08:20). En production : fuseau, jours et horaires propres à l'hôtel.
import { icon, loadIcons, qrSvg } from '../lib/kit.mjs';
import { contrast, deriveTokens, photoUsable } from '../lib/tokens.mjs';

const P = '../../public/images';
const L = '../photos';

/* ---------- profil typographique retenu ---------- */
export const FONTS = {
  refined: { name: 'Wix Madefor (interface) + Newsreader (mot de l’hôtelier)', ui: "'WixText',system-ui,sans-serif", display: "'WixDisplay',system-ui,sans-serif", note: "'Newsreader',Georgia,serif", dw: 600, dt: '-.02em', note_w: 420, note_s: 1.12, note_i: 'normal' },
  albert: { name: 'Albert Sans', ui: "'Albert',system-ui,sans-serif", display: "'Albert',system-ui,sans-serif", dw: 600, dt: '-.02em', note_s: 1, note_w: 500 },
  instserif: { name: 'Instrument Serif + Albert Sans', ui: "'Albert',system-ui,sans-serif", display: "'InstrumentSerif',Georgia,serif", dw: 400, dt: '-.005em', scale: 1.14 },
  newsreader: { name: 'Newsreader + Wix Madefor Text', ui: "'WixText',system-ui,sans-serif", display: "'Newsreader',Georgia,serif", dw: 500, dt: '-.012em', scale: 1.08 },
  wix: { name: 'Wix Madefor Display + Text', ui: "'WixText',system-ui,sans-serif", display: "'WixDisplay',system-ui,sans-serif", dw: 600, dt: '-.02em' },
  jakarta: { name: 'Plus Jakarta Sans', ui: "'Jakarta',system-ui,sans-serif", display: "'Jakarta',system-ui,sans-serif", dw: 700, dt: '-.03em' },
};
let FP = FONTS.refined;
export const setFonts = (k) => { FP = FONTS[k]; };

/* ---------- établissements de démonstration (tous fictifs) ---------- */
const img = (src, pos, w, h) => ({ src, pos, w, h });
export const HOTELS = {
  verriere: {
    id: 'verriere', name: 'Maison Verrière', wm: 'plain', kind: 'Boutique-hôtel · Lyon 2e', brand: '#1E3A4C', ambiance: 'froide', radius: 18,
    hero: img(`${P}/verriere/hero-1280.webp`, '62% 50%', 1800, 1350), bf: img(`${P}/verriere/breakfast-1280.webp`, '50% 50%', 1800, 1200), near: img(`${P}/verriere/market-1280.webp`, '50% 50%', 1800, 1200),
    nearName: 'Les Halles de Lyon Paul Bocuse', nearMeta: 'Marché couvert · env. 15 min en transports',
    note: { who: 'Camille', role: 'Direction', text: 'Bienvenue à Lyon. Le café est chaud, la ville vous attend — et la réception n’est qu’à une touche.' },
    ssid: 'Verriere-Guest', pw: 'Soie-Pierre-42', phone: '04 65 71 00 42', ext: '9', recep: '24 h/24',
    bfH: [['Lundi – vendredi', '7:00 – 10:30', true], ['Samedi – dimanche', '7:30 – 11:00', false]], bfNow: '7:00 – 10:30', out: 'Avant 11:00', outSub: 'Dépôt de clé à la réception', bfPlace: 'Salle des Verrières',
    bfTitle: 'À la française', bfIntro: 'Un buffet simple et généreux, composé avec des producteurs et artisans de la région lyonnaise.',
    prices: [['Adulte', '19 €', 'Inclus avec la formule « petit-déjeuner compris »'], ['Enfant', '9 €', 'Gratuit pour les moins de 6 ans']],
    buffet: ['Viennoiseries du boulanger voisin', 'Fromages et charcuteries de la région', 'Fruits de saison, yaourts, céréales', 'Œufs à la demande', 'Café, thés et jus pressés', 'Options végétariennes'],
    notes: ['Sans gluten ou végétarien : signalez-le à l’équipe de salle.', 'Petit-déjeuner en chambre possible, à demander la veille à la réception (supplément).'],
    today: [['07:00', 'Petit-déjeuner', 'Salle des Verrières', 'En cours'], ['11:00', 'Départ des chambres', 'Dépôt de clé à la réception', ''], ['12:00', 'Le Comptoir Verrière', 'Déjeuner jusqu’à 14:00', '']],
    svc: [['utensils', 'Restaurant & bar'], ['luggage', 'Bagagerie'], ['car', 'Parking'], ['paw-print', 'Animaux'], ['bed-double', 'Équipements'], ['scroll-text', 'Règlement']],
    facts: ['Arrivée dès 15:00', 'Départ avant 11:00', 'Réception 24 h/24'],
  },
  arolle: {
    id: 'arolle', name: 'L’Arolle', wm: 'caps', kind: 'Chalet-hôtel · Chamonix', brand: '#8A2F25', ambiance: 'chaude', radius: 12,
    hero: img(`${P}/arolle/hero-1280.webp`, '50% 60%', 1800, 2700), bf: img(`${P}/arolle/breakfast-1280.webp`, '50% 50%', 1800, 1200), near: img(`${P}/arolle/hike-1280.webp`, '50% 50%', 1800, 1201),
    nearName: 'Randonnées en balcon', nearMeta: 'Sentiers panoramiques · conseils de la réception',
    note: { who: 'Jérémie', role: 'Propriétaire', text: 'Poêle allumé, skis au chaud, itinéraires conseillés par ceux qui vivent ici. Faites comme chez vous.' },
    ssid: 'Arolle-Chalet', pw: 'Edelweiss-1035', phone: '04 65 71 00 87', ext: '0', recep: '7 h – 22 h',
    bfH: [['Tous les jours', '7:30 – 10:00', true]], bfNow: '7:30 – 10:00', out: 'Avant 10:30', outSub: 'Consigne à skis jusqu’à 18:00', bfPlace: 'Salle du Poêle',
    bfTitle: 'Le petit-déjeuner du chalet', bfIntro: 'Un vrai petit-déjeuner de montagne, pour tenir jusqu’au déjeuner sur les pistes ou les sentiers.',
    prices: [['Adulte', '22 €', ''], ['Enfant', '11 €', 'Gratuit pour les moins de 4 ans']],
    buffet: ['Tomme de Savoie, charcuteries de la vallée', 'Pain de campagne, miel de montagne', 'Confitures maison', 'Pancakes, œufs à la demande', 'Müesli, fruits secs et frais', 'Café, thés, chocolat chaud'],
    notes: ['Panier randonneur : à commander à la réception avant 20:00 la veille.', 'Options sans lactose et sans gluten : prévenez l’équipe.'],
    today: [['07:30', 'Petit-déjeuner', 'Salle du Poêle', 'En cours'], ['10:30', 'Départ des chambres', 'Consigne à skis jusqu’à 18:00', ''], ['16:00', 'Sauna & détente', 'Sur réservation · 45 min', '']],
    svc: [['utensils', 'Restaurant Le Poêle'], ['flame', 'Sauna'], ['snowflake', 'Local à skis'], ['car', 'Parking'], ['paw-print', 'Chiens acceptés'], ['scroll-text', 'Règlement']],
    facts: ['Arrivée dès 16:00', 'Départ avant 10:30', 'Réception 7 h – 22 h'],
  },
  parc: {
    id: 'parc', name: 'Hôtel du Parc', wm: 'plain', kind: 'Hôtel 3 étoiles · Annecy', brand: '#24386B', ambiance: 'neutre', radius: 10,
    hero: img(`${L}/classic-room-1280.webp`, '50% 55%', 1600, 1200), nearName: 'Le lac d’Annecy', nearMeta: 'Promenade des quais · 5 min à pied',
    note: { who: 'La famille Delorme', mono: 'D', role: 'Direction', text: 'Toute l’équipe de l’Hôtel du Parc vous souhaite un excellent séjour. N’hésitez pas à nous solliciter.' },
    ssid: 'Parc-Clients', pw: 'Lac-Annecy-26', phone: '04 65 71 00 21', recep: '7 h – 23 h',
    bfH: [['Tous les jours', '7:00 – 10:00', true]], bfNow: '7:00 – 10:00', out: 'Avant 11:00', outSub: 'Express : clé en boîte', bfPlace: 'Salle des Platanes',
    bfTitle: 'Buffet continental', bfIntro: 'Servi dans la salle des Platanes, avec boissons chaudes à volonté.',
    prices: [['Adulte', '16 €', ''], ['Enfant', '8 €', 'Gratuit pour les moins de 5 ans']],
    buffet: ['Viennoiseries et pains', 'Charcuteries et fromages', 'Fruits frais et jus', 'Café, thés, chocolat chaud'],
    notes: ['Petit-déjeuner servi en chambre sur demande (supplément).'],
    today: [['07:00', 'Petit-déjeuner', 'Salle des Platanes', 'En cours'], ['11:00', 'Départ des chambres', 'Express : clé en boîte', ''], ['19:00', 'Dîner', 'Restaurant de l’hôtel', '']],
    svc: [['utensils', 'Restaurant'], ['luggage', 'Bagagerie'], ['car', 'Parking'], ['paw-print', 'Animaux'], ['bed-double', 'Équipements'], ['scroll-text', 'Règlement']],
  },
  beau: {
    id: 'beau', name: 'Beau Séjour', wm: 'plain', kind: 'Hôtel indépendant · Bordeaux', brand: '#2D6A4F', ambiance: 'neutre', radius: 16,
    hero: img(`${L}/twin-room-1280.webp`, '50% 55%', 1600, 1200),
    note: { who: 'Nadia', role: 'Réception', text: 'Bienvenue ! Ici, tout est simple : le Wi‑Fi, le petit-déjeuner, et nous à la réception.' },
    ssid: 'BeauSejour', pw: 'Bienvenue-33', phone: '04 65 71 00 58', recep: '7 h – 21 h',
    bfH: [['Tous les jours', '7:30 – 9:30', true]], bfNow: '7:30 – 9:30', out: 'Avant 11:00', outSub: 'Dépôt de clé à la réception', bfPlace: 'Salle du petit-déjeuner',
    bfTitle: 'Petit-déjeuner maison', bfIntro: 'Pains frais, confitures et boissons chaudes, préparés chaque matin.',
    prices: [['Adulte', '9 €', ''], ['Enfant', '5 €', '']],
    buffet: ['Pains et viennoiseries', 'Confitures maison', 'Yaourts et fruits', 'Café, thés, jus d’orange'],
    notes: [],
    today: [['07:30', 'Petit-déjeuner', 'Salle du petit-déjeuner', 'En cours'], ['11:00', 'Départ des chambres', 'Dépôt de clé à la réception', ''], ['14:00', 'Arrivées', 'Chambres prêtes dès 14:00', '']],
    svc: [['coffee', 'Petit-déjeuner'], ['luggage', 'Bagagerie'], ['car', 'Parking'], ['paw-print', 'Animaux'], ['bed-double', 'Équipements'], ['scroll-text', 'Règlement']],
  },
};
// Cas limites : contenus longs (jeu d'essai, établissement fictif).
HOTELS.longue = {
  ...HOTELS.parc, id: 'longue', name: 'Grand Hôtel & Spa de la Gare et des Voyageurs Réunis', kind: 'Hôtel 4 étoiles · Villefranche-sur-Mer', brand: '#5B3A6E', ambiance: 'froide', radius: 14,
  hero: img(`${L}/twin-room-1280.webp`, '50% 55%', 1600, 1200),
  note: { who: 'Marie-Hélène et Jean-Baptiste de la Tour d’Auvergne', role: 'Directeurs', text: 'Au nom de toute l’équipe du Grand Hôtel, nous sommes heureux de vous accueillir à Villefranche-sur-Mer. Que vous veniez pour quelques jours ou pour une longue escapade, notre équipe se tient à votre disposition à toute heure pour vous conseiller, réserver une table, organiser une excursion ou simplement vous indiquer le plus beau chemin vers le port. N’hésitez jamais à nous solliciter : c’est notre plaisir.' },
  ssid: 'GrandHotelGareVoyageursReunis-Guest-5G', pw: 'Tr0ubadour-Cheval-Agrafeuse-Pile-2026!', recep: '24 h/24',
  bfNow: '6:30 – 10:30', out: 'Avant 12:00', outSub: 'Départ tardif possible jusqu’à 14:00, selon disponibilité (supplément)', bfPlace: 'Restaurant panoramique « Les Voyageurs Réunis », 6e étage',
  svc: [['utensils', 'Restaurant gastronomique & bar à cocktails'], ['luggage', 'Bagagerie & consigne'], ['car', 'Parking souterrain'], ['paw-print', 'Animaux acceptés'], ['bed-double', 'Équipements'], ['scroll-text', 'Règlement intérieur']],
  today: [['06:30', 'Petit-déjeuner', 'Restaurant panoramique « Les Voyageurs Réunis »', 'En cours'], ['12:00', 'Départ des chambres', 'Départ tardif possible, selon disponibilité', ''], ['19:30', 'Dîner gastronomique', 'Sur réservation uniquement', '']],
};

const R = (id, o) => ({ ...HOTELS[id], ...o });
const tk = (h) => deriveTokens({ brand: h.brand, ambiance: h.ambiance, radius: h.radius });
const vars = (h) => { const t = tk(h); return `--brand:${t.brand};--bi:${t.brandInk};--on:${t.onBrand};--surface:${t.surface};--card:${t.card};--ink:${t.ink};--muted:${t.muted};--line:${t.line};--tint:${t.tint};--tint2:${t.tint2};--r:${t.radius}px;--fu:${FP.ui};--fd:${FP.display};--fdw:${FP.dw};--fdt:${FP.dt};--fds:${FP.scale ?? 1};--fn:${FP.note ?? FP.display};--fnw:${FP.note_w ?? FP.dw};--fns:${FP.note_s ?? FP.scale ?? 1};`; };

/* ---------- briques ---------- */
const wmHtml = (h) => `<b class="wm ${h.wm}${h.name.length > 26 ? ' long' : ''}">${h.wm === 'caps' ? h.name.toUpperCase() : h.name}</b>`;
const SB = (light) => `<div class="sb ${light ? 'light' : ''}"><span>08:20</span><span class="sbr"><i></i><i></i><i class="b"></i></span></div>`;
const NAV = (on) => `<nav class="nav">${[['house', 'Accueil'], ['compass', 'Découvrir'], ['info', 'Infos'], ['concierge-bell', 'Réception']].map(([i, l], n) => `<a class="${n === on ? 'on' : ''}"><span class="pb">${icon(i, 22, 1.9)}</span>${l}</a>`).join('')}</nav>`;
/** size : '320' | '375' | '390' ; fold : '667' | '844' | 'full' */
const frame = (id, size, fold, h, light, body, navOn) => `<div class="dframe m${size} f${fold}" id="${id}" style="${vars(h)}">${SB(light)}${body}${NAV(navOn)}${fold === 'full' ? '<i class="foldmark a"><u>pli · 667 px</u></i><i class="foldmark b"><u>pli · 844 px</u></i>' : ''}</div>`;

const initial = (n) => (n.split(' ').filter((w) => !/^(la|le|les|l’)$/i.test(w))[0] ?? n)[0].toUpperCase();
const welcomeHtml = (h, clampLines = true) => {
  const long = h.note.text.length > 150;
  return `<section class="welcome"><div class="who"><span class="av">${h.note.mono ?? initial(h.note.who)}</span><span class="wn"><b>${h.note.who}</b> · ${h.note.role}</span></div><p class="msg ${clampLines ? 'cl' : ''}">${h.note.text}</p>${clampLines && long ? '<a class="more">Lire la suite</a>' : ''}</section>`;
};
const heroHtml = (h, o = {}) => {
  const ok = o.forceFallback ? false : photoUsable(h.hero);
  if (ok) return `<header class="hero"><img src="${h.hero.src}" alt="" style="object-position:${h.hero.pos}"><div class="hero-top">${wmHtml(h)}<span class="lang">${icon('globe', 15, 1.9)}FR</span></div></header>`;
  return `<header class="hero fb" data-i="${h.name.replace(/^(L’|Le |La |Les |Hôtel |Grand )/, '')[0]}"><div class="hero-top">${wmHtml(h)}<span class="lang">${icon('globe', 15, 1.9)}FR</span></div><p class="kind">${h.kind}</p></header>`;
};
const wifiLen = (pw) => (pw.length > 26 ? 'xl' : pw.length > 16 ? 'lg' : '');
const wifiCard = (h) => `<section class="wifi"><div class="wl"><div class="lbl">${icon('wifi', 16, 2)}<span>Wi‑Fi</span><b>${h.ssid}</b></div><code class="${wifiLen(h.pw)}">${h.pw}</code></div><button class="btn-light">${icon('copy', 18, 2.1)}Copier</button></section>`;
const pair = (h) => `<section class="pair"><a class="info"><div class="k">${icon('coffee', 17, 2)}Petit‑déjeuner</div><div class="v">${h.bfNow}</div><div class="s">${h.bfPlace}</div></a><a class="info"><div class="k">${icon('door-open', 17, 2)}Départ</div><div class="v">${h.out}</div><div class="s">${h.outSub}</div></a></section>`;
const reception = (h) => `<section class="reception"><span class="ic">${icon('concierge-bell', 20, 1.9)}</span><span class="rt"><b>Réception</b><small>${h.recep}${h.ext ? ` · poste ${h.ext}` : ''}</small></span><a class="call">${icon('phone', 18, 2.1)}Appeler</a></section>`;
const today = (h) => `<section class="sec"><div class="sec-h"><h2>Aujourd’hui à l’hôtel</h2><span class="ex">exemple · mer. 08:20</span></div><ul class="today">${h.today.map(([t, a, b, s]) => `<li><span class="t">${t}</span><span class="tx"><b>${a}</b><small>${b}</small></span>${s ? `<span class="pill">${s}</span>` : '<span></span>'}</li>`).join('')}</ul></section>`;
const services = (h) => `<section class="sec"><div class="sec-h"><h2>Dans l’hôtel</h2><a>Tout voir</a></div><div class="svc">${h.svc.map(([i, l]) => `<a>${icon(i, 20, 1.8)}<span>${l}</span></a>`).join('')}</div></section>`;
const nearby = (h) => {
  if (!h.nearName) return '';
  const ok = photoUsable(h.near);
  return `<section class="sec"><div class="sec-h"><h2>Autour de l’hôtel</h2><a>Découvrir</a></div>${ok
    ? `<a class="near"><img src="${h.near.src}" alt=""><span class="cap"><b>${h.nearName}</b><small>${h.nearMeta}</small></span></a>`
    : `<a class="near nop"><span class="pbx">${icon('map-pin', 20, 1.9)}</span><span class="cap"><b>${h.nearName}</b><small>${h.nearMeta}</small></span>${icon('chevron-right', 20, 1.9)}</a>`}</section>`;
};
const foot = () => `<footer class="foot"><span>Propulsé par Pristi</span><i>·</i><span>Établissement fictif de démonstration</span></footer>`;

/* ---------- pages mobiles ---------- */
const homePage = (h, size = '390', fold = '844', o = {}) => frame(o.id ?? `d-home-${h.id}-${size}-${fold}`, size, fold, h, true,
  `<div class="page">${heroHtml(h, o)}${welcomeHtml(h)}${wifiCard(h)}${pair(h)}${reception(h)}${today(h)}${services(h)}${nearby(h)}${foot()}</div>`, 0);

const topbar = () => `<header class="tb"><a class="back">${icon('chevron-left', 22, 2)}</a><span class="lang solid">${icon('globe', 15, 1.9)}FR</span></header>`;

async function wifiPage(h, size = '390', fold = 'full', o = {}) {
  const qr = await qrSvg(`WIFI:T:WPA;S:${h.ssid};P:${h.pw};;`, tk(h).ink, '#ffffff');
  const state = o.state; // 'copied' | 'failed' | undefined
  const btn = state === 'copied' ? `<button class="btn-light big ok">${icon('check', 20, 2.4)}Mot de passe copié</button>` : `<button class="btn-light big">${icon('copy', 20, 2.1)}Copier le mot de passe</button>`;
  const msg = state === 'failed' ? `<p class="hint strong">La copie automatique n’est pas disponible. Appuyez longuement sur le mot de passe pour le sélectionner.</p>` : `<p class="hint">Si la copie ne fonctionne pas, appuyez longuement sur le mot de passe pour le sélectionner.</p>`;
  return frame(o.id ?? `d-wifi-${h.id}-${size}-${fold}`, size, fold, h, false, `<div class="page">${topbar()}
    <div class="ph"><h1>Wi‑Fi</h1><p>Gratuit dans tout l’hôtel · jusqu’à 5 appareils par chambre.</p></div>
    <section class="wcard"><div class="r"><small>Réseau</small><b class="ssid">${h.ssid}</b></div><div class="r"><small>Mot de passe</small><code class="${wifiLen(h.pw)} ${state === 'failed' ? 'sel' : ''}">${h.pw}</code></div>
      ${btn}${msg}<span class="sr" aria-live="polite">${state === 'copied' ? 'Mot de passe copié' : ''}</span></section>
    <section class="sec tight"><h2>Se connecter</h2><ol class="steps"><li><i>1</i><span>Ouvrez les réglages Wi‑Fi de votre appareil.</span></li><li><i>2</i><span>Choisissez le réseau <b>${h.ssid}</b>.</span></li><li><i>3</i><span>Collez le mot de passe, puis validez.</span></li></ol></section>
    <section class="qr"><div class="q">${qr}</div><p><b>Un autre appareil ?</b>Scannez ce code avec l’appareil photo d’un téléphone : il rejoint le réseau sans saisie.</p></section>${foot()}</div>`, 0);
}

const bfHeader = (h, o = {}) => {
  const ok = !o.forceFallback && photoUsable(h.bf);
  if (ok) return `<header class="hero bf"><img src="${h.bf.src}" alt="" style="object-position:${h.bf.pos}"><div class="hero-top"><a class="back dark">${icon('chevron-left', 22, 2)}</a><span class="lang">${icon('globe', 15, 1.9)}FR</span></div><span class="chip">${icon('map-pin', 14, 2.2)}${h.bfPlace}</span></header>`;
  return `<header class="hero bf fbl"><div class="hero-top"><a class="back">${icon('chevron-left', 22, 2)}</a><span class="lang solid">${icon('globe', 15, 1.9)}FR</span></div><span class="bigic">${icon('coffee', 34, 1.6)}</span><span class="chip lt">${icon('map-pin', 14, 2.2)}${h.bfPlace}</span></header>`;
};
const breakfastPage = (h, size = '390', fold = 'full', o = {}) => frame(o.id ?? `d-breakfast-${h.id}-${size}-${fold}`, size, fold, h, !o.forceFallback && photoUsable(h.bf), `<div class="page">
  ${bfHeader(h, o)}
  <div class="ph pad"><h1>Petit‑déjeuner</h1><p class="sub"><b>${h.bfTitle}.</b> ${h.bfIntro}</p></div>
  <section class="hours">${h.bfH.map(([d, t, td]) => `<div class="row ${td ? 'cur' : ''}"><span>${d}${td ? ' <em>aujourd’hui · exemple</em>' : ''}</span><b>${t}</b></div>`).join('')}</section>
  <section class="prices">${h.prices.map(([a, v, n]) => `<div><small>${a}</small><b>${v}</b>${n ? `<span>${n}</span>` : ''}</div>`).join('')}</section>
  <section class="sec tight"><h2>Au buffet</h2><ul class="buf">${h.buffet.map((b) => `<li>${icon('check', 16, 2.4)}<span>${b}</span></li>`).join('')}</ul></section>
  ${h.notes.length ? `<section class="sec tight"><h2>Bon à savoir</h2>${h.notes.map((n) => `<p class="note">${icon('info', 18, 1.9)}<span>${n}</span></p>`).join('')}</section>` : ''}${foot()}</div>`, 0);

const INFO = [
  ['Séjour', [['Arrivée', 'À partir de 15:00', ''], ['Départ', 'Avant 11:00', 'Merci de libérer la chambre avant 11:00 et de déposer votre clé à la réception ou dans la boîte du hall. Un départ plus tardif est parfois possible : demandez à la réception.', true], ['Bagagerie', 'Gratuite, jusqu’à 20:00', ''], ['Réception', '24 h/24 · poste 9', '']]],
  ['Chambre', [['Climatisation et chauffage', 'Télécommande sur la table de chevet', ''], ['Équipements', 'Coffre-fort, bouilloire, sèche-cheveux', ''], ['Animaux', 'Acceptés jusqu’à 8 kg', '']]],
  ['Accès', [['Parking', 'Parking public à 150 m', ''], ['Venir à l’hôtel', 'Métro Bellecour à 4 min à pied', '']]],
  ['Règlement intérieur', [['Calme', '22:00 – 7:00', ''], ['Non-fumeur', 'Dans tout l’hôtel', '']]],
];
const infoPage = (h, size = '390', fold = 'full', o = {}) => frame(o.id ?? `d-info-${h.id}-${size}-${fold}`, size, fold, h, false, `<div class="page">${topbar()}
  <div class="ph"><h1>Informations pratiques</h1><p>Tout ce qu’il faut savoir pour votre séjour.</p></div>
  <section class="facts">${(h.facts ?? HOTELS.verriere.facts).map((f) => `<span>${f}</span>`).join('')}</section>
  ${INFO.map(([t, rows]) => `<section class="sec tight"><h2>${t}</h2><div class="acc">${rows.map(([a, s, body, open]) => `<div class="ar ${open ? 'open' : ''}"><div class="ah"><span><b>${a}</b><small>${s}</small></span>${icon(open ? 'chevron-up' : 'chevron-down', 20, 1.9)}</div>${open ? `<p>${body}</p>` : ''}</div>`).join('')}</div></section>`).join('')}
  <section class="sec tight"><h2>Urgences</h2><p class="small">Appels gratuits depuis n’importe quel téléphone.</p><div class="sos">${[['112', 'Urgence européenne'], ['15', 'SAMU'], ['17', 'Police'], ['18', 'Pompiers']].map(([n, l]) => `<a><b>${n}</b><span>${l}</span>${icon('phone', 16, 2)}</a>`).join('')}</div></section>${foot()}</div>`, 2);

/* ---------- états : chargement, vide ---------- */
const skeleton = (h) => frame('d-state-loading', '375', '667', h, false, `<div class="page"><div class="hero sk"><div class="hero-top"><span class="skb" style="width:150px;height:22px"></span></div></div>
  <div class="welcome sk"><span class="skb" style="width:60%;height:14px"></span><span class="skb" style="width:100%;height:16px;margin-top:12px"></span><span class="skb" style="width:88%;height:16px;margin-top:8px"></span></div>
  <div class="wifi sk"><span class="skb dk" style="width:55%;height:18px"></span><span class="skb dk" style="width:80%;height:22px;margin-top:10px"></span></div>
  <div class="pair"><div class="info sk"><span class="skb" style="width:70%;height:12px"></span><span class="skb" style="width:90%;height:22px;margin-top:10px"></span></div><div class="info sk"><span class="skb" style="width:70%;height:12px"></span><span class="skb" style="width:90%;height:22px;margin-top:10px"></span></div></div>
  <div class="reception sk"><span class="skb" style="width:40px;height:40px;border-radius:50%"></span><span class="skb" style="width:40%;height:14px"></span></div></div>`, 0);
const emptyDiscover = (h) => frame('d-state-empty', '375', '667', h, false, `<div class="page">${topbar()}
  <div class="ph"><h1>Découvrir les environs</h1><p>Les adresses que l’équipe recommande à ses invités.</p></div>
  <div class="chips">${['Restaurants', 'À découvrir', 'Transports', 'Services'].map((c, i) => `<span class="${i === 0 ? 'on' : ''}">${c}</span>`).join('')}</div>
  <section class="empty">${icon('compass', 28, 1.6)}<b>Rien à afficher pour l’instant</b><p>Cette rubrique sera complétée par l’équipe de l’hôtel. En attendant, la réception se fera un plaisir de vous conseiller.</p><a class="call">${icon('phone', 18, 2.1)}Appeler la réception</a></section></div>`, 1);

/* ---------- bureau ---------- */
const deskHome = (h, o = {}) => {
  const ok = !o.forceFallback && photoUsable(h.hero);
  return `<div class="dframe desk shot" id="${o.id ?? `d-desk-home-${h.id}`}" style="${vars(h)}">
  <header class="dh"><span class="wmw">${wmHtml(h)}</span><nav>${['Accueil', 'Découvrir', 'Infos', 'Réception'].map((t, i) => `<a class="${i === 0 ? 'on' : ''}">${t}</a>`).join('')}</nav><span class="lang solid">${icon('globe', 15, 1.9)}FR</span></header>
  <div class="dgrid">
    <section class="dhero ${ok ? '' : 'fb'}">${ok ? `<img src="${h.hero.src}" alt="" style="object-position:${h.hero.pos}">` : `<p class="dkind">${h.name}</p>`}<span class="kind">${h.kind}</span>${welcomeHtml(h, false)}</section>
    <aside class="dside">${wifiCard(h)}${pair(h)}${reception(h)}<div class="dtoday">${today(h)}</div></aside>
  </div>
  <div class="dcols"><div>${services(h)}</div><div>${nearby(h)}</div></div>${foot()}</div>`;
};

/* ---------- planche des jetons ---------- */
function kit() {
  const extra = { id: 'test', name: 'Marque trop claire (test)', kind: 'Garde-fou : la couleur est corrigée', brand: '#E8C547', ambiance: 'neutre', radius: 14, wm: 'plain' };
  const rows = [...Object.values(HOTELS).filter((x) => x.id !== 'longue'), extra].map((h) => {
    const t = tk(h);
    const pairs = [['blanc / marque', contrast('#FFFFFF', t.brand)], ['texte de marque / fond', contrast(t.brandInk, t.surface)], ['texte de marque / teinte forte', contrast(t.brandInk, t.tint2)], ['texte atténué / fond', contrast(t.muted, t.surface)], ['texte atténué / carte', contrast(t.muted, '#FFFFFF')], ['texte atténué / teinte', contrast(t.muted, t.tint)], ['encre / fond', contrast(t.ink, t.surface)]];
    return { h, t, pairs };
  });
  return `<div class="kit shot" id="d-kit"><div class="kcols">${rows.map(({ h, t, pairs }) => `<div class="kc">
    <h3>${h.name}</h3><p class="kk">${h.kind}</p>
    <div class="sw">${[['marque (fond)', t.brand], ['marque (texte)', t.brandInk], ['teinte', t.tint], ['teinte forte', t.tint2], ['fond', t.surface], ['encre', t.ink], ['atténué', t.muted], ['séparateur', t.line]].map(([n, c]) => `<div style="background:${c};color:${n === 'séparateur' || /teinte|fond/.test(n) ? '#111' : '#fff'}"><span>${n}</span><code>${c}</code></div>`).join('')}</div>
    <ul class="kv"><li><span>Marque saisie</span><b>${h.brand}</b></li><li><span>Arrondi</span><b>${t.radius} px</b></li><li><span>Ambiance</span><b>${h.ambiance}</b></li></ul>
    <table>${pairs.map(([n, r]) => `<tr><td>${n}</td><td class="${r >= 4.5 ? 'ok' : 'ko'}">${r.toFixed(1)} : 1</td></tr>`).join('')}</table></div>`).join('')}</div></div>`;
}

/* ---------- CSS ---------- */
export const css = `
.dframe{--r:18px;--st:44px;--nb:24px;--fr:40px;--px:20px;--hero:228px;width:var(--fw,390px);position:relative;background:var(--surface);color:var(--ink);font-family:var(--fu);font-size:15px;line-height:1.4;border-radius:var(--fr);overflow:hidden;box-shadow:0 0 0 8px #101214,0 0 0 9px #2c2f33,0 28px 60px -24px rgba(0,0,0,.45);isolation:isolate;font-variant-numeric:lining-nums;container-type:inline-size}
.m320{--fw:320px;--px:16px}.m375{--fw:375px}.m390{--fw:390px}
.f667{height:667px;--st:24px;--nb:8px;--fr:30px;--hero:176px}.f844{height:844px;--hero:228px}
.f667 .nav,.f844 .nav{position:absolute;left:0;right:0;bottom:0;margin:0;z-index:20}
.ffull{--hero:228px}
.sb{position:absolute;top:0;left:0;right:0;height:var(--st);display:flex;justify-content:space-between;align-items:center;padding:calc(var(--st) - 44px + 6px) 28px 0 30px;font:600 15px/1 system-ui;z-index:60;color:#111}
.f667 .sb{padding:0 22px 0 24px;font-size:13px}
.sb.light{color:#fff}.sbr{display:flex;gap:5px;align-items:center}.sbr i{display:block;width:16px;height:10px;border-radius:2px;background:currentColor;opacity:.9}.sbr .b{width:24px;border-radius:3px}
.foldmark{position:absolute;left:0;right:0;border-top:1.5px dashed rgba(20,26,29,.4);z-index:70;pointer-events:none}.foldmark.a{top:667px}.foldmark.b{top:844px}
.foldmark u{position:absolute;right:10px;top:4px;font:600 10px/1 system-ui;letter-spacing:.06em;text-decoration:none;color:#fff;background:rgba(20,26,29,.74);padding:4px 7px;border-radius:99px;text-transform:uppercase}
b{font-weight:650}small{display:block}.sr{position:absolute;width:1px;height:1px;overflow:hidden}
/* hero */
.hero{position:relative;height:var(--hero);overflow:hidden;background:var(--tint2)}
.hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,12,14,.66) 0,rgba(8,12,14,.52) 96px,rgba(8,12,14,.14) 70%,rgba(8,12,14,.2) 100%)}
.hero-top{position:absolute;z-index:3;top:var(--st);left:var(--px);right:calc(var(--px) - 4px);min-height:52px;display:flex;align-items:center;justify-content:space-between;gap:10px;color:#fff}
.wm{font-family:var(--fd);font-weight:var(--fdw);font-size:calc(21px*var(--fds));line-height:1.08;letter-spacing:var(--fdt);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-wrap:balance;text-shadow:0 1px 12px rgba(0,0,0,.28)}
.wm.long{font-size:calc(16.5px*var(--fds));-webkit-line-clamp:3;line-height:1.12}.wm.caps.long{font-size:13.5px;letter-spacing:.12em}.wm.caps{font-family:var(--fu);font-weight:700;font-size:16.5px;letter-spacing:.18em;line-height:1.25}
.lang{flex:none;display:flex;gap:6px;align-items:center;height:44px;padding:0 13px;border-radius:99px;background:rgba(10,14,16,.64);color:#fff;font-size:13px;font-weight:650;letter-spacing:.04em}
.lang.solid{background:var(--card);color:var(--ink);border:1px solid var(--line)}
.hero.fb{background:var(--brand);color:#fff}
.hero.fb::after{background:radial-gradient(120% 90% at 100% 0,rgba(255,255,255,.14) 0,rgba(255,255,255,0) 60%)}
.hero.fb .lang{background:rgba(255,255,255,.18)}
.hero.fb::before{content:attr(data-i);position:absolute;right:14px;bottom:-34px;z-index:1;font-family:var(--fd);font-weight:var(--fdw);font-size:170px;line-height:1;color:rgba(255,255,255,.1)}
.hero.fb .wm{text-shadow:none}
.hero .kind{position:absolute;z-index:3;left:var(--px);bottom:46px;font-size:13px;font-weight:600;opacity:.92;letter-spacing:.01em}
/* mot de l'hôtelier : compact */
.welcome{position:relative;z-index:4;margin:-34px var(--px) 0;background:var(--card);border-radius:var(--r);padding:11px 14px 12px;box-shadow:0 1px 2px rgba(20,26,29,.05),0 14px 26px -18px rgba(20,26,29,.34)}
.who{display:flex;gap:9px;align-items:center}.wn{font-size:12.5px;color:var(--muted);line-height:1.2;min-width:0}.wn b{color:var(--ink);font-size:13px}
.av{flex:none;width:26px;height:26px;border-radius:50%;background:var(--tint2);color:var(--bi);display:grid;place-items:center;font-weight:700;font-size:12px}
.msg{font-family:var(--fn);font-weight:var(--fnw);font-size:calc(16px*var(--fns));line-height:1.3;margin-top:7px;text-wrap:pretty;overflow-wrap:anywhere}
.msg.cl{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.more{display:inline-flex;align-items:center;min-height:44px;margin:-4px 0 -14px;font-size:13px;font-weight:650;color:var(--bi)}
/* blocs prioritaires */
.wifi{margin:10px var(--px) 0;background:var(--brand);color:var(--on);border-radius:var(--r);padding:12px 12px 12px 15px;display:flex;align-items:center;justify-content:space-between;gap:10px}
.wl{min-width:0;flex:1}
.wifi .lbl{display:flex;flex-wrap:wrap;align-items:center;gap:2px 7px;font-size:13px;font-weight:600;line-height:1.2}.wifi .lbl span{opacity:.86}.wifi .lbl b{font-weight:700;overflow-wrap:anywhere}
.wifi code,.wcard code{display:block;font-family:'JetBrains',monospace;font-weight:600;letter-spacing:-.02em;overflow-wrap:anywhere;line-height:1.12}
.wifi code{margin-top:5px;font-size:21px}.wifi code.lg{font-size:17px}.wifi code.xl{font-size:14.5px;letter-spacing:-.03em}
.btn-light{flex:none;min-height:48px;padding:0 15px;border-radius:calc(var(--r) - 6px);background:#fff;color:var(--bi);font-weight:700;font-size:15px;display:flex;gap:8px;align-items:center;justify-content:center}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px var(--px) 0}
.info{min-width:0;background:var(--tint);border-radius:var(--r);padding:11px 12px 10px}
.info .k{display:flex;gap:6px;align-items:center;font-size:12.5px;font-weight:650;color:var(--bi);white-space:nowrap}
.info .v{font-family:var(--fd);font-size:calc(20px*var(--fds));font-weight:var(--fdw);letter-spacing:var(--fdt);margin-top:6px;font-variant-numeric:tabular-nums;white-space:nowrap}
.info .s{font-size:12.5px;color:var(--muted);margin-top:2px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}
.reception{margin:10px var(--px) 0;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:8px 8px 8px 11px;display:flex;align-items:center;gap:11px}
.reception .ic{flex:none;width:38px;height:38px;border-radius:50%;background:var(--tint2);color:var(--bi);display:grid;place-items:center}
.rt{min-width:0;flex:1;line-height:1.2}.reception small{font-size:12.5px;color:var(--muted)}
.call{flex:none;margin-left:auto;min-height:44px;padding:0 15px;border-radius:99px;background:var(--brand);color:var(--on);display:flex;gap:7px;align-items:center;font-weight:650;font-size:14.5px}
@container (max-width:359px){.info .v{font-size:calc(17px*var(--fds))}.wifi code{font-size:16.5px}.wifi code.lg{font-size:15px}.wifi code.xl{font-size:13px}.btn-light{padding:0 12px}.nav a{font-size:11.5px}.msg{font-size:calc(15.5px*var(--fns))}.call{padding:0 13px}.reception .call svg{display:none}.reception small{white-space:nowrap}.wcard code{font-size:24px}.wcard code.lg{font-size:20px}.wcard code.xl{font-size:16.5px}}
/* sections */
.sec{margin:26px var(--px) 0}.sec.tight{margin-top:24px}
.sec-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:11px;gap:10px}
.sec h2,.sec-h h2{font-family:var(--fd);font-size:calc(19px*var(--fds));font-weight:var(--fdw);letter-spacing:var(--fdt)}
.sec-h a{font-size:14px;font-weight:650;color:var(--bi);min-height:44px;display:flex;align-items:center;margin:-8px 0}
.ex{font-size:11.5px;color:var(--muted);border:1px dashed color-mix(in srgb,var(--ink) 35%,transparent);border-radius:99px;padding:3px 9px;white-space:nowrap}
.today{list-style:none;margin:0;padding:3px 14px;background:var(--card);border-radius:var(--r)}
.today li{display:grid;grid-template-columns:48px 1fr auto;gap:8px;align-items:center;padding:12px 0}.today li+li{border-top:1px solid var(--line)}
.today .t{font-weight:650;font-variant-numeric:tabular-nums}.today .tx{min-width:0}.today small{font-size:13px;color:var(--muted)}
.pill{font-size:12px;font-weight:650;background:var(--tint2);color:var(--bi);padding:4px 10px;border-radius:99px}
.svc{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.svc a{display:flex;align-items:center;gap:10px;background:var(--card);border-radius:calc(var(--r) - 3px);padding:8px 12px;min-height:54px;font-weight:600;font-size:14.5px;line-height:1.2;min-width:0}.svc a span{min-width:0;overflow-wrap:anywhere}.svc svg{color:var(--bi)}
.near{position:relative;display:block;border-radius:var(--r);overflow:hidden;aspect-ratio:16/10;background:var(--tint2)}
.near img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.near::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,14,16,0) 40%,rgba(10,14,16,.78) 100%)}
.near .cap{position:absolute;z-index:2;left:15px;right:15px;bottom:13px;color:#fff}.near .cap b{font-size:17px}.near .cap small{font-size:13px}
.near.nop{aspect-ratio:auto;display:flex;align-items:center;gap:13px;background:var(--card);padding:12px 14px;color:var(--ink)}.near.nop::after{display:none}
.near.nop .pbx{flex:none;width:44px;height:44px;border-radius:50%;background:var(--tint2);color:var(--bi);display:grid;place-items:center}
.near.nop .cap{position:static;color:var(--ink);flex:1;min-width:0}.near.nop .cap small{color:var(--muted)}.near.nop>svg{color:var(--muted)}
.foot{margin:30px var(--px) 0;padding-bottom:6px;display:flex;justify-content:center;gap:8px;font-size:12px;color:var(--muted);text-align:center;flex-wrap:wrap}.foot i{font-style:normal}
.nav{margin-top:22px;background:var(--card);border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(4,1fr);padding:7px 6px var(--nb)}
.nav a{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:12px;font-weight:600;color:var(--muted);min-height:44px}
.nav .pb{width:58px;height:30px;border-radius:99px;display:grid;place-items:center}.nav a.on{color:var(--bi)}.nav a.on .pb{background:var(--tint2)}
/* pages intérieures */
.tb{display:flex;align-items:flex-end;justify-content:space-between;padding:0 14px 0 calc(var(--px) - 6px);height:calc(var(--st) + 56px)}
.back{width:44px;height:44px;border-radius:50%;background:var(--card);border:1px solid var(--line);display:grid;place-items:center;color:var(--ink)}.back.dark{background:rgba(255,255,255,.94);border:0}
.ph{margin:14px var(--px) 0}.ph.pad{margin-top:18px}
.ph h1{font-family:var(--fd);font-size:calc(30px*var(--fds));line-height:1.08;font-weight:var(--fdw);letter-spacing:var(--fdt);overflow-wrap:anywhere}.ph p{margin-top:7px;font-size:15.5px;color:var(--muted);text-wrap:pretty}.ph p.sub b{color:var(--ink)}
.wcard{margin:18px var(--px) 0;background:var(--brand);color:var(--on);border-radius:var(--r);padding:16px 16px 14px}
.wcard .r{margin-bottom:14px}.wcard small{font-size:13px;font-weight:600;opacity:.86}
.wcard .ssid{display:block;font-family:var(--fd);font-weight:var(--fdw);font-size:calc(21px*var(--fds));margin-top:3px;letter-spacing:var(--fdt);overflow-wrap:anywhere;line-height:1.15}
.wcard code{margin-top:6px;font-size:28px;letter-spacing:-.03em}.wcard code.lg{font-size:22px}.wcard code.xl{font-size:18px}.wcard code.sel{background:rgba(255,255,255,.22);border-radius:6px;outline:2px solid rgba(255,255,255,.55);outline-offset:3px}
.btn-light.big{width:100%;min-height:56px;font-size:16.5px;border-radius:calc(var(--r) - 4px)}.btn-light.ok{background:var(--tint2)}
.hint{font-size:13px;line-height:1.35;opacity:.88;margin-top:11px}.hint.strong{opacity:1;font-weight:600}
.steps{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:12px}.steps li{display:flex;gap:13px;align-items:center;font-size:15.5px}
.steps i{flex:none;width:28px;height:28px;border-radius:50%;background:var(--tint2);color:var(--bi);display:grid;place-items:center;font-style:normal;font-weight:700;font-size:14px}
.qr{margin:24px var(--px) 0;background:var(--card);border-radius:var(--r);padding:12px;display:flex;gap:13px;align-items:center;border:1px solid var(--line)}
.qr .q{width:88px;height:88px;flex:none;border:1px solid var(--line);border-radius:10px;padding:3px}.qr .q svg{width:100%;height:100%}
.qr p{font-size:13.5px;color:var(--muted);line-height:1.35}.qr b{display:block;color:var(--ink);font-size:15.5px;margin-bottom:2px}
.hero.bf{--hero:230px}.hero.bf .hero-top{justify-content:space-between}.hero.bf::after{background:linear-gradient(180deg,rgba(8,12,14,.5) 0,rgba(8,12,14,0) 45%,rgba(8,12,14,.3) 100%)}
.chip{position:absolute;z-index:3;left:var(--px);bottom:14px;background:rgba(10,14,16,.66);color:#fff;border-radius:99px;padding:7px 12px 7px 10px;font-size:13px;font-weight:600;display:flex;gap:6px;align-items:center;max-width:calc(100% - 2*var(--px))}
.hero.bf.fbl .chip{max-width:calc(100% - 2*var(--px) - 76px)}.hero.bf.fbl{--hero:176px;background:var(--tint2);color:var(--ink)}.hero.bf.fbl::after{display:none}.hero.bf.fbl .bigic{position:absolute;right:var(--px);bottom:14px;width:64px;height:64px;border-radius:50%;background:var(--card);color:var(--bi);display:grid;place-items:center}
.chip.lt{background:var(--card);color:var(--ink);border:1px solid var(--line)}
.hours{margin:18px var(--px) 0;background:var(--tint);border-radius:var(--r);padding:3px 14px}
.hours .row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;gap:12px;font-size:15.5px}.hours .row+.row{border-top:1px solid color-mix(in srgb,var(--brand) 14%,transparent)}
.hours b{font-variant-numeric:tabular-nums;white-space:nowrap}.hours .cur span{font-weight:650}.hours em{display:block;font-style:normal;font-size:12px;font-weight:600;color:var(--bi);margin-top:1px}
.prices{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px var(--px) 0}
.prices div{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:12px 13px}.prices small{font-size:13px;font-weight:600;color:var(--muted)}.prices b{display:block;font-family:var(--fd);font-weight:var(--fdw);font-size:calc(26px*var(--fds));letter-spacing:var(--fdt);margin-top:2px}.prices span{display:block;font-size:12.5px;color:var(--muted);line-height:1.3;margin-top:3px}
.buf{list-style:none;margin:0;padding:0;display:grid;gap:10px}.buf li{display:flex;gap:11px;align-items:flex-start;font-size:15.5px;line-height:1.3}.buf svg{color:var(--bi);margin-top:2px}
.note{display:flex;gap:11px;align-items:flex-start;background:var(--tint);border-radius:calc(var(--r) - 2px);padding:12px 13px;font-size:14.5px;line-height:1.35;margin:0 0 10px}.note svg{color:var(--bi);flex:none;margin-top:1px}
.facts{display:flex;gap:8px;flex-wrap:wrap;margin:16px var(--px) 0}.facts span{background:var(--tint2);color:var(--bi);font-weight:650;font-size:13.5px;padding:8px 13px;border-radius:99px}
.acc{background:var(--card);border-radius:var(--r);padding:0 14px}.ar+.ar{border-top:1px solid var(--line)}
.ah{display:flex;justify-content:space-between;align-items:center;gap:10px;min-height:60px;padding:8px 0}.ah small{font-size:13.5px;color:var(--muted);font-weight:400}.ah svg{color:var(--muted);flex:none}
.ar p{padding:0 0 14px;font-size:15px;line-height:1.5;margin:-2px 0 0}
.small{font-size:13.5px;color:var(--muted);margin:-4px 0 11px}
.sos{display:grid;grid-template-columns:1fr 1fr;gap:10px}.sos a{background:var(--card);border-radius:calc(var(--r) - 3px);padding:10px 12px;display:grid;grid-template-columns:auto 1fr auto;gap:9px;align-items:center;min-height:56px}.sos b{font-family:var(--fd);font-weight:var(--fdw);font-size:calc(22px*var(--fds));letter-spacing:var(--fdt);color:var(--bi);font-variant-numeric:tabular-nums}.sos span{font-size:13px;line-height:1.2}.sos svg{color:var(--muted)}
/* états */
.sk .skb,.skb{display:block;background:var(--tint2);border-radius:8px}.skb.dk{background:rgba(255,255,255,.28)}
.hero.sk{background:var(--tint2)}.hero.sk::after{display:none}.hero.sk .hero-top .skb{background:rgba(255,255,255,.55)}
.welcome.sk,.info.sk,.reception.sk{box-shadow:none}.wifi.sk{display:block;padding:16px}.reception.sk{background:var(--card)}
.chips{display:flex;gap:8px;margin:16px var(--px) 0;overflow:hidden}.chips span{flex:none;min-height:44px;display:flex;align-items:center;padding:0 15px;border-radius:99px;border:1px solid var(--line);background:var(--card);font-weight:600;font-size:14px}.chips span.on{background:var(--brand);color:var(--on);border-color:var(--brand)}
.empty{margin:22px var(--px) 0;background:var(--card);border:1px dashed color-mix(in srgb,var(--ink) 28%,transparent);border-radius:var(--r);padding:26px 20px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px}.empty>svg{color:var(--bi)}.empty b{font-size:17px}.empty p{font-size:14.5px;color:var(--muted);max-width:26em}.empty .call{margin:8px 0 0}
/* bureau */
.dframe.desk{--fw:1440px;--r:18px;--px:20px;border-radius:14px;box-shadow:0 0 0 1px #c9cbcd,0 30px 70px -30px rgba(0,0,0,.4);padding-bottom:6px;font-size:16px}
.dh{height:84px;display:flex;align-items:center;justify-content:space-between;padding:0 120px}
.dh .wm{color:var(--bi);font-size:calc(22px*var(--fds));text-shadow:none;display:block}.dh .wm.caps{font-size:18px}
.dh nav{display:flex;gap:34px}.dh nav a{padding:10px 2px;font-weight:600;color:var(--muted);border-bottom:2px solid transparent;min-height:44px}.dh nav a.on{color:var(--bi);border-color:var(--bi)}
.dgrid{display:grid;grid-template-columns:1.5fr 1fr;gap:28px;padding:6px 120px 0}
.dhero{position:relative;border-radius:28px;overflow:hidden;height:600px;background:var(--tint2)}
.dhero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.dhero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,14,16,.34) 0%,rgba(10,14,16,0) 28%,rgba(10,14,16,0) 52%,rgba(10,14,16,.42) 100%)}
.dhero.fb{background:var(--brand)}.dhero.fb::after{background:radial-gradient(90% 80% at 100% 0,rgba(255,255,255,.14) 0,rgba(255,255,255,0) 60%)}
.dhero .dkind{position:absolute;z-index:3;left:36px;top:96px;color:#fff;font-family:var(--fd);font-weight:var(--fdw);font-size:calc(46px*var(--fds));letter-spacing:var(--fdt);max-width:560px;line-height:1.05}
.dhero .kind{position:absolute;z-index:3;left:28px;top:26px;background:rgba(14,18,20,.56);color:#fff;border-radius:99px;padding:8px 14px;font-size:13.5px;font-weight:600}
.dhero .welcome{position:absolute;left:28px;bottom:28px;width:500px;margin:0;z-index:5;padding:16px 20px 16px}.dhero .msg{font-size:calc(20px*var(--fns));margin-top:10px}.dhero .av{width:32px;height:32px;font-size:14px}.dhero .wn{font-size:13.5px}
.dside{display:flex;flex-direction:column;gap:14px}.dside .wifi,.dside .pair,.dside .reception{margin:0}
.dside .wifi{padding:18px 18px 18px 22px}.dside .wifi code{font-size:25px}.dside .info{padding:16px}.dside .info .v{font-size:calc(23px*var(--fds))}
.dside .reception{padding:12px 12px 12px 16px}.dtoday .sec{margin:16px 0 0}.dside .dtoday .today li{padding:11px 0}
.dcols{display:grid;grid-template-columns:1.5fr 1fr;gap:28px;padding:0 120px}.dcols .sec{margin:38px 0 0}.dcols .svc{grid-template-columns:repeat(3,1fr)}.dcols .near{aspect-ratio:auto;height:230px}.dcols .near.nop{height:auto}
.dframe.desk .foot{margin-top:46px;padding-bottom:26px}
/* planche des jetons */
.kit{width:1900px;font-family:'Albert',system-ui,sans-serif;background:#fff;border-radius:16px;padding:28px;color:#14181b}
.kcols{display:grid;grid-template-columns:repeat(5,1fr);gap:22px}
.kc h3{font-size:18px;font-weight:650}.kk{font-size:13px;color:#667;margin:2px 0 12px}
.sw{display:grid;grid-template-columns:1fr 1fr;gap:6px}.sw div{border-radius:10px;padding:9px;font-size:11.5px;font-weight:600;min-height:54px;display:flex;flex-direction:column;justify-content:space-between;border:1px solid rgba(0,0,0,.06)}.sw code{font:500 10.5px 'JetBrains';opacity:.85}
.kv{list-style:none;padding:0;margin:12px 0;font-size:13px}.kv li{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #eee}.kv span{color:#667}
.kc table{width:100%;font-size:12px;border-collapse:collapse}.kc td{padding:4px 0;border-bottom:1px solid #f0f0f0}.kc td+td{text-align:right;font-weight:650;white-space:nowrap}.ok{color:#1c7a3d}.ko{color:#b3261e}
`;

/* ---------- planches ---------- */
const NOTE = 'Valeurs fictives : établissements imaginaires ; les états « en cours » et la date sont des exemples à une heure simulée (mer. 08:20). En production, ils seront calculés avec le fuseau horaire, les jours et les horaires propres à l’hôtel. Captures de navigateur simulé (Chromium), pas de téléphone physique.';
const KICK = 'Pristi Guest · Direction D « Refined » · validée';
const board = (file, title, blurb, screens, bg = '#e4e5e3') => ({ file, title, kicker: KICK, blurb, css, screens, boardBg: bg });
export const D_ICONS = ['chevron-up', 'chevron-down', 'luggage', 'car', 'paw-print', 'scroll-text', 'martini', 'utensils', 'snowflake', 'globe', 'map-pin', 'check', 'info', 'phone', 'copy', 'wifi', 'coffee', 'door-open', 'concierge-bell', 'house', 'compass', 'chevron-left', 'chevron-right', 'bed-double', 'flame'];

export async function buildFonts() {
  await loadIcons(D_ICONS);
  const shots = [];
  for (const k of Object.keys(FONTS)) { setFonts(k); shots.push({ caption: FONTS[k].name, html: homePage(HOTELS.verriere, '390', '844', { id: `d-font-${k}` }) }); }
  setFonts('refined');
  return { ...board('d-fonts.html', 'Direction D — comparaison typographique (historique)', 'Même écran, six appariements. Retenu : Wix Madefor + Newsreader.', shots), kicker: 'Pristi Guest · V3' };
}

export async function build() {
  await loadIcons(D_ICONS);
  setFonts('refined');
  const V = HOTELS.verriere, A = HOTELS.arolle, PA = HOTELS.parc, BE = HOTELS.beau;
  const out = [];
  // 1. parcours complets (390 px)
  for (const id of ['verriere', 'arolle']) {
    const h = HOTELS[id];
    out.push(board(`d-mobile-${id}.html`, `${h.name} — parcours mobile (390 px)`, `${h.kind}. ${NOTE}`, [
      { caption: 'Accueil (page complète)', html: homePage(h, '390', 'full', { id: `d-home-${id}-full` }) },
      { caption: 'Wi‑Fi', html: await wifiPage(h, '390', 'full') },
      { caption: 'Petit-déjeuner', html: breakfastPage(h, '390', 'full') },
      { caption: 'Informations pratiques', html: infoPage(h, '390', 'full') },
    ], id === 'arolle' ? '#e6e0dc' : '#dde2e3'));
  }
  // 2. accueil : petits téléphones et téléphone standard
  out.push(board('d-accueil-formats.html', 'Accueil — petit téléphone (320×667), SE (375×667), standard (390×844)', `Wi‑Fi, petit-déjeuner, départ et réception tiennent au premier écran dès 320×667. ${NOTE}`, [
    { caption: 'Maison Verrière · 320×667', html: homePage(V, '320', '667') },
    { caption: 'Maison Verrière · 375×667', html: homePage(V, '375', '667') },
    { caption: 'Maison Verrière · 390×844', html: homePage(V, '390', '844') },
    { caption: 'L’Arolle · 320×667', html: homePage(A, '320', '667') },
    { caption: 'L’Arolle · 390×844', html: homePage(A, '390', '844') },
  ]));
  // 3. quatre établissements : accueil, Wi‑Fi, petit-déjeuner, infos
  const four = [V, A, PA, BE];
  out.push(board('d-quatre-accueil.html', 'Quatre établissements — accueil (375×667)', `Un seul système, quatre ambiances. ${NOTE}`, four.map((h) => ({ caption: `${h.name} — ${h.kind}`, html: homePage(h, '375', '667') }))));
  out.push(board('d-quatre-wifi.html', 'Quatre établissements — Wi‑Fi (375×667)', NOTE, await Promise.all(four.map(async (h) => ({ caption: h.name, html: await wifiPage(h, '375', '667') })))));
  out.push(board('d-quatre-petitdej.html', 'Quatre établissements — petit-déjeuner (375×667)', `Hôtel du Parc et Beau Séjour n’ont pas de photo de petit-déjeuner : l’en-tête de repli s’applique. ${NOTE}`, four.map((h) => ({ caption: `${h.name}${h.bf ? '' : ' · sans photo'}`, html: breakfastPage(h, '375', '667') }))));
  out.push(board('d-quatre-infos.html', 'Quatre établissements — informations pratiques (375×667)', NOTE, four.map((h) => ({ caption: h.name, html: infoPage(h, '375', '667') }))));
  // 4. photographies médiocres ou absentes
  const photo = (src, w, h, pos = '50% 55%') => ({ src, w, h, pos });
  const cases = [
    ['Chambre modeste (photo ordinaire)', R('beau', {})],
    ['Photo sombre (sous-exposée)', R('beau', { hero: photo(`${L}/dark-1280.webp`, 1280, 960) })],
    ['Photo très claire (table blanche)', R('beau', { hero: photo(`${P}/verriere/breakfast-1280.webp`, 1800, 1200, '50% 40%') })],
    ['Cadrage imparfait : photo verticale', R('beau', { hero: photo(`${L}/portrait-900.webp`, 900, 1200, '50% 60%') })],
    ['Trop petite (240 px) — SANS garde-fou', R('beau', { hero: photo(`${L}/tiny-240.webp`, 240, 180) }), { naive: true }],
    ['Trop petite (240 px) — AVEC garde-fou', R('beau', { hero: photo(`${L}/tiny-240.webp`, 240, 180) })],
    ['Aucune photo', R('beau', { hero: null })],
  ];
  const pshots = cases.map(([cap, h, o], i) => {
    if (o?.naive) { // rendu sans règle : l'image est forcée en pleine largeur (pour montrer ce que la règle évite)
      const html = homePage(h, '375', '667', { id: `d-photo-${i}` }).replace('class="hero fb"', 'class="hero"').replace(/<p class="kind">[^<]*<\/p>/, '').replace(/<header class="hero"><div class="hero-top">/, `<header class="hero"><img src="${h.hero.src}" alt="" style="object-position:50% 55%"><div class="hero-top">`);
      return { caption: cap, html };
    }
    return { caption: cap, html: homePage(h, '375', '667', { id: `d-photo-${i}` }) };
  });
  out.push(board('d-photos.html', 'Résistance aux photographies médiocres ou absentes (375×667)', `Règle : une photo n’est utilisée en pleine largeur que si elle fait au moins 1200×700 px et un format entre 0,6 et 2,4 ; sinon (ou si elle est absente / ne se charge pas), l’en-tête de repli de marque s’applique, sans décalage de mise en page. ${NOTE}`, pshots));
  // 5. contenus longs
  const LG = HOTELS.longue;
  out.push(board('d-contenus-longs.html', 'Contenus longs — nom d’hôtel, message, mot de passe (320 et 375 px)', `Jeu d’essai volontairement extrême. Le nom passe sur deux lignes, le message est limité à 3 lignes avec « Lire la suite », le SSID et le mot de passe se replient sans jamais être tronqués. ${NOTE}`, [
    { caption: 'Accueil 320×667', html: homePage(LG, '320', '667') },
    { caption: 'Accueil 375×667', html: homePage(LG, '375', '667') },
    { caption: 'Wi‑Fi 320×667', html: await wifiPage(LG, '320', '667') },
    { caption: 'Petit-déjeuner 320×667', html: breakfastPage(LG, '320', '667') },
  ]));
  // 6. états
  out.push(board('d-etats.html', 'États : chargement, copie réussie, copie impossible, rubrique vide (375×667)', NOTE, [
    { caption: 'Chargement (squelette, sans animation obligatoire)', html: skeleton(V) },
    { caption: 'Wi‑Fi — mot de passe copié', html: await wifiPage(V, '375', '667', { state: 'copied', id: 'd-state-copied' }) },
    { caption: 'Wi‑Fi — copie impossible (repli manuel)', html: await wifiPage(V, '375', '667', { state: 'failed', id: 'd-state-failed' }) },
    { caption: 'Rubrique vide', html: emptyDiscover(V) },
  ]));
  // 7. bureau
  for (const id of ['verriere', 'arolle']) out.push(board(`d-desktop-${id}.html`, `${HOTELS[id].name} — bureau (1440 px)`, NOTE, [{ caption: 'Accueil bureau', html: deskHome(HOTELS[id]) }], id === 'arolle' ? '#e6e0dc' : '#dde2e3'));
  out.push(board('d-desktop-sans-photo.html', 'Bureau sans photographie (Beau Séjour)', NOTE, [{ caption: 'Repli de marque en version bureau', html: deskHome(R('beau', { hero: null, near: null }), { id: 'd-desk-nophoto' }) }]));
  // 8. jetons
  out.push(board('d-kit.html', 'Jetons dérivés et contrastes mesurés', 'Ce que renseigne l’hôtelier : couleur de marque, ambiance, arrondi, style du nom, photo, mot de bienvenue. Tout le reste est dérivé et corrigé si besoin (colonne de droite : une marque jaune pâle est assombrie automatiquement).', [{ caption: 'Jetons et contrastes WCAG (vert = AA)', html: kit() }]));
  return out;
}
