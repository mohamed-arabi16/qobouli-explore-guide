import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from './LanguageSwitch';
import { useIsMobile } from '@/hooks/use-mobile';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { Menu, X } from 'lucide-react';
import WhatsAppLink from './WhatsAppLink';
import HashLink from './HashLink';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        scrolled 
          ? 'bg-[#0D1B2A]/90 backdrop-blur-2xl shadow-soft-lg border-b border-white/[0.06]' 
          : 'bg-[#0D1B2A]/70 backdrop-blur-xl'
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center py-3">
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <img 
              src="/lovable-uploads/133b63e3-34b5-426d-b599-9645db7180a9.png" 
              alt={t('nav.logoAlt')} 
              className="h-14 md:h-16 transition-all duration-300 group-hover:opacity-90" 
            />
          </Link>
        </div>
        
        {isMobile ? (
          <div className="flex items-center gap-3">
            <LanguageSwitch abbreviated={true} />
            <button
              onClick={toggleMobileMenu}
              className="p-2.5 text-white rounded-xl hover:bg-white/10 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        ) : (
          <>
            <nav className="hidden md:flex items-center space-x-7 rtl:space-x-reverse">
              <HashLink 
                to="/#roadmap" 
                className="text-white/85 hover:text-white focus:text-white transition-all duration-300 font-medium text-[15px] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t('nav.steps')}
              </HashLink>
              <HashLink 
                to="/#ai-tool" 
                className="text-white/85 hover:text-white focus:text-white transition-all duration-300 font-medium text-[15px] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t('nav.major')}
              </HashLink>
              <Link 
                to={`/${t('nav.lang')}/turkish-private-universities`} 
                className="text-white/85 hover:text-white focus:text-white transition-all duration-300 font-medium text-[15px] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t('nav.universities')}
              </Link>
              <Link 
                to={`/${t('nav.lang')}/study-in-turkey`} 
                className="text-white/85 hover:text-white focus:text-white transition-all duration-300 font-medium text-[15px] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t('nav.studyInTurkey')}
              </Link>
              <Link 
                to={`/${t('nav.lang')}/tuition-fees-turkey-2025`} 
                className="text-white/85 hover:text-white focus:text-white transition-all duration-300 font-medium text-[15px] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t('nav.tuitionFees')}
              </Link>
              <HashLink 
                to="/#faq" 
                className="text-white/85 hover:text-white focus:text-white transition-all duration-300 font-medium text-[15px] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t('nav.faq')}
              </HashLink>
              <LanguageSwitch abbreviated={false} />
            </nav>
            
            <WhatsAppLink
               message={t('nav.whatsappMessage')}
               data-cta="whatsapp-top"
               className="bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:scale-[0.98] hidden md:block">
              {t('nav.contact')}
            </WhatsAppLink>
          </>
        )}
      </div>

      {/* Mobile Menu Drawer - Premium Glass Effect */}
      {isMobile && (
        <>
          {/* Backdrop overlay */}
          <div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] z-40 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeMobileMenu}
          />
          
          {/* Slide-in drawer with premium glass effect */}
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            } rtl:left-0 rtl:right-auto rtl:translate-x-0 ${
              isMobileMenuOpen ? '' : 'rtl:-translate-x-full'
            }`}
            style={{
              background: 'rgba(13, 27, 42, 0.92)',
              backdropFilter: 'blur(32px) saturate(150%)',
              WebkitBackdropFilter: 'blur(32px) saturate(150%)',
              borderLeft: '1px solid rgba(10, 123, 138, 0.2)',
              boxShadow: '-12px 0 40px rgba(0, 0, 0, 0.3)'
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-semibold text-white/90">
                  {t('nav.menu', 'Menu')}
                </h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2.5 text-white rounded-xl hover:bg-white/10 transition-all duration-300 active:scale-95"
                  aria-label={t('nav.closeMenu')}
                >
                  <X size={22} />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-2 flex-1">
                {[
                  { to: "/#roadmap", label: t('nav.steps'), isHash: true },
                  { to: "/#ai-tool", label: t('nav.major'), isHash: true },
                  { to: `/${t('nav.lang')}/turkish-private-universities`, label: t('nav.universities'), isHash: false },
                  { to: `/${t('nav.lang')}/study-in-turkey`, label: t('nav.studyInTurkey'), isHash: false },
                  { to: `/${t('nav.lang')}/tuition-fees-turkey-2025`, label: t('nav.tuitionFees'), isHash: false },
                  { to: "/#faq", label: t('nav.faq'), isHash: true },
                ].map((item, index) => {
                  const Component = item.isHash ? HashLink : Link;
                  return (
                    <Component
                      key={item.to}
                      to={item.to}
                      onClick={closeMobileMenu}
                      className="text-white/90 hover:text-white hover:bg-white/8 focus:bg-white/8 py-4 px-5 rounded-xl transition-all duration-300 font-medium text-[15px] border border-transparent hover:border-white/10"
                      style={{ 
                        animationDelay: `${index * 0.05}s`,
                        opacity: isMobileMenuOpen ? 1 : 0,
                        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(16px)',
                        transition: `all 0.4s cubic-bezier(0.32, 0.72, 0, 1) ${index * 0.05}s`
                      }}
                    >
                      {item.label}
                    </Component>
                  );
                })}
              </nav>
              
              <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
                <WhatsAppLink
                   message={t('nav.whatsappMessage')}
                   data-cta="whatsapp-mobile"
                   onClick={closeMobileMenu}
                   className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-glow-primary hover:shadow-glow-primary-lg w-full block text-center active:scale-[0.98]">
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
