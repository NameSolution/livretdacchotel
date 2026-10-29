import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Phone } from 'lucide-react';
import { useI18n } from '../i18n';
import { useHotel } from '../lib/hotel-context';
import { mapsHref, telHref } from '../lib/format';
import { CATEGORIES, placesByCategory } from '../lib/selectors';
import { Fact, PageHeader, useDocumentTitle } from '../components/ui/Page';
import Photo from '../components/ui/Photo';
import Sheet from '../components/ui/Sheet';
import PageFooter from '../components/layout/PageFooter';
import { placeMeta } from '../components/PlaceMeta';

function FeaturedPlace({ place, image, onOpen }) {
  const { t, L } = useI18n();
  return (
    <button type="button" onClick={onOpen} className="group block w-full text-left">
      <Photo image={image} ratio="3 / 2" sizes="(min-width:1024px) 600px, 100vw" className="rounded" />
      <span className="mt-3 flex items-start justify-between gap-3">
        <span className="min-w-0">
          <span className="display block text-[1.5rem] leading-tight">{L(place.name)}</span>
          <span className="small mt-1 block">{placeMeta(place, t, L)}</span>
        </span>
        <ChevronRight size={20} strokeWidth={1.75} className="mt-1.5 shrink-0 text-ink-2 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
      <span className="body mt-2 line-clamp-2 block text-ink-2">{L(place.description)}</span>
    </button>
  );
}

function PlaceRow({ place, image, onOpen }) {
  const { t, L } = useI18n();
  return (
    <button type="button" onClick={onOpen} className="group flex w-full items-center gap-4 border-b border-line py-4 text-left hover:bg-paper-2">
      {image ? <Photo image={image} ratio="1 / 1" sizes="96px" className="h-[5.5rem] w-[5.5rem] shrink-0 rounded" /> : null}
      <span className="min-w-0 flex-1">
        <span className="block text-[1.0625rem] font-semibold leading-snug">{L(place.name)}</span>
        <span className="small block">{placeMeta(place, t, L)}</span>
        <span className="small mt-1 line-clamp-2 block">{L(place.description)}</span>
      </span>
      <ChevronRight size={18} strokeWidth={1.75} className="shrink-0 text-ink-2" aria-hidden />
    </button>
  );
}

function PlaceDetail({ place, onClose }) {
  const { hotel } = useHotel();
  const { t, L } = useI18n();
  const image = hotel.images[place.image];
  return (
    <Sheet open onOpenChange={(o) => !o && onClose()} title={L(place.name)} description={L(place.description)}>
      {image ? <Photo image={image} ratio="3 / 2" sizes="512px" className="mb-4 rounded" /> : null}
      <p className="small">{placeMeta(place, t, L)}</p>
      <p className="body mt-3">{L(place.description)}</p>
      <dl className="m-0 mt-4 border-t border-line">
        {place.hours ? <Fact label={t('guest.discover.hours')}>{L(place.hours)}</Fact> : null}
        {place.address ? <Fact label={t('guest.discover.address')}>{L(place.address)}</Fact> : null}
        {place.phone ? <Fact label={t('guest.discover.phone')}>{place.phone}</Fact> : null}
      </dl>
      {place.mapsQuery || place.phone ? (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {place.mapsQuery ? (
            <a href={mapsHref(place.mapsQuery)} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1">
              {t('guest.common.directions')}
              <ArrowUpRight size={18} strokeWidth={2} aria-hidden />
              <span className="sr-only">(↗)</span>
            </a>
          ) : null}
          {place.phone ? (
            <a href={telHref(place.phone)} className="btn btn-outline flex-1">
              <Phone size={18} strokeWidth={1.75} aria-hidden />
              {t('guest.common.call')}
            </a>
          ) : null}
        </div>
      ) : null}
    </Sheet>
  );
}

export default function Discover() {
  const { hotel } = useHotel();
  const { t, L } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const tabsRef = useRef(null);
  useDocumentTitle(t('guest.discover.title'));

  const available = CATEGORIES.filter((c) => placesByCategory(hotel, c).length);
  const requested = params.get('cat');
  const cat = available.includes(requested) ? requested : available[0];
  const places = placesByCategory(hotel, cat);
  const [featured, ...others] = places;
  const selected = hotel.discover.places.find((p) => p.id === params.get('place'));

  // Garde l'onglet actif visible dans la bande défilante.
  useEffect(() => {
    tabsRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [cat]);

  const setCat = (c) => {
    const next = new URLSearchParams(params);
    next.set('cat', c);
    next.delete('place');
    setParams(next, { replace: true });
  };
  const openPlace = (p) => {
    const next = new URLSearchParams(params);
    next.set('cat', p.cat);
    next.set('place', p.id);
    navigate({ search: `?${next}` }, { state: { sheet: true } });
  };
  const closePlace = () => {
    if (location.state?.sheet) navigate(-1);
    else {
      const next = new URLSearchParams(params);
      next.delete('place');
      setParams(next, { replace: true });
    }
  };

  return (
    <>
      <PageHeader title={t('guest.discover.title')} lead={t('guest.discover.lead')} />

      <div ref={tabsRef} role="tablist" aria-label={t('guest.discover.title')} className="-mx-5 flex overflow-x-auto border-b border-line px-5 no-scrollbar lg:mx-0 lg:px-0">
        {available.map((c) => (
          <button
            key={c}
            role="tab"
            id={`tab-${c}`}
            aria-selected={c === cat}
            aria-controls="places-panel"
            onClick={() => setCat(c)}
            className={`-mb-px min-h-12 shrink-0 whitespace-nowrap border-b-2 px-0 pr-6 text-[0.9375rem] font-semibold ${c === cat ? 'border-accent-ink text-ink' : 'border-transparent text-ink-2 hover:text-ink'}`}
          >
            {t(`guest.discover.cat.${c}`)}
          </button>
        ))}
      </div>

      <div id="places-panel" role="tabpanel" aria-labelledby={`tab-${cat}`} className="pt-6">
        {featured ? (
          <>
            <FeaturedPlace place={featured} image={hotel.images[featured.image]} onOpen={() => openPlace(featured)} />
            <div className="mt-6 border-t border-line">
              {others.map((p) => (
                <PlaceRow key={p.id} place={p} image={hotel.images[p.image]} onOpen={() => openPlace(p)} />
              ))}
            </div>
          </>
        ) : (
          <p className="small">{t('guest.discover.empty')}</p>
        )}
      </div>

      {selected ? <PlaceDetail key={selected.id} place={selected} onClose={closePlace} /> : null}
      <PageFooter />
    </>
  );
}
