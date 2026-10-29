/** Ligne de méta d'un lieu : « type · distance ». Les éléments absents sont omis. */
export function distanceLabel(place, t) {
  if (place.onsite) return t('guest.discover.onsite');
  const d = place.distance;
  if (!d) return null;
  return `${d.approx ? t('guest.discover.approx') : ''}${t(`guest.discover.${d.mode}`, { min: d.min })}`;
}

export function placeMeta(place, t, L) {
  return [L(place.type), distanceLabel(place, t)].filter(Boolean).join(' · ');
}
