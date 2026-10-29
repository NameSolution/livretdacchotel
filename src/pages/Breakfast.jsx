import { useI18n } from '../i18n';
import { useHotel } from '../lib/hotel-context';
import { formatRange } from '../lib/format';
import { breakfastToday } from '../lib/selectors';
import { Fact, PageHeader, useDocumentTitle } from '../components/ui/Page';
import Photo from '../components/ui/Photo';
import PageFooter from '../components/layout/PageFooter';

/** Fiche de service : tout champ absent est masqué, rien n'est inventé. */
export default function Breakfast() {
  const { hotel } = useHotel();
  const { t, L, lang } = useI18n();
  const b = hotel.breakfast;
  useDocumentTitle(t('guest.breakfast.title'));
  if (!b) return null;
  const today = breakfastToday(b);

  return (
    <>
      <div className="-mx-5 sm:mx-0 lg:hidden">
        <Photo image={hotel.images[b.image]} ratio="4 / 3" sizes="(min-width:640px) 640px, 100vw" priority className="sm:rounded" />
      </div>
      <PageHeader eyebrow={t('guest.breakfast.title')} title={L(b.title)} lead={b.intro ? L(b.intro) : null} className="pt-6 lg:pt-12" />

      <dl className="m-0 border-t border-line">
        {b.hours?.length ? (
          <Fact label={t('guest.breakfast.hours')}>
            <ul className="m-0 list-none space-y-2 p-0">
              {b.hours.map((h) => {
                const isToday = h === today;
                return (
                  <li key={h.from + h.to} className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className={isToday ? 'font-semibold' : 'text-ink-2'}>
                      {L(h.days)}
                      {isToday && b.hours.length > 1 ? <span className="ml-2 rounded-sm bg-accent-soft px-1.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-accent-ink">{t('guest.breakfast.todayLabel')}</span> : null}
                    </span>
                    <span className={`tnum ${isToday ? 'font-semibold' : ''}`}>{formatRange(h.from, h.to, lang)}</span>
                  </li>
                );
              })}
            </ul>
          </Fact>
        ) : null}
        {b.price ? (
          <Fact label={t('guest.breakfast.price')}>
            <ul className="m-0 list-none space-y-1 p-0">
              {b.price.adult ? (
                <li className="flex justify-between gap-4">
                  <span>{t('guest.breakfast.perAdult')}</span>
                  <span className="tnum font-semibold">{b.price.adult}</span>
                </li>
              ) : null}
              {b.price.child ? (
                <li className="flex justify-between gap-4">
                  <span>{t('guest.breakfast.perChild')}</span>
                  <span className="tnum font-semibold">{b.price.child}</span>
                </li>
              ) : null}
            </ul>
            {b.price.note ? <p className="small mt-2">{L(b.price.note)}</p> : null}
          </Fact>
        ) : null}
        {b.place ? <Fact label={t('guest.breakfast.place')}>{L(b.place)}</Fact> : null}
      </dl>

      {b.buffet?.length ? (
        <section className="mt-10" aria-labelledby="buffet-h">
          <h2 id="buffet-h" className="display h-section mb-4">
            {t('guest.breakfast.buffet')}
          </h2>
          <ul className="rule m-0 list-none p-0">
            {b.buffet.map((item, i) => (
              <li key={i} className="border-b border-line py-3 text-[1.0625rem]">
                {L(item)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {b.notes?.length ? (
        <section className="mt-10" aria-labelledby="know-h">
          <h2 id="know-h" className="display h-section mb-4">
            {t('guest.breakfast.goodToKnow')}
          </h2>
          <ul className="m-0 list-none space-y-3 p-0">
            {b.notes.map((n, i) => (
              <li key={i} className="body border-l-2 border-accent-ink pl-4">
                {L(n)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <PageFooter />
    </>
  );
}
