import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import PrayerTimesContainer from './components/PrayerTimesContainer';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { PrayerTimesProvider } from './contexts/PrayerTimesContext';
import './i18n';

function App() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <ThemeProvider>
      <PrayerTimesProvider>
        <div className={`min-h-screen flex flex-col ${isRTL ? 'font-almarai rtl' : ''}`}>
          <Header />
          <main className="flex-grow">
            <PrayerTimesContainer />
          </main>
          <Footer />
        </div>
      </PrayerTimesProvider>
    </ThemeProvider>
  );
}

export default App;