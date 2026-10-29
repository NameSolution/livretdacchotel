import { useI18n } from '../i18n';
import { AppLink } from '../lib/hotel-context';
import { PageHeader, useDocumentTitle } from '../components/ui/Page';

export default function NotFound() {
  const { t } = useI18n();
  useDocumentTitle('404');
  return (
    <>
      <PageHeader eyebrow="404" title={t('guest.error.notFound')} />
      <AppLink to="/" className="btn btn-primary">
        {t('guest.error.home')}
      </AppLink>
    </>
  );
}
