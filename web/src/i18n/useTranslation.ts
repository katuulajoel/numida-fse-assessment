import { useTranslation as useI18nTranslation } from 'react-i18next';

export function useTranslation() {
  const { t, i18n } = useI18nTranslation();
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  
  // Available languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'lg', name: 'Luganda' }
  ];
  
  const currentLanguage = i18n.language;
  
  return {
    t,
    i18n,
    changeLanguage,
    languages,
    currentLanguage
  };
}
