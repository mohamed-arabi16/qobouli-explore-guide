
import React from 'react';
import { Instagram, MessageCircle, LinkIcon } from 'lucide-react'; // Added LinkIcon
import { useLanguage } from '@/contexts/LanguageContext';
import WhatsAppLink from './WhatsAppLink';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-qobouli-text text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/7ddcf019-a417-410b-b411-a7b3242b9cbd.png"
            alt={t('footer.logoAlt')}
            className="h-20 mb-6"
            loading="lazy"
          />
          
          <div className="flex items-center justify-center space-x-6 space-x-reverse mb-6">
            <WhatsAppLink
              data-cta="whatsapp-footer"
              className="text-white hover:text-qobouli-accent transition flex items-center"
            >
              <MessageCircle className="h-5 w-5 ml-1" />
              {t('footer.whatsapp')}
            </WhatsAppLink>
            <a 
              href="https://www.instagram.com/qobouli/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-qobouli-accent transition flex items-center"
            >
              <Instagram className="h-5 w-5 ml-1" />
              {t('footer.instagram')}
            </a>
            <a
              href="https://track.qobouli.com/"
              target="_blank"
              rel="noopener noreferrer"
              title={t('footer.trackApplicationTitle')}
              className="text-white hover:text-qobouli-accent transition flex items-center"
            >
              <LinkIcon className="h-5 w-5 ml-1" />
              {t('footer.trackApplication')}
            </a>
            <a
              href="https://program.qobouli.com/"
              target="_blank"
              rel="noopener noreferrer"
              title={t('footer.programSearchTitle')}
              className="text-white hover:text-qobouli-accent transition flex items-center"
            >
              <LinkIcon className="h-5 w-5 ml-1" />
              {t('footer.programSearch')}
            </a>
          </div>
          
          <p className="text-center text-sm opacity-80">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
