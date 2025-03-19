import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

const LanguageSwitcher: React.FC = () => {
  const { languages, currentLanguage, changeLanguage, t } = useTranslation();
  
  return (
    <div className="flex items-center">
      <label className="mr-2 text-sm font-medium text-gray-700">{t('common.language')}</label>
      <select
        className="bg-white text-black border border-gray-300 rounded-md shadow-sm py-1 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
