
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Locale } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitchProps {
  abbreviated?: boolean;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ abbreviated = false }) => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const getLanguageLabel = (lang: string, isAbbreviated: boolean) => {
    if (isAbbreviated) {
      return t(`language.${lang}Abbr`, lang.toUpperCase());
    }
    return t(`language.${lang}`, lang.toUpperCase());
  };

  const handleLanguageChange = (newLang: Locale) => {
    const currentPath = location.pathname;

    // Check if we're on a sub-page with a language prefix
    const langPrefixPattern = /^\/(ar|en)(\/.*)?$/;
    const match = currentPath.match(langPrefixPattern);

    if (match) {
      // We're on a sub-page, navigate to the same page with the new language
      const restOfPath = match[2] || '';
      const newPath = `/${newLang}${restOfPath}`;
      navigate(newPath);
    } else {
      // We're on the homepage or a page without language prefix
      // Just update the language context
      setLanguage(newLang);
    }
  };

  // Available languages
  const availableLanguages: Locale[] = ['ar', 'en'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        "flex items-center gap-1 rounded-full px-3 py-1.5",
        "bg-white/10 text-white border border-white/20 backdrop-blur-md",
        "hover:bg-white/20 transition-colors"
      )}>
        <Globe className="h-4 w-4" />
        <span>
          {getLanguageLabel(language, abbreviated)}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {availableLanguages.map((langCode) => (
          <DropdownMenuItem
            key={langCode}
            onClick={() => handleLanguageChange(langCode)}
            className={cn(
              language === langCode && "bg-primary/10 text-primary font-semibold"
            )}
          >
            {getLanguageLabel(langCode, false)} {/* Show full name in dropdown */}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitch;
