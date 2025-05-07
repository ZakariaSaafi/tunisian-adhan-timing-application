import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <div className="relative">
      <select
        value={i18n.language}
        onChange={changeLanguage}
        className="dropdown appearance-none pr-8"
        aria-label={t('settings.language')}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;