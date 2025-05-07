import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { usePrayerTimes } from '../contexts/PrayerTimesContext';
import PrayerTimesDisplay from './PrayerTimesDisplay';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const PrayerTimesContainer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {
    prayerData,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    selectedGovernorate,
    setSelectedGovernorate,
    governoratesList
  } = usePrayerTimes();

  const isRTL = i18n.language === 'ar';

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const hijriDate = prayerData?.date?.hijri;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-surface rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{t('app.subtitle')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="governorate" className="block text-sm font-medium mb-2">
              {t('settings.governorate')}
            </label>
            <select
              id="governorate"
              value={selectedGovernorate}
              onChange={(e) => setSelectedGovernorate(e.target.value)}
              className="dropdown w-full"
            >
              {governoratesList.map((gov) => (
                <option key={gov.value} value={gov.value}>
                  {t(`governorates.${gov.label}`)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              {t('settings.date')}
            </label>
            <div className="relative">
              <DatePicker
                id="date"
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
                className="input w-full"
                dateFormat="dd/MM/yyyy"
              />
              {!isToday(selectedDate) && (
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className={`absolute top-1/2 -translate-y-1/2 text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary-dark transition-colors ${
                    isRTL ? 'left-2' : 'right-2'
                  }`}
                >
                  {t('labels.today')}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {hijriDate && (
          <div className="mt-4 text-center">
            <span className="text-sm font-medium text-muted">
              {t('labels.hijriDate')}: {hijriDate.day} {hijriDate.month.ar || hijriDate.month.en} {hijriDate.year}
            </span>
          </div>
        )}
      </div>
      
      {prayerData && <PrayerTimesDisplay prayerData={prayerData} />}
    </div>
  );
};

export default PrayerTimesContainer;