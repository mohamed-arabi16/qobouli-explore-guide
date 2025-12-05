
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import WhatsAppLink from './WhatsAppLink';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();
  const message = t('nav.whatsappMessage');

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <WhatsAppLink
            message={message}
            data-cta="whatsapp-button"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 shadow-lg transition-all duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label={t('whatsapp.ariaLabel')}
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </WhatsAppLink>
        </div>
        
        {isHovered && (
          <div className="absolute bottom-full mb-2 left-0 transform -translate-x-1/4 bg-white text-qobouli-text p-3 rounded-lg shadow-md whitespace-nowrap">
            <p className="text-sm">{t('whatsapp.hover')}</p>
            <div className="absolute bottom-0 left-8 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppButton;
