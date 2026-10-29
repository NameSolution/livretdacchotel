import { useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { AppLink, useHotel } from '../../lib/hotel-context';
import Photo from '../ui/Photo';
import { LanguageButton, Wordmark } from './TopBar';
import { NAV_ITEMS, isActive } from './nav';

const PAGE_KEY = { '/': 'home', '/wifi': 'wifi', '/petit-dejeuner': 'breakfast', '/infos': 'info', '/decouvrir': 'discover', '/reception': 'contact' };

/** Colonne latérale du grand écran : photographie de la page, identité de l'hôtel et navigation. */
export default function Aside({ onOpenLanguage }) {
  const { pathname } = useLocation();
  const { hotel } = useHotel();
  const { t, L } = useI18n();
  const imageKey = hotel.aside[PAGE_KEY[pathname] ?? 'home'] ?? 'hero';

  return (
    <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line lg:flex">
      <div className="relative min-h-0 flex-1">
        <Photo key={`${hotel.id}-${imageKey}`} image={hotel.images[imageKey]} ratio="fill" sizes="(min-width:1024px) 42vw, 100vw" priority className="fade-in h-full w-full" />
      </div>
      <div className="px-10 pb-7 pt-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <AppLink to="/" className="block">
              <Wordmark className="!text-[1.75rem]" />
            </AppLink>
            <p className="small mt-1.5">{L(hotel.descriptor)}</p>
          </div>
          <LanguageButton onOpen={onOpenLanguage} className="-mr-3 shrink-0" />
        </div>
        <nav aria-label={t('guest.common.mainNav')} className="mt-5">
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item, pathname);
              return (
                <li key={item.to}>
                  <AppLink
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-flex min-h-11 items-center border-b-2 text-[0.9375rem] font-semibold ${active ? 'border-accent-ink text-accent-ink' : 'border-transparent text-ink-2 hover:text-ink'}`}
                  >
                    {t(item.key)}
                  </AppLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
