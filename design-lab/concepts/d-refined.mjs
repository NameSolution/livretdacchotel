// Direction D — « Pristi Guest Refined » : une conciergerie chaleureuse et sobre.
// Un seul système : l'hôtelier fournit une couleur de marque, une ambiance neutre, un arrondi, une photo et un mot de bienvenue ;
// tout le reste (teintes, contrastes, surfaces) est dérivé. Aucune valeur dynamique n'est présentée comme réelle :
// les états « en cours » et la date sont des EXEMPLES calculés à une heure simulée (mer. 08:20).
import { icon, qrSvg, loadIcons } from '../lib/kit.mjs';

const P = '../../public/images';
const L = '../photos';

/* ---------- profils typographiques (comparés visuellement) ---------- */
export const FONTS = {
  refined:   { name: 'Wix Madefor (interface) + Newsreader (mot de l’hôtelier)', ui: "'WixText',system-ui,sans-serif", display: "'WixDisplay',system-ui,sans-serif", note: "'Newsreader',Georgia,serif", dw: 600, dt: '-.02em', note_w: 420, note_s: 1.12, note_i: 'normal', desc: 'sans sobre partout ; une seule touche de serif : la voix humaine' },
  albert:    { name: 'Albert Sans', ui: "'Albert',system-ui,sans-serif", display: "'Albert',system-ui,sans-serif", dw: 600, dt: '-.02em', di: 'normal', note: 'une seule famille, géométrique et chaleureuse' },
  instserif: { name: 'Instrument Serif + Albert Sans', ui: "'Albert',system-ui,sans-serif", display: "'InstrumentSerif',Georgia,serif", dw: 400, dt: '-.005em', di: 'normal', scale: 1.14, note: 'titres en serif fin et contemporain, interface en sans' },
  newsreader:{ name: 'Newsreader + Wix Madefor Text', ui: "'WixText',system-ui,sans-serif", display: "'Newsreader',Georgia,serif", dw: 500, dt: '-.012em', di: 'normal', scale: 1.08, note: 'serif éditorial, interface Wix Madefor' },
  wix:       { name: 'Wix Madefor Display + Text', ui: "'WixText',system-ui,sans-serif", display: "'WixDisplay',system-ui,sans-serif", dw: 600, dt: '-.02em', di: 'normal', note: 'paire dessinée pour l’interface' },
  jakarta:   { name: 'Plus Jakarta Sans', ui: "'Jakarta',system-ui,sans-serif", display: "'Jakarta',system-ui,sans-serif", dw: 700, dt: '-.03em', di: 'normal', note: 'sans moderne, plus géométrique' },
};
let FP = FONTS.refined;
export const setFonts = (k) => { FP = FONTS[k]; };

/* ---------- jetons dérivés ---------- */
const h2r = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const r2h = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => r2h(h2r(a).map((v, i) => v + (h2r(b)[i] - v) * t));
const lin = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const lum = (h) => { const [r, g, b] = h2r(h); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

export function tokens(h) {
  const surface = h.surface;
  return {
    brand: h.brand, on: '#FFFFFF', surface, card: '#FFFFFF', ink: h.ink,
    muted: mix(h.ink, surface, 0.33), line: mix(h.ink, surface, 0.86),
    tint: mix(surface, h.brand, 0.085), tint2: mix(surface, h.brand, 0.16), r: h.radius,
  };
}
const vars = (h) => { const t = tokens(h); return `--brand:${t.brand};--on:${t.on};--surface:${t.surface};--card:${t.card};--ink:${t.ink};--muted:${t.muted};--line:${t.line};--tint:${t.tint};--tint2:${t.tint2};--r:${t.r}px;--fu:${FP.ui};--fd:${FP.display};--fdw:${FP.dw};--fdt:${FP.dt};--fds:${FP.scale ?? 1};--fn:${FP.note ?? FP.display};--fnw:${FP.note_w ?? FP.dw};--fns:${FP.note_s ?? FP.scale ?? 1};--fni:${FP.note_i ?? 'normal'};`; };

/* ---------- établissements de démonstration (tous fictifs) ---------- */
export const HOTELS = {
  verriere: {
    id: 'verriere', name: 'Maison Verrière', wm: 'plain', kind: 'Boutique-hôtel · Lyon 2e', brand: '#1E3A4C', surface: '#F2F5F5', ink: '#141A1D', radius: 18,
    hero: `${P}/verriere/hero-1280.webp`, pos: '62% 50%', bf: `${P}/verriere/breakfast-1280.webp`, near: `${P}/verriere/market-1280.webp`, nearName: 'Les Halles de Lyon Paul Bocuse', nearMeta: 'Marché couvert · env. 15 min en transports',
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
    id: 'arolle', name: 'L’Arolle', wm: 'caps', kind: 'Chalet-hôtel · Chamonix', brand: '#8A2F25', surface: '#F6F2F0', ink: '#241816', radius: 12,
    hero: `${P}/arolle/hero-1280.webp`, pos: '50% 60%', bf: `${P}/arolle/breakfast-1280.webp`, near: `${P}/arolle/hike-1280.webp`, nearName: 'Randonnées en balcon', nearMeta: 'Sentiers panoramiques · conseils de la réception',
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
    id: 'parc', name: 'Hôtel du Parc', wm: 'plain', kind: 'Hôtel 3 étoiles · Annecy', brand: '#24386B', surface: '#F4F4F1', ink: '#16181F', radius: 10,
    hero: `${L}/classic-room-1280.webp`, pos: '50% 55%',
    note: { who: 'La famille Delorme', role: 'Direction', text: 'Toute l’équipe de l’Hôtel du Parc vous souhaite un excellent séjour. N’hésitez pas à nous solliciter.' },
    ssid: 'Parc-Clients', pw: 'Lac-Annecy-26', phone: '04 65 71 00 21', recep: '7 h – 23 h', bfNow: '7:00 – 10:00', out: 'Avant 11:00', outSub: 'Express : clé en boîte', bfPlace: 'Salle des Platanes',
    today: [['07:00', 'Petit-déjeuner', 'Salle des Platanes', 'En cours'], ['11:00', 'Départ des chambres', 'Express : clé en boîte', ''], ['19:00', 'Dîner', 'Restaurant de l’hôtel', '']],
    svc: [['utensils', 'Restaurant'], ['luggage', 'Bagagerie'], ['car', 'Parking'], ['paw-print', 'Animaux'], ['bed-double', 'Équipements'], ['scroll-text', 'Règlement']],
  },
  beau: {
    id: 'beau', name: 'Beau Séjour', wm: 'plain', kind: 'Hôtel indépendant · Bordeaux', brand: '#2D6A4F', surface: '#F4F6F2', ink: '#16201B', radius: 16,
    hero: `${L}/twin-room-1280.webp`, pos: '50% 55%',
    note: { who: 'Nadia', role: 'Réception', text: 'Bienvenue ! Ici, tout est simple : le Wi‑Fi, le petit-déjeuner, et nous à la réception.' },
    ssid: 'BeauSejour', pw: 'Bienvenue-33', phone: '04 65 71 00 58', recep: '7 h – 21 h', bfNow: '7:30 – 9:30', out: 'Avant 11:00', outSub: 'Dépôt de clé à la réception', bfPlace: 'Salle du petit-déjeuner',
    today: [['07:30', 'Petit-déjeuner', 'Salle du petit-déjeuner', 'En cours'], ['11:00', 'Départ des chambres', 'Dépôt de clé à la réception', ''], ['14:00', 'Arrivées', 'Chambres prêtes dès 14:00', '']],
    svc: [['coffee', 'Petit-déjeuner'], ['luggage', 'Bagagerie'], ['car', 'Parking'], ['paw-print', 'Animaux'], ['bed-double', 'Équipements'], ['scroll-text', 'Règlement']],
  },
};

const wmHtml = (h) => `<b class="wm ${h.wm}">${h.wm === 'caps' ? h.name.toUpperCase() : h.name}</b>`;
const SB = (light) => `<div class="sb ${light ? 'light' : ''}"><span>08:20</span><span class="sbr"><i></i><i></i><i class="b"></i></span></div>`;
const NAV = (on) => `<nav class="nav">${[['house', 'Accueil'], ['compass', 'Découvrir'], ['info', 'Infos'], ['concierge-bell', 'Réception']].map(([i, l], n) => `<a class="${n === on ? 'on' : ''}"><span class="pb">${icon(i, 22, 1.9)}</span>${l}</a>`).join('')}</nav>`;
const frame = (id, mode, h, light, body, navOn) => `<div class="dframe ${mode}" id="${id}" style="${vars(h)}">${SB(light)}${body}${NAV(navOn)}${mode === 'full' ? '<i class="foldmark"><u>pli de l’écran · 844 px</u></i>' : ''}</div>`;

/* ---------- blocs ---------- */
const hero = (h, tall = 292) => `<header class="hero" style="height:${tall}px"><img src="${h.hero}" alt="" style="object-position:${h.pos}"><div class="hero-top">${wmHtml(h)}<span class="lang">${icon('globe', 15, 1.9)}FR</span></div></header>`;
const welcome = (h) => `<section class="welcome"><p class="eyebrow">Un mot de ${h.note.who.split(' ').slice(-1)[0] === 'Delorme' ? 'la direction' : h.note.who}</p><p class="msg">${h.note.text}</p><div class="sign"><span class="av">${(h.note.who.split(' ').slice(-1)[0])[0]}</span><span><b>${h.note.who}</b><small>${h.note.role}</small></span></div></section>`;
const wifiCard = (h) => `<section class="wifi"><div class="wl"><div class="lbl">${icon('wifi', 17, 2)}Wi‑Fi gratuit</div><div class="ssid">${h.ssid}</div><code>${h.pw}</code></div><button class="btn-light">${icon('copy', 18, 2.1)}Copier</button></section>`;
const pair = (h) => `<section class="pair"><a class="info"><div class="k">${icon('coffee', 18, 2)}Petit‑déjeuner</div><div class="v">${h.bfNow}</div><div class="s">${h.bfPlace}</div></a><a class="info"><div class="k">${icon('door-open', 18, 2)}Départ</div><div class="v">${h.out}</div><div class="s">${h.outSub}</div></a></section>`;
const reception = (h) => `<section class="reception"><span class="ic">${icon('concierge-bell', 20, 1.9)}</span><span><b>Réception</b><small>${h.recep}${h.ext ? ` · poste ${h.ext}` : ''}</small></span><a class="call">${icon('phone', 18, 2.1)}Appeler</a></section>`;
const today = (h) => `<section class="sec"><div class="sec-h"><h2>Aujourd’hui à l’hôtel</h2><span class="ex">exemple · mer. 08:20</span></div><ul class="today">${h.today.map(([t, a, b, s]) => `<li><span class="t">${t}</span><span><b>${a}</b><small>${b}</small></span>${s ? `<span class="pill">${s}</span>` : '<span></span>'}</li>`).join('')}</ul></section>`;
const services = (h) => `<section class="sec"><div class="sec-h"><h2>Dans l’hôtel</h2><a>Tout voir</a></div><div class="svc">${h.svc.map(([i, l]) => `<a>${icon(i, 20, 1.8)}${l}</a>`).join('')}</div></section>`;
const nearby = (h) => h.near ? `<section class="sec"><div class="sec-h"><h2>Autour de l’hôtel</h2><a>Découvrir</a></div><a class="near"><img src="${h.near}" alt=""><span class="cap"><b>${h.nearName}</b><small>${h.nearMeta}</small></span></a></section>` : '';
const foot = (h) => `<footer class="foot"><span>Propulsé par Pristi</span><i>·</i><span>Établissement fictif de démonstration</span></footer>`;

/* ---------- pages mobiles ---------- */
const homePage = (h, mode) => frame(`d-home-${h.id}-${mode}`, mode, h, true,
  `<div class="page">${hero(h)}${welcome(h)}${wifiCard(h)}${pair(h)}${reception(h)}${today(h)}${services(h)}${nearby(h)}${foot(h)}</div>`, 0);

const topbar = (h, title) => `<header class="tb"><a class="back">${icon('chevron-left', 22, 2)}</a><span class="lang solid">${icon('globe', 15, 1.9)}FR</span></header>`;

async function wifiPage(h, mode) {
  const qr = await qrSvg(`WIFI:T:WPA;S:${h.ssid};P:${h.pw};;`, h.ink, '#ffffff');
  return frame(`d-wifi-${h.id}-${mode}`, mode, h, false, `<div class="page">${topbar(h)}
    <div class="ph"><h1>Wi‑Fi</h1><p>Gratuit dans tout l’hôtel · jusqu’à 5 appareils par chambre.</p></div>
    <section class="wcard"><div class="r"><small>Réseau</small><b>${h.ssid}</b></div><div class="r"><small>Mot de passe</small><code>${h.pw}</code></div>
      <button class="btn-light big">${icon('copy', 20, 2.1)}Copier le mot de passe</button><p class="hint">Si la copie ne fonctionne pas, appuyez longuement sur le mot de passe pour le sélectionner.</p></section>
    <section class="sec tight"><h2>Se connecter</h2><ol class="steps"><li><i>1</i><span>Ouvrez les réglages Wi‑Fi de votre appareil.</span></li><li><i>2</i><span>Choisissez le réseau <b>${h.ssid}</b>.</span></li><li><i>3</i><span>Collez le mot de passe, puis validez.</span></li></ol></section>
    <section class="qr"><div class="q">${qr}</div><p><b>Un autre appareil ?</b>Scannez ce code avec l’appareil photo d’un téléphone : il rejoint le réseau sans saisie.</p></section>${foot(h)}</div>`, 0);
}

const breakfastPage = (h, mode) => frame(`d-breakfast-${h.id}-${mode}`, mode, h, true, `<div class="page">
  <header class="hero bf" style="height:268px"><img src="${h.bf}" alt=""><div class="hero-top"><a class="back dark">${icon('chevron-left', 22, 2)}</a><span class="lang">${icon('globe', 15, 1.9)}FR</span></div><span class="chip">${icon('map-pin', 14, 2.2)}${h.bfPlace}</span></header>
  <div class="ph pad"><h1>Petit‑déjeuner</h1><p class="sub"><b>${h.bfTitle}.</b> ${h.bfIntro}</p></div>
  <section class="hours">${h.bfH.map(([d, t, td]) => `<div class="row ${td ? 'cur' : ''}"><span>${d}${td ? ' <em>aujourd’hui · exemple</em>' : ''}</span><b>${t}</b></div>`).join('')}</section>
  <section class="prices">${h.prices.map(([a, v, n]) => `<div><small>${a}</small><b>${v}</b>${n ? `<span>${n}</span>` : ''}</div>`).join('')}</section>
  <section class="sec tight"><h2>Au buffet</h2><ul class="buf">${h.buffet.map((b) => `<li>${icon('check', 16, 2.4)}${b}</li>`).join('')}</ul></section>
  <section class="sec tight"><h2>Bon à savoir</h2>${h.notes.map((n) => `<p class="note">${icon('info', 18, 1.9)}<span>${n}</span></p>`).join('')}</section>${foot(h)}</div>`, 0);

const INFO = [
  ['Séjour', [['Arrivée', 'À partir de 15:00', ''], ['Départ', 'Avant 11:00', 'Merci de libérer la chambre avant 11:00 et de déposer votre clé à la réception ou dans la boîte du hall. Un départ plus tardif est parfois possible : demandez à la réception.', true], ['Bagagerie', 'Gratuite, jusqu’à 20:00', ''], ['Réception', '24 h/24 · poste 9', '']]],
  ['Chambre', [['Climatisation et chauffage', 'Télécommande sur la table de chevet', ''], ['Équipements', 'Coffre-fort, bouilloire, sèche-cheveux', ''], ['Animaux', 'Acceptés jusqu’à 8 kg', '']]],
  ['Accès', [['Parking', 'Parking public à 150 m', ''], ['Venir à l’hôtel', 'Métro Bellecour à 4 min à pied', '']]],
  ['Règlement intérieur', [['Calme', '22:00 – 7:00', ''], ['Non-fumeur', 'Dans tout l’hôtel', '']]],
];
const infoPage = (h, mode) => frame(`d-info-${h.id}-${mode}`, mode, h, false, `<div class="page">${topbar(h)}
  <div class="ph"><h1>Informations pratiques</h1><p>Tout ce qu’il faut savoir pour votre séjour.</p></div>
  <section class="facts">${(h.facts ?? HOTELS.verriere.facts).map((f) => `<span>${f}</span>`).join('')}</section>
  ${INFO.map(([t, rows]) => `<section class="sec tight"><h2>${t}</h2><div class="acc">${rows.map(([a, s, body, open]) => `<div class="ar ${open ? 'open' : ''}"><div class="ah"><span><b>${a}</b><small>${s}</small></span>${icon(open ? 'chevron-up' : 'chevron-down', 20, 1.9)}</div>${open ? `<p>${body}</p>` : ''}</div>`).join('')}</div></section>`).join('')}
  <section class="sec tight"><h2>Urgences</h2><p class="small">Appels gratuits depuis n’importe quel téléphone.</p><div class="sos">${[['112', 'Urgence européenne'], ['15', 'SAMU'], ['17', 'Police'], ['18', 'Pompiers']].map(([n, l]) => `<a><b>${n}</b><span>${l}</span>${icon('phone', 16, 2)}</a>`).join('')}</div></section>${foot(h)}</div>`, 2);

/* ---------- bureau ---------- */
const deskHome = (h) => `<div class="dframe desk shot" id="d-desk-home-${h.id}" style="${vars(h)}">
  <header class="dh"><span class="wmw">${wmHtml(h)}</span><nav>${['Accueil', 'Découvrir', 'Infos', 'Réception'].map((t, i) => `<a class="${i === 0 ? 'on' : ''}">${t}</a>`).join('')}</nav><span class="lang solid">${icon('globe', 15, 1.9)}FR</span></header>
  <div class="dgrid">
    <section class="dhero"><img src="${h.hero}" alt="" style="object-position:${h.pos}"><span class="kind">${h.kind}</span>${welcome(h)}</section>
    <aside class="dside">${wifiCard(h)}${pair(h)}${reception(h)}<div class="dtoday">${today(h)}</div></aside>
  </div>
  <div class="dcols"><div>${services(h)}</div><div>${nearby(h)}</div></div>${foot(h)}</div>`;

/* ---------- planche des jetons ---------- */
function kit() {
  const rows = Object.values(HOTELS).map((h) => {
    const t = tokens(h);
    const pairs = [['blanc / marque', ratio('#FFFFFF', t.brand)], ['marque / fond', ratio(t.brand, t.surface)], ['marque / teinte', ratio(t.brand, t.tint2)], ['texte atténué / fond', ratio(t.muted, t.surface)], ['texte atténué / carte', ratio(t.muted, '#FFFFFF')], ['texte atténué / teinte', ratio(t.muted, t.tint)], ['encre / fond', ratio(t.ink, t.surface)]];
    return { h, t, pairs };
  });
  return `<div class="kit shot" id="d-kit" style="--surface:#fff"><div class="kcols">${rows.map(({ h, t, pairs }) => `<div class="kc">
    <h3>${h.name}</h3><p class="kk">${h.kind}</p>
    <div class="sw">${[['marque', t.brand], ['teinte', t.tint2], ['teinte légère', t.tint], ['fond', t.surface], ['encre', t.ink], ['atténué', t.muted]].map(([n, c]) => `<div style="background:${c};color:${lum(c) > 0.35 ? '#111' : '#fff'}"><span>${n}</span><code>${c}</code></div>`).join('')}</div>
    <ul class="kv"><li><span>Arrondi</span><b>${h.radius} px</b></li><li><span>Ambiance</span><b>${h.id === 'arolle' ? 'chaude' : h.id === 'verriere' ? 'froide' : 'neutre'}</b></li><li><span>Nom</span><b>${h.wm === 'caps' ? 'capitales espacées' : 'casse normale'}</b></li></ul>
    <table>${pairs.map(([n, r]) => `<tr><td>${n}</td><td class="${r >= 4.5 ? 'ok' : 'ko'}">${r.toFixed(1)} : 1</td></tr>`).join('')}</table></div>`).join('')}</div></div>`;
}

/* ---------- CSS ---------- */
export const css = `
.dframe{--r:18px;width:390px;position:relative;background:var(--surface);color:var(--ink);font-family:var(--fu);font-size:15px;line-height:1.4;border-radius:40px;overflow:hidden;box-shadow:0 0 0 8px #101214,0 0 0 9px #2c2f33,0 28px 60px -24px rgba(0,0,0,.45);isolation:isolate;font-variant-numeric:lining-nums}
.dframe.fold{height:844px}
.dframe.fold .nav{position:absolute;left:0;right:0;bottom:0;margin:0}
.sb{position:absolute;top:0;left:0;right:0;height:44px;display:flex;justify-content:space-between;align-items:center;padding:6px 28px 0 30px;font:600 15px/1 system-ui;z-index:60;color:#111}
.sb.light{color:#fff}.sbr{display:flex;gap:5px;align-items:center}.sbr i{display:block;width:16px;height:10px;border-radius:2px;background:currentColor;opacity:.9}.sbr .b{width:24px;border-radius:3px}
.foldmark{position:absolute;left:0;right:0;top:844px;border-top:1.5px dashed rgba(20,26,29,.35);z-index:70;pointer-events:none}.foldmark u{position:absolute;right:10px;top:4px;font:600 10px/1 system-ui;letter-spacing:.06em;text-decoration:none;color:#fff;background:rgba(20,26,29,.72);padding:4px 7px;border-radius:99px;text-transform:uppercase}
b{font-weight:650}small{display:block}.info .v,.prices b,.sos b{font-variant-numeric:lining-nums tabular-nums}
.hero{position:relative;overflow:hidden;background:var(--tint2)}
.hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,14,16,.55) 0%,rgba(10,14,16,0) 34%,rgba(10,14,16,0) 60%,rgba(10,14,16,.30) 100%)}
.hero-top{position:absolute;z-index:3;top:44px;left:20px;right:16px;height:52px;display:flex;align-items:center;justify-content:space-between;color:#fff}
.wm{font-family:var(--fd);font-weight:var(--fdw);font-size:calc(21px*var(--fds));line-height:1;letter-spacing:var(--fdt)}.wm.caps{font-family:var(--fu);font-weight:700;font-size:17px;letter-spacing:.2em}
.lang{display:flex;gap:6px;align-items:center;height:36px;padding:0 13px;border-radius:99px;background:rgba(14,18,20,.42);color:#fff;font-size:13px;font-weight:650;letter-spacing:.04em}
.lang.solid{background:var(--card);color:var(--ink);border:1px solid var(--line)}
.welcome{position:relative;z-index:4;margin:-62px 20px 0;background:var(--card);border-radius:var(--r);padding:16px 18px 14px;box-shadow:0 1px 2px rgba(20,26,29,.05),0 16px 30px -18px rgba(20,26,29,.34)}
.eyebrow{font-size:12px;font-weight:650;letter-spacing:.09em;text-transform:uppercase;color:var(--brand)}
.msg{font-family:var(--fn);font-style:var(--fni);font-size:calc(18.5px*var(--fns));line-height:1.3;font-weight:var(--fnw);letter-spacing:-.005em;margin-top:7px;text-wrap:pretty}
.sign{display:flex;gap:10px;align-items:center;margin-top:12px}.sign small{font-size:12.5px;color:var(--muted)}.sign b{font-size:14px;line-height:1.15}
.av{width:34px;height:34px;border-radius:50%;background:var(--tint2);color:var(--brand);display:grid;place-items:center;font-weight:700;font-size:15px}
.wifi{margin:12px 20px 0;background:var(--brand);color:var(--on);border-radius:var(--r);padding:15px 14px 15px 18px;display:flex;align-items:center;justify-content:space-between;gap:10px}
.wifi .lbl{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;opacity:.86}.wifi .ssid{font-size:16px;font-weight:650;margin-top:5px;line-height:1.2}
.wifi code{display:block;margin-top:7px;font:600 21px/1.05 'JetBrains';letter-spacing:-.02em}
.btn-light{height:48px;padding:0 16px;border-radius:calc(var(--r) - 6px);background:#fff;color:var(--brand);font-weight:700;font-size:15px;display:flex;gap:8px;align-items:center;justify-content:center;flex:none}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 20px 0}
.info{background:var(--tint);border-radius:var(--r);padding:14px 14px 13px;display:block}
.info .k{display:flex;gap:7px;align-items:center;font-size:13px;font-weight:650;color:var(--brand)}
.info .v{font-family:var(--fd);font-size:calc(20.5px*var(--fds));font-weight:var(--fdw);letter-spacing:var(--fdt);margin-top:9px;font-variant-numeric:tabular-nums;white-space:nowrap}
.info .s{font-size:13px;color:var(--muted);margin-top:3px;line-height:1.25}
.reception{margin:12px 20px 0;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:11px 11px 11px 13px;display:flex;align-items:center;gap:12px}
.reception .ic{width:40px;height:40px;border-radius:50%;background:var(--tint2);color:var(--brand);display:grid;place-items:center;flex:none}
.reception small{font-size:13px;color:var(--muted)}
.call{margin-left:auto;height:44px;padding:0 16px;border-radius:99px;background:var(--brand);color:var(--on);display:flex;gap:8px;align-items:center;font-weight:650;font-size:14.5px}
.sec{margin:30px 20px 0}.sec.tight{margin-top:26px}
.sec-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:10px}
.sec h2,.sec-h h2{font-family:var(--fd);font-size:calc(19px*var(--fds));font-weight:var(--fdw);letter-spacing:var(--fdt)}
.sec-h a{font-size:14px;font-weight:650;color:var(--brand)}
.ex{font-size:11.5px;color:var(--muted);border:1px dashed color-mix(in srgb,var(--ink) 35%,transparent);border-radius:99px;padding:3px 9px;white-space:nowrap}
.today{list-style:none;margin:0;padding:3px 16px;background:var(--card);border-radius:var(--r)}
.today li{display:grid;grid-template-columns:50px 1fr auto;gap:8px;align-items:center;padding:13px 0}
.today li+li{border-top:1px solid var(--line)}
.today .t{font-weight:650;font-variant-numeric:tabular-nums;font-size:15px}.today small{font-size:13px;color:var(--muted)}
.pill{font-size:12px;font-weight:650;background:var(--tint2);color:var(--brand);padding:4px 10px;border-radius:99px}
.svc{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.svc a{display:flex;align-items:center;gap:11px;background:var(--card);border-radius:calc(var(--r) - 3px);padding:0 14px;height:54px;font-weight:600;font-size:14.5px}.svc svg{color:var(--brand)}
.near{position:relative;display:block;border-radius:var(--r);overflow:hidden;aspect-ratio:16/10;background:var(--tint2)}
.near img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.near::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,14,16,0) 45%,rgba(10,14,16,.72) 100%)}
.near .cap{position:absolute;z-index:2;left:15px;right:15px;bottom:13px;color:#fff}.near .cap b{font-size:17px}.near .cap small{font-size:13px;opacity:.92}
.foot{margin:34px 20px 0;padding-bottom:10px;display:flex;justify-content:center;gap:8px;font-size:12px;color:var(--muted);text-align:center;flex-wrap:wrap}.foot i{font-style:normal}
.nav{margin-top:26px;background:var(--card);border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(4,1fr);padding:8px 8px 24px}
.nav a{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:12px;font-weight:600;color:var(--muted)}
.nav .pb{width:58px;height:30px;border-radius:99px;display:grid;place-items:center}
.nav a.on{color:var(--brand)}.nav a.on .pb{background:var(--tint2)}
/* pages intérieures */
.tb{display:flex;align-items:center;justify-content:space-between;padding:50px 16px 0 14px;height:100px;align-items:flex-end}
.back{width:44px;height:44px;border-radius:50%;background:var(--card);border:1px solid var(--line);display:grid;place-items:center;color:var(--ink)}
.back.dark{background:rgba(255,255,255,.94);border:0}
.ph{margin:18px 20px 0}.ph.pad{margin-top:20px}
.ph h1{font-family:var(--fd);font-size:calc(31px*var(--fds));line-height:1.06;font-weight:var(--fdw);letter-spacing:var(--fdt)}.ph p{margin-top:8px;font-size:15.5px;color:var(--muted);text-wrap:pretty}.ph p.sub b{color:var(--ink)}
.wcard{margin:20px 20px 0;background:var(--brand);color:var(--on);border-radius:var(--r);padding:18px 18px 16px}
.wcard .r{margin-bottom:16px}.wcard small{font-size:13px;font-weight:600;opacity:.82}.wcard b{display:block;font-family:var(--fd);font-weight:var(--fdw);font-size:calc(22px*var(--fds));margin-top:3px;letter-spacing:var(--fdt)}
.wcard code{display:block;margin-top:6px;font:600 29px/1.1 'JetBrains';letter-spacing:-.03em;word-break:break-all}
.btn-light.big{width:100%;height:56px;font-size:16.5px;border-radius:calc(var(--r) - 4px)}
.hint{font-size:13px;line-height:1.35;opacity:.84;margin-top:12px}
.steps{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:12px}.steps li{display:flex;gap:13px;align-items:center;font-size:15.5px}
.steps i{flex:none;width:28px;height:28px;border-radius:50%;background:var(--tint2);color:var(--brand);display:grid;place-items:center;font-style:normal;font-weight:700;font-size:14px}
.qr{margin:26px 20px 0;background:var(--card);border-radius:var(--r);padding:14px;display:flex;gap:14px;align-items:center;border:1px solid var(--line)}
.qr .q{width:92px;height:92px;flex:none;border:1px solid var(--line);border-radius:10px;padding:3px}.qr .q svg{width:100%;height:100%}
.qr p{font-size:13.5px;color:var(--muted);line-height:1.35}.qr b{display:block;color:var(--ink);font-size:15.5px;margin-bottom:2px}
.bf .hero-top{top:44px}.hero.bf .chip{position:absolute;z-index:3;left:16px;bottom:16px;background:rgba(14,18,20,.62);color:#fff;border-radius:99px;padding:7px 12px 7px 10px;font-size:13px;font-weight:600;display:flex;gap:6px;align-items:center}
.hours{margin:20px 20px 0;background:var(--tint);border-radius:var(--r);padding:4px 16px}
.hours .row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;gap:12px;font-size:15.5px}.hours .row+.row{border-top:1px solid color-mix(in srgb,var(--brand) 14%,transparent)}
.hours b{font-variant-numeric:tabular-nums;white-space:nowrap}.hours .cur span{font-weight:650}.hours em{display:block;font-style:normal;font-size:12px;font-weight:600;color:var(--brand);margin-top:1px}
.prices{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 20px 0}
.prices div{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:13px 14px}.prices small{font-size:13px;font-weight:600;color:var(--muted)}.prices b{display:block;font-family:var(--fd);font-weight:var(--fdw);font-size:calc(27px*var(--fds));letter-spacing:var(--fdt);margin-top:2px}.prices span{display:block;font-size:12.5px;color:var(--muted);line-height:1.3;margin-top:3px}
.buf{list-style:none;margin:0;padding:0;display:grid;gap:11px}.buf li{display:flex;gap:11px;align-items:flex-start;font-size:15.5px;line-height:1.3}.buf svg{color:var(--brand);margin-top:2px}
.note{display:flex;gap:11px;align-items:flex-start;background:var(--tint);border-radius:calc(var(--r) - 2px);padding:12px 14px;font-size:14.5px;line-height:1.35;margin:0 0 10px}.note svg{color:var(--brand);flex:none;margin-top:1px}
.facts{display:flex;gap:8px;flex-wrap:wrap;margin:18px 20px 0}.facts span{background:var(--tint2);color:var(--brand);font-weight:650;font-size:13.5px;padding:8px 13px;border-radius:99px}
.acc{background:var(--card);border-radius:var(--r);padding:0 16px}.ar{padding:2px 0}.ar+.ar{border-top:1px solid var(--line)}
.ah{display:flex;justify-content:space-between;align-items:center;gap:10px;min-height:62px;padding:8px 0}.ah small{font-size:13.5px;color:var(--muted);font-weight:400}.ah svg{color:var(--muted);flex:none}
.ar p{padding:0 0 15px;font-size:15px;line-height:1.5;color:var(--ink);margin:-2px 0 0;max-width:30em}
.small{font-size:13.5px;color:var(--muted);margin:-4px 0 12px}
.sos{display:grid;grid-template-columns:1fr 1fr;gap:10px}.sos a{background:var(--card);border-radius:calc(var(--r) - 3px);padding:12px 14px;display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;min-height:56px}.sos b{font-family:var(--fd);font-weight:var(--fdw);font-size:calc(22px*var(--fds));letter-spacing:var(--fdt);color:var(--brand);font-variant-numeric:tabular-nums}.sos span{font-size:13.5px;line-height:1.2}.sos svg{color:var(--muted)}
/* bureau */
.dframe.desk{width:1440px;border-radius:14px;box-shadow:0 0 0 1px #c9cbcd,0 30px 70px -30px rgba(0,0,0,.4);padding-bottom:6px;font-size:16px}
.dh{height:84px;display:flex;align-items:center;justify-content:space-between;padding:0 120px}
.dh .wm{color:var(--brand);font-size:22px}.dh .wm.caps{font-size:18px}
.dh nav{display:flex;gap:34px}.dh nav a{padding:10px 2px;font-weight:600;color:var(--muted);border-bottom:2px solid transparent}.dh nav a.on{color:var(--brand);border-color:var(--brand)}
.dgrid{display:grid;grid-template-columns:1.5fr 1fr;gap:28px;padding:6px 120px 0}
.dhero{position:relative;border-radius:28px;overflow:hidden;height:600px;background:var(--tint2)}
.dhero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.dhero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,14,16,.30) 0%,rgba(10,14,16,0) 28%,rgba(10,14,16,0) 52%,rgba(10,14,16,.42) 100%)}
.dhero .kind{position:absolute;z-index:3;left:28px;top:26px;background:rgba(14,18,20,.5);color:#fff;border-radius:99px;padding:8px 14px;font-size:13.5px;font-weight:600}
.dhero .welcome{position:absolute;left:28px;bottom:28px;width:470px;margin:0;z-index:5;padding:20px 22px 18px}.dhero .msg{font-size:21px}
.dside{display:flex;flex-direction:column;gap:14px}.dside .wifi,.dside .pair,.dside .reception{margin:0}
.dside .wifi{padding:20px 20px 20px 22px}.dside .wifi code{font-size:25px}.dside .info{padding:18px}.dside .info .v{font-size:23px}
.dside .reception{padding:14px 14px 14px 16px}
.dcols{display:grid;grid-template-columns:1.5fr 1fr;gap:28px;padding:0 120px}.dcols .sec{margin:38px 0 0}.dcols .svc{grid-template-columns:repeat(3,1fr)}.dcols .near{aspect-ratio:auto;height:230px}.dtoday .sec{margin:16px 0 0}.dside .dtoday .today li{padding:11px 0}
.dframe.desk .foot{margin-top:46px;padding-bottom:26px}
/* planche des jetons */
.kit{width:1500px;font-family:'Albert',system-ui,sans-serif;background:#fff;border-radius:16px;padding:28px;color:#14181b}
.kcols{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.kc h3{font-size:19px;font-weight:650;letter-spacing:-.01em}.kk{font-size:13px;color:#667;margin:2px 0 12px}
.sw{display:grid;grid-template-columns:1fr 1fr;gap:6px}.sw div{border-radius:10px;padding:10px;font-size:12px;font-weight:600;min-height:62px;display:flex;flex-direction:column;justify-content:space-between;border:1px solid rgba(0,0,0,.06)}.sw code{font:500 11px 'JetBrains';opacity:.85}
.kv{list-style:none;padding:0;margin:12px 0;font-size:13px}.kv li{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #eee}.kv span{color:#667}
.kc table{width:100%;font-size:12.5px;border-collapse:collapse}.kc td{padding:4px 0;border-bottom:1px solid #f0f0f0}.kc td+td{text-align:right;font-weight:650}.ok{color:#1c7a3d}.ko{color:#b3261e}
`;

const mobileRow = (h, label) => [
  { caption: `${label} · Accueil (page complète)`, html: homePage(h, 'full') },
  { caption: `${label} · Wi‑Fi`, html: null },
  { caption: `${label} · Petit-déjeuner`, html: breakfastPage(h, 'full') },
  { caption: `${label} · Informations pratiques`, html: infoPage(h, 'full') },
];

export const D_ICONS = ['chevron-up', 'chevron-down', 'luggage', 'car', 'paw-print', 'scroll-text', 'martini', 'utensils', 'snowflake', 'globe', 'map-pin', 'check', 'info', 'phone', 'copy', 'wifi', 'coffee', 'door-open', 'concierge-bell', 'house', 'compass', 'chevron-left', 'bed-double', 'flame'];

export async function buildFonts() {
  await loadIcons(D_ICONS);
  const out = [];
  const shots = [];
  for (const k of Object.keys(FONTS)) {
    setFonts(k);
    shots.push({ caption: `${FONTS[k].name} — ${FONTS[k].note}`, html: homePage(HOTELS.verriere, 'fold').replace('id="d-home-verriere-fold"', `id="d-font-${k}"`) });
  }
  setFonts('refined');
  return { file: 'd-fonts.html', title: 'Direction D — comparaison typographique', kicker: 'Pristi Guest · V3', blurb: 'Le même écran d’accueil (Maison Verrière) avec six appariements typographiques. Tout le reste est identique : seule la police change.', css, screens: shots, boardBg: '#e4e5e3', extraHead: '<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&f[]=general-sans@400,500,600,700&display=swap">' };
}

export async function build() {
  await loadIcons(['chevron-up', 'chevron-down', 'luggage', 'car', 'paw-print', 'scroll-text', 'martini', 'utensils', 'snowflake', 'globe', 'map-pin', 'check', 'info', 'phone', 'copy', 'wifi', 'coffee', 'door-open', 'concierge-bell', 'house', 'compass', 'chevron-left', 'bed-double', 'flame']);
  const note = 'Valeurs fictives : établissements imaginaires ; les états « en cours » et la date sont des exemples à une heure simulée (mer. 08:20). En production, ils seront calculés avec le fuseau horaire, les jours et les horaires propres à l’hôtel.';
  const out = [];
  for (const id of ['verriere', 'arolle']) {
    const h = HOTELS[id];
    const rows = mobileRow(h, h.name);
    rows[1].html = await wifiPage(h, 'full');
    out.push({
      file: `d-mobile-${id}.html`, title: `Direction D — ${h.name} (mobile)`, kicker: 'Pristi Guest · V3 · Direction D « Refined »',
      blurb: `${h.kind}. ${note}`, css, screens: rows, boardBg: id === 'arolle' ? '#e6e0dc' : '#dde2e3',
    });
  }
  // premiers écrans (pli à 844 px) pour comparer avec A, B, C, et variantes d'établissements
  const folds = [];
  for (const id of ['verriere', 'arolle', 'parc', 'beau']) folds.push({ caption: `${HOTELS[id].name} — ${HOTELS[id].kind}`, html: homePage(HOTELS[id], 'fold') });
  out.push({ file: 'd-variants.html', title: 'Direction D — un système, quatre types d’hôtels', kicker: 'Pristi Guest · V3 · Direction D « Refined »', blurb: `Même gabarit, mêmes composants. Seuls changent : couleur de marque, ambiance neutre, arrondi, style du nom, photo et mot de bienvenue. ${note}`, css, screens: folds, boardBg: '#e4e5e3' });
  const wifis = [];
  for (const id of ['verriere', 'arolle']) wifis.push({ caption: `${HOTELS[id].name} — Wi‑Fi et petit-déjeuner (premier écran)`, html: await wifiPage(HOTELS[id], 'fold') }, { caption: '', html: breakfastPage(HOTELS[id], 'fold') });
  out.push({ file: 'd-folds.html', title: 'Direction D — premiers écrans', kicker: 'Pristi Guest · V3 · Direction D « Refined »', blurb: note, css, screens: wifis, boardBg: '#e4e5e3' });
  for (const id of ['verriere', 'arolle']) out.push({ file: `d-desktop-${id}.html`, title: `Direction D — ${HOTELS[id].name} (bureau 1440 px)`, kicker: 'Pristi Guest · V3 · Direction D « Refined »', blurb: note, css, screens: [{ caption: 'Accueil bureau : la photo reste sobre, les essentiels sont visibles sans défiler', html: deskHome(HOTELS[id]) }], boardBg: id === 'arolle' ? '#e6e0dc' : '#dde2e3' });
  out.push({ file: 'd-kit.html', title: 'Direction D — jetons et personnalisation', kicker: 'Pristi Guest · V3 · Direction D « Refined »', blurb: 'Ce que renseigne l’hôtelier : une couleur de marque, une ambiance neutre, un arrondi, le style du nom, une photo, un mot de bienvenue. Tout le reste est dérivé, avec contrôle des contrastes.', css, screens: [{ caption: 'Jetons dérivés et contrastes mesurés (WCAG, vert = AA)', html: kit() }], boardBg: '#e4e5e3' });
  return out;
}
