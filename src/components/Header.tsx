import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Github } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          
          <button 
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('settings.light') : t('settings.dark')}
            className="p-2 rounded-full hover:bg-surface transition-colors duration-200"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-secondary" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
          </button>
          
          <a 
            href="https://github.com/ZakariaSaafi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center p-2 rounded-full hover:bg-surface transition-colors duration-200 text-primary neon-glow"
            aria-label={t('labels.github')}
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;