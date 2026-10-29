import { useEffect, useRef, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Check, ChevronDown, Copy, QrCode } from 'lucide-react';
import { useI18n } from '../i18n';
import { useHotel } from '../lib/hotel-context';
import { copyText } from '../lib/clipboard';
import { PageHeader, useDocumentTitle } from '../components/ui/Page';
import PageFooter from '../components/layout/PageFooter';

/** Syntaxe « WIFI:T:WPA;S:réseau;P:mot-de-passe;; » reconnue par les appareils photo iOS et Android. */
export const wifiPayload = ({ ssid, password, security = 'WPA' }) => {
  // Le caractère antislash (code 92) doit lui aussi être échappé dans la charge utile.
  const BS = String.fromCharCode(92);
  const esc = (s) => s.split(BS).join(BS + BS).replace(/[;,:"]/g, (c) => BS + c);
  return `WIFI:T:${security};S:${esc(ssid)};P:${esc(password)};;`;
};

function WifiQr({ wifi }) {
  const { t } = useI18n();
  const [svg, setSvg] = useState(null);
  useEffect(() => {
    let alive = true;
    import('qrcode')
      .then((QR) => QR.toString(wifiPayload(wifi), { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#222724', light: '#ffffff' } }))
      .then((out) => alive && setSvg(out))
      .catch(() => alive && setSvg(null));
    return () => {
      alive = false;
    };
  }, [wifi]);
  if (!svg) return <p className="small">…</p>;
  return (
    <div
      role="img"
      aria-label={t('guest.wifi.qrAlt', { network: wifi.ssid })}
      className="mx-auto aspect-square w-48 rounded border border-line bg-white p-1 [&>svg]:h-full [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default function Wifi() {
  const { hotel } = useHotel();
  const { t, L } = useI18n();
  const wifi = hotel.wifi;
  const [state, setState] = useState('idle'); // idle | copied | failed
  const pwRef = useRef(null);
  const timer = useRef();
  useDocumentTitle(t('guest.wifi.title'));
  useEffect(() => () => clearTimeout(timer.current), []);

  if (!wifi) return null;

  const selectPassword = () => {
    const node = pwRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const onCopy = async () => {
    clearTimeout(timer.current);
    const ok = await copyText(wifi.password);
    if (ok) {
      setState('copied');
      timer.current = setTimeout(() => setState('idle'), 2600);
    } else {
      setState('failed');
      selectPassword();
    }
  };

  const copied = state === 'copied';

  return (
    <>
      <PageHeader title={t('guest.wifi.title')} lead={t('guest.wifi.lead')} />

      <section aria-label={t('guest.wifi.title')} className="overflow-hidden rounded border border-line">
        <div className="px-5 py-4">
          <p className="eyebrow">{t('guest.wifi.network')}</p>
          <p className="mt-1.5 break-all text-[1.375rem] font-semibold leading-tight">{wifi.ssid}</p>
        </div>
        <div className="border-t border-line bg-accent-soft px-5 py-5">
          <p className="eyebrow">{t('guest.wifi.password')}</p>
          <p
            ref={pwRef}
            onClick={selectPassword}
            className="mt-2 select-all break-all text-[1.875rem] font-semibold leading-[1.15] tracking-[0.01em] [font-variant-ligatures:none] [font-feature-settings:'zero','tnum'] sm:text-[2.125rem]"
          >
            {wifi.password}
          </p>
        </div>
        <div className="border-t border-line p-4">
          <button type="button" onClick={onCopy} className={`btn w-full min-h-14 text-base ${copied ? 'border border-accent-ink/40 bg-accent-soft text-accent-ink' : 'btn-primary'}`}>
            {copied ? <Check size={20} strokeWidth={2.25} aria-hidden /> : <Copy size={19} strokeWidth={2} aria-hidden />}
            {copied ? t('guest.wifi.copied') : t('guest.wifi.copy')}
          </button>
          <div role="status" aria-live="polite">
            {copied ? <span className="sr-only">{t('guest.wifi.copied')}</span> : null}
            {state === 'failed' ? <p className="small mt-3 text-ink">{t('guest.wifi.copyFailed')}</p> : null}
          </div>
        </div>
      </section>

      {wifi.note ? <p className="small mt-4">{L(wifi.note)}</p> : null}

      <section className="mt-10" aria-labelledby="steps-h">
        <h2 id="steps-h" className="display h-section mb-4">
          {t('guest.wifi.stepsTitle')}
        </h2>
        <ol className="m-0 list-none space-y-0 p-0">
          {[t('guest.wifi.step1'), t('guest.wifi.step2', { network: wifi.ssid }), t('guest.wifi.step3')].map((text, i) => (
            <li key={i} className="flex gap-4 border-t border-line py-4 last:border-b">
              <span className="display w-6 shrink-0 text-[1.5rem] leading-none text-accent-ink" aria-hidden>
                {i + 1}
              </span>
              <span className="body">{text}</span>
            </li>
          ))}
        </ol>
      </section>

      <Accordion.Root type="single" collapsible className="mt-8">
        <Accordion.Item value="qr" className="border-y border-line">
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-3 py-3 text-left font-semibold">
              <span className="flex items-center gap-3">
                <QrCode size={20} strokeWidth={1.75} className="text-accent-ink" aria-hidden />
                {t('guest.wifi.qrShow')}
              </span>
              <ChevronDown size={20} strokeWidth={1.75} aria-hidden className="shrink-0 text-ink-2 transition-transform group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="accordion-content overflow-hidden">
            <div className="space-y-4 pb-6 text-center">
              <WifiQr wifi={wifi} />
              <p className="small mx-auto max-w-[22rem]">{t('guest.wifi.qrHint')}</p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

      <PageFooter />
    </>
  );
}
