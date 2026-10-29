import { useI18n } from '../i18n';
import { useHotel } from '../lib/hotel-context';
import { PHOTO_SOURCES } from '../data/credits';
import { PageHeader, useDocumentTitle } from '../components/ui/Page';

export default function Credits() {
  const { hotel } = useHotel();
  const { t, L } = useI18n();
  useDocumentTitle(t('guest.credits.title'));
  const sources = PHOTO_SOURCES[hotel.id] ?? {};
  return (
    <>
      <PageHeader title={t('guest.credits.title')} lead={t('guest.credits.lead')} />
      <p className="small mb-6">{t('guest.credits.license')}</p>
      <ul className="rule m-0 list-none p-0">
        {Object.entries(sources).map(([key, id]) => (
          <li key={key} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-[0.9375rem]">
            <span className="min-w-0">{hotel.images[key] ? L(hotel.images[key].alt) : key}</span>
            <a href={`https://images.unsplash.com/photo-${id}`} target="_blank" rel="noopener noreferrer" className="link-arrow shrink-0 underline underline-offset-2">
              Unsplash
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
