import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingSpinner: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium">{t('labels.loading')}</p>
    </div>
  );
};

export default LoadingSpinner;