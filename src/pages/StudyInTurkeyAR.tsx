import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEODataTable from '@/components/SEODataTable';
import FAQSection from '@/components/FAQSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SubPageLayout, GlassPanel, ContentSection } from '@/components/SubPageLayout';

export default function StudyInTurkeyAR() {
    const faqItems = [
        {
            question: "ما هي أفضل مدينة لطلاب الهندسة/الطب؟",
            answer: "إسطنبول وأنقرة هما الخياران الأفضل لطلاب الهندسة والطب بسبب وجود جامعات تقنية وطبية قوية بهما، بالإضافة إلى توفر المستشفيات الجامعية وفرص التدريب."
        },
        {
            question: "هل توجد فرص عمل جزئي للطلاب؟",
            answer: "القانون التركي يسمح للطلاب بالعمل بدوام جزئي بعد إكمال السنة الدراسية الأولى، ولكن يتطلب الحصول على إذن عمل. فرص العمل تكون متوفرة بشكل أكبر في المدن الكبرى مثل إسطنبول."
        },
        {
            question: "كيف أضمن اعتراف الشهادة في بلدي؟",
            answer: "قبل التسجيل، يجب عليك مراجعة موقع وزارة التعليم العالي في بلدك والتأكد من أن الجامعة التركية التي اخترتها مدرجة ضمن قائمة الجامعات الموصى بها. يمكنك أيضاً التواصل مع الملحقية الثقافية لبلدك في تركيا."
        },
        {
            question: "ما الفرق بين القبول الأوّلي والنهائي؟",
            answer: "القبول الأوّلي هو موافقة مبدئية من الجامعة بناءً على مستنداتك. القبول النهائي هو تأكيد تسجيلك بعد دفع القسط الأول من الرسوم الدراسية، وهو المستند الذي تستخدمه للحصول على تأشيرة الطالب والإقامة."
        },
        {
            question: "متى أنسب وقت للتقديم؟",
            answer: "أنسب وقت للتقديم هو من شهر فبراير إلى يونيو. التقديم المبكر يمنحك فرصة أفضل للحصول على مقعد في التخصصات المطلوبة والاستفادة من الخصومات."
        }
    ];

  return (
    <>
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>الدراسة في تركيا 2025: الدليل الشامل للطلاب العرب</title>
        <meta name="description" content="كل ما يخص الدراسة في تركيا للطلاب العرب لعام 2025. تعرف على أفضل المدن الدراسية، تكاليف المعيشة، متطلبات القبول، وخطوات التسجيل مع قبولي." />
        <link rel="canonical" href="https://qobouli.com/ar/study-in-turkey" />
        <link rel="alternate" hrefLang="en" href="https://qobouli.com/en/study-in-turkey" />
        <meta property="og:title" content="الدراسة في تركيا 2025: الدليل الشامل للطلاب العرب" />
        <meta property="og:description" content="كل ما يخص الدراسة في تركيا للطلاب العرب لعام 2025. تعرف على أفضل المدن الدراسية، تكاليف المعيشة، متطلبات القبول، وخطوات التسجيل مع قبولي." />
        <meta property="og:url" content="https://qobouli.com/ar/study-in-turkey" />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"WebPage",
          "name":"الدراسة في تركيا 2025: الدليل الشامل للطلاب العرب",
          "description":"كل ما يخص الدراسة في تركيا للطلاب العرب لعام 2025. تعرف على أفضل المدن الدراسية، تكاليف المعيشة، متطلبات القبول، وخطوات التسجيل مع قبولي.",
          "url":"https://qobouli.com/ar/study-in-turkey",
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
                <li className="text-primary">الدراسة في تركيا</li>
            </ul>
        </div>
        <Link to="/en/study-in-turkey" className="text-sm text-primary hover:underline my-4 block">
          Read in English
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            الدراسة في تركيا 2025
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            نظرة شاملة على تجربة الدراسة في تركيا: من اختيار المدينة والتخصص إلى تكاليف المعيشة والقبول الجامعي.
          </p>
        </header>

        <ContentSection id="intro" title="لماذا الدراسة في تركيا؟">
            <p className="text-white/90 leading-relaxed">
                تركيا ليست مجرد وجهة سياحية، بل أصبحت مركزًا تعليميًا جذابًا للطلاب من جميع أنحاء العالم، وخاصة من منطقة الخليج، الشام، وشمال أفريقيا. البيئة الثقافية القريبة، تكاليف المعيشة المعقولة، والجامعات القوية تجعلها خيارًا مثاليًا. هذه الصفحة مصممة للطلاب العرب والمقيمين في تركيا الذين يطمحون لبدء رحلتهم الأكاديمية هنا.
            </p>
        </ContentSection>

        <ContentSection id="cities" title="أفضل المدن الدراسية">
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">إسطنبول: قلب تركيا النابض</h3>
                    <p className="text-white/90 leading-relaxed">تجمع بين التاريخ والحداثة، وتضم العدد الأكبر من الجامعات الخاصة والحكومية. توفر فرص تدريب وعمل لا مثيل لها، لكن تكاليف المعيشة فيها هي الأعلى نسبيًا.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">أنقرة: العاصمة الأكاديمية</h3>
                    <p className="text-white/90 leading-relaxed">تتميز بوجود جامعات مرموقة مثل جامعة الشرق الأوسط التقنية وجامعة حجة تبة. مدينة هادئة ومناسبة للدراسة، وتكاليف المعيشة فيها أقل من إسطنبول.</p>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-white mb-2">مدن أخرى واعدة</h3>
                    <ul className="list-disc list-inside space-y-2 mt-2 text-white/90">
                        <li><strong>إزمير:</strong> مدينة ساحلية جميلة ذات طابع أوروبي وجامعات قوية.</li>
                        <li><strong>سكاريا:</strong> قريبة من إسطنبول وتكاليفها منخفضة، مما يجعلها خيارًا اقتصاديًا.</li>
                        <li><strong>قيصري:</strong> مدينة صناعية في وسط الأناضول، توفر فرصًا لطلاب الهندسة وتكاليف معيشة معقولة.</li>
                    </ul>
                </div>
            </div>
        </ContentSection>

        <section className="mb-12" id="living-costs">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">تقديرات المعيشة الشهرية</h2>
            <SEODataTable
                caption="جدول: تقديرات التكلفة الشهرية للمعيشة في تركيا (بالدولار الأمريكي)"
                descriptionId="living-costs-ar"
                headers={["البند", "التكلفة الشهرية التقريبية (USD)"]}
                rows={[
                    ["سكن (مشترك أو طلابي)", "150 – 250"],
                    ["طعام", "100 – 150"],
                    ["مواصلات (بطاقة طالب)", "20 – 40"],
                    ["إنترنت/هاتف", "10 – 20"],
                    ["مصاريف إضافية", "50 – 100"],
                    ["الإجمالي", "330 – 560"]
                ]}
            />
            <p className="mt-4 text-sm text-white/70">ملاحظة: هذه الأرقام تقديرية وتختلف بشكل كبير حسب المدينة ونمط حياة الطالب.</p>
        </section>

        <section className="mb-12" id="study-tracks">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">مسارات الدراسة واختيار التخصص</h2>
            <p className="mb-4 text-white/90">أحد أهم القرارات هو اختيار لغة الدراسة. البرامج باللغة التركية غالبًا ما تكون أقل تكلفة، لكنها تتطلب سنة تحضيرية للغة. البرامج باللغة الإنجليزية تفتح لك أبوابًا أوسع في سوق العمل العالمي.</p>
            <div className="text-center p-6 glass-panel rounded-lg">
                <p className="font-semibold text-white">محتار في اختيار التخصص؟</p>
                <a href="https://qobouli.com/ar/ai-major-recommender" className="text-primary hover:underline">جرّب أداة قبولي لاكتشاف التخصص الأنسب لك!</a>
            </div>
        </section>

        <section className="mb-12" id="requirements-quick">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">متطلبات القبول (ملخص)</h2>
             <SEODataTable
                caption="جدول: أبرز وثائق القبول المطلوبة"
                descriptionId="admission-req-ar"
                headers={["الدرجة", "أبرز الوثائق المطلوبة"]}
                rows={[
                    ["بكالوريوس", "شهادة الثانوية، كشف الدرجات، جواز السفر."],
                    ["ماجستير", "شهادة البكالوريوس، كشف الدرجات، سيرة ذاتية، خطاب نوايا."],
                    ["دكتوراه", "شهادة الماجستير، مقترح بحث (أحيانًا)."]
                ]}
            />
            <div className="mt-4 text-center">
                <Link to="/ar/turkish-private-universities#requirements" className="text-primary hover:underline">اطلع على المتطلبات التفصيلية للجامعات الخاصة</Link>
            </div>
        </section>

        <section className="mb-12" id="how-to-start">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">خطوات البدء مع قبولي</h2>
          <ol className="list-decimal list-inside space-y-4 text-white/90">
            <li><strong>استشارة مجانية:</strong> تواصل معنا لتقييم رغباتك ومؤهلاتك الأكاديمية.</li>
            <li><strong>الاختيار والتوجيه:</strong> نساعدك في اختيار المدينة، الجامعة، والتخصص الأنسب لك.</li>
            <li><strong>تجهيز الوثائق:</strong> نرشدك في تجهيز ملفك، بما في ذلك الترجمة والتصديق عند الحاجة.</li>
            <li><strong>التقديم والمتابعة:</strong> نقدم طلبك ونتابعه حتى استلام القبول النهائي.</li>
            <li><strong>التحضير للسفر:</strong> نقدم لك الدعم في خطوات ما بعد القبول مثل السكن، الإقامة، والتأمين الصحي.</li>
          </ol>
        </section>

        <section className="mb-12" id="faq">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2 text-white">أسئلة شائعة</h2>
          <FAQSection variant="dark" />
        </section>

        <section className="text-center py-10 bg-primary text-white rounded-lg" id="cta">
            <h2 className="text-3xl font-bold mb-3">قبل ما تقرر، حاكينا</h2>
            <p className="mb-6 text-lg opacity-90">دعنا نساعدك في كل خطوة على الطريق، من اختيار الجامعة إلى الوصول إلى تركيا.</p>
            <WhatsAppButton />
        </section>

        <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4 text-white">اكتشف المزيد</h3>
            <div className="flex justify-center gap-4">
                <Link to="/ar/turkish-private-universities" className="text-primary hover:underline hover:text-secondary transition-colors">الجامعات التركية الخاصة</Link>
                <span className="text-white/40">|</span>
                <Link to="/ar/tuition-fees-turkey-2025" className="text-primary hover:underline hover:text-secondary transition-colors">تكاليف ورسوم الدراسة</Link>
            </div>
        </div>
      </div>
      
      <Footer />
      </SubPageLayout>
    </>
  );
}
