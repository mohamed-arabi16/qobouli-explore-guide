import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from 'react-i18next'; // Changed
import { useLanguage } from '@/contexts/LanguageContext'; // Keep for language value if needed elsewhere, or remove if i18n.language is used

interface FAQSectionProps {
  id?: string;
  variant?: 'light' | 'dark';
  faqKey?: string; // Translation key for FAQ items (e.g., 'faq.items' or 'pages.studyInTurkey.faqSection.items')
  titleKey?: string; // Translation key for FAQ title (e.g., 'faq.title' or 'pages.studyInTurkey.faqSection.title')
}

// Define a type for the translated FAQ item structure we expect from i18next
interface TranslatedFAQItem {
  q?: string;
  a?: string[]; // Array of strings for paragraphs/list items
  question?: string; // Alternative format used in page-specific FAQs
  answer?: string; // Alternative format used in page-specific FAQs
}

const FAQSection: React.FC<FAQSectionProps> = ({ id, variant = 'light', faqKey = 'faq.items', titleKey = 'faq.title' }) => {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage(); // Still used for Farsi fallback logic

  // Fetch FAQ items using i18next.
  // `returnObjects: true` allows fetching the array of objects.
  // Need to cast the result as it's `unknown` by default.
  const items = t(faqKey, { returnObjects: true }) as
    | TranslatedFAQItem[]
    | string;

  if (!Array.isArray(items)) {
    // Optionally log an error or handle the string case if it's valid under some circumstances
    console.error("FAQ items are not an array:", items);
    return null; // Safeguard
  }
  const faqs = items; // Now we know items is TranslatedFAQItem[]

  // TODO: Extract Farsi FAQs to fa.json when Farsi is fully supported.
  /* eslint-disable i18next/no-literal-string */
  const farsiFaqsStatic: { question: string; answer: React.ReactNode }[] = [
    {
      question: 'چرا دانشجویان فکر می‌کنند دانشگاه باید مستقیماً با آنها تماس بگیرد، اما وقتی پاسخ نمی‌دهند شوکه می‌شوند؟', // Literal Farsi
      answer: (
        <div>
          <p>دانشگاه‌های خصوصی ترکیه هرگز مستقیماً با دانشجویان ارتباط برقرار نمی‌کنند مگر اینکه از طریق یک دفتر مجاز درخواست دهید. اگر ایمیل ارسال کنید یا در وب‌سایت رسمی سؤال کنید، معمولاً کسی پاسخ نمی‌دهد.</p> {/* Literal Farsi */}
          <p className="mt-2">چرا؟ زیرا دانشگاه‌ها نمایندگانی دارند که مسئول درخواست‌ها و هماهنگی هستند.</p> {/* Literal Farsi */}
          <p className="mt-2">به همین دلیل، بسیاری از دانشجویان فرصت‌ها را از دست می‌دهند فقط به این دلیل که منتظر پاسخی هستند که هرگز نخواهد آمد.</p> {/* Literal Farsi */}
        </div>
      )
    },
    // ... other Farsi FAQs from the original file should also be wrapped or have their container disabled
  ];
  /* eslint-enable i18next/no-literal-string */


  const currentFaqsToDisplay = (language as string) === 'fa' && farsiFaqsStatic.length > 0
    ? farsiFaqsStatic
    : faqs.map(faq => {
        // Support both formats: { q, a } and { question, answer }
        const questionText = faq.question || faq.q || '';
        const answerData = faq.answer || faq.a;

        return {
          question: questionText,
          answer: (() => {
            // If answer is a string, just return it as a paragraph
            if (typeof answerData === 'string') {
              return <p>{answerData}</p>;
            }

            // If answer is an array, process it
            if (Array.isArray(answerData)) {
              const elements: React.ReactNode[] = [];
              let currentList: string[] = [];

              const flushList = (key: string | number) => {
                if (currentList.length > 0) {
                  elements.push(
                    <ul key={`ul-${key}`} className="list-disc ml-6 mt-2 space-y-1">
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
                  elements.push(<p key={`p-${idx}`} className={elements.length > 0 ? "mt-2" : ""}>{text}</p>);
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
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 text-center leading-relaxed md:leading-normal ${
            isDark ? 'bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent' : 'text-qobouli-text'
          }`}>
            {t(titleKey)}
          </h2>

          <Accordion type="multiple" className="space-y-4">
            {currentFaqsToDisplay.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`border rounded-lg overflow-hidden ${
                  isDark
                    ? 'border-white/20 bg-white/5 backdrop-blur-sm'
                    : 'border-qobouli-accent bg-white'
                }`}
              >
                <AccordionTrigger className={`px-4 py-4 hover:no-underline ${
                  isDark
                    ? 'hover:bg-white/10 focus:bg-white/10'
                    : 'hover:bg-qobouli-bg-soft focus:bg-qobouli-bg-soft'
                }`}>
                  {/* The question is now directly from the translated object */}
                  <span className={`font-bold text-right ${isDark ? 'text-white' : 'text-qobouli-text'}`}>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className={`px-4 py-4 ${
                  isDark ? 'text-white/90 bg-white/5' : 'text-qobouli-text bg-white'
                }`}>
                  {/* The answer is now constructed from the array of strings */}
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
