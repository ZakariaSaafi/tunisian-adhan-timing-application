import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Sunrise, Sunset, Moon } from 'lucide-react';

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Firstthird: string;
  Lastthird: string;
  [key: string]: string;
}

interface PrayerData {
  timings: Timings;
  date: {
    readable: string;
    gregorian: {
      date: string;
    };
    hijri: {
      date: string;
    };
  };
}

interface PrayerTimesDisplayProps {
  prayerData: PrayerData;
}

const formatTime = (time: string): string => {
  // Extract hours and minutes from the time string (which may include "(EET)")
  const match = time.match(/(\d{2}):(\d{2})/);
  if (match) {
    return `${match[1]}:${match[2]}`;
  }
  return time;
};

const PrayerTimesDisplay: React.FC<PrayerTimesDisplayProps> = ({ prayerData }) => {
  const { t } = useTranslation();
  
  const { timings } = prayerData;
  
  const mainPrayers = [
    { name: 'fajr', time: formatTime(timings.Fajr), icon: <Sunrise className="h-5 w-5 text-primary" /> },
    { name: 'dhuhr', time: formatTime(timings.Dhuhr), icon: <Clock className="h-5 w-5 text-warning" /> },
    { name: 'asr', time: formatTime(timings.Asr), icon: <Clock className="h-5 w-5 text-accent" /> },
    { name: 'maghrib', time: formatTime(timings.Maghrib), icon: <Sunset className="h-5 w-5 text-secondary" /> },
    { name: 'isha', time: formatTime(timings.Isha), icon: <Moon className="h-5 w-5 text-primary-dark" /> }
  ];
  
  const secondaryTimes = [
    { name: 'sunrise', time: formatTime(timings.Sunrise), icon: <Sunrise className="h-5 w-5 text-warning" /> },
    { name: 'imsak', time: formatTime(timings.Imsak), icon: <Clock className="h-5 w-5 text-primary" /> }
  ];
  
  const additionalTimes = [
    { name: 'firstthird', time: formatTime(timings.Firstthird), icon: <Moon className="h-5 w-5 text-secondary" /> },
    { name: 'lastthird', time: formatTime(timings.Lastthird), icon: <Moon className="h-5 w-5 text-primary" /> }
  ];

  return (
    <div className="animate-fade-in">
      {/* Main prayers */}
      <h3 className="text-xl font-medium mb-4">{t('app.subtitle')}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {mainPrayers.map((prayer) => (
          <div 
            key={prayer.name} 
            className="prayer-card p-4 flex flex-col items-center neon-glow"
          >
            <div className="mb-2">{prayer.icon}</div>
            <h3 className="text-lg font-bold mb-1">{t(`prayers.${prayer.name}`)}</h3>
            <p className="text-2xl font-semibold text-primary">{prayer.time}</p>
          </div>
        ))}
      </div>
      
      {/* Secondary times */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {secondaryTimes.map((time) => (
          <div 
            key={time.name} 
            className="prayer-card p-4 flex items-center space-x-3"
          >
            <div>{time.icon}</div>
            <div>
              <h4 className="font-semibold">{t(`prayers.${time.name}`)}</h4>
              <p className="text-lg text-primary">{time.time}</p>
            </div>
          </div>
        ))}
        
        {additionalTimes.map((time) => (
          <div 
            key={time.name} 
            className="prayer-card p-4 flex items-center space-x-3"
          >
            <div>{time.icon}</div>
            <div>
              <h4 className="font-semibold">{t(`prayers.${time.name}`)}</h4>
              <p className="text-lg text-primary">{time.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTimesDisplay;