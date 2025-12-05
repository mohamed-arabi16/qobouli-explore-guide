
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserInfoFormProps {
  onSubmit: (name: string, phoneNumber: string) => void;
  isSubmitting?: boolean;
}

// Country codes for the dropdown
const countryCodes = [
  { code: '+90', country: 'Turkey / تركيا' },
  { code: '+962', country: 'Jordan / الأردن' },
  { code: '+966', country: 'Saudi Arabia / السعودية' },
  { code: '+971', country: 'UAE / الإمارات' },
  { code: '+20', country: 'Egypt / مصر' },
  { code: '+963', country: 'Syria / سوريا' },
  { code: '+964', country: 'Iraq / العراق' },
  { code: '+961', country: 'Lebanon / لبنان' },
  { code: '+970', country: 'Palestine / فلسطين' },
  { code: '+218', country: 'Libya / ليبيا' },
  { code: '+216', country: 'Tunisia / تونس' },
  { code: '+213', country: 'Algeria / الجزائر' },
  { code: '+212', country: 'Morocco / المغرب' },
  { code: '+98', country: 'Iran / إيران' },
];

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, isSubmitting }) => {
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+90');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const { toast } = useToast();

  const onPhoneChange = (v: string) => {
    const digits = v.replace(/\D/g, '');
    setPhoneNumber(digits);
    setPhoneError(digits.length > 0 && digits.length < 10 ? t('userForm.phoneInvalid', 'Phone number must be at least 10 digits.') : '');
  };

  const canSubmit = name.trim() !== '' && !phoneError && (phoneNumber.length === 0 || phoneNumber.length >= 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset name error
    setNameError('');
    
    // Final validation check before submit
    if (!name.trim()) {
      setNameError(t('userForm.fieldRequired', 'Please enter your full name'));
      toast({
        title: t('userForm.correctErrorsToast', 'Please correct the errors'),
        variant: "destructive"
      });
      return;
    }

    if (canSubmit) {
      const fullPhoneNumber = phoneNumber ? `${countryCode}${phoneNumber}` : '';
      onSubmit(name, fullPhoneNumber);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-fade-in"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-qobouli-text">
          {t('userForm.nameLabel', 'Full Name')} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`bg-white border ${nameError ? 'border-red-500' : 'border-gray-300'}`}
          placeholder={t('userForm.namePlaceholder', 'Enter your full name')}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          required
        />
        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-qobouli-text">
          {t('userForm.phoneLabel', 'Phone Number')}
        </Label>
        
        <div className="flex gap-2">
          <div className="w-1/3">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={countryCode} />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.code} {country.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-2/3">
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => onPhoneChange(e.target.value)}
              className={`bg-white border ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('userForm.phonePlaceholder', 'e.g., 555xxxxxxx')}
              dir="ltr" // Phone numbers are LTR
              type="tel"
              inputMode="tel"
              autoComplete="tel"
            />
          </div>
        </div>
        
        {phoneError && <p aria-live="polite" className="text-red-500 text-sm">{phoneError}</p>}
      </div>
      
      <p className="text-sm text-center text-gray-600">
        {t('userForm.introParagraph', "We've created an AI-powered tool to help you discover which university major suits your personality and interests best, through carefully designed questions by education experts.")}
      </p>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting || !canSubmit}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? t('userForm.submittingButton', 'Submitting...') : t('userForm.submitButton', 'Start the Quiz')}
      </Button>
    </form>
  );
};

export default UserInfoForm;
