import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useI18n } from '../i18n';
import { useHotel } from '../lib/hotel-context';
import { findInfo } from '../lib/selectors';
import { telHref } from '../lib/format';
import { PageHeader, useDocumentTitle } from '../components/ui/Page';
import { DisclosureItem, DisclosureList } from '../components/ui/Disclosure';
import PageFooter from '../components/layout/PageFooter';

const EMERGENCY = [
  { number: '112', key: 'n112' },
  { number: '15', key: 'n15' },
  { number: '17', key: 'n17' },
  { number: '18', key: 'n18' },
  { number: '3237', key: 'n3237' },
];

function EmergencyNumbers() {
  const { t } = useI18n();
  return (
    <div className="mb-2">
      <p className="small mb-2">{t('guest.emergency.lead')}</p>
      <ul className="rule m-0 list-none p-0">
        {EMERGENCY.map((e) => (
          <li key={e.number} className="border-b border-line">
            <a href={telHref(e.number)} className="flex min-h-14 items-center gap-4 py-2 hover:bg-paper-2">
              <span className="display tnum w-16 shrink-0 text-[1.625rem] leading-none text-accent-ink">{e.number}</span>
              <span className="min-w-0 flex-1 text-[0.9375rem] font-medium">{t(`guest.emergency.${e.key}`)}</span>
              <Phone size={18} strokeWidth={1.75} className="shrink-0 text-ink-2" aria-label={t('guest.common.call')} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Info() {
  const { hotel } = useHotel();
  const { t, L } = useI18n();
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState('');
  const go = params.get('go');
  const didScroll = useRef(null);
  useDocumentTitle(t('guest.info.title'));

  // Lien profond : ?go=<rubrique> ouvre l'élément et fait défiler jusqu'à lui.
  useEffect(() => {
    if (!go || didScroll.current === go) return undefined;
    const found = findInfo(hotel, go);
    if (!found) return undefined;
    didScroll.current = go;
    if (found.item) setOpen(found.item.id);
    const target = document.getElementById(found.item ? `topic-${found.item.id}` : `group-${found.group.id}`);
    const timer = setTimeout(() => target?.scrollIntoView({ block: 'start', behavior: 'auto' }), 60);
    return () => clearTimeout(timer);
  }, [go, hotel]);

  const jump = (id) => {
    const next = new URLSearchParams(params);
    next.set('go', id);
    didScroll.current = null;
    setParams(next, { replace: true });
  };

  return (
    <>
      <PageHeader title={t('guest.info.title')} lead={t('guest.info.lead')} />

      <nav aria-label={t('guest.info.jump')} className="-mx-5 mb-2 overflow-x-auto px-5 no-scrollbar lg:mx-0 lg:px-0">
        <ul className="m-0 flex w-max list-none gap-2 p-0 lg:w-auto lg:flex-wrap">
          {hotel.info.groups.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => jump(g.id)}
                className="flex min-h-11 items-center whitespace-nowrap rounded-full border border-line px-4 text-[0.875rem] font-semibold hover:border-ink"
              >
                {L(g.title)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {hotel.info.groups.map((group) => (
        <section key={group.id} id={`group-${group.id}`} aria-labelledby={`h-${group.id}`} className="mt-10">
          <h2 id={`h-${group.id}`} className="display h-section mb-4">
            {L(group.title)}
          </h2>
          {group.emergency ? <EmergencyNumbers /> : null}
          <DisclosureList value={group.items.some((i) => i.id === open) ? open : ''} onValueChange={(v) => setOpen(v)}>
            {group.items.map((item) => (
              <DisclosureItem key={item.id} id={item.id} title={L(item.title)} summary={item.summary ? L(item.summary) : null}>
                {item.body ? <p className="body">{L(item.body)}</p> : null}
                {item.bullets ? (
                  <ul className="body m-0 list-disc space-y-1.5 pl-5 marker:text-accent-ink">
                    {item.bullets.map((b, i) => (
                      <li key={i}>{L(b)}</li>
                    ))}
                  </ul>
                ) : null}
              </DisclosureItem>
            ))}
          </DisclosureList>
        </section>
      ))}
      <PageFooter />
    </>
  );
}
