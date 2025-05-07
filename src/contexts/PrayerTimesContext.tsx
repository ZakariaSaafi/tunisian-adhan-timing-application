import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

// Types
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

interface HijriDate {
  date: string;
  day: string;
  month: {
    en: string;
    ar: string;
    number: number;
  };
  year: string;
  format: string;
}

interface PrayerData {
  timings: Timings;
  date: {
    readable: string;
    timestamp: string;
    gregorian: {
      date: string;
      format: string;
      day: string;
      month: {
        number: number;
        en: string;
      };
      year: string;
    };
    hijri: HijriDate;
  };
}

interface PrayerTimesContextType {
  prayerData: PrayerData | null;
  loading: boolean;
  error: string | null;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedGovernorate: string;
  setSelectedGovernorate: (governorate: string) => void;
  governoratesList: { value: string; label: string }[];
  fetchPrayerTimes: () => Promise<void>;
}

export const tunisianGovernorates = [
  { value: 'Tunis', label: 'tunis' },
  { value: 'Ariana', label: 'ariana' },
  { value: 'Ben Arous', label: 'benArous' },
  { value: 'Manouba', label: 'manouba' },
  { value: 'Nabeul', label: 'nabeul' },
  { value: 'Zaghouan', label: 'zaghouan' },
  { value: 'Bizerte', label: 'bizerte' },
  { value: 'Beja', label: 'beja' },
  { value: 'Jendouba', label: 'jendouba' },
  { value: 'Kef', label: 'kef' },
  { value: 'Siliana', label: 'siliana' },
  { value: 'Sousse', label: 'sousse' },
  { value: 'Monastir', label: 'monastir' },
  { value: 'Mahdia', label: 'mahdia' },
  { value: 'Sfax', label: 'sfax' },
  { value: 'Kairouan', label: 'kairouan' },
  { value: 'Kasserine', label: 'kasserine' },
  { value: 'Sidi Bouzid', label: 'sidi' },
  { value: 'Gabes', label: 'gabes' },
  { value: 'Medenine', label: 'medenine' },
  { value: 'Tataouine', label: 'tataouine' },
  { value: 'Gafsa', label: 'gafsa' },
  { value: 'Tozeur', label: 'tozeur' },
  { value: 'Kebili', label: 'kebili' }
];

const PrayerTimesContext = createContext<PrayerTimesContextType | undefined>(undefined);

export const usePrayerTimes = (): PrayerTimesContextType => {
  const context = useContext(PrayerTimesContext);
  if (!context) {
    throw new Error('usePrayerTimes must be used within a PrayerTimesProvider');
  }
  return context;
};

interface PrayerTimesProviderProps {
  children: ReactNode;
}

export const PrayerTimesProvider: React.FC<PrayerTimesProviderProps> = ({ children }) => {
  // Get stored preferences or set defaults
  const storedDate = localStorage.getItem('selectedDate');
  const storedGovernorate = localStorage.getItem('selectedGovernorate');

  const [selectedDate, setSelectedDate] = useState<Date>(
    storedDate ? new Date(storedDate) : new Date()
  );
  
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>(
    storedGovernorate || 'Tunis'
  );
  
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Update local storage when preferences change
  useEffect(() => {
    localStorage.setItem('selectedDate', selectedDate.toISOString());
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem('selectedGovernorate', selectedGovernorate);
  }, [selectedGovernorate]);

  // Initial fetch
  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const formattedDate = format(selectedDate, 'dd-MM-yyyy');
      const apiUrl = `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${selectedGovernorate},TN&method=8`;
      
      const response = await axios.get(apiUrl);
      
      if (response.data && response.data.data) {
        setPrayerData(response.data.data);
      } else {
        setError('Invalid data received from API');
      }
    } catch (err) {
      console.error('Error fetching prayer times:', err);
      setError('Failed to fetch prayer times. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when date or governorate changes
  useEffect(() => {
    fetchPrayerTimes();
  }, [selectedDate, selectedGovernorate]);

  return (
    <PrayerTimesContext.Provider 
      value={{
        prayerData,
        loading,
        error,
        selectedDate,
        setSelectedDate,
        selectedGovernorate,
        setSelectedGovernorate,
        governoratesList: tunisianGovernorates,
        fetchPrayerTimes
      }}
    >
      {children}
    </PrayerTimesContext.Provider>
  );
};