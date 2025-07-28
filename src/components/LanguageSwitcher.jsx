import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'fr', name: '🇫🇷 FR', label: 'Français' },
    { code: 'en', name: '🇬🇧 EN', label: 'English' },
    { code: 'es', name: '🇪🇸 ES', label: 'Español' },
    { code: 'it', name: '🇮🇹 IT', label: 'Italiano' },
    { code: 'de', name: '🇩🇪 DE', label: 'Deutsch' },
    { code: 'pl', name: '🇵🇱 PL', label: 'Polski' },
    { code: 'pt', name: '🇵🇹 PT', label: 'Português' },
  ];

  const currentLang = languages.find(l => l.code === language);
  const otherLangs = languages.filter(l => l.code !== language);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1"
      >
        <span>{currentLang.name}</span>
      </Button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-20 bg-white rounded-lg shadow-lg border border-slate-200 z-10">
          {otherLangs.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;