import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Custom hook for handling hash navigation in React Router.
 * Scrolls to the element with the matching ID when navigating with hash links.
 */
export const useHashNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToElement = useCallback((elementId: string) => {
    // Small delay to ensure the DOM has updated
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const navbarHeight = 80; // Account for fixed navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }, []);

  const navigateWithHash = useCallback((path: string) => {
    const [pathname, hash] = path.split('#');
    const targetPath = pathname || '/';
    const elementId = hash || '';

    // If we're already on the target page, just scroll
    if (location.pathname === targetPath || (location.pathname === '/' && targetPath === '/')) {
      if (elementId) {
        scrollToElement(elementId);
        // Update URL hash without causing navigation
        window.history.pushState(null, '', `${targetPath}#${elementId}`);
      }
    } else {
      // Navigate to the page first, then scroll
      navigate(targetPath);
      if (elementId) {
        scrollToElement(elementId);
      }
    }
  }, [navigate, location.pathname, scrollToElement]);

  return { navigateWithHash, scrollToElement };
};

export default useHashNavigation;
