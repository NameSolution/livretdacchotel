// Direction C — « Souvenir » : un carnet de séjour ludique, façon carte postale et étiquette de bagage.
// Tuiles colorées à contour encre (une couleur = un service), police fantaisie chaleureuse (Caprasimo), mot du patron en écriture manuscrite.
import { icon, phone, qrSvg } from '../lib/kit.mjs';

const P = '../../public/images';
const AR = {
  name: 'L’Arolle', full: 'Chalet‑Hôtel L’Arolle', place: 'Chamonix · 1 035 m', ssid: 'Arolle-Chalet', pw: 'Edelweiss-1035', boss: 'Jérémie',
  hero: `${P}/arolle/hero-1280.webp`, bf: `${P}/arolle/breakfast-1280.webp`, hike: `${P}/arolle/hike-1280.webp`, ski: `${P}/arolle/ski-1280.webp`, cabin: `${P}/arolle/cabin-1280.webp`,
  note: 'Salut ! Ici Jérémie. Poêle allumé, café chaud, skis au chaud : faites comme chez vous.',
  vars: '--bg:#DCEAF3;--ink:#2B1A12;--c1:#CF3A1E;--c1t:#fff;--c2:#F4B63A;--c2t:#2B1A12;--c3:#2E4AA8;--c3t:#fff;--c4:#2F5D3E;--c4t:#fff;--c5:#F6B8B0;--c5t:#2B1A12;--paper:#FFFDF8;',
  tiles: { wifi: 'c1', bf: 'c2', out: 'c3', rec: 'c4', extra: 'c5' },
};
const VE = {
  name: 'Verrière', full: 'Maison Verrière', place: 'Lyon 2e', ssid: 'Verriere-Guest', pw: 'Soie-Pierre-42', boss: 'Camille',
  hero: `${P}/verriere/hero-1280.webp`, bf: `${P}/verriere/breakfast-1280.webp`, market: `${P}/verriere/market-1280.webp`,
  note: 'Coucou ! Ici Camille. Le café est chaud et la ville vous attend : faites comme chez vous.',
  vars: '--bg:#F6D5DC;--ink:#1B1740;--c1:#2B40D8;--c1t:#fff;--c2:#FF8A3D;--c2t:#1B1740;--c3:#BFE05B;--c3t:#1B1740;--c4:#1B1740;--c4t:#fff;--c5:#FFE066;--c5t:#1B1740;--paper:#FFFBF7;',
  tiles: { wifi: 'c1', bf: 'c2', out: 'c3', rec: 'c4', extra: 'c5' },
};

const sun = (c = 'currentColor') => `<svg width="46" height="46" viewBox="0 0 46 46" fill="none"><circle cx="23" cy="23" r="9" fill="${c}"/><g stroke="${c}" stroke-width="3" stroke-linecap="round">${Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; return `<path d="M${23 + Math.cos(a) * 13} ${23 + Math.sin(a) * 13}L${23 + Math.cos(a) * 19} ${23 + Math.sin(a) * 19}"/>`; }).join('')}</g></svg>`;

const nav = (on) => `<nav class="c-nav">${[['house', 'Chalet'], ['compass', 'Alentours'], ['info', 'Infos'], ['concierge-bell', 'Réception']].map(([i, l], n) => `<a class="${n === on ? 'on' : ''}"><span>${icon(i, 22, 2.2)}</span><b>${l}</b></a>`).join('')}</nav>`;

function home(h, { title, tiles, around }) {
  return `<div class="c-screen" style="${h.vars}">
    <header class="c-top"><div class="c-logo"><span>${h.name[0]}</span></div><b class="c-name">${h.name}</b><span class="c-lang">FR ${icon('chevron-right', 14, 3)}</span></header>
    <div class="c-hero">
      <figure class="c-postcard"><img src="${h.hero}" alt=""><figcaption>${h.place}</figcaption></figure>
      <div class="c-note"><p>${h.note}</p></div>
    </div>
    <h1 class="c-h1">${title}</h1>
    <section class="c-grid">
      <a class="tile wifi"><span class="ic">${icon('wifi', 26, 2.4)}</span><div><h3>Wi‑Fi</h3><p>${h.ssid}</p></div><button>${icon('copy', 16, 2.6)}Copier</button></a>
      <a class="tile bf"><span class="plate"><img src="${h.bf}" alt=""></span><h3>Petit‑déj’</h3><p>${tiles.bf}</p><em><u></u>en cours</em></a>
      <a class="tile out"><span class="ic">${icon('door-open', 26, 2.4)}</span><h3>Départ</h3><p>${tiles.out}</p></a>
      <a class="tile rec"><span class="ic">${icon('phone', 24, 2.4)}</span><h3>Réception</h3><p>${tiles.rec}</p></a>
      <a class="tile extra"><span class="ic">${icon(tiles.extraIcon, 26, 2.4)}</span><h3>${tiles.extraT}</h3><p>${tiles.extraS}</p></a>
    </section>
    ${nav(0)}
  </div>`;
}

async function wifi(h) {
  const qr = await qrSvg(`WIFI:T:WPA;S:${h.ssid};P:${h.pw};;`, h.vars.includes('#CF3A1E') ? '#2B1A12' : '#1B1740', '#ffffff');
  return `<div class="c-screen c-wifi" style="${h.vars}">
    <header class="c-top light"><button class="c-back">${icon('chevron-left', 22, 2.6)}</button><span class="c-lang">FR ${icon('chevron-right', 14, 3)}</span></header>
    <div class="c-sunbg">${sun('rgba(255,255,255,.28)')}</div>
    <h1 class="c-big">Wi‑Fi</h1>
    <p class="c-sub">Gratuit dans tout le chalet. Promis.</p>
    <div class="c-tag">
      <i class="hole"></i>
      <small>RÉSEAU</small><b>${h.ssid}</b>
      <small>MOT DE PASSE</small><code>${h.pw}</code>
      <button class="c-cta">${icon('copy', 22, 2.6)}Copier le mot de passe</button>
    </div>
    <ol class="c-steps"><li><b>1</b>Réglages Wi‑Fi</li><li><b>2</b>Choisir ${h.ssid}</li><li><b>3</b>Coller. C’est tout !</li></ol>
    <div class="c-qr"><div>${qr}</div><p>Un autre téléphone ?<br><b>Scannez-moi.</b></p></div>
    ${nav(0)}
  </div>`;
}

function breakfast(h) {
  return `<div class="c-screen c-bf" style="${h.vars}">
    <header class="c-top"><button class="c-back dark">${icon('chevron-left', 22, 2.6)}</button><span class="c-lang">FR ${icon('chevron-right', 14, 3)}</span></header>
    <div class="c-bigplate"><img src="${h.bf}" alt=""></div>
    <div class="c-sticker">tous<br>les jours</div>
    <h1 class="c-big dark">Petit‑<br>déj’</h1>
    <section class="c-menu">
      <h2>LE MENU DU MATIN</h2>
      <div class="l"><span>Service</span><i></i><b>7:30 → 10:00</b></div>
      <div class="l"><span>Adulte</span><i></i><b>22 €</b></div>
      <div class="l"><span>Enfant <small>(−4 ans : offert)</small></span><i></i><b>11 €</b></div>
      <div class="l"><span>Où ?</span><i></i><b>Salle du Poêle</b></div>
      <ul class="c-bul"><li>Tomme de Savoie &amp; charcuteries</li><li>Pain de campagne, miel, confitures maison</li><li>Pancakes, œufs à la demande</li><li>Müesli, fruits, chocolat chaud</li></ul>
    </section>
    <div class="c-bubble">${icon('sparkles', 16, 2.4)}Panier randonneur ? Commandez-le avant 20 h la veille.</div>
    ${nav(0)}
  </div>`;
}

export const css = `
.c-screen{position:absolute;inset:0;background:var(--bg);color:var(--ink);font-family:'Figtree',system-ui,sans-serif;font-size:15px;line-height:1.3;overflow:hidden}
.c-top{position:absolute;top:44px;left:0;right:0;height:56px;display:flex;align-items:center;gap:10px;padding:0 16px 0 18px;z-index:20}
.c-logo{width:40px;height:40px;border-radius:50%;background:var(--c2);border:2.5px solid var(--ink);display:grid;place-items:center;font:400 22px/1 'Caprasimo';color:var(--ink);box-shadow:2px 2px 0 var(--ink)}
.c-name{font:400 22px/1 'Caprasimo';letter-spacing:-.005em;flex:1}
.c-lang{height:36px;padding:0 10px 0 12px;border:2.5px solid var(--ink);border-radius:99px;background:var(--paper);display:flex;gap:4px;align-items:center;font:800 13px/1 'Figtree'}
.c-lang svg{transform:rotate(90deg)}
.c-top.light{color:#fff}.c-top.light .c-lang{color:var(--ink)}
.c-back{width:40px;height:40px;border-radius:50%;border:2.5px solid var(--ink);background:var(--paper);display:grid;place-items:center;color:var(--ink);box-shadow:2px 2px 0 var(--ink);margin-right:auto}
.c-hero{position:absolute;top:108px;left:16px;right:16px;height:176px}
.c-postcard{position:absolute;left:0;top:6px;width:178px;margin:0;background:#fff;padding:7px 7px 24px;border:2.5px solid var(--ink);border-radius:6px;transform:rotate(-3deg);box-shadow:3px 4px 0 var(--ink)}
.c-postcard img{width:100%;height:118px;object-fit:cover;object-position:50% 52%;border-radius:2px;display:block}
.c-postcard figcaption{position:absolute;left:0;right:0;bottom:5px;text-align:center;font:700 14px/1 'Caveat';letter-spacing:.01em}
.c-note{position:absolute;right:0;top:0;width:176px;background:var(--c2);border:2.5px solid var(--ink);border-radius:18px 18px 18px 4px;padding:12px 14px;transform:rotate(1.5deg);box-shadow:3px 4px 0 var(--ink);color:var(--c2t)}
.c-note p{font:600 19px/1.05 'Caveat'}
.c-h1{position:absolute;top:290px;left:18px;right:18px;font:400 38px/0.98 'Caprasimo';letter-spacing:-.01em;text-wrap:balance}
.c-grid{position:absolute;top:372px;left:16px;right:16px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.tile{position:relative;display:block;border:2.5px solid var(--ink);border-radius:22px;padding:12px 14px 12px;box-shadow:3px 4px 0 var(--ink);min-height:112px;overflow:hidden}
.tile h3{font:400 22px/1 'Caprasimo';margin:10px 0 3px}
.tile.bf h3{margin-top:30px}
.tile p{font:700 14px/1.15 'Figtree'}
.tile .ic{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.88);color:var(--ink);display:grid;place-items:center;border:2px solid var(--ink)}
.tile.wifi{grid-column:1/3;background:var(--c1);color:var(--c1t);display:flex;align-items:center;gap:12px;min-height:90px;padding:12px 14px}
.tile.wifi h3{margin:0 0 2px}
.tile.wifi>div{flex:1;min-width:0}
.tile.wifi button{height:44px;padding:0 14px;border-radius:99px;background:#fff;color:var(--ink);border:2.5px solid var(--ink);display:flex;gap:6px;align-items:center;font:800 14px/1 'Figtree';box-shadow:2px 2px 0 var(--ink)}
.tile.bf{background:var(--c2);color:var(--c2t)}
.tile.out{background:var(--c3);color:var(--c3t)}
.tile.rec{background:var(--c4);color:var(--c4t)}
.tile.extra{background:var(--c5);color:var(--c5t)}
.tile .plate{position:absolute;right:-12px;top:-12px;width:68px;height:68px;border-radius:50%;overflow:hidden;border:2.5px solid var(--ink);background:#fff}
.tile .plate img{width:100%;height:100%;object-fit:cover}
.tile em{position:absolute;right:10px;bottom:10px;display:flex;align-items:center;gap:5px;font:800 11px/1 'Figtree';font-style:normal;background:#fff;border:2px solid var(--ink);border-radius:99px;padding:5px 8px;color:var(--ink)}
.tile em u{width:7px;height:7px;border-radius:50%;background:#12a24c}
.c-nav{color:var(--ink);position:absolute;left:0;right:0;bottom:0;height:86px;background:var(--paper);border-top:2.5px solid var(--ink);display:flex;justify-content:space-around;padding:10px 8px 0;z-index:30}
.c-nav a{display:flex;flex-direction:column;align-items:center;gap:4px;width:80px}
.c-nav a span{width:54px;height:34px;border-radius:99px;display:grid;place-items:center}
.c-nav a.on span{background:var(--c2);border:2.5px solid var(--ink);box-shadow:2px 2px 0 var(--ink);color:var(--c2t)}
.c-nav b{font:800 12px/1 'Figtree'}
/* wifi */
.c-wifi{background:var(--c1);color:#fff}
.c-sunbg{position:absolute;right:-30px;top:60px;transform:scale(5.2);transform-origin:top right;opacity:1}
.c-big{position:absolute;top:112px;left:20px;font:400 84px/0.88 'Caprasimo';letter-spacing:-.02em;color:#fff}
.c-big.dark{color:var(--ink);font-size:76px;top:104px;z-index:5;line-height:.9}
.c-sub{position:absolute;top:212px;left:22px;font:700 17px/1.2 'Figtree';color:#fff}
.c-tag{position:absolute;top:268px;left:22px;right:22px;background:var(--paper);color:var(--ink);border:2.5px solid var(--ink);border-radius:26px;padding:34px 20px 18px;transform:rotate(-1.4deg);box-shadow:4px 6px 0 var(--ink)}
.c-tag .hole{position:absolute;top:10px;left:50%;margin-left:-11px;width:22px;height:22px;border-radius:50%;background:var(--c1);border:2.5px solid var(--ink)}
.c-tag small{display:block;font:800 11px/1 'Figtree';letter-spacing:.12em;opacity:.6}
.c-tag b{display:block;font:400 28px/1.05 'Caprasimo';margin:6px 0 14px}
.c-tag code{display:block;font:800 29px/1.1 'Figtree';letter-spacing:-.01em;margin:8px 0 16px;word-break:break-all;font-feature-settings:'zero'}
.c-cta{width:100%;height:60px;border-radius:99px;background:var(--c2);color:var(--c2t);border:2.5px solid var(--ink);box-shadow:3px 3px 0 var(--ink);display:flex;gap:10px;align-items:center;justify-content:center;font:800 18px/1 'Figtree'}
.c-steps{position:absolute;top:608px;left:22px;right:22px;list-style:none;margin:0;padding:0;display:flex;gap:8px}
.c-steps li{flex:1;background:rgba(255,255,255,.16);border:2px solid #fff;border-radius:16px;padding:8px 9px;font:700 12.5px/1.15 'Figtree';color:#fff}
.c-steps b{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#fff;color:var(--c1);font:800 12px/1 'Figtree';margin-bottom:5px}
.c-qr{position:absolute;top:686px;left:22px;display:flex;gap:12px;align-items:center;color:#fff;font:700 14px/1.15 'Figtree'}
.c-qr>div{width:62px;height:62px;border-radius:10px;background:#fff;border:2.5px solid var(--ink);padding:3px}
.c-qr svg{width:100%;height:100%}
.c-qr b{font:400 18px/1 'Caprasimo'}
/* petit-déj */
.c-bf{background:var(--c2)}
.c-bigplate{position:absolute;right:-96px;top:100px;width:290px;height:290px;border-radius:50%;overflow:hidden;border:3px solid var(--ink);box-shadow:4px 6px 0 var(--ink);background:#fff}
.c-bigplate img{width:100%;height:100%;object-fit:cover}
.c-sticker{position:absolute;left:104px;top:300px;width:84px;height:84px;border-radius:50%;background:var(--c1);color:#fff;border:2.5px solid var(--ink);display:grid;place-items:center;text-align:center;font:400 16px/1 'Caprasimo';transform:rotate(-12deg);z-index:6;box-shadow:2px 3px 0 var(--ink)}
.c-menu{position:absolute;top:404px;left:16px;right:16px;background:var(--paper);border:2.5px solid var(--ink);border-radius:24px;padding:16px 18px 12px;box-shadow:4px 5px 0 var(--ink)}
.c-menu h2{font:800 11px/1 'Figtree';letter-spacing:.14em;margin-bottom:8px;opacity:.65}
.c-menu .l{display:flex;align-items:baseline;gap:6px;font:700 16px/1.4 'Figtree'}
.c-menu .l i{flex:1;border-bottom:2.5px dotted rgba(43,26,18,.4);transform:translateY(-4px)}
.c-menu .l b{font:400 18px/1.2 'Caprasimo';font-variant-numeric:tabular-nums}
.c-menu small{font-weight:600;opacity:.7;font-size:12px}
.c-bul{list-style:none;padding:0;margin:10px 0 0;display:grid;gap:3px;font:600 14px/1.25 'Figtree'}
.c-bul li{padding-left:18px;position:relative}
.c-bul li::before{content:'';position:absolute;left:2px;top:6px;width:8px;height:8px;border-radius:50%;background:var(--c1);border:2px solid var(--ink)}
.c-bubble{position:absolute;left:16px;right:16px;bottom:100px;background:var(--c3);color:var(--c3t);border:2.5px solid var(--ink);border-radius:18px 18px 18px 4px;padding:10px 14px;display:flex;gap:8px;align-items:center;font:700 13px/1.2 'Figtree';box-shadow:3px 3px 0 var(--ink);z-index:2}
`;

export async function build() {
  const screens = [];
  screens.push({
    caption: 'C1 · Accueil — carte postale, mot du patron, tuiles (une couleur par service)',
    html: phone({ id: 'c1', status: 'dark', body: home(AR, {
      title: 'Faites comme chez vous.',
      tiles: { bf: '7:30 → 10:00', out: 'avant 10:30', rec: '7 h → 22 h', extraIcon: 'flame', extraT: 'Sauna', extraS: '16 h → 20 h' },
    }) }),
  });
  screens.push({ caption: 'C2 · Wi-Fi — l’étiquette de bagage à copier', html: phone({ id: 'c2', status: 'light', body: await wifi(AR) }) });
  screens.push({ caption: 'C3 · Petit-déj’ — la carte du matin, façon menu de brasserie', html: phone({ id: 'c3', status: 'dark', body: breakfast(AR) }) });
  screens.push({
    caption: 'C4 · Même système, autre hôtel — rose, cobalt, citron',
    html: phone({ id: 'c4', status: 'dark', body: home(VE, {
      title: 'Faites comme chez vous.',
      tiles: { bf: '7:00 → 10:30', out: 'avant 11:00', rec: '24 h/24', extraIcon: 'wine', extraT: 'Le Comptoir', extraS: '12 h · 19 h' },
    }) }),
  });
  return {
    file: 'c-souvenir.html', title: 'Direction C — « Souvenir »', kicker: 'Pristi Guest · V2 · Concept C',
    blurb: 'Un carnet de séjour chaleureux et tactile : carte postale, mot manuscrit du patron, tuiles à contour encre (une couleur par service), étiquette de bagage pour le Wi‑Fi. Caprasimo + Figtree. Le contraire d’un template : l’hôtel a une voix.',
    css, screens, boardBg: '#e8e2d6',
  };
}
