import { useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { AppLink } from '../../lib/hotel-context';
import { NAV_ITEMS, isActive } from './nav';

/** Barre inférieure : à portée de pouce, jamais sur le contenu (la page réserve `pb-nav`). */
export default function BottomNav() {
  const { pathname } = useLocation();
  const { t } = useI18n();
  return (
    <nav
      aria-label={t('guest.common.mainNav')}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper pb-[var(--safe-bottom)] lg:hidden"
    >
      <ul className="m-0 mx-auto grid max-w-xl list-none grid-cols-4 p-0">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item, pathname);
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <AppLink
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-[4.25rem] flex-col items-center justify-center gap-1 text-[0.75rem] font-semibold ${active ? 'text-accent-ink' : 'text-ink-2'}`}
              >
                {active ? <span className="absolute inset-x-6 top-0 h-0.5 bg-accent-ink" aria-hidden /> : null}
                <Icon size={22} strokeWidth={active ? 2 : 1.6} aria-hidden />
                <span>{t(item.key)}</span>
              </AppLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
