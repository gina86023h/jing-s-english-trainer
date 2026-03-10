import { useState, ReactNode } from 'react';
import { LanguageContext, getNestedValue } from '@/hooks/useLanguage';
import type { Language } from '@/lib/translations';
import { translations } from '@/lib/translations';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      return saved || 'en';
    }
    return 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const value = getNestedValue(translations[language], key);
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
