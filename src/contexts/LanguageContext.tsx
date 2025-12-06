// TODO: Refactor to address react-refresh/only-export-components (move context/provider/hook to separate files if rule persists)
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
// Import the JSON files
import enTranslations from '@/locales/en.json';
import arTranslations from '@/locales/ar.json';

// Define Locale type based on actual usage, 'fa' is present in existing translations object
export type Locale = 'ar' | 'en';

export interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (key: string, defaultValue?: string, options?: Record<string, string | number>) => string;
}

// Define types for translation objects
type TranslationValue = string | Record<string, any>;
type TranslationObject = Record<string, TranslationValue>;

// Combine translations from the imported JSON files.
const allTranslations: Record<Locale, TranslationObject> = {
  en: enTranslations,
  ar: arTranslations,
};

// Helper function to detect language from URL path
const getLanguageFromPath = (): Locale | null => {
  const path = window.location.pathname;
  if (path.startsWith('/ar/') || path === '/ar') {
    return 'ar';
  }
  if (path.startsWith('/en/') || path === '/en') {
    return 'en';
  }
  return null;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Locale>('ar');

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (e) {
      // Storage may not be available in some contexts (e.g., embedded frames, privacy mode)
    }
  };

  const t = useCallback((key: string, defaultValue?: string, options?: Record<string, string | number>): string => {
    const langTranslations: TranslationObject = allTranslations[language] || allTranslations.en; // Fallback to English if lang not found

    const resolveKey = (obj: TranslationObject | undefined, keyPath: string): string | undefined => {
      if (!obj) return undefined;
      const keys = keyPath.split('.');
      let current: TranslationValue | undefined = obj;
      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k] as TranslationValue;
        } else {
          return undefined;
        }
      }
      return typeof current === 'string' ? current : undefined;
    };

    let translation = resolveKey(langTranslations, key);

    if (translation === undefined) {
      translation = defaultValue || key; // Use default value or key if not found
    }

    if (options && typeof translation === 'string') {
      Object.entries(options).forEach(([optKey, optValue]) => {
        translation = (translation as string).replace(new RegExp(`{{${optKey}}}`, 'g'), String(optValue));
      });
    }
    return translation as string;
  }, [language]);


  useEffect(() => {
    // First, check if there's a language in the URL path (highest priority)
    const urlLanguage = getLanguageFromPath();
    if (urlLanguage) {
      setLanguageState(urlLanguage);
      try {
        localStorage.setItem('language', urlLanguage);
      } catch (e) {
        // Storage may not be available
      }
      return;
    }

    // Otherwise, check localStorage
    try {
      const savedLanguage = localStorage.getItem('language') as Locale;
      if (savedLanguage && ['ar', 'en'].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    } catch (e) {
      // Storage may not be available in some contexts (e.g., embedded frames, privacy mode)
    }
  }, []);

  // Listen for navigation changes (popstate) to update language from URL
  useEffect(() => {
    const handlePopState = () => {
      const urlLanguage = getLanguageFromPath();
      if (urlLanguage && urlLanguage !== language) {
        setLanguageState(urlLanguage);
        try {
          localStorage.setItem('language', urlLanguage);
        } catch (e) {
          // Storage may not be available
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
