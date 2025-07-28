
import { useLanguage } from '@/contexts/LanguageContext';
import { getContent } from '@/lib/contentConfig';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (path) => {
    return getContent(path, language);
  };

  return { t, language };
};
