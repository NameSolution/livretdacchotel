// Fonctions pures de lecture des données d'un hôtel (testées dans src/lib/selectors.test.js).

/** Plage du petit-déjeuner applicable au jour donné (0 = dimanche), ou la première par défaut. */
export function breakfastToday(breakfast, date = new Date()) {
  if (!breakfast?.hours?.length) return null;
  const day = date.getDay();
  return breakfast.hours.find((h) => h.weekdays?.includes(day)) ?? breakfast.hours[0];
}

export const placesByCategory = (hotel, cat) => hotel.discover.places.filter((p) => p.cat === cat);

export const findInfo = (hotel, id) => {
  for (const group of hotel.info.groups) {
    if (group.id === id) return { group, item: null };
    const item = group.items.find((i) => i.id === id);
    if (item) return { group, item };
  }
  return null;
};

/** Rubriques complémentaires de l'accueil : seules celles dont la destination existe sont conservées. */
export function indexEntries(hotel) {
  const hasInfo = (id) => Boolean(findInfo(hotel, id));
  const hasCat = (cat) => placesByCategory(hotel, cat).length > 0;
  return [
    { key: 'parking', to: '/infos?go=parking', ok: hasInfo('parking') },
    { key: 'services', to: '/infos?go=services', ok: hasInfo('services') },
    { key: 'equipment', to: '/infos?go=equipment', ok: hasInfo('equipment') },
    { key: 'rules', to: '/infos?go=rules', ok: hasInfo('rules') },
    { key: 'restaurants', to: '/decouvrir?cat=restaurants', ok: hasCat('restaurants') },
    { key: 'activities', to: '/decouvrir?cat=sights', ok: hasCat('sights') },
    { key: 'transport', to: '/decouvrir?cat=transport', ok: hasCat('transport') },
    { key: 'useful', to: '/infos?go=useful', ok: hasInfo('useful') },
  ].filter((e) => e.ok);
}

export const CATEGORIES = ['restaurants', 'sights', 'transport', 'services'];
