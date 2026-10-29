import { ArrowRight, ArrowUpRight, Coffee, DoorOpen, Phone, Wifi } from 'lucide-react';
import { useI18n } from '../i18n';
import { AppLink, useHotel } from '../lib/hotel-context';
import { formatRange, formatTime, telHref } from '../lib/format';
import { breakfastToday, indexEntries } from '../lib/selectors';
import Photo from '../components/ui/Photo';
import Rich from '../components/ui/Rich';
import WeatherNote from '../components/WeatherNote';
import PageFooter from '../components/layout/PageFooter';
import { useDocumentTitle } from '../components/ui/Page';
import { placeMeta } from '../components/PlaceMeta';

function SectionTitle({ id, children, action }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 id={id} className="display h-section">
        {children}
      </h2>
      {action}
    </div>
  );
}

/** Quatre accès immédiats, groupés dans un seul panneau structuré (pas quatre cartes identiques). */
function Essentials() {
  const { hotel } = useHotel();
  const { t, L, lang } = useI18n();
  const today = breakfastToday(hotel.breakfast);
  const cell = 'group relative block px-[1.125rem] py-3.5 transition-colors hover:bg-paper-2';
  const label = (Icon, text) => (
    <span className="eyebrow flex items-center gap-2">
      <Icon size={16} strokeWidth={1.75} className="text-accent-ink" aria-hidden />
      {text}
    </span>
  );
  const withArrow = (text) => (
    <span className="display tnum mt-1 block whitespace-nowrap text-[clamp(1rem,4.9vw,1.3125rem)] leading-tight">
      {text}
      <ArrowUpRight size={16} strokeWidth={1.75} className="ml-1.5 inline-block align-[-1px] text-ink-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
    </span>
  );

  return (
    <section aria-labelledby="essentials-h" className="mt-5">
      <h2 id="essentials-h" className="sr-only">
        {t('guest.home.essentials')}
      </h2>
      <div className="overflow-hidden rounded border border-line">
        {hotel.wifi ? (
          <AppLink to="/wifi" className={`${cell} flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-line`}>
            <span className="min-w-0">
              {label(Wifi, t('guest.quick.wifi.label'))}
              <span className="display mt-1 block break-words text-[1.5rem] leading-tight">{hotel.wifi.ssid}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-[0.8125rem] font-semibold text-accent-ink">
              {t('guest.wifi.password')}
              <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </AppLink>
        ) : null}
        <div className="grid divide-y divide-line border-b border-line min-[360px]:grid-cols-2 min-[360px]:divide-x min-[360px]:divide-y-0">
          {today ? (
            <AppLink to="/petit-dejeuner" className={cell}>
              {label(Coffee, t('guest.quick.breakfast.label'))}
              {withArrow(formatRange(today.from, today.to, lang))}
            </AppLink>
          ) : null}
          {hotel.stay?.checkOut ? (
            <AppLink to="/infos?go=checkout" className={cell}>
              {label(DoorOpen, t('guest.quick.checkout.label'))}
              {withArrow(t('guest.quick.checkout.value', { time: formatTime(hotel.stay.checkOut, lang) }))}
            </AppLink>
          ) : null}
        </div>
        {hotel.contact ? (
          <div className="flex items-center">
            <AppLink to="/reception" className={`${cell} min-w-0 flex-1`}>
              {label(Phone, t('guest.quick.reception.label'))}
              <span className="display tnum mt-1 block text-[1.3125rem] leading-tight">{hotel.contact.always ? t('guest.quick.allDay') : L(hotel.contact.shortHours ?? hotel.contact.hours)}</span>
            </AppLink>
            {hotel.contact.phone ? (
              <a
                href={telHref(hotel.contact.phone)}
                className="mx-3 flex min-h-12 shrink-0 items-center gap-2 rounded bg-accent px-4 text-[0.9375rem] font-semibold text-on-accent"
                aria-label={`${t('guest.common.call')} — ${hotel.contact.phone}`}
              >
                <Phone size={18} strokeWidth={2} aria-hidden />
                {t('guest.common.call')}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Daily() {
  const { hotel } = useHotel();
  const { t, L } = useI18n();
  if (!hotel.services?.length) return null;
  return (
    <section aria-labelledby="daily-h" className="mt-12">
      <SectionTitle id="daily-h">{t('guest.home.services')}</SectionTitle>
      <ul className="rule m-0 list-none p-0">
        {hotel.services.map((s) => (
          <li key={s.id} className="border-b border-line">
            <AppLink to={`/infos?go=${s.id}`} className="flex items-baseline justify-between gap-4 py-3.5 hover:bg-paper-2 sm:-mx-2 sm:px-2">
              <span className="min-w-0">
                <span className="block text-[1.0625rem] font-semibold leading-snug">{L(s.title)}</span>
                {s.detail ? <span className="small block">{L(s.detail)}</span> : null}
              </span>
              <span className="tnum shrink-0 text-right text-[0.9375rem] font-medium leading-snug">{L(s.hours)}</span>
            </AppLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Nearby() {
  const { hotel } = useHotel();
  const { t, L } = useI18n();
  const places = (hotel.home.featured ?? [])
    .map((id) => hotel.discover.places.find((p) => p.id === id))
    .filter(Boolean);
  if (!places.length) return null;
  const [lead, ...rest] = places;
  const to = (p) => `/decouvrir?cat=${p.cat}&place=${p.id}`;

  return (
    <section aria-labelledby="nearby-h" className="mt-12">
      <SectionTitle
        id="nearby-h"
        action={
          <AppLink to="/decouvrir" className="link-arrow flex min-h-11 items-center gap-1 text-[0.9375rem]">
            {t('guest.home.seeAll')}
            <ArrowRight size={16} strokeWidth={2} aria-hidden />
          </AppLink>
        }
      >
        {t('guest.home.nearby')}
      </SectionTitle>
      <AppLink to={to(lead)} className="group block">
        <Photo image={hotel.images[lead.image]} ratio="3 / 2" sizes="(min-width:1024px) 600px, 100vw" className="rounded" />
        <span className="mt-3 block text-[1.1875rem] font-semibold leading-snug">{L(lead.name)}</span>
        <span className="small block">{placeMeta(lead, t, L)}</span>
      </AppLink>
      {rest.length ? (
        <div className="mt-6 grid grid-cols-2 gap-x-4">
          {rest.map((p) => (
            <AppLink key={p.id} to={to(p)} className="group block">
              <Photo image={hotel.images[p.image]} ratio="4 / 3" sizes="(min-width:1024px) 300px, 50vw" className="rounded" />
              <span className="mt-2.5 block text-[1rem] font-semibold leading-snug">{L(p.name)}</span>
              <span className="small block">{placeMeta(p, t, L)}</span>
            </AppLink>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function Index() {
  const { hotel } = useHotel();
  const { t } = useI18n();
  const entries = indexEntries(hotel);
  return (
    <section aria-labelledby="index-h" className="mt-12">
      <SectionTitle id="index-h">{t('guest.home.more')}</SectionTitle>
      <ul className="rule m-0 list-none p-0">
        {entries.map((e) => (
          <li key={e.key} className="border-b border-line">
            <AppLink to={e.to} className="flex min-h-14 items-center justify-between gap-4 py-2 text-[1.0625rem] font-medium hover:text-accent-ink">
              {t(`guest.index.${e.key}`)}
              <ArrowUpRight size={18} strokeWidth={1.75} className="shrink-0 text-ink-2" aria-hidden />
            </AppLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

const SECTIONS = { essentials: Essentials, services: Daily, nearby: Nearby, index: Index };

export default function Home() {
  const { hotel } = useHotel();
  const { L, t } = useI18n();
  useDocumentTitle(hotel.name);

  return (
    <>
      {/* La photographie d'accueil vit dans la colonne latérale sur grand écran. */}
      <div className="-mx-5 sm:mx-0 lg:hidden">
        <Photo image={hotel.images.hero} ratio="16 / 10" sizes="(min-width:640px) 640px, 100vw" priority className="sm:rounded" />
      </div>

      <header className="pt-5 lg:pt-14">
        <p className="eyebrow mb-2.5">{L(hotel.descriptor)}</p>
        <h1 className="display h-page">
          <Rich text={L(hotel.welcome.title)} />
        </h1>
        <p className="lead mt-3 max-w-[34rem]">{L(hotel.welcome.message)}</p>
        <div className="mt-2.5 flex min-h-[1.3rem] flex-wrap items-baseline justify-between gap-x-4">
          {hotel.welcome.signature ? <p className="small italic">{L(hotel.welcome.signature)}</p> : <span />}
          <WeatherNote />
        </div>
      </header>

      {hotel.home.sections.map((name) => {
        const Section = SECTIONS[name];
        return Section ? <Section key={name} /> : null;
      })}
      <PageFooter />
    </>
  );
}
