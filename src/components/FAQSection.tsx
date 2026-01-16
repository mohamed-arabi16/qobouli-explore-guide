import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQSectionProps {
  id?: string;
  variant?: 'light' | 'dark';
  faqKey?: string;
  titleKey?: string;
}

interface TranslatedFAQItem {
  q?: string;
  a?: string[];
  question?: string;
  answer?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ id, variant = 'light', faqKey = 'faq.items', titleKey = 'faq.title' }) => {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();

  const items = t(faqKey, { returnObjects: true }) as
    | TranslatedFAQItem[]
    | string;

  if (!Array.isArray(items)) {
    console.error("FAQ items are not an array:", items);
    return null;
  }
  const faqs = items;

  /* eslint-disable i18next/no-literal-string */
  const farsiFaqsStatic: { question: string; answer: React.ReactNode }[] = [
    {
      question: 'چرا دانشجویان فکر می‌کنند دانشگاه باید مستقیماً با آنها تماس بگیرد، اما وقتی پاسخ نمی‌دهند شوکه می‌شوند؟',
      answer: (
        <div>
          <p>دانشگاه‌های خصوصی ترکیه هرگز مستقیماً با دانشجویان ارتباط برقرار نمی‌کنند مگر اینکه از طریق یک دفتر مجاز درخواست دهید. اگر ایمیل ارسال کنید یا در وب‌سایت رسمی سؤال کنید، معمولاً کسی پاسخ نمی‌دهد.</p>
          <p className="mt-3">چرا؟ زیرا دانشگاه‌ها نمایندگانی دارند که مسئول درخواست‌ها و هماهنگی هستند.</p>
          <p className="mt-3">به همین دلیل، بسیاری از دانشجویان فرصت‌ها را از دست می‌دهند فقط به این دلیل که منتظر پاسخی هستند که هرگز نخواهد آمد.</p>
        </div>
      )
    },
  ];
  /* eslint-enable i18next/no-literal-string */


  const currentFaqsToDisplay = (language as string) === 'fa' && farsiFaqsStatic.length > 0
    ? farsiFaqsStatic
    : faqs.map(faq => {
        const questionText = faq.question || faq.q || '';
        const answerData = faq.answer || faq.a;

        return {
          question: questionText,
          answer: (() => {
            if (typeof answerData === 'string') {
              return <p>{answerData}</p>;
            }

            if (Array.isArray(answerData)) {
              const elements: React.ReactNode[] = [];
              let currentList: string[] = [];

              const flushList = (key: string | number) => {
                if (currentList.length > 0) {
                  elements.push(
                    <ul key={`ul-${key}`} className="list-disc ml-6 mt-3 space-y-2">
                      {currentList.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  );
                  currentList = [];
                }
              };

              answerData.forEach((text, idx) => {
                if (text.startsWith('• ') || (text.startsWith('<li>') && text.endsWith('</li>'))) {
                  const listItemText = text.startsWith('• ') ? text.substring(2) : text.substring(4, text.length - 5);
                  currentList.push(listItemText);
                } else {
                  flushList(idx);
                  elements.push(<p key={`p-${idx}`} className={elements.length > 0 ? "mt-3" : ""}>{text}</p>);
                }
              });

              flushList('last');

              return <div>{elements}</div>;
            }

            return null;
          })()
        };
      });

  const isDark = variant === 'dark';

  return (
    <div id={id} dir={language === 'ar' || (language as string) === 'fa' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold mb-10 md:mb-12 text-center leading-tight ${
            isDark ? 'gradient-text' : 'text-foreground'
          }`}>
            {t(titleKey)}
          </h2>

          <Accordion type="multiple" className="space-y-3">
            {currentFaqsToDisplay.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isDark
                    ? 'border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.06]'
                    : 'border-border/50 bg-card hover:border-border hover:shadow-soft'
                }`}
              >
                <AccordionTrigger className={`px-5 py-5 hover:no-underline transition-all duration-300 ${
                  isDark
                    ? 'hover:bg-white/[0.03]'
                    : 'hover:bg-muted/30'
                }`}>
                  <span className={`font-semibold text-left text-[15px] leading-relaxed ${isDark ? 'text-white/95' : 'text-foreground'}`}>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className={`px-5 pb-5 text-[15px] leading-relaxed ${
                  isDark ? 'text-white/80' : 'text-muted-foreground'
                }`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
