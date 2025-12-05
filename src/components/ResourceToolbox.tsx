import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from '@/contexts/LanguageContext';
import WhatsAppLink from './WhatsAppLink';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ResourceItem {
  title: {
    ar: string;
    en: string;
    fa?: string;
  };
  description: {
    ar: string;
    en: string;
    fa?: string;
  };
  content: {
    ar: string;
    en: string;
    fa?: string;
  };
  isChecklist?: boolean;
}

const resources: ResourceItem[] = [
  {
    title: {
      ar: 'الأوراق المطلوبة للتسجيل',
      en: 'Required Documents for Registration',
      fa: 'اسناد مورد نیاز برای ثبت نام'
    },
    description: {
      ar: 'قائمة شاملة بجميع المستندات المطلوبة للتقديم للجامعات التركية',
      en: 'A comprehensive list of all documents required for applying to Turkish universities',
      fa: 'فهرست جامعی از تمامی مدارک مورد نیاز برای درخواست به دانشگاه‌های ترکیه'
    },
    isChecklist: true,
    content: {
      ar: `الأوراق المطلوبة للتسجيل في الجامعات التركية الخاصة:
مرحلة البكالوريوس:
    1. صورة عن شهادة الثانوية (أو ما يعادلها – حتى لو ما كانت مترجمة بالبداية).
    2. صورة عن كشف الدرجات (بيان العلامات).
    3. صورة عن جواز السفر أو بطاقة الإقامة التركية (إذا كنت داخل تركيا).
    4. صورة شخصية.
    5. بريد إلكتروني شخصي.
    6. رقم هاتف للتواصل (يفضّل واتساب).

إذا كنت محوّل من جامعة أو دارس مواد سابقًا، بنحتاج كمان:
    • كشف علامات من الجامعة السابقة.
    • وصف للمواد (Syllabus). 

مرحلة الماجستير:
    1. صورة عن شهادة التخرج الجامعية (الإجازة أو الليسانس).
    2. صورة عن كشف علامات الجامعة (جميع السنوات).
    3. صورة عن شهادة الثانوية (وبيان الدرجات كمان).
    4. صورة عن جواز السفر أو الإقامة التركية (إذا متوفر).
    5. صورة شخصية.
    6. إيميل شخصي + رقم هاتف واتساب.
    7. (اختياري) إذا موجود: سيرة ذاتية (CV) أو خطاب نوايا (Motivation Letter).
    8. (لبعض التخصصات) ممكن يحتاجوا توصيات أكاديمية.

مرحلة الدكتوراه:
    1. صورة عن شهادة الماجستير.
    2. صورة عن كشف علامات الماجستير.
    3. صورة عن شهادة التخرج الجامعية (البكالوريوس).
    4. صورة عن كشف علامات الجامعة.
    5. صورة عن جواز السفر أو الإقامة.
    6. صورة شخصية.
    7. إيميل شخصي + رقم تواصل واتساب.
    8. (إذا موجود) CV أو خطاب نوايا.
    9. (لبعض الجامعات) ممكن يطلبوا شهادة معادلة للشهادة الجامعية من وزارة التعليم العالي بتركيا (YÖK).`,
      en: `Required Documents for Registration in Private Turkish Universities:
Bachelor's Degree:
    1. Copy of high school diploma (or equivalent - even if not translated initially).
    2. Copy of transcript (grade statement).
    3. Copy of passport or Turkish residence permit (if you are in Turkey).
    4. Personal photo.
    5. Personal email address.
    6. Contact phone number (WhatsApp preferred).

If you're transferring from another university or have previously studied courses, we also need:
    • Transcript from the previous university.
    • Course descriptions (Syllabus).

Master's Degree:
    1. Copy of university graduation certificate (Bachelor's degree).
    2. Copy of university transcript (all years).
    3. Copy of high school diploma (and transcript as well).
    4. Copy of passport or Turkish residence permit (if available).
    5. Personal photo.
    6. Personal email + WhatsApp contact number.
    7. (Optional) If available: CV or Motivation Letter.
    8. (For some specializations) Academic recommendations may be required.

PhD:
    1. Copy of Master's degree certificate.
    2. Copy of Master's transcript.
    3. Copy of university graduation certificate (Bachelor's).
    4. Copy of university transcript.
    5. Copy of passport or residence permit.
    6. Personal photo.
    7. Personal email + WhatsApp contact number.
    8. (If available) CV or Motivation Letter.
    9. (For some universities) Equivalency certificate for university degree from Turkish Higher Education Council (YÖK).`
    }
  },
  {
    title: {
      ar: 'خريطة مقارنة المعيشة',
      en: 'Cost of Living Comparison',
      fa: 'مقایسه هزینه زندگی'
    },
    description: {
      ar: 'مقارنة تفصيلية بين تكاليف المعيشة في المدن التركية المختلفة',
      en: 'Detailed comparison of living costs in different Turkish cities',
      fa: 'مقایسه دقیق هزینه‌های زندگی در شهرهای مختلف ترکیه'
    },
    content: {
      ar: `مقارنة بين إسطنبول وأنقرة للطلاب:

إسطنبول:
• السكن: 250-400 دولار شهريًا (غرفة مشتركة)
• المواصلات: 30-50 دولار شهريًا (بطاقة طالب)
• الطعام: 150-250 دولار شهريًا
• مصروف شخصي: 100-150 دولار شهريًا
• تكلفة كلية: 530-850 دولار شهريًا
• مميزات: فرص عمل أكثر، حياة ثقافية غنية، تنوع الجامعات
• تحديات: ازدحام، تكلفة معيشة أعلى، مسافات أطول

أنقرة:
• السكن: 150-300 دولار شهريًا (غرفة مشتركة)
• المواصلات: 20-40 دولار شهريًا (بطاقة طالب)
• الطعام: 120-200 دولار شهريًا
• مصروف شخصي: 80-120 دولار شهريًا
• تكلفة كلية: 370-660 دولار شهريًا
• مميزات: تكلفة معيشة أقل، بيئة طلابية، أقل ازدحامًا
• تحديات: فرص عمل أقل، خيارات ترفيه محدودة`,
      en: `Comparison between Istanbul and Ankara for students:

Istanbul:
• Housing: $250-400 monthly (shared room)
• Transportation: $30-50 monthly (student card)
• Food: $150-250 monthly
• Personal expenses: $100-150 monthly
• Total cost: $530-850 monthly
• Advantages: More job opportunities, rich cultural life, university diversity
• Challenges: Crowded, higher cost of living, longer distances

Ankara:
• Housing: $150-300 monthly (shared room)
• Transportation: $20-40 monthly (student card)
• Food: $120-200 monthly
• Personal expenses: $80-120 monthly
• Total cost: $370-660 monthly
• Advantages: Lower cost of living, student-friendly environment, less crowded
• Challenges: Fewer job opportunities, limited entertainment options`
    }
  },
  {
    title: {
      ar: 'أخطاء شائعة لازم تتجنبها',
      en: 'Common Mistakes to Avoid',
      fa: 'اشتباهات رایج که باید از آنها اجتناب کرد'
    },
    description: {
      ar: 'قائمة بأهم الأخطاء التي يجب تجنبها أثناء عملية التقديم والقبول',
      en: 'List of the most important mistakes to avoid during the application and admission process',
      fa: 'فهرستی از مهم‌ترین اشتباهات برای اجتناب در طول فرآیند درخواست و پذیرش'
    },
    content: {
      ar: `🟥 أولاً: أخطاء بالملف والأوراق
    1. إرسال أوراق ناقصة أو بجودة سيئة (تصوير مش واضح، أو ناقص صفحات).
    2. نسيان ترجمة أو تصديق الأوراق (بعض الجامعات بتطلب الأوراق مترجمة للتركية ومصدّقة من النوتر).
    3. ما تكتب اسمك بالبريد أو رقم التواصل بشكل صحيح، فبتضيع علينا المتابعة.
    4. تأخير في إرسال الأوراق بعد الحجز أو القبول المبدئي.

🟥 ثانياً: أخطاء بالقرارات والتخصصات
    1. اختيار تخصص ما بتعرف شو هو، أو بس لأنو "سعره أرخص" بدون ما تسأل عن تفاصيله.
    2. التسجيل بجامعة بدون ما تتأكد إذا معترف فيها ببلدك (مهم للعراقيين والسودانيين خاصة).
    3. طلب قبول لتخصص غير مناسب لمعدلك (مثلاً طب وأنت معدلك 60).
    4. الاعتماد على نصائح طلاب أو مكاتب ما عندها خبرة بدون ما ترجع لجهة موثوقة.

🟥 ثالثاً: أخطاء بالتواصل والردود
    1. ما ترد على الرسائل أو الإيميلات بعد ما تبعت أوراقك.
    2. التسويف بدون سبب واضح: بتقول "بكرا بقرر" وكل يوم بتأجّل، وهيك ممكن تروح عليك خصومات أو مقاعد.
    3. الضغط عالجامعة أو عفريق التسجيل بطلبات غير منطقية (مثلاً: "بدي قبول طب بـ معدل 50").

🟥 رابعاً: أخطاء بالتوقعات
    1. تفكر إنو الفيزا مضمونة 100%: نحنا بنجهز لك القبول والملف، بس القرار عند السفارة.
    2. تتوقع إنك رح تلاقي سكن فخم بـ 50 دولار بالشهر.
    3. تتأمل بفرص ماجستير أو دكتوراه بدون لغة أو سيرة ذاتية.

🟩 نصيحة ختامية:
الخطوة الأذكى هي إنك تكون واضح وصريح من البداية: تحكي عن ميزانيتك، شو حابب تدرس، وين حابب تعيش.
ونحنا بدورنا منشتغل معك بكل شفافية خطوة بخطوة.`,
      en: `🟥 First: Document and File Errors
    1. Sending incomplete or poor-quality documents (unclear images or missing pages).
    2. Forgetting to translate or certify documents (some universities require documents translated to Turkish and notarized).
    3. Not writing your name or contact number correctly in emails, making follow-up difficult.
    4. Delays in sending documents after reservation or preliminary acceptance.

🟥 Second: Decision and Specialization Errors
    1. Choosing a major without knowing what it is, or just because "it's cheaper" without asking about its details.
    2. Registering at a university without verifying if it's recognized in your country (especially important for Iraqis and Sudanese).
    3. Requesting admission for a major unsuitable for your GPA (e.g., medicine with a 60% GPA).
    4. Relying on advice from students or inexperienced offices without consulting a reliable source.

🟥 Third: Communication and Response Errors
    1. Not responding to messages or emails after sending your documents.
    2. Procrastinating without a clear reason: saying "I'll decide tomorrow" every day, potentially missing discounts or seats.
    3. Pressuring the university or registration team with unreasonable requests (e.g., "I want medical admission with a 50% GPA").

🟥 Fourth: Expectation Errors
    1. Thinking the visa is 100% guaranteed: we prepare your acceptance and file, but the decision is with the embassy.
    2. Expecting to find luxury accommodation for $50 per month.
    3. Hoping for Master's or PhD opportunities without language skills or a CV.

🟩 Final Advice:
The smartest step is to be clear and honest from the beginning: talk about your budget, what you'd like to study, and where you'd like to live.
And we, in turn, will work with you transparently every step of the way.`
    }
  }
];

const ResourceToolbox = () => {
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [open, setOpen] = useState(false);
  const { language, t } = useLanguage();

  const handleOpenResource = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setOpen(true);
  };

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      toast.success(t('errors.linkCopiedTitle') || 'Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy.');
    });
  };

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-white">
            {t('resources.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="glass-panel text-white flex flex-col cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => handleOpenResource(resource)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenResource(resource); }}
                tabIndex={0}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-white">{resource.title[language as keyof typeof resource.title] || resource.title.en}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <CardDescription className="text-sm mb-4 line-clamp-4 text-white/80">{resource.description[language as keyof typeof resource.description] || resource.description.en}</CardDescription>
                  <div className="mt-auto flex justify-center items-center text-secondary">
                    <FileUp className="h-4 w-4 mr-2" />
                    <span>{t('resources.readMore')}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg mb-6 text-white/90">
              {t('resources.contactHelp')}
            </p>
            <WhatsAppLink className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-primary/50 transform hover:scale-105 inline-block">
              {t('resources.contactButton')}
            </WhatsAppLink>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-3xl max-h-[80vh] overflow-y-auto"
          aria-describedby={selectedResource ? `res-desc-${selectedResource.title.en.replace(/\s+/g, '-')}` : undefined}
        >
          {selectedResource && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">{selectedResource.title[language as keyof typeof selectedResource.title] || selectedResource.title.en}</DialogTitle>
                <DialogDescription id={`res-desc-${selectedResource.title.en.replace(/\s+/g, '-')}`} className="text-sm text-muted-foreground mt-2">
                  {selectedResource.description[language as keyof typeof selectedResource.description] || selectedResource.description.en}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 whitespace-pre-wrap relative">
                {selectedResource.isChecklist && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-0 right-0"
                    onClick={() => handleCopyToClipboard(selectedResource.content[language as keyof typeof selectedResource.content] || selectedResource.content.en)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {t('common.copy', 'Copy')}
                  </Button>
                )}
                {selectedResource.content[language as keyof typeof selectedResource.content] || selectedResource.content.en}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourceToolbox;
