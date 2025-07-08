import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');


  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
  };


  const t = (key) => {
    const translations = {
      en: { home: "Home", landmarks: "Landmarks", contact: "Contact" },
      ar: { home: "الرئيسية", landmarks: "المعالم", contact: "اتصل بنا" },
    };
    return translations[language][key] || key;
  };


  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
