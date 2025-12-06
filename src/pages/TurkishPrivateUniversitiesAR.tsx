import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEODataTable from '@/components/SEODataTable';
import FAQSection from '@/components/FAQSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TurkishPrivateUniversitiesAR() {
  const faqItems = [
    {
      question: "هل الجامعات الخاصة معترف بها في بلدي؟",
      answer: "العديد من الجامعات التركية الخاصة معترف بها دوليًا وفي الدول العربية، ولكن الاعتراف يختلف حسب بلدك والتخصص. من الضروري دائمًا التحقق من قائمة الجامعات المعترف بها من وزارة التعليم العالي في بلدك قبل بدء التسجيل. قبولي يمكنها مساعدتك في توجيهك نحو جامعات معترف بها في بلدك."
    },
    {
      question: "هل أستطيع الدراسة بالإنجليزية بدون IELTS/TOEFL؟",
      answer: "نعم، معظم الجامعات الخاصة تقدم سنة تحضيرية للغة الإنجليزية إذا لم يكن لديك شهادة إثبات. بعض الجامعات قد تسمح لك بالخضوع لامتحان إعفاء داخلي عند الوصول. إذا نجحت فيه، يمكنك بدء دراسة تخصصك مباشرة."
    },
    {
      question: "هل توجد أقساط للدفع؟",
      answer: "نعم، غالبية الجامعات الخاصة تسمح بدفع الرسوم على قسطين، قسط في بداية كل فصل دراسي. بعض الجامعات قد تقدم خطط دفع أكثر مرونة، ولكن هذا يعتمد على سياسة الجامعة."
    },
    {
      question: "كم يستغرق القبول؟",
      answer: "القبول في الجامعات الخاصة سريع نسبيًا. عبر قبولي، يمكن الحصول على القبول الأوّلي في غضون أيام قليلة إلى أسبوع، بشرط أن تكون جميع مستنداتك كاملة وصحيحة."
    },
    {
      question: "هل أستطيع التحويل بين الجامعات؟",
      answer: "نعم، التحويل ممكن بين الجامعات التركية الخاصة أو من جامعة خارج تركيا، لكنه يخضع لشروط معينة مثل تطابق المناهج وتوافر مقاعد شاغرة. يجب تقديم طلب تحويل رسمي للجامعة المستهدفة."
    },
    {
      question: "ما أفضل وقت للتقديم؟",
      answer: "أفضل وقت هو التقديم المبكر، بدءًا من فبراير وحتى يونيو. التقديم المبكر يزيد من فرصة الحصول على خصومات أكبر ويضمن لك مقعدًا في التخصصات المرغوبة التي تمتلئ بسرعة."
    },
    {
      question: "ما الوثائق الأكثر تسببًا في التأخير؟",
      answer: "الوثائق الأكثر شيوعًا التي تسبب تأخيرًا هي كشف الدرجات غير المترجم أو غير المصدق، أو صورة جواز سفر غير واضحة. تأكد من أن جميع وثائقك جاهزة ومترجمة إلى الإنجليزية أو التركية ومصدقة إذا لزم الأمر."
    },
    {
        question: "هل أحتاج معادلة YÖK لبعض البرامج؟",
        answer: "نعم، شهادة الثانوية العامة من بعض الدول العربية (مثل دول شمال أفريقيا) قد تتطلب معادلة (Denklik) من وزارة التعليم التركية (YÖK) قبل التسجيل النهائي في الجامعة. قبولي ستوضح لك ما إذا كانت شهادتك تتطلب معادلة أم لا."
    }
  ];

  return (
    <>
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>الجامعات التركية الخاصة 2025: الرسوم والقبول والخصومات</title>
        <meta name="description" content="دليلك الشامل عن الجامعات التركية الخاصة لعام 2025. اكتشف الرسوم الدراسية بعد الخصم، متطلبات القبول، خطوات التسجيل، وأهم النصائح للطلاب العرب." />
        <link rel="canonical" href="https://qobouli.com/ar/turkish-private-universities" />
        <link rel="alternate" hrefLang="en" href="https://qobouli.com/en/turkish-private-universities" />
        <meta property="og:title" content="الجامعات التركية الخاصة 2025: الرسوم والقبول والخصومات" />
        <meta property="og:description" content="دليلك الشامل عن الجامعات التركية الخاصة لعام 2025. اكتشف الرسوم الدراسية بعد الخصم، متطلبات القبول، خطوات التسجيل، وأهم النصائح للطلاب العرب." />
        <meta property="og:url" content="https://qobouli.com/ar/turkish-private-universities" />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"WebPage",
          "name":"الجامعات التركية الخاصة 2025: الرسوم والقبول والخصومات",
          "description":"دليلك الشامل عن الجامعات التركية الخاصة لعام 2025. اكتشف الرسوم الدراسية بعد الخصم، متطلبات القبول، خطوات التسجيل، وأهم النصائح للطلاب العرب.",
          "url":"https://qobouli.com/ar/turkish-private-universities",
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

      <div className="min-h-screen bg-gradient-to-br from-[#0C1439] via-[#162456] to-[#1a2a5e]">
        <Navbar />
        
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 text-white page-content" dir="rtl">
        <div className="text-sm breadcrumbs mb-4">
            <ul className="flex gap-2 text-white/70">
                <li><Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
                <li className="text-white/50">/</li>
                <li><span className="text-white/50">الدراسة في تركيا</span></li>
                <li className="text-white/50">/</li>
                <li className="text-primary">الجامعات التركية الخاصة</li>
            </ul>
        </div>
        <Link to="/en/turkish-private-universities" className="text-sm text-primary hover:underline hover:text-secondary my-4 block transition-colors">
          Read in English →
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            الجامعات التركية الخاصة 2025
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            أهلاً بك في دليلك الشامل للجامعات الخاصة في تركيا. سواء كنت تبحث عن برامج باللغة الإنجليزية، أو قبول مرن، أو خصومات دراسية حصرية، فهذه الصفحة هي نقطة البداية.
          </p>
        </header>

        <section className="mb-12" id="introduction">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">مقدّمة</h2>
          <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-4 text-white/90">
            <p>أصبحت الجامعات التركية الخاصة وجهة مفضلة للطلاب العرب، وذلك بفضل مزيج فريد من جودة التعليم، وتنوع البرامج، وسهولة القبول. على عكس الجامعات الحكومية التي تتطلب امتحانات تنافسية مثل اليوس أو السات، تفتح الجامعات الخاصة أبوابها للطلاب الدوليين بناءً على شهادة الثانوية العامة فقط.</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>نقاط القوة:</strong> تنوع البرامج الدراسية، مرونة شروط القبول، خصومات حصرية عبر المكاتب الشريكة مثل قبولي، وتوفر العديد من التخصصات باللغة الإنجليزية.</li>
              <li><strong>وعد الصفحة:</strong> هنا، ستجد كل ما تحتاجه لاتخاذ قرار مستنير: الرسوم الدراسية (قبل وبعد الخصم)، المتطلبات الأكاديمية، خطوات التسجيل خطوة بخطوة، وأهم الأخطاء الشائعة التي يجب تجنبها.</li>
            </ul>
          </div>
        </section>

        <section className="mb-12" id="why-private">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">لماذا الجامعات التركية الخاصة؟</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl glass-panel border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <h3 className="text-2xl font-bold mb-3 text-primary">جودة التعليم والبنية التحتية</h3>
              <p className="text-white/90 leading-relaxed">تستثمر الجامعات الخاصة بكثافة في مختبراتها ومرافقها التعليمية، وتوفر شراكات قوية مع قطاع الصناعة لتأمين فرص تدريب عملي للطلاب. العديد منها حاصل على اعتمادات محلية ودولية، مما يضمن جودة التعليم المقدم.</p>
            </div>
            <div className="p-8 rounded-2xl glass-panel border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <h3 className="text-2xl font-bold mb-3 text-primary">برامج باللغة الإنجليزية</h3>
              <p className="text-white/90 leading-relaxed">تتوفر آلاف البرامج الدراسية باللغة الإنجليزية، خاصة في مجالات الهندسة، إدارة الأعمال، والعلوم الصحية، مما يزيل حاجز اللغة أمام الطلاب الدوليين.</p>
            </div>
            <div className="p-8 rounded-2xl glass-panel border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 md:col-span-2">
              <h3 className="text-2xl font-bold mb-3 text-primary">مرونة القبول والخصومات</h3>
              <p className="text-white/90 leading-relaxed">عملية القبول في الجامعات الخاصة أسرع وأكثر مرونة. من خلال التقديم عبر "قبولي"، يمكنك الحصول على خصومات كبيرة على الرسوم الدراسية، مما يجعل التكلفة منافسة للغاية.</p>
            </div>
          </div>
        </section>

        <section className="mb-12" id="key-facts">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">حقائق أساسية</h2>
            <SEODataTable
                caption="جدول: حقائق سريعة حول الجامعات الخاصة في تركيا"
                descriptionId="private-uni-facts-ar"
                headers={["المعلومة", "التفاصيل"]}
                rows={[
                    ["عدد الجامعات الخاصة", "~70+ جامعة مرخصة"],
                    ["لغات الدراسة", "التركية / الإنجليزية"],
                    ["الرسوم بعد الخصم (سنويًا)", "2,500–8,000 USD (تختلف حسب التخصص والجامعة)"],
                    ["فترات التقديم", "فبراير – سبتمبر (قد تمتد لفترة أطول)"],
                    ["وثائق أساسية", "جواز السفر، شهادة الثانوية، كشف الدرجات، صورة شخصية"]
                ]}
            />
        </section>

        <section className="mb-12" id="requirements">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">المتطلبات الأكاديمية</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">متطلبات البكالوريوس</h3>
               <SEODataTable
                caption="متطلبات القبول لمرحلة البكالوريوس"
                descriptionId="bachelor-req-ar"
                headers={["المستند", "ملاحظات"]}
                rows={[
                    ["شهادة الثانوية العامة", "مترجمة للإنجليزية أو التركية ومصدقة."],
                    ["كشف الدرجات", "مترجم ومصدق."],
                    ["جواز سفر ساري المفعول", "صورة واضحة للصفحة الأولى."],
                    ["صورة شخصية", "بخلفية بيضاء."],
                    ["إثبات لغة (إن وجد)", "شهادة TOEFL أو IELTS للبرامج الإنجليزية، أو TOMER للتركية."]
                ]}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">متطلبات الماجستير</h3>
               <SEODataTable
                caption="متطلبات القبول لمرحلة الماجستير"
                descriptionId="master-req-ar"
                headers={["المستند", "ملاحظات"]}
                rows={[
                    ["شهادة البكالوريوس", "مترجمة ومصدقة."],
                    ["كشف درجات البكالوريوس", "مترجم ومصدق."],
                    ["سيرة ذاتية (CV)", "توضح خبراتك الأكاديمية والعملية."],
                    ["خطاب نوايا", "يشرح أهدافك من دراسة الماجستير."],
                    ["خطابات توصية (إن طُلبت)", "من أساتذة جامعيين أو أصحاب عمل."],
                    ["إثبات لغة", "TOEFL/IELTS أو امتحان الجامعة."]
                ]}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">متطلبات الدكتوراه</h3>
              <SEODataTable
                caption="متطلبات القبول لمرحلة الدكتوراه"
                descriptionId="phd-req-ar"
                headers={["المستند", "ملاحظات"]}
                rows={[
                    ["شهادة الماجستير", "مترجمة ومصدقة."],
                    ["خطة بحث مبدئية (إن طُلبت)", "مقترح لموضوع رسالة الدكتوراه."],
                    ["خبرة بحثية أو منشورات علمية", "تزيد من فرص قبولك."],
                    ["إثبات لغة", "مستوى متقدم في اللغة الإنجليزية أو التركية."]
                ]}
              />
            </div>
          </div>
        </section>

        <section className="mb-12" id="fees">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">الرسوم الدراسية (قبل/بعد الخصم)</h2>
            <p className="mb-4 text-white/90">الرسوم المذكورة هي أمثلة إرشادية وقد تتغير. تواصل مع فريق قبولي للحصول على أحدث الرسوم والخصومات لعام 2025.</p>
            <SEODataTable
                caption="أمثلة إرشادية على الرسوم الدراسية السنوية"
                descriptionId="fees-example-ar"
                headers={["الجامعة", "التخصص", "اللغة", "الرسوم قبل الخصم (USD)", "بعد الخصم عبر قبولي (USD)"]}
                rows={[
                    ["جامعة استينيا", "الطب البشري", "الإنجليزية", "23,650", "21,500"],
                    ["جامعة بهتشه شهير", "هندسة الكمبيوتر", "الإنجليزية", "8,900", "6,230"],
                    ["جامعة ميديبول", "إدارة الأعمال", "الإنجليزية", "5,000", "3,800"],
                    ["جامعة ألتن باش", "الصيدلة", "الإنجليزية", "13,000", "7,500"],
                    ["جامعة جيليشيم", "العلاج الطبيعي", "التركية", "4,000", "3,500"]
                ]}
            />
             <div className="mt-4 text-center">
                <Link to="/ar/tuition-fees-turkey-2025" className="text-primary hover:underline">اكتشف المزيد عن التكاليف والرسوم الدراسية في تركيا</Link>
            </div>
        </section>

        <section className="mb-12" id="registration-steps">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">خطوات التسجيل مع قبولي</h2>
          <ol className="list-decimal list-inside space-y-4 text-white/90">
            <li><strong>تواصل معنا وحدّد التخصص:</strong> نقدم لك استشارة مجانية لمساعدتك في اختيار الجامعة والتخصص الأنسب لك.</li>
            <li><strong>تجهيز المستندات:</strong> قم بتجهيز صور واضحة أو ملفات PDF من مستنداتك الأكاديمية.</li>
            <li><strong>تقديم الطلب للجامعة:</strong> نتولى تقديم طلبك للجامعات المختارة ومتابعة العملية. ندفع رسوم التقديم بدلاً عنك (إن وجدت).</li>
            <li><strong>استلام القبول:</strong> نضمن لك استلام القبول الأوّلي، ومن ثم نساعدك في الحصول على القبول النهائي.</li>
            <li><strong>تثبيت القيد:</strong> تقوم بدفع القسط الأول مباشرة لحساب الجامعة البنكي لتثبيت مقعدك.</li>
            <li><strong>بدء إجراءات الإقامة والسكن (اختياري):</strong> نقدم دعمًا إضافيًا لمساعدتك في ترتيب أمور السكن والإقامة الطلابية.</li>
          </ol>
        </section>

        <section className="mb-12" id="scholarships">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">المنح والخصومات</h2>
            <div className="space-y-4 text-white/90">
                <p>الخصومات التي نقدّمها هي منح جزئية تمنحها الجامعات مباشرة للطلاب المسجلين عبر شركاء معتمدين مثل "قبولي".</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>خصومات مضمونة:</strong> نوفر خصومات حصرية على الرسوم الدراسية لمعظم الجامعات الخاصة.</li>
                    <li><strong>منح التفوق:</strong> بعض الجامعات تقدم منحًا إضافية للطلاب المتفوقين أكاديميًا.</li>
                    <li><strong>نصائح لرفع فرص الخصم:</strong> التقديم المبكر (قبل شهر مايو) وتقديم ملف أكاديمي منظم يزيد من فرصك في الحصول على أعلى نسبة خصم ممكنة.</li>
                </ul>
            </div>
        </section>

        <section className="mb-12" id="common-mistakes">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">أخطاء شائعة يجب تجنّبها</h2>
          <ul className="list-disc list-inside space-y-3 text-red-200 bg-red-900/30 border border-red-500/30 p-6 rounded-lg backdrop-blur-sm">
            <li><strong className="text-red-300">الاعتماد على التواصل المباشر مع الجامعة:</strong> غالبًا ما تكون مكاتب الطلاب الدوليين في الجامعات مشغولة جدًا، مما يؤدي إلى تأخر الردود. التسجيل عبر وكيل معتمد يضمن لك متابعة أسرع.</li>
            <li><strong className="text-red-300">تأخير التقديم:</strong> التخصصات والجامعات الشهيرة تمتلئ بسرعة. لا تنتظر حتى اللحظة الأخيرة.</li>
            <li><strong className="text-red-300">ملفات غير مكتملة:</strong> أي نقص في المستندات أو عدم وضوحها يؤخر عملية القبول.</li>
            <li><strong className="text-red-300">سوء اختيار اللغة:</strong> اختر لغة الدراسة التي تناسب خلفيتك الأكاديمية وأهدافك المهنية. لا تختر برنامجًا باللغة التركية إذا لم تكن مستعدًا لدراسة اللغة لمدة عام.</li>
          </ul>
        </section>

        <section className="mb-12" id="faq">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">أسئلة شائعة</h2>
          <FAQSection />
        </section>

        <section className="text-center py-10 bg-primary text-white rounded-lg" id="cta">
            <h2 className="text-3xl font-bold mb-3">قبل ما تقرر، حاكينا</h2>
            <p className="mb-6 text-lg opacity-90">استشارة مجانية، خصومات حقيقية، ومتابعة حتى تثبيت القيد.</p>
            <WhatsAppButton />
        </section>

        <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">اكتشف المزيد</h3>
            <div className="flex justify-center gap-4">
                <Link to="/ar/study-in-turkey" className="text-primary hover:underline">دليل الدراسة في تركيا</Link>
                <span className="text-gray-400">|</span>
                <Link to="/ar/tuition-fees-turkey-2025" className="text-primary hover:underline">تكاليف ورسوم الدراسة</Link>
            </div>
        </div>
      </div>
      
      <Footer />
      </div>
    </>
  );
}
