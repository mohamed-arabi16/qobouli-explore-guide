import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface WhatsAppLinkProps {
  children: React.ReactNode;
  className?: string;
  phone?: string;
  message?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  'data-cta'?: string;
}

const defaultPhone = '905380130948';

const WhatsAppLink: React.FC<WhatsAppLinkProps> = ({ children, className, phone = defaultPhone, message, onClick, 'data-cta': dataCta }) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const url = `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer,nofollow');
      if (!newWindow) {
        throw new Error('Popup blocked');
      }
    } catch (error) {
      console.error('Failed to open WhatsApp link:', error);
      toast({
        title: t('whatsapp.fallback.title', 'Could not open WhatsApp'),
        description: t('whatsapp.fallback.description', `Please add ${phone} to your contacts and message us.`, { phone: phone }),
        variant: 'destructive',
      });
    }
  };

  return (
    <a href={url} onClick={handleClick} className={className} target="_blank" rel="noopener noreferrer nofollow" data-cta={dataCta}>
      {children}
    </a>
  );
};

export default WhatsAppLink;
