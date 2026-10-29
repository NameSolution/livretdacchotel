// Direction B — « Séquence » : le livret comme une scène de film. Photo plein cadre qui change avec le moment,
// tiroir (bottom sheet) qui porte toute la navigation dans la zone du pouce, typographie d'affiche (Syne).
import { icon, phone, qrSvg } from '../lib/kit.mjs';

const P = '../../public/images';
const AR = {
  name: 'L’AROLLE', full: 'Chalet‑Hôtel L’Arolle', place: 'Chamonix · 1 035 m', ssid: 'Arolle-Chalet', pw: 'Edelweiss-1035',
  hero: `${P}/arolle/hero-1280.webp`, sunset: `${P}/arolle/sunset-1280.webp`, bf: `${P}/arolle/breakfast-1280.webp`,
  vars: '--night:#0D100E;--sheet:#F2F2EF;--ink:#101311;--muted:#656A66;--accent:#FF5A1F;--on-accent:#101311;--accent-ink:#B83A0A;--soft:#DCE9EF;--line:rgba(16,19,17,.12);',
};
const VE = {
  name: 'MAISON VERRIÈRE', full: 'Maison Verrière', place: 'Lyon 2e', ssid: 'Verriere-Guest', pw: 'Soie-Pierre-42',
  hero: `${P}/verriere/hero-1280.webp`,
  vars: '--night:#0A0B14;--sheet:#F3F3F5;--ink:#0E0F18;--muted:#62657A;--accent:#6A4CFF;--on-accent:#ffffff;--accent-ink:#4A2FE0;--soft:#E3E0FF;--line:rgba(14,15,24,.12);',
};

const tabs = (on) => `<div class="b-tabs">${['Séjour', 'Découvrir', 'Infos', 'Réception'].map((t, i) => `<a class="${i === on ? 'on' : ''}">${t}</a>`).join('')}</div>`;

function sceneTop(h, { light = true, back = false }) {
  return `<header class="b-top">${back ? `<button class="b-back">${icon('chevron-left', 22, 2)}</button>` : `<div class="b-mark"><b>${h.name}</b><small>${h.place}</small></div>`}<span class="b-lang">FR</span></header>`;
}

function home(h, { status, title, now, quick, evening, objectPos }) {
  return `<div class="b-screen" style="${h.vars}">
    <img class="b-bg" src="${h.hero}" alt="" style="object-position:${objectPos}">
    <div class="b-scrim"></div>
    ${sceneTop(h, {})}
    <div class="b-hero-text">
      <p class="b-status"><u></u>${status}</p>
      <h1 class="${title.length > 24 ? 'long' : ''}">${title}</h1>
    </div>
    <section class="b-sheet" style="top:455px">
      <i class="b-handle"></i>
      ${tabs(0)}
      <div class="b-now"><span class="b-now-ic">${icon('coffee', 22, 2)}</span><div><small>EN COURS</small><b>${now.t}</b><span>${now.s}</span></div>${icon('chevron-right', 20, 2)}</div>
      <div class="b-quick">${quick.map((q, i) => `<a class="${i === 0 ? 'primary' : ''}"><span>${icon(q.i, 24, 2)}</span><b>${q.l}</b><small>${q.v}</small></a>`).join('')}</div>
      <h2>CE SOIR</h2>
      <ul class="b-list">${evening.map((e) => `<li><span class="tm">${e.t}</span><div><b>${e.b}</b><small>${e.s}</small></div>${icon('chevron-right', 18, 2)}</li>`).join('')}</ul>
    </section>
  </div>`;
}

async function wifi(h) {
  const qr = await qrSvg(`WIFI:T:WPA;S:${h.ssid};P:${h.pw};;`, '#101311', '#ffffff');
  return `<div class="b-screen" style="${h.vars}">
    <img class="b-bg" src="${h.sunset}" alt="" style="object-position:50% 40%;height:380px;inset:0 0 auto 0">
    <div class="b-scrim top"></div>
    ${sceneTop(h, { back: true })}
    <div class="b-page-title" style="top:150px"><small>CONNEXION GRATUITE</small><h1>Wi‑Fi</h1></div>
    <section class="b-sheet" style="top:300px">
      <i class="b-handle"></i>
      <div class="b-pw"><small>RÉSEAU</small><b>${h.ssid}</b><small>MOT DE PASSE</small><code>${h.pw}</code></div>
      <button class="b-cta">${icon('copy', 22, 2.2)}Copier le mot de passe</button>
      <ol class="b-steps"><li><b>1</b>Réglages Wi‑Fi de votre appareil</li><li><b>2</b>Choisir <u>${h.ssid}</u></li><li><b>3</b>Coller le mot de passe</li></ol>
      <div class="b-qr"><div>${qr}</div><p><b>Pour un autre téléphone</b>Scannez avec l’appareil photo, la connexion se fait toute seule.</p></div>
    </section>
  </div>`;
}

function breakfast(h) {
  return `<div class="b-screen" style="${h.vars}">
    <img class="b-bg" src="${h.bf}" alt="" style="height:430px;inset:0 0 auto 0">
    <div class="b-scrim top"></div><div class="b-scrim mid"></div>
    ${sceneTop(h, { back: true })}
    <div class="b-page-title" style="top:216px"><small>PETIT‑DÉJEUNER</small><h1 class="md">Petit‑déjeuner du chalet</h1><span class="b-pill"><u></u>Aujourd’hui · 7:30 → 10:00 · en cours</span></div>
    <section class="b-sheet" style="top:452px">
      <i class="b-handle"></i>
      <div class="b-facts">
        <div><small>HORAIRES</small><b>7:30 – 10:00</b><span>tous les jours</span></div>
        <div><small>TARIF</small><b>22 €</b><span>enfant 11 € · gratuit −4 ans</span></div>
      </div>
      <div class="b-where">${icon('map-pin', 18, 2)}<span><b>Salle du Poêle</b> · rez-de-chaussée, près du salon</span></div>
      <h2>AU BUFFET</h2>
      <ul class="b-menu">
        <li><span>Tomme de Savoie &amp; charcuteries de la vallée</span></li>
        <li><span>Pain de campagne, miel de montagne, confitures maison</span></li>
        <li><span>Pancakes, œufs à la demande</span></li>
        <li><span>Müesli, fruits secs &amp; frais, chocolat chaud</span></li>
      </ul>
      <div class="b-tip">${icon('sparkles', 18, 2)}<span><b>Panier randonneur</b> à commander à la réception avant 20 h la veille.</span></div>
    </section>
  </div>`;
}

export const css = `
.b-screen{position:absolute;inset:0;background:var(--night);color:#fff;font-family:'Hanken',system-ui,sans-serif;font-size:15px;line-height:1.35;overflow:hidden}
.b-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.b-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 40%,rgba(0,0,0,.72) 66%,rgba(0,0,0,.86) 100%)}
.b-scrim.top{background:linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,0) 40%);height:380px;bottom:auto}
.b-scrim.mid{inset:auto 0 0 0;height:280px;top:150px;background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.72) 100%);bottom:auto}
.b-top{position:absolute;top:44px;left:0;right:0;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 18px 0 22px;z-index:12}
.b-mark b{display:block;font:800 17px/1 'Archivo';letter-spacing:.08em;font-stretch:100%}
.b-mark small{display:block;font:500 11px/1 'Hanken';letter-spacing:.1em;text-transform:uppercase;opacity:.8;margin-top:5px}
.b-lang{height:34px;min-width:44px;display:grid;place-items:center;border-radius:99px;background:rgba(0,0,0,.45);font:700 12px/1 'Hanken';letter-spacing:.08em}
.b-back{width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,.45);display:grid;place-items:center;color:#fff}
.b-hero-text{position:absolute;left:22px;right:22px;top:262px}
.b-status{display:flex;align-items:center;gap:8px;font:600 13px/1.2 'Hanken';letter-spacing:.02em;margin-bottom:12px}
.b-status u{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 35%,transparent)}
.b-hero-text h1{font:800 68px/0.9 'Archivo';letter-spacing:-.01em;font-stretch:66%;text-transform:uppercase;text-wrap:balance}
.b-sheet{position:absolute;left:0;right:0;bottom:0;background:var(--sheet);color:var(--ink);border-radius:28px 28px 0 0;padding:10px 20px 0;box-shadow:0 -20px 40px -10px rgba(0,0,0,.35);z-index:10;overflow:hidden}
.b-handle{display:block;width:40px;height:4px;border-radius:2px;background:rgba(0,0,0,.18);margin:0 auto 12px}
.b-tabs{display:flex;gap:4px;margin:0 -4px 14px;border-bottom:1px solid var(--line)}
.b-tabs a{padding:8px 10px 12px;font:700 14px/1 'Hanken';color:var(--muted);position:relative}
.b-tabs a.on{color:var(--ink)}
.b-tabs a.on::after{content:'';position:absolute;left:10px;right:10px;bottom:-1px;height:3px;border-radius:2px;background:var(--accent)}
.b-now{display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:16px;background:var(--soft)}
.b-now-ic{width:44px;height:44px;border-radius:50%;background:var(--accent);color:var(--on-accent);display:grid;place-items:center;flex:none}
.b-now>div{flex:1}
.b-now small{display:block;font:700 10px/1 'Hanken';letter-spacing:.12em;color:var(--accent-ink)}
.b-now b{display:block;font:800 20px/1.1 'Archivo';font-stretch:80%;text-transform:uppercase;margin-top:4px}
.b-now span:last-child{font-size:13px;color:var(--muted)}
.b-quick{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:14px}
.b-quick a{display:flex;flex-direction:column;align-items:center;text-align:center;gap:0}
.b-quick a>span{width:64px;height:64px;border-radius:50%;background:#fff;border:1.5px solid var(--line);display:grid;place-items:center;margin-bottom:8px}
.b-quick a.primary>span{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.b-quick b{font:700 13px/1.1 'Hanken'}
.b-quick small{font:500 11px/1.2 'Hanken';color:var(--muted);margin-top:3px}
.b-sheet h2{font:700 11px/1 'Hanken';letter-spacing:.14em;color:var(--muted);margin:20px 0 4px}
.b-list{list-style:none;padding:0;margin:0}
.b-list li{display:flex;align-items:center;gap:14px;padding:11px 0;border-top:1px solid var(--line)}
.b-list .tm{font:800 20px/1 'Archivo';font-stretch:75%;width:56px;font-variant-numeric:tabular-nums}
.b-list li>div{flex:1}.b-list b{display:block;font:700 15px/1.2 'Hanken'}.b-list small{font-size:13px;color:var(--muted)}
.b-list svg{color:var(--muted)}
/* pages intérieures */
.b-page-title{position:absolute;left:22px;right:22px;z-index:11}
.b-page-title small{font:700 11px/1 'Hanken';letter-spacing:.14em;opacity:.85}
.b-page-title h1{font:800 76px/0.9 'Archivo';letter-spacing:-.01em;font-stretch:66%;text-transform:uppercase;margin-top:8px}
.b-page-title h1.md{font-size:52px}
.b-hero-text h1.long{font-size:56px}
.b-pw{padding:6px 0 0}
.b-pw small{display:block;font:700 10px/1 'Hanken';letter-spacing:.14em;color:var(--muted)}
.b-pw b{display:block;font:800 28px/1.1 'Archivo';font-stretch:80%;text-transform:uppercase;margin:6px 0 18px}
.b-pw code{display:block;margin-top:8px;font:600 32px/1.05 'GeistMono';letter-spacing:-.04em;color:var(--ink);word-break:break-all}
.b-cta{width:100%;height:62px;border-radius:16px;background:var(--accent);color:var(--on-accent);display:flex;gap:10px;align-items:center;justify-content:center;font:800 18px/1 'Archivo';font-stretch:85%;text-transform:uppercase;letter-spacing:.04em;margin-top:18px}
.b-steps{list-style:none;padding:0;margin:16px 0 0}
.b-steps li{display:flex;gap:14px;align-items:center;padding:10px 0;border-top:1px solid var(--line);font-size:15px}
.b-steps b{width:26px;height:26px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font:700 13px/1 'Hanken';flex:none}
.b-steps u{text-decoration:none;font-weight:700}
.b-qr{display:flex;gap:14px;align-items:center;margin-top:8px;border-top:1px solid var(--line);padding-top:12px}
.b-qr>div{width:72px;height:72px;flex:none;border-radius:8px;border:1px solid var(--line);padding:3px;background:#fff}
.b-qr svg{width:100%;height:100%}
.b-qr p{font-size:13px;color:var(--muted);line-height:1.3}.b-qr b{display:block;color:var(--ink);font-size:14px}
.b-page-title .b-pill{display:inline-flex;align-items:center;gap:8px;margin-top:14px;background:var(--accent);color:var(--on-accent);font:700 12px/1 'Hanken';padding:9px 12px;border-radius:99px}
.b-page-title .b-pill u{width:7px;height:7px;border-radius:50%;background:var(--on-accent)}
.b-page-title h1[style]{}
.b-facts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:2px}
.b-facts>div{border:1.5px solid var(--line);background:#fff;border-radius:16px;padding:12px 14px}
.b-facts small{display:block;font:700 10px/1 'Hanken';letter-spacing:.14em;color:var(--muted)}
.b-facts b{display:block;font:800 30px/1 'Archivo';font-stretch:70%;margin:7px 0 4px;font-variant-numeric:tabular-nums;white-space:nowrap}
.b-facts span{font-size:12px;color:var(--muted)}
.b-where{display:flex;gap:10px;align-items:center;margin:14px 0 0;font-size:14px}
.b-where svg{color:var(--accent-ink)}
.b-menu{list-style:none;padding:0;margin:0}
.b-menu li{padding:11px 0;border-top:1px solid var(--line);font:600 15px/1.25 'Hanken'}
.b-tip{display:flex;gap:10px;align-items:flex-start;margin-top:10px;background:var(--soft);border-radius:14px;padding:12px 14px;font-size:13.5px}
.b-tip svg{color:var(--accent-ink);margin-top:1px}
`;

export async function build() {
  const screens = [];
  screens.push({
    caption: 'B1 · Accueil — la scène + le tiroir (nav, accès, « ce soir »)',
    html: phone({ id: 'b1', status: 'light', body: home(AR, {
      status: 'Poêle allumé · −3 °C · neige fine', title: 'Bienvenue au chalet', objectPos: '50% 38%',
      now: { t: 'Petit-déjeuner', s: 'Salle du Poêle · jusqu’à 10:00' },
      quick: [{ i: 'wifi', l: 'Wi‑Fi', v: 'copier' }, { i: 'coffee', l: 'Petit‑déj', v: '7:30–10' }, { i: 'door-open', l: 'Départ', v: '10:30' }, { i: 'concierge-bell', l: 'Réception', v: '7–22 h' }],
      evening: [{ t: '16:00', b: 'Sauna & détente', s: 'Sur réservation · 45 min' }, { t: '19:00', b: 'Le Poêle', s: 'Cuisine savoyarde' }],
    }) }),
  });
  screens.push({ caption: 'B2 · Wi‑Fi — la photo reste, le tiroir porte l’action', html: phone({ id: 'b2', status: 'light', body: await wifi(AR) }) });
  screens.push({ caption: 'B3 · Petit-déjeuner — photo d’ouverture, faits au premier plan', html: phone({ id: 'b3', status: 'light', body: breakfast(AR) }) });
  screens.push({
    caption: 'B4 · Même système, autre hôtel — nuit urbaine, accent iris',
    html: phone({ id: 'b4', status: 'light', body: home(VE, {
      status: 'Ciel couvert · 14 °C · terrasse ouverte dès 17 h', title: 'Bienvenue à la Maison Verrière', objectPos: '58% 50%',
      now: { t: 'Petit-déjeuner', s: 'Salle des Verrières · jusqu’à 10:30' },
      quick: [{ i: 'wifi', l: 'Wi‑Fi', v: 'copier' }, { i: 'coffee', l: 'Petit‑déj', v: '7–10:30' }, { i: 'door-open', l: 'Départ', v: '11:00' }, { i: 'concierge-bell', l: 'Réception', v: '24 h/24' }],
      evening: [{ t: '12:00', b: 'Le Comptoir Verrière', s: 'Déjeuner jusqu’à 14:00' }, { t: '17:00', b: 'Bar & terrasse', s: 'Cocktails, vins au verre' }],
    }) }),
  });
  return {
    file: 'b-sequence.html', title: 'Direction B — « Séquence »', kicker: 'Pristi Guest · V2 · Concept B',
    blurb: 'Le livret comme une scène de film : la photo occupe tout l’écran, un tiroir ancré dans la zone du pouce porte la navigation et les accès (plus de barre d’onglets). Un seul statut vivant (« poêle allumé · −3 °C ») donne le ton. Typographie d’affiche (Archivo condensé, capitales) + Hanken Grotesk.',
    css, screens, boardBg: '#cfd3d1',
  };
}
