import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import WhatsAppLink from './WhatsAppLink';

const Hero = () => {
  const { t } = useLanguage();
  const [showScrollHint, setShowScrollHint] = useState(true);

  const scrollToAITool = () => {
    document.getElementById('ai-tool')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Hide scroll hint after scrolling 100px
      setShowScrollHint(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/hero/students-istanbul.jpg')" }}
    >
      {/* Darker overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0C1439]/80" />
      
      <div className="relative container mx-auto px-4 md:px-6 text-center text-white z-10 pb-20">
        {/* Enhanced glass panel with max-width 700px */}
        <div className="hero-glass-panel max-w-[700px] mx-auto p-10 md:p-12 w-full">
          <h1 className="hero-title-fade text-[clamp(2rem,5vw,3rem)] md:text-5xl font-bold text-white tracking-tight leading-tight font-display">
            {t('hero.title')}
          </h1>
          <p className="hero-subtitle-fade text-base md:text-lg mt-6 mb-8 max-w-xl mx-auto text-white/85 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="hero-ctas-fade flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToAITool}
              className="hero-cta-primary w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {t('hero.button.recommend')}
            </button>
            <WhatsAppLink 
              data-cta="whatsapp-button" 
              className="hero-cta-secondary w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {t('hero.button.contact')}
            </WhatsAppLink>
          </div>
          <p className="hero-promo-fade text-yellow-300/90 text-sm mt-6 max-w-md mx-auto font-medium">
            {t('hero.promoText')}
          </p>
        </div>

        <div className={`fixed bottom-8 md:bottom-12 left-0 right-0 flex justify-center z-20 transition-opacity duration-300 ${!showScrollHint ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button
            onClick={scrollToAITool}
            aria-label={t('index.scrollHint')}
            className="scroll-hint flex flex-col items-center text-white p-3 bg-black/20 backdrop-blur-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <span className="text-sm mb-1 drop-shadow-lg font-medium">{t('index.scrollHint')}</span>
            <ChevronDown size={24} className="drop-shadow-lg animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;