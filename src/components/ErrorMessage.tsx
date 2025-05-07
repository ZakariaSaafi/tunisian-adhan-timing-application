import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';
import { usePrayerTimes } from '../contexts/PrayerTimesContext';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { t } = useTranslation();
  const { fetchPrayerTimes } = usePrayerTimes();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <div className="bg-error/10 p-6 rounded-xl max-w-md w-full text-center">
        <AlertTriangle className="h-12 w-12 text-error mx-auto mb-4" />
        <h2 className="text-lg font-semibold mb-2">{t('labels.error')}</h2>
        <p className="text-muted mb-4">{message}</p>
        <button 
          onClick={fetchPrayerTimes}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;