import { CompassIcon, ConciergeBell, House, Info } from 'lucide-react';

/** Les quatre destinations permanentes du livret. `match` liste les routes rattachées à l'onglet. */
export const NAV_ITEMS = [
  { to: '/', key: 'guest.nav.home', icon: House, match: ['/', '/wifi', '/petit-dejeuner'] },
  { to: '/decouvrir', key: 'guest.nav.discover', icon: CompassIcon, match: ['/decouvrir'] },
  { to: '/infos', key: 'guest.nav.info', icon: Info, match: ['/infos'] },
  { to: '/reception', key: 'guest.nav.contact', icon: ConciergeBell, match: ['/reception'] },
];

export const isActive = (item, pathname) => item.match.includes(pathname);
