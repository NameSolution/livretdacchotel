import { Check } from 'lucide-react';
import { LANGUAGES, useI18n } from '../../i18n';
import { useHotel } from '../../lib/hotel-context';
import Sheet from '../ui/Sheet';

export default function LanguageSheet({ open, onOpenChange }) {
  const { lang, setLang, t } = useI18n();
  const { hotel } = useHotel();
  const available = LANGUAGES.filter((l) => hotel.languages.includes(l.code));

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title={t('guest.language.title')}>
      <ul className="rule m-0 list-none p-0">
        {available.map((l) => (
          <li key={l.code} className="border-b border-line">
            <button
              type="button"
              lang={l.code}
              aria-current={l.code === lang ? 'true' : undefined}
              onClick={() => {
                setLang(l.code);
                onOpenChange(false);
              }}
              className="flex min-h-[3.5rem] w-full items-center justify-between gap-4 py-2 text-left"
            >
              <span>
                <span className="block text-[1.0625rem] font-semibold">{l.label}</span>
                <span className="small block">{t(l.status === 'complete' ? 'guest.language.complete' : 'guest.language.partial')}</span>
              </span>
              {l.code === lang ? <Check size={20} strokeWidth={2} className="shrink-0 text-accent-ink" aria-hidden /> : null}
            </button>
          </li>
        ))}
      </ul>
    </Sheet>
  );
}
