
import React from 'react';
import { Instagram, MessageCircle, LinkIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import WhatsAppLink from './WhatsAppLink';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-accent text-white py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <img 
            src="/lovable-uploads/7ddcf019-a417-410b-b411-a7b3242b9cbd.png"
            alt={t('footer.logoAlt')}
            className="h-16 md:h-20 mb-8 opacity-90"
            loading="lazy"
          />
          
          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8">
            <WhatsAppLink
              data-cta="whatsapp-footer"
              className="text-white/80 hover:text-white transition-all duration-300 flex items-center gap-2 text-[15px] font-medium"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{t('footer.whatsapp')}</span>
            </WhatsAppLink>
            
            <a 
              href="https://www.instagram.com/qobouli/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-all duration-300 flex items-center gap-2 text-[15px] font-medium"
            >
              <Instagram className="h-5 w-5" />
              <span>{t('footer.instagram')}</span>
            </a>
            
            <a
              href="https://track.qobouli.com/"
              target="_blank"
              rel="noopener noreferrer"
              title={t('footer.trackApplicationTitle')}
              className="text-white/80 hover:text-white transition-all duration-300 flex items-center gap-2 text-[15px] font-medium"
            >
              <LinkIcon className="h-5 w-5" />
              <span>{t('footer.trackApplication')}</span>
            </a>
            
            <a
              href="https://program.qobouli.com/"
              target="_blank"
              rel="noopener noreferrer"
              title={t('footer.programSearchTitle')}
              className="text-white/80 hover:text-white transition-all duration-300 flex items-center gap-2 text-[15px] font-medium"
            >
              <LinkIcon className="h-5 w-5" />
              <span>{t('footer.programSearch')}</span>
            </a>
          </div>
          
          {/* Divider */}
          <div className="w-16 h-px bg-white/20 mb-6" />
          
          {/* Copyright */}
          <p className="text-center text-sm text-white/60 font-light">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
