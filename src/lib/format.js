/** Formate "07:30" selon la langue ; 24 h partout sauf en anglais. */
export function formatTime(hhmm, lang) {
  const [h, m] = hhmm.split(':').map(Number);
  if (lang === 'en') {
    const suffix = h >= 12 ? 'pm' : 'am';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
  }
  return lang === 'fr' ? `${h} h ${String(m).padStart(2, '0')}`.replace(' 00', '') : `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export const formatRange = (from, to, lang) => `${formatTime(from, lang)} – ${formatTime(to, lang)}`;

export const telHref = (phone) => `tel:${phone.replace(/[^+\d]/g, '')}`;

export const mapsHref = (query) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
