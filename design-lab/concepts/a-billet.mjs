// Direction A — « Billet » : le séjour comme un billet d'embarquement. Grotesque suisse, champ de couleur saturé,
// chiffres géants (heures = information n°1), frise « Aujourd'hui » sensible à l'heure, dock flottant.
import { icon, phone, qrSvg } from '../lib/kit.mjs';

const P = '../../public/images';
const V = {
  name: 'Maison Verrière', place: 'Lyon 2e', ssid: 'Verriere-Guest', pw: ['Soie', 'Pierre', '42'],
  hero: `${P}/verriere/hero-1280.webp`, bf: `${P}/verriere/breakfast-1280.webp`, market: `${P}/verriere/market-1280.webp`, cafe: `${P}/verriere/cafe-1280.webp`,
  vars: '--field:#2B3BF5;--field-2:#1F2BC4;--pop:#D9FF4F;--ink:#0B0C1B;--paper:#E9EAF0;--muted:#5B5E75;--duo-a:#1a1fb8;--duo-b:#d9ff4f;',
};
const A = {
  name: 'Chalet-Hôtel L’Arolle', place: 'Chamonix · 1 035 m', ssid: 'Arolle-Chalet', pw: ['Edelweiss', '1035'],
  hero: `${P}/arolle/hero-1280.webp`, bf: `${P}/arolle/breakfast-1280.webp`,
  vars: '--field:#0F3B2F;--field-2:#0A2B22;--pop:#FFB938;--ink:#07140F;--paper:#E6ECE7;--muted:#53625A;--duo-a:#07281f;--duo-b:#ffb938;',
};

const dock = (active) => {
  const items = [['house', 'Accueil'], ['compass', 'Découvrir'], ['info', 'Infos'], ['concierge-bell', 'Réception']];
  return `<nav class="a-dock">${items.map(([i, l], n) => `<a class="${n === active ? 'on' : ''}">${icon(i, 22, 1.9)}${n === active ? `<b>${l}</b>` : ''}</a>`).join('')}</nav>`;
};

const timeline = (rows) => `<ol class="a-tl">${rows.map((r) => `
  <li class="${r.state}"><span class="t">${r.t}</span><i></i><div><b>${r.title}</b><small>${r.sub}</small></div>${r.badge ? `<em>${r.badge}</em>` : ''}</li>`).join('')}</ol>`;

function home(h, { stubs, rows, h1, mono, contour = false }) {
  return `<div class="a-screen" style="${h.vars}">
    <header class="a-top"><div class="a-brand"><b>${h.name.split(' ').slice(0, -1).join(' ') || h.name}</b> <b>${h.name.split(' ').slice(-1)}</b></div><div class="a-top-r"><span class="a-lang">${icon('globe', 16, 1.9)}FR</span></div></header>
    <section class="a-ticket">
      <div class="a-photo"><img src="${h.hero}" alt=""><span class="a-mono">${mono}</span></div>
      <div class="a-field">${contour ? contourSvg() : ''}<h1>${h1}</h1></div>
      <div class="a-perf"><i class="l"></i><i class="r"></i></div>
      <div class="a-stubs">${stubs.map((s) => `<a class="a-stub"><small>${s.l}</small><b>${s.v}</b><span>${s.dot ? '<u></u>' : ''}${s.s}</span></a>`).join('')}</div>
    </section>
    <section class="a-wifi"><div><small>${icon('wifi', 14, 2)}WI-FI · ${h.ssid}</small><code>${h.pw.join('<s>-</s>')}</code></div><button>${icon('copy', 18, 2)}Copier</button></section>
    <section class="a-day"><h2><span>AUJOURD’HUI</span><em>mer. 29 oct.</em></h2>${timeline(rows)}</section>
    ${dock(0)}
  </div>`;
}

const contourSvg = () => `<svg class="a-contour" viewBox="0 0 390 200" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="1"><path d="M-10 150C60 110 110 170 190 130S330 60 410 110"/><path d="M-10 168C60 128 110 188 190 148S330 78 410 128"/><path d="M-10 186C60 146 110 206 190 166S330 96 410 146"/><path d="M-10 132C60 92 110 152 190 112S330 42 410 92"/><path d="M-10 114C60 74 110 134 190 94S330 24 410 74"/><path d="M-10 96C60 56 110 116 190 76S330 6 410 56"/></svg>`;

async function wifiScreen(h) {
  const qr = await qrSvg(`WIFI:T:WPA;S:${h.ssid};P:${h.pw.join('-')};;`, '#0B0C1B', '#FFFFFF');
  return `<div class="a-screen a-wifi-page" style="${h.vars}">
    <header class="a-top light"><button class="a-round">${icon('chevron-left', 22, 2)}</button><span class="a-lang">${icon('globe', 16, 1.9)}FR</span></header>
    <div class="a-hero-type"><small>CONNEXION GRATUITE · TOUT L’HÔTEL</small><h1>Wi‑Fi</h1></div>
    <section class="a-card">
      <div class="a-row"><small>RÉSEAU</small><b>${h.ssid}</b></div>
      <div class="a-perf dash"><i class="l"></i><i class="r"></i></div>
      <div class="a-row"><small>MOT DE PASSE</small><code>${h.pw.map((p, i) => (i === h.pw.length - 1 ? `<em>${p}</em>` : p)).join('<s>-</s>')}</code></div>
      <button class="a-cta">${icon('copy', 22, 2.2)}Copier le mot de passe</button>
    </section>
    <ol class="a-steps"><li><b>01</b>Ouvrez les réglages Wi‑Fi.</li><li><b>02</b>Choisissez <u>${h.ssid}</u></li><li><b>03</b>Collez le mot de passe.</li></ol>
    <div class="a-qr"><div>${qr}</div><p><b>Un autre appareil ?</b>Scannez ce code avec l’appareil photo : connexion sans saisie.</p></div>
    ${dock(0)}
  </div>`;
}

function breakfast(h, { h1, times, week, prices, place, buffet, notes }) {
  return `<div class="a-screen a-bf" style="${h.vars}">
    <header class="a-top"><button class="a-round dark">${icon('chevron-left', 22, 2)}</button><span class="a-lang">${icon('globe', 16, 1.9)}FR</span></header>
    <div class="a-bf-photo"><img src="${h.bf}" alt=""><span class="a-live"><u></u>Ouvert maintenant</span></div>
    <div class="a-bf-body">
      <small class="a-k">PETIT‑DÉJEUNER</small>
      <h1>${h1}</h1>
      <div class="a-bigtime"><b>${times[0]}</b><i>${icon('arrow-right', 34, 2.6)}</i><b>${times[1]}</b></div>
      <ul class="a-week">${week.map((w) => `<li class="${w.today ? 'today' : ''}"><span>${w.d}</span><b>${w.t}</b>${w.today ? '<em>AUJOURD’HUI</em>' : ''}</li>`).join('')}</ul>
      <div class="a-prices">${prices.map((p) => `<div><small>${p.l}</small><b>${p.v}</b></div>`).join('')}</div>
      <p class="a-place">${icon('map-pin', 18, 2)}${place}</p>
      <ul class="a-chips">${buffet.map((b) => `<li>${icon('check', 14, 2.6)}${b}</li>`).join('')}</ul>
      ${notes.map((n) => `<p class="a-note">${icon('info', 16, 2)}${n}</p>`).join('')}
    </div>
    ${dock(0)}
  </div>`;
}

export const css = `
.a-screen{position:absolute;inset:0;background:var(--paper);color:var(--ink);font-family:'Instrument',system-ui,sans-serif;font-size:15px;line-height:1.35;overflow:hidden}
.a-top{position:absolute;top:44px;left:0;right:0;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 16px 0 20px;z-index:20}
.a-top.light{color:#fff}
.a-brand{font:700 17px/1 'Bricolage';letter-spacing:-.02em;font-stretch:85%;display:flex;gap:5px}
.a-lang{display:flex;gap:6px;align-items:center;height:36px;padding:0 12px;border:1.5px solid currentColor;border-radius:99px;font:600 12px/1 'GeistMono';letter-spacing:.04em}
.a-round{width:40px;height:40px;border-radius:99px;background:rgba(255,255,255,.18);display:grid;place-items:center;color:#fff}
.a-round.dark{background:var(--ink);color:#fff}
/* billet */
.a-ticket{position:absolute;top:104px;left:12px;right:12px;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 1px 0 rgba(11,12,27,.06)}
.a-photo{position:relative;height:150px;background:var(--field)}
.a-photo img{width:100%;height:100%;object-fit:cover;object-position:60% 55%;filter:grayscale(1) contrast(1.15) brightness(1.02);mix-blend-mode:luminosity;opacity:.95}
.a-photo::after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,var(--duo-a),var(--duo-a));mix-blend-mode:multiply;opacity:.45}
.a-photo .a-mono{position:absolute;left:14px;top:12px;z-index:2;font:500 11px/1 'GeistMono';letter-spacing:.08em;color:#fff;background:var(--ink);padding:6px 8px;border-radius:4px}
.a-field{position:relative;background:var(--field);color:#fff;padding:14px 18px 24px;overflow:hidden}
.a-field h1{position:relative;z-index:2;font:800 38px/0.98 'Bricolage';letter-spacing:-.025em;font-stretch:92%;max-width:330px;text-wrap:balance}
.a-contour{position:absolute;inset:0;width:100%;height:100%;color:rgba(255,255,255,.22)}
.a-perf{position:relative;height:0;z-index:5}
.a-perf::before{content:'';position:absolute;left:18px;right:18px;top:-1px;border-top:2px dashed rgba(11,12,27,.22)}
.a-perf i{position:absolute;top:-11px;width:22px;height:22px;border-radius:50%;background:var(--paper)}
.a-perf i.l{left:-11px}.a-perf i.r{right:-11px}
.a-stubs{display:grid;grid-template-columns:repeat(3,1fr);padding:14px 4px 12px}
.a-stub{padding:0 14px;border-left:1.5px dashed rgba(11,12,27,.16);display:flex;flex-direction:column;gap:2px}
.a-stub:first-child{border-left:0}
.a-stub small{font:500 10px/1 'GeistMono';letter-spacing:.1em;color:var(--muted)}
.a-stub b{font:800 30px/1.05 'Bricolage';letter-spacing:-.02em;font-stretch:90%;font-variant-numeric:tabular-nums;margin-top:3px}
.a-stub span{font:500 12px/1.2 'Instrument';color:var(--muted);display:flex;align-items:center;gap:5px}
.a-stub u{width:8px;height:8px;border-radius:50%;background:#18c25b;box-shadow:0 0 0 3px rgba(24,194,91,.2)}
/* wifi sur l'accueil */
.a-wifi{position:absolute;top:464px;left:12px;right:12px;height:84px;border-radius:16px;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 12px 0 18px}
.a-wifi small{display:flex;gap:6px;align-items:center;font:500 10px/1 'GeistMono';letter-spacing:.1em;color:rgba(255,255,255,.62)}
.a-wifi code{display:block;margin-top:7px;font:600 22px/1 'GeistMono';color:var(--pop);letter-spacing:-.02em}
.a-wifi code s{text-decoration:none;opacity:.45;margin:0 1px}
.a-wifi button{height:52px;padding:0 16px;border-radius:12px;background:var(--pop);color:var(--ink);display:flex;gap:8px;align-items:center;font:700 15px/1 'Instrument'}
/* frise du jour */
.a-day{position:absolute;top:566px;left:20px;right:20px}
.a-day h2{display:flex;justify-content:space-between;align-items:baseline;font:500 11px/1 'GeistMono';letter-spacing:.12em;margin-bottom:6px}
.a-day h2 em{font-style:normal;color:var(--muted)}
.a-tl{list-style:none;padding:0;margin:0;position:relative}
.a-tl li{position:relative;display:grid;grid-template-columns:62px 18px 1fr auto;align-items:start;padding:10px 0;min-height:58px}
.a-tl .t{font:500 13px/1.3 'GeistMono';color:var(--ink);padding-top:2px;font-variant-numeric:tabular-nums}
.a-tl i{position:relative;display:block;width:10px;height:10px;border-radius:50%;background:var(--paper);border:2px solid var(--ink);margin-top:5px;z-index:2}
.a-tl li::before{content:'';position:absolute;left:67px;top:0;bottom:0;border-left:1.5px solid rgba(11,12,27,.2)}
.a-tl li.now i{background:var(--pop);border-color:var(--ink);box-shadow:0 0 0 4px rgba(11,12,27,.1)}
.a-tl li.past{opacity:.38}
.a-tl b{font:700 18px/1.15 'Bricolage';letter-spacing:-.015em;display:block}
.a-tl small{font-size:13px;color:var(--muted)}
.a-tl em{font:600 10px/1 'GeistMono';letter-spacing:.08em;font-style:normal;background:var(--pop);color:var(--ink);padding:5px 7px;border-radius:4px;margin-top:3px}
/* dock */
.a-dock{position:absolute;left:16px;right:16px;bottom:22px;height:64px;border-radius:22px;background:var(--ink);display:flex;align-items:center;justify-content:space-between;padding:0 8px;z-index:30;box-shadow:0 14px 30px -12px rgba(11,12,27,.55)}
.a-dock a{height:48px;min-width:58px;border-radius:16px;display:flex;align-items:center;justify-content:center;gap:8px;color:rgba(255,255,255,.7);padding:0 14px}
.a-dock a.on{background:var(--pop);color:var(--ink);flex:1.3 1 0}
.a-dock b{font:700 14px/1 'Instrument'}
/* page wifi */
.a-wifi-page{background:var(--field);color:#fff}
.a-hero-type{position:absolute;top:104px;left:22px;right:22px}
.a-hero-type small{font:500 11px/1 'GeistMono';letter-spacing:.12em;opacity:.75}
.a-hero-type h1{font:800 84px/0.9 'Bricolage';letter-spacing:-.035em;font-stretch:90%;margin-top:8px;margin-left:-3px}
.a-card{position:absolute;top:226px;left:12px;right:12px;background:#fff;color:var(--ink);border-radius:18px;padding:20px 20px 16px}
.a-card .a-row small{display:block;font:500 10px/1 'GeistMono';letter-spacing:.12em;color:var(--muted)}
.a-card .a-row b{display:block;font:700 26px/1.1 'Bricolage';letter-spacing:-.015em;margin:7px 0 20px}
.a-card .a-row code{display:block;margin:8px 0 18px;font:600 32px/1.05 'GeistMono';letter-spacing:-.04em;word-break:break-all}
.a-card code s{text-decoration:none;color:#b9bbc9;margin:0 1px}
.a-card code em{font-style:normal;color:var(--field)}
.a-card .a-perf{margin:0 -20px}
.a-card .a-perf::before{left:20px;right:20px}
.a-card .a-perf i{background:var(--field)}
.a-card .a-row:nth-child(3){margin-top:0}
.a-card .a-perf{margin-top:0;margin-bottom:30px}
.a-cta{width:100%;height:64px;border-radius:14px;background:var(--pop);color:var(--ink);display:flex;gap:10px;align-items:center;justify-content:center;font:800 18px/1 'Bricolage';letter-spacing:-.01em}
.a-steps{position:absolute;top:502px;left:20px;right:20px;list-style:none;padding:0;margin:0;color:#fff}
.a-steps li{display:flex;gap:14px;align-items:baseline;padding:9px 0;border-top:1px solid rgba(255,255,255,.22);font:500 15px/1.2 'Instrument'}
.a-steps b{font:500 12px/1 'GeistMono';color:var(--pop)}
.a-steps u{text-decoration:none;font-weight:700;color:var(--pop)}
.a-qr{position:absolute;top:640px;left:20px;right:20px;display:flex;gap:14px;align-items:center;color:#fff}
.a-qr>div{width:88px;height:88px;background:#fff;border-radius:10px;padding:4px;flex:none}
.a-qr svg{width:100%;height:100%}
.a-qr p{font-size:13px;line-height:1.3;opacity:.85}
.a-qr b{display:block;font:700 15px/1.2 'Bricolage';opacity:1;margin-bottom:2px}
/* page petit-déjeuner */
.a-bf-photo{position:absolute;top:0;left:0;right:0;height:300px;background:#ddd}
.a-bf-photo img{width:100%;height:100%;object-fit:cover}
.a-bf-photo::before{content:'';position:absolute;inset:0 0 auto 0;height:110px;background:linear-gradient(180deg,rgba(11,12,27,.55),rgba(11,12,27,0));z-index:2}
.a-bf .a-top{z-index:30}
.a-live{position:absolute;left:16px;bottom:44px;display:flex;gap:8px;align-items:center;background:var(--pop);color:var(--ink);font:700 12px/1 'GeistMono';letter-spacing:.04em;padding:8px 11px;border-radius:99px}
.a-live u{width:8px;height:8px;border-radius:50%;background:#12a24c}
.a-bf-body{position:absolute;top:272px;left:0;right:0;bottom:0;background:var(--paper);border-radius:24px 24px 0 0;padding:20px 20px 0;overflow:hidden}
.a-k{font:500 11px/1 'GeistMono';letter-spacing:.12em;color:var(--field)}
.a-bf-body h1{font:800 34px/1 'Bricolage';letter-spacing:-.025em;font-stretch:92%;margin:8px 0 10px}
.a-bigtime{display:flex;align-items:center;gap:8px;color:var(--field)}
.a-bigtime b{font:800 60px/0.9 'Bricolage';letter-spacing:-.03em;font-stretch:88%;font-variant-numeric:tabular-nums}
.a-bigtime i{color:var(--ink)}
.a-week{list-style:none;padding:0;margin:14px 0 0}
.a-week li{display:flex;align-items:center;gap:10px;height:42px;border-top:1px solid rgba(11,12,27,.16);font-size:15px}
.a-week li span{flex:1;color:var(--muted)}
.a-week li b{font:600 15px/1 'GeistMono'}
.a-week li.today{background:var(--pop);margin:0 -20px;padding:0 20px;border-color:transparent}
.a-week li.today span{color:var(--ink);font-weight:700}
.a-week em{font:600 9px/1 'GeistMono';letter-spacing:.08em;font-style:normal;background:var(--ink);color:#fff;padding:4px 6px;border-radius:3px}
.a-prices{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.a-prices div{position:relative;background:#fff;border-radius:12px;padding:12px 14px}
.a-prices small{font:500 10px/1 'GeistMono';letter-spacing:.1em;color:var(--muted)}
.a-prices b{display:block;font:800 30px/1 'Bricolage';letter-spacing:-.03em;margin-top:6px}
.a-place{display:flex;gap:8px;align-items:center;margin:14px 0 0;font-weight:600}
.a-chips{list-style:none;padding:0;margin:12px 0 0;display:flex;flex-wrap:wrap;gap:6px}
.a-chips li{display:flex;gap:5px;align-items:center;background:#fff;border-radius:99px;height:30px;padding:0 11px 0 9px;font-size:13px;font-weight:600}
.a-chips svg{color:var(--field)}
.a-note{display:flex;gap:8px;margin:10px 0 0;font-size:13px;color:var(--muted)}
`;

export async function build(loadedIcons) {
  const screens = [];
  screens.push({
    caption: 'A1 · Accueil — le billet : 3 heures géantes + Wi-Fi copiable',
    html: phone({ id: 'a1', status: 'dark', body: home(V, {
      h1: 'Bienvenue à la Maison Verrière.', mono: 'LYON 2E · 14 °C · NUAGEUX',
      stubs: [{ l: 'PETIT-DÉJ.', v: '10:30', s: 'fin du service', dot: true }, { l: 'DÉPART', v: '11:00', s: 'avant' }, { l: 'RÉCEPTION', v: '24/7', s: 'Appeler →' }],
      rows: [
        { t: '07:00', state: 'now', title: 'Petit-déjeuner', sub: 'Salle des Verrières', badge: 'OUVERT' },
        { t: '11:00', state: '', title: 'Départ des chambres', sub: 'Dépôt de clé à la réception' },
        { t: '12:00', state: '', title: 'Le Comptoir Verrière', sub: 'Déjeuner jusqu’à 14:00' },
      ],
    }) }),
  });
  screens.push({ caption: 'A2 · Wi-Fi — un geste : copier ; QR pour un second appareil', html: phone({ id: 'a2', status: 'light', body: await wifiScreen(V) }) });
  screens.push({
    caption: 'A3 · Petit-déjeuner — les horaires sont l’image',
    html: phone({ id: 'a3', status: 'light', body: breakfast(V, {
      h1: 'À la française.', times: ['07:00', '10:30'],
      week: [{ d: 'Lun – ven', t: '07:00–10:30', today: true }, { d: 'Sam – dim', t: '07:30–11:00' }],
      prices: [{ l: 'ADULTE', v: '19 €' }, { l: 'ENFANT', v: '9 €' }],
      place: 'Salle des Verrières · rez-de-chaussée',
      buffet: ['Viennoiseries', 'Fromages & charcuteries', 'Œufs à la demande', 'Jus pressés'],
      notes: ['Végétarien et sans gluten : demandez à la salle.'],
    }) }),
  });
  screens.push({
    caption: 'A4 · Même système, autre hôtel — palette, photo, motif topographique',
    html: phone({ id: 'a4', status: 'dark', body: home(A, {
      h1: 'Bienvenue au Chalet‑Hôtel L’Arolle.', mono: 'CHAMONIX · 1 035 M · −3 °C', contour: true,
      stubs: [{ l: 'PETIT-DÉJ.', v: '10:00', s: 'fin du service', dot: true }, { l: 'DÉPART', v: '10:30', s: 'avant' }, { l: 'RÉCEPTION', v: '7–22', s: 'Appeler →' }],
      rows: [
        { t: '07:30', state: 'now', title: 'Petit-déjeuner', sub: 'Salle du Poêle', badge: 'OUVERT' },
        { t: '16:00', state: '', title: 'Sauna & détente', sub: 'Sur réservation, 45 min' },
        { t: '19:00', state: '', title: 'Le Poêle', sub: 'Cuisine savoyarde' },
      ],
    }) }),
  });
  return {
    file: 'a-billet.html', title: 'Direction A — « Billet »', kicker: 'Pristi Guest · V2 · Concept A',
    blurb: 'Le séjour comme un billet d’embarquement : champ de couleur saturé, chiffres géants (l’heure est l’information n°1), frise « Aujourd’hui » sensible à l’heure, Wi‑Fi copiable dès l’accueil. Grotesque suisse (Bricolage Grotesque) + monospace pour les données.',
    css, screens, boardBg: '#d9dadd',
  };
}
