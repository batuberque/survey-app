import { useTranslation } from 'react-i18next';

const useLanguageToggle = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return {
    language: i18n.language,
    toggleLanguage,
    t,
  };
};

export default useLanguageToggle;
