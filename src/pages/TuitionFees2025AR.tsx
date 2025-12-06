import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEODataTable from '@/components/SEODataTable';
import FAQSection from '@/components/FAQSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SubPageLayout, ContentSection } from '@/components/SubPageLayout';

export default function TuitionFees2025AR() {
    const faqItems = [
        {
            question: "لماذا رسوم الطب البشري وطب الأسنان هي الأعلى؟",
            answer: "رسوم التخصصات الطبية تكون أعلى بسبب التكاليف المرتفعة لتجهيز المختبرات، المستشفيات الجامعية، والمواد المستخدمة في التدريب العملي، بالإضافة إلى طول فترة الدراسة."
        },
        {
            question: "هل اختلاف لغة الدراسة يغير التكلفة؟",
            answer: "نعم، في معظم الجامعات، تكون البرامج التي تُدرس باللغة الإنجليزية أغلى من نفس البرامج التي تُدرس باللغة التركية. هذا الفارق يمكن أن يتراوح من 20% إلى 50% أحيانًا."
        },
        {
            question: "كيف أحصل على خصم مُقدمًا؟",
            answer: "أفضل طريقة هي التسجيل عبر وكيل معتمد مثل قبولي. لدينا اتفاقيات مباشرة مع الجامعات تمنحنا القدرة على تقديم خصومات حصرية لا يحصل عليها الطالب إذا قدم مباشرة. التقديم المبكر يساعد أيضًا."
        },
        {
            question: "هل توجد منح للمتفوقين؟",
            answer: "نعم، بعض الجامعات تقدم منح تفوق إضافية للطلاب الحاصلين على معدلات مرتفعة في الثانوية العامة أو خلال سنوات دراستهم الجامعية. هذه المنح تكون محدودة وتنافسية."
        },
        {
            question: "ما أفضل توقيت لدفع الرسوم؟",
            answer: "أفضل توقيت هو دفع القسط الأول مباشرة بعد الحصول على القبول الأولي لتأمين مقعدك. لا تؤجل الدفع حتى لا تفقد الخصم الممنوح لك أو المقعد الدراسي نفسه."
        }
    ];

  return (
    <>
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>تكاليف الدراسة في تركيا 2025: رسوم الجامعات الخاصة والحكومية</title>
        <meta name="description" content="دليل شامل حول تكاليف ورسوم الدراسة في تركيا لعام 2025. تعرف على رسوم الجامعات الخاصة بعد الخصم والرسوم التقريبية للجامعات الحكومية." />
        <link rel="canonical" href="https://qobouli.com/ar/tuition-fees-turkey-2025" />
        <link rel="alternate" hrefLang="en" href="https://qobouli.com/en/tuition-fees-turkey-2025" />
        <meta property="og:title" content="تكاليف الدراسة في تركيا 2025: رسوم الجامعات الخاصة والحكومية" />
        <meta property="og:description" content="دليل شامل حول تكاليف ورسوم الدراسة في تركيا لعام 2025. تعرف على رسوم الجامعات الخاصة بعد الخصم والرسوم التقريبية للجامعات الحكومية." />
        <meta property="og:url" content="https://qobouli.com/ar/tuition-fees-turkey-2025" />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"WebPage",
          "name":"تكاليف الدراسة في تركيا 2025: رسوم الجامعات الخاصة والحكومية",
          "description":"دليل شامل حول تكاليف ورسوم الدراسة في تركيا لعام 2025. تعرف على رسوم الجامعات الخاصة بعد الخصم والرسوم التقريبية للجامعات الحكومية.",
          "url":"https://qobouli.com/ar/tuition-fees-turkey-2025",
          "inLanguage": "ar"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
            "@context":"https://schema.org",
            "@type":"FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
        })}</script>
      </Helmet>

      <SubPageLayout dir="rtl">
        <Navbar />
        
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 text-white page-content" dir="rtl">
        <div className="text-sm breadcrumbs mb-4">
            <ul className="flex gap-2 text-white/70">
                <li><Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
                <li className="text-white/50">/</li>
                <li><span className="text-white/50">الدراسة في تركيا</span></li>
                <li className="text-white/50">/</li>
                <li className="text-primary">تكاليف الدراسة في تركيا</li>
            </ul>
        </div>
        <Link to="/en/tuition-fees-turkey-2025" className="text-sm text-primary hover:underline my-4 block">
          Read in English
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            تكاليف الدراسة في تركيا 2025
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            لماذا تختلف الرسوم الدراسية بين الجامعات؟ وكيف يمكنك الاستفادة من الخصومات الحصرية التي تقدمها "قبولي" لتخفيض التكاليف بشكل كبير؟
          </p>
        </header>

        <section className="mb-12" id="private-fees">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">رسوم الجامعات الخاصة (بعد الخصم)</h2>
            <p className="mb-4 text-white/90">الجدول التالي يعرض أمثلة لرسوم سنوية في بعض الجامعات الخاصة الشريكة لنا. هذه الرسوم هي بعد تطبيق خصم "قبولي" الحصري.</p>
            <SEODataTable
                caption="جدول: أمثلة على رسوم الجامعات الخاصة السنوية بعد الخصم لعام 2025"
                descriptionId="private-fees-ar"
                headers={["الجامعة", "التخصص", "اللغة", "الرسوم قبل الخصم (USD)", "بعد الخصم عبر قبولي (USD)", "ملاحظات"]}
                rows={[
                    ["جامعة إسطنبول أطلس", "الطب البشري", "الإنجليزية", "16,000", "14,400", "خصم 10%"],
                    ["جامعة بهتشه شهير", "هندسة الذكاء الاصطناعي", "الإنجليزية", "8,900", "6,230", "خصم 30%"],
                    ["جامعة استينيا", "طب الأسنان", "الإنجليزية", "17,850", "15,172", "خصم 15%"],
                    ["جامعة ميديبول", "العلاقات الدولية", "الإنجليزية", "5,000", "3,800", "خصم ثابت"],
                    ["جامعة أوسكودار", "علم النفس", "التركية", "3,900", "3,200", "خصم خاص"],
                    ["جامعة نيشان تاشي", "فن الطهي", "التركية", "3,400", "2,950", "خصم للدفع النقدي"]
                ]}
            />
        </section>

        <section className="mb-12" id="public-fees">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">رسوم الجامعات الحكومية (تقريبي)</h2>
            <p className="mb-4 text-white/90">القبول في الجامعات الحكومية أصعب ويتطلب امتحانات (YÖS/SAT)، ورسومها أقل بكثير ولكنها غير ثابتة وتعتمد على قرار مجلس الجامعة سنويًا. الأرقام التالية هي تقديرات تقريبية.</p>
            <SEODataTable
                caption="جدول: رسوم تقريبية للجامعات الحكومية السنوية لعام 2025"
                descriptionId="public-fees-ar"
                headers={["الجامعة", "التخصص", "اللغة", "الرسوم التقريبية (USD)", "ملاحظات"]}
                rows={[
                    ["جامعة إسطنبول", "الحقوق", "التركية", "1,000 - 1,500", "تعتمد على البرنامج"],
                    ["جامعة الشرق الأوسط التقنية", "الهندسة الميكانيكية", "الإنجليزية", "600 - 1,000", "رسوم منخفضة للطلاب الأجانب"],
                    ["جامعة حجة تبة", "الطب", "التركية", "3,000 - 5,000", "من أفضل كليات الطب"],
                    ["جامعة غازي", "التربية", "التركية", "400 - 800", "تختلف حسب التخصص"]
                ]}
            />
        </section>

        <section className="mb-12" id="budget-planning">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">كيفية حساب الميزانية السنوية</h2>
            <p className="mb-4">عند التخطيط لميزانيتك، لا تنس إضافة التكاليف الأخرى إلى جانب الرسوم الدراسية:</p>
            <ul className="list-disc list-inside space-y-2 text-white/90">
                <li><strong>دفعات الأقساط:</strong> معظم الجامعات تقسم الرسوم على دفعتين، واحدة لكل فصل دراسي.</li>
                <li><strong>تكاليف إضافية:</strong> تشمل رسوم التأمين الصحي (إلزامي)، رسوم استخراج الإقامة الطلابية، وترجمة وتصديق الوثائق.</li>
                <li><strong>تقدير المعيشة:</strong> أضف تكلفة المعيشة الشهرية (300-600 دولار) واضربها في 12 شهرًا. يمكنك الرجوع إلى <Link to="/ar/study-in-turkey#living-costs" className="text-primary hover:underline">دليل المعيشة في تركيا</Link> للمزيد من التفاصيل.</li>
            </ul>
        </section>

        <section className="mb-12" id="payment-methods">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">طرق الدفع والأقساط</h2>
            <div className="space-y-4 text-white/90">
                <p>سياسات الدفع تختلف، ولكن بشكل عام:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>الدفع عبر التحويل البنكي:</strong> الطريقة الأكثر شيوعًا هي تحويل القسط الأول مباشرة إلى حساب الجامعة الرسمي (SWIFT).</li>
                    <li><strong>الدفع في الحرم الجامعي:</strong> بعد الوصول، يمكن دفع الأقساط المتبقية مباشرة في قسم المالية بالجامعة.</li>
                    <li><strong>المواعيد النهائية:</strong> لكل جامعة مواعيد نهائية لدفع الأقساط. التأخر في الدفع قد يؤدي إلى تجميد قيدك أو فرض غرامات.</li>
                </ul>
            </div>
        </section>

        <section className="mb-12" id="faq">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">أسئلة شائعة</h2>
          <FAQSection />
        </section>

        <section className="text-center py-10 bg-primary text-white rounded-lg" id="cta">
            <h2 className="text-3xl font-bold mb-3">احصل على خصمك الآن</h2>
            <p className="mb-6 text-lg opacity-90">نرسل لك عرضًا مناسبًا يتضمن الرسوم الدراسية بعد الخصم خلال 24 ساعة.</p>
            <WhatsAppButton />
        </section>

        <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">اكتشف المزيد</h3>
            <div className="flex justify-center gap-4">
                <Link to="/ar/turkish-private-universities" className="text-primary hover:underline">الجامعات التركية الخاصة</Link>
                <span className="text-gray-400">|</span>
                <Link to="/ar/study-in-turkey" className="text-primary hover:underline">دليل الدراسة في تركيا</Link>
            </div>
        </div>
      </div>
      
      <Footer />
      </SubPageLayout>
    </>
  );
}
