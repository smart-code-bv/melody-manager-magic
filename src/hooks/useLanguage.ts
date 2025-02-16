
import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState<'en' | 'nl'>('en');

  useEffect(() => {
    // Check if user is from Netherlands based on browser language
    const userLanguage = navigator.language.toLowerCase();
    const isFromNetherlands = userLanguage.includes('nl');
    
    if (isFromNetherlands) {
      setLanguage('nl');
    }
  }, []);

  return language;
};
