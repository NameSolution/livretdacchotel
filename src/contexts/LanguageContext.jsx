import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['fr', 'en', 'es', 'it', 'de', 'pl', 'pt'];
    if (supportedLangs.includes(browserLang)) {
      setLanguage(browserLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);