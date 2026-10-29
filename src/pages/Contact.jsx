import { Clock, Mail, Phone } from 'lucide-react';
import { useI18n } from '../i18n';
import { useHotel } from '../lib/hotel-context';
import { telHref } from '../lib/format';
import { Fact, PageHeader, useDocumentTitle } from '../components/ui/Page';
import PageFooter from '../components/layout/PageFooter';
import Photo from '../components/ui/Photo';

export default function Contact() {
  const { hotel } = useHotel();
  const { t, L } = useI18n();
  const c = hotel.contact;
  useDocumentTitle(t('guest.contact.title'));
  if (!c) return null;

  return (
    <>
      <div className="-mx-5 sm:mx-0 lg:hidden">
        <Photo image={hotel.images[hotel.aside.contact]} ratio="16 / 9" sizes="(min-width:640px) 640px, 100vw" className="sm:rounded" />
      </div>
      <PageHeader title={t('guest.contact.title')} lead={t('guest.contact.lead')} className="pt-6 lg:pt-12" />

      {c.hours ? (
        <p className="mb-5 flex items-center gap-2 text-[0.9375rem] font-semibold">
          <Clock size={18} strokeWidth={1.75} className="text-accent-ink" aria-hidden />
          {L(c.hours)}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        {c.phone ? (
          <a href={telHref(c.phone)} className="btn btn-primary min-h-14 flex-1 text-base">
            <Phone size={20} strokeWidth={2} aria-hidden />
            {t('guest.contact.callCta')}
          </a>
        ) : null}
        {c.email ? (
          <a href={`mailto:${c.email}`} className="btn btn-outline min-h-14 flex-1 text-base">
            <Mail size={20} strokeWidth={1.75} aria-hidden />
            {t('guest.contact.emailCta')}
          </a>
        ) : null}
      </div>

      <dl className="m-0 mt-8 border-t border-line">
        <Fact label={t('guest.contact.phone')}>{c.phone ? <a href={telHref(c.phone)} className="tnum font-semibold underline-offset-2 hover:underline">{c.phone}</a> : null}</Fact>
        <Fact label={t('guest.contact.email')}>{c.email ? <a href={`mailto:${c.email}`} className="font-semibold underline-offset-2 hover:underline">
            {c.email.split('@')[0]}@<wbr />{c.email.split('@')[1]}
          </a> : null}</Fact>
        <Fact label={t('guest.contact.address')}>{c.address ? L(c.address) : null}</Fact>
        <Fact label={t('guest.contact.languages')}>{c.languages?.length ? c.languages.join(' · ') : null}</Fact>
      </dl>

      {c.ext ? <p className="body mt-6 border-l-2 border-accent-ink pl-4">{t('guest.contact.inRoom', { ext: c.ext })}</p> : null}
      {hotel.demo ? <p className="small mt-4">{t('guest.contact.fictionalNumber')}</p> : null}
      <PageFooter />
    </>
  );
}
