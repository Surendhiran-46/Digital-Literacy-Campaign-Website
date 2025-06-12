import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import ta from '../locales/ta.json';
import hi from '../locales/hi.json';

const translations = { en, ta, hi };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('dlc_preferred_lang');
    if (storedLang && translations[storedLang]) {
      setLanguage(storedLang);
    }
  }, []);

  const t = (key) => translations[language]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const UseLanguage = () => useContext(LanguageContext);
