
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import translations from '@/lib/locales';

import Header from '@/components/layout/Header';
import MobileNav from '@/components/layout/MobileNav';
import AccueilSection from '@/sections/AccueilSection';
import DecouvrirSection from '@/sections/DecouvrirSection';
import ContactSection from '@/sections/ContactSection';


const AppContent = () => {
  const [activeSection, setActiveSection] = useState('accueil');
  const { language } = useLanguage();
  const t = useMemo(() => translations[language] || translations.fr, [language]);

  const renderSection = () => {
    switch (activeSection) {
      case 'accueil':
        return <AccueilSection t={t} />;
      case 'decouvrir':
        return <DecouvrirSection t={t} />;
      case 'contact':
        return <ContactSection t={t} />;
      default:
        return <AccueilSection t={t} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <html lang={language} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""/>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col font-sans">
        <Header t={t} />
        
        <main className="flex-grow pt-24 pb-28 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>

        <MobileNav activeSection={activeSection} setActiveSection={setActiveSection} t={t} />
        <Toaster />
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
