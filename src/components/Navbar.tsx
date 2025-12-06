import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from './LanguageSwitch';
import { useIsMobile } from '@/hooks/use-mobile';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { Menu, X } from 'lucide-react';
import WhatsAppLink from './WhatsAppLink';

const Navbar = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useFocusTrap(mobileMenuRef, isMobileMenuOpen, closeMobileMenu);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      if (currentScrollY <= 100) {
        setVisible(true);
      } 
      else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } 
      else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0C1439]/95 backdrop-blur-xl shadow-lg border-b border-white/10' : 'bg-[#0C1439]/80 backdrop-blur-md'
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center py-2">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/133b63e3-34b5-426d-b599-9645db7180a9.png" alt={t('nav.logoAlt')} className="h-16 md:h-20" />
          </Link>
        </div>
        
        {isMobile ? (
          <div className="flex items-center gap-2">
            <LanguageSwitch abbreviated={true} />
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        ) : (
          <>
            <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <Link to="/#roadmap" className="text-white hover:text-secondary focus:text-secondary focus:underline transition-colors font-medium drop-shadow-md">{t('nav.steps')}</Link>
              <Link to="/#ai-tool" className="text-white hover:text-secondary focus:text-secondary focus:underline transition-colors font-medium drop-shadow-md">{t('nav.major')}</Link>
              <Link to={`/${t('nav.lang')}/turkish-private-universities`} className="text-white hover:text-secondary focus:text-secondary focus:underline transition-colors font-medium drop-shadow-md">{t('nav.universities')}</Link>
              <Link to={`/${t('nav.lang')}/study-in-turkey`} className="text-white hover:text-secondary focus:text-secondary focus:underline transition-colors font-medium drop-shadow-md">{t('nav.studyInTurkey')}</Link>
              <Link to="/#faq" className="text-white hover:text-secondary focus:text-secondary focus:underline transition-colors font-medium drop-shadow-md">{t('nav.faq')}</Link>
              <LanguageSwitch abbreviated={false} />
            </nav>
            
            <WhatsAppLink
               message={t('nav.whatsappMessage')}
               data-cta="whatsapp-top"
               className="bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-primary/50 transform hover:scale-105 hidden md:block">
              {t('nav.contact')}
            </WhatsAppLink>
          </>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {isMobile && (
        <>
          {/* Backdrop overlay */}
          <div 
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeMobileMenu}
          />
          
          {/* Slide-in drawer */}
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 transition-all duration-300 ease-out ${
              isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            } rtl:left-0 rtl:right-auto rtl:translate-x-0 ${
              isMobileMenuOpen ? '' : 'rtl:-translate-x-full'
            }`}
            style={{
              background: 'rgba(12, 20, 57, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderLeft: '1px solid rgba(0, 157, 176, 0.3)',
              boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.5)'
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8 animate-fade-in">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('nav.menu', 'Menu')}
                </h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-white rounded-lg hover:bg-primary/20 transition-all duration-200 hover:scale-110"
                  aria-label={t('nav.closeMenu')}
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-3 flex-1">
                <Link 
                  to="/#roadmap" 
                  onClick={closeMobileMenu} 
                  className="text-white hover:bg-primary/20 focus:bg-primary/20 py-4 px-5 rounded-xl transition-all duration-200 font-semibold text-lg hover:translate-x-1 hover:shadow-lg border border-transparent hover:border-primary/30 animate-fade-in"
                  style={{ animationDelay: '0.1s' }}
                >
                  {t('nav.steps')}
                </Link>
                <Link 
                  to="/#ai-tool" 
                  onClick={closeMobileMenu} 
                  className="text-white hover:bg-primary/20 focus:bg-primary/20 py-4 px-5 rounded-xl transition-all duration-200 font-semibold text-lg hover:translate-x-1 hover:shadow-lg border border-transparent hover:border-primary/30 animate-fade-in"
                  style={{ animationDelay: '0.15s' }}
                >
                  {t('nav.major')}
                </Link>
                <Link 
                  to={`/${t('nav.lang')}/turkish-private-universities`} 
                  onClick={closeMobileMenu} 
                  className="text-white hover:bg-primary/20 focus:bg-primary/20 py-4 px-5 rounded-xl transition-all duration-200 font-semibold text-lg hover:translate-x-1 hover:shadow-lg border border-transparent hover:border-primary/30 animate-fade-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  {t('nav.universities')}
                </Link>
                <Link 
                  to={`/${t('nav.lang')}/study-in-turkey`} 
                  onClick={closeMobileMenu} 
                  className="text-white hover:bg-primary/20 focus:bg-primary/20 py-4 px-5 rounded-xl transition-all duration-200 font-semibold text-lg hover:translate-x-1 hover:shadow-lg border border-transparent hover:border-primary/30 animate-fade-in"
                  style={{ animationDelay: '0.25s' }}
                >
                  {t('nav.studyInTurkey')}
                </Link>
                <Link 
                  to="/#faq" 
                  onClick={closeMobileMenu} 
                  className="text-white hover:bg-primary/20 focus:bg-primary/20 py-4 px-5 rounded-xl transition-all duration-200 font-semibold text-lg hover:translate-x-1 hover:shadow-lg border border-transparent hover:border-primary/30 animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  {t('nav.faq')}
                </Link>
              </nav>
              
              <div className="mt-auto space-y-4 pt-6 border-t border-primary/30 animate-fade-in" style={{ animationDelay: '0.35s' }}>
                <WhatsAppLink
                   message={t('nav.whatsappMessage')}
                   data-cta="whatsapp-mobile"
                   onClick={closeMobileMenu}
                   className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-primary/50 w-full block text-center transform hover:scale-105">
                  {t('nav.contact')}
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
