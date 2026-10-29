import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';
import Aside from './Aside';
import BottomNav from './BottomNav';
import LanguageSheet from './LanguageSheet';
import PreviewBar from './PreviewBar';
import ScrollManager from './ScrollManager';
import TopBar from './TopBar';

/**
 * Cadre commun. Mobile : en-tête compact + contenu + barre inférieure.
 * Grand écran (≥ 1024 px) : colonne photographique fixe à gauche, contenu à droite.
 */
export default function Shell() {
  const [langOpen, setLangOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useI18n();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-3 focus:text-paper">
        {t('guest.common.skip')}
      </a>
      <PreviewBar />
      <div className="min-h-dvh lg:grid lg:grid-cols-[minmax(24rem,5fr)_7fr]">
        <Aside onOpenLanguage={() => setLangOpen(true)} />
        <div className="min-w-0">
          <TopBar onOpenLanguage={() => setLangOpen(true)} />
          <main id="main" tabIndex={-1} className="mx-auto w-full max-w-page px-5 pb-[calc(var(--nav-h)+var(--safe-bottom)+2rem)] outline-none lg:px-10 lg:pb-20">
            <div key={pathname} className="page-enter">
              <Outlet />
            </div>
          </main>
          <BottomNav />
        </div>
      </div>
      <ScrollManager />
      <LanguageSheet open={langOpen} onOpenChange={setLangOpen} />
    </>
  );
}
