import { useI18n } from '../../i18n';
import { AppLink, useHotel } from '../../lib/hotel-context';

/** Pied de page sobre : mention de démonstration, crédit photos et « Propulsé par Pristi » très discret. */
export default function PageFooter() {
  const { hotel } = useHotel();
  const { t } = useI18n();
  return (
    <footer className="mt-14 border-t border-line pb-2 pt-5 text-center">
      {hotel.demo ? <p className="small">{t('guest.discover.demoNotice')}</p> : null}
      <p className="small mt-2 flex items-center justify-center gap-3 opacity-80">
        <span>{t('guest.common.poweredBy')}</span>
        <span aria-hidden>·</span>
        <AppLink to="/credits" className="underline underline-offset-2">
          {t('guest.common.credits')}
        </AppLink>
      </p>
    </footer>
  );
}
