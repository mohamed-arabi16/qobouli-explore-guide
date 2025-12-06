import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage, Locale } from '@/contexts/LanguageContext';

/**
 * Component that syncs the language context with the current route.
 * Must be placed inside BrowserRouter.
 */
const RouteLanguageSync: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const path = location.pathname;

    // Detect language from URL path
    let urlLanguage: Locale | null = null;
    if (path.startsWith('/ar/') || path === '/ar') {
      urlLanguage = 'ar';
    } else if (path.startsWith('/en/') || path === '/en') {
      urlLanguage = 'en';
    }

    // Only update if we detected a language in the URL and it's different from current
    if (urlLanguage && urlLanguage !== language) {
      setLanguage(urlLanguage);
    }
  }, [location.pathname, language, setLanguage]);

  return <>{children}</>;
};

export default RouteLanguageSync;
