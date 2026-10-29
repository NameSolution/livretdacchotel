import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import { useI18n } from '../../i18n';
import { AppLink, useBack, useHotel } from '../../lib/hotel-context';

export function Wordmark({ className = '' }) {
  const { hotel } = useHotel();
  if (hotel.logo?.src) return <img src={hotel.logo.src} alt={hotel.name} className={`h-7 w-auto ${className}`} />;
  return <span className={`display text-[1.1875rem] leading-none ${className}`}>{hotel.name}</span>;
}

export function LanguageButton({ onOpen, className = '' }) {
  const { lang, t } = useI18n();
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${t('guest.common.openLanguage')} (${lang.toUpperCase()})`}
      className={`flex h-11 items-center gap-1.5 rounded px-3 text-[0.8125rem] font-semibold tracking-wide text-ink hover:bg-paper-2 ${className}`}
    >
      <Globe size={18} strokeWidth={1.6} aria-hidden />
      {lang.toUpperCase()}
    </button>
  );
}

/** En-tête mobile compact (56 px) : nom de l'hôtel sur l'accueil, retour ailleurs, langue toujours à droite. */
export default function TopBar({ onOpenLanguage }) {
  const { pathname } = useLocation();
  const { t } = useI18n();
  const back = useBack();
  const [scrolled, setScrolled] = useState(false);
  const home = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-30 bg-paper transition-shadow lg:hidden ${scrolled ? 'shadow-[0_1px_0_rgb(var(--line))]' : ''}`}>
      <div className="mx-auto flex h-14 max-w-page items-center justify-between pl-5 pr-2">
        {home ? (
          <AppLink to="/" className="min-w-0 truncate" aria-label={t('guest.nav.home')}>
            <Wordmark />
          </AppLink>
        ) : (
          <button type="button" onClick={back} className="-ml-3 flex h-11 items-center gap-1.5 rounded pl-2 pr-3 text-[0.9375rem] font-semibold hover:bg-paper-2">
            <ArrowLeft size={20} strokeWidth={1.75} aria-hidden />
            {t('guest.common.back')}
          </button>
        )}
        <LanguageButton onOpen={onOpenLanguage} />
      </div>
    </header>
  );
}
