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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Premium Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero/students-istanbul.jpg')" }}
      />
      
      {/* Premium multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/80 via-[#0D1B2A]/60 to-[#0D1B2A]/90" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
      
      {/* Subtle animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-subtle opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-subtle opacity-30" style={{ animationDelay: '1s' }} />
      
      <div className="relative container mx-auto px-6 md:px-8 text-center text-white z-10 py-20">
        {/* Premium glass panel with refined styling */}
        <div className="hero-glass-panel max-w-[720px] mx-auto p-8 md:p-12 lg:p-14 w-full">
          {/* Title with refined typography */}
          <h1 className="hero-title-fade text-[clamp(1.875rem,5vw,3.25rem)] md:text-5xl lg:text-[3.5rem] font-semibold text-white tracking-tight leading-[1.15] font-display">
            {t('hero.title')}
          </h1>
          
          {/* Subtitle with improved readability */}
          <p className="hero-subtitle-fade text-base md:text-lg lg:text-xl mt-6 mb-10 max-w-lg mx-auto text-white/80 leading-relaxed font-light">
            {t('hero.subtitle')}
          </p>
          
          {/* CTA buttons with premium styling */}
          <div className="hero-ctas-fade flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToAITool}
              className="hero-cta-primary w-full sm:w-auto min-w-[200px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {t('hero.button.recommend')}
            </button>
            <WhatsAppLink 
              data-cta="whatsapp-button" 
              className="hero-cta-secondary w-full sm:w-auto min-w-[200px] focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {t('hero.button.contact')}
            </WhatsAppLink>
          </div>
          
          {/* Promo text with subtle styling */}
          <p className="hero-promo-fade text-amber-300/90 text-sm mt-8 max-w-md mx-auto font-medium tracking-wide">
            {t('hero.promoText')}
          </p>
        </div>

        {/* Refined scroll indicator */}
        <div className={`fixed bottom-10 md:bottom-14 left-0 right-0 flex justify-center z-20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${!showScrollHint ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'}`}>
          <button
            onClick={scrollToAITool}
            aria-label={t('index.scrollHint')}
            className="scroll-hint flex flex-col items-center text-white/90 p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <span className="text-sm mb-2 font-medium tracking-wide">{t('index.scrollHint')}</span>
            <ChevronDown size={22} className="animate-bounce-gentle" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;