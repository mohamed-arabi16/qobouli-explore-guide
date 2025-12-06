import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEODataTable from '@/components/SEODataTable';
import FAQSection from '@/components/FAQSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function StudyInTurkeyEN() {
    const faqItems = [
        {
            question: "What is the best city for engineering/medicine students?",
            answer: "Istanbul and Ankara are top choices for engineering and medicine due to their strong technical and medical universities, university hospitals, and ample internship opportunities."
        },
        {
            question: "Are there part-time work opportunities for students?",
            answer: "Turkish law permits international students to work part-time after completing their first year of study, but it requires a work permit. Job opportunities are more plentiful in major cities like Istanbul."
        },
        {
            question: "How can I ensure my degree is recognized in my home country?",
            answer: "Before applying, you must check your home country's Ministry of Higher Education website to ensure your chosen Turkish university is on their list of recommended institutions. You can also contact your country's cultural attaché in Turkey."
        },
        {
            question: "What is the difference between preliminary and final acceptance?",
            answer: "A preliminary acceptance is an initial offer from the university based on your documents. A final acceptance letter confirms your enrollment after you pay the first tuition installment. This is the document you will use for your student visa and residence permit applications."
        },
        {
            question: "What is the best time to apply?",
            answer: "The best time to apply is from February to June. Applying early gives you a better chance of securing a spot in high-demand programs and benefiting from early-bird discounts."
        }
    ];

  return (
    <>
      <Helmet>
        <html lang="en" dir="ltr" />
        <title>Study in Turkey 2025: The Complete Guide for International Students</title>
        <meta name="description" content="Everything about studying in Turkey for international students in 2025. Learn about the best student cities, living costs, admission requirements, and application steps with Qobouli." />
        <link rel="canonical" href="https://qobouli.com/en/study-in-turkey" />
        <link rel="alternate" hrefLang="ar" href="https://qobouli.com/ar/study-in-turkey" />
        <meta property="og:title" content="Study in Turkey 2025: The Complete Guide for International Students" />
        <meta property="og:description" content="Everything about studying in Turkey for international students in 2025. Learn about the best student cities, living costs, admission requirements, and application steps with Qobouli." />
        <meta property="og:url" content="https://qobouli.com/en/study-in-turkey" />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"WebPage",
          "name":"Study in Turkey 2025: The Complete Guide for International Students",
          "description":"Everything about studying in Turkey for international students in 2025. Learn about the best student cities, living costs, admission requirements, and application steps with Qobouli.",
          "url":"https://qobouli.com/en/study-in-turkey",
          "inLanguage": "en"
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
        
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 text-white page-content" dir="ltr">
        <div className="text-sm breadcrumbs mb-4">
            <ul className="flex gap-2 text-white/70">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li className="text-white/50">/</li>
                <li className="text-primary">Study in Turkey</li>
            </ul>
        </div>
        <Link to="/ar/study-in-turkey" className="text-sm text-primary hover:underline hover:text-secondary my-4 block transition-colors">
          ← اقرأ باللغة العربية
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Study in Turkey 2025
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            A comprehensive overview of the student experience in Turkey: from choosing a city and major to living costs and university admissions.
          </p>
        </header>

        <section className="mb-12" id="intro">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">Why Study in Turkey?</h2>
            <div className="glass-panel p-6 md:p-8 rounded-2xl">
              <p className="text-white/90 leading-relaxed">
                Turkey is more than a tourist destination; it has become an attractive educational hub for students worldwide, especially from the GCC, Levant, and North Africa. The familiar culture, affordable cost of living, and strong universities make it an ideal choice. This page is designed for international students and expats in Turkey aiming to start their academic journey here.
              </p>
            </div>
        </section>

        <section className="mb-12" id="cities">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">Best Student Cities</h2>
            <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">Istanbul: The Vibrant Heart of Turkey</h3>
                    <p className="text-white/90 leading-relaxed">A city that blends history with modernity, Istanbul hosts the largest number of private and public universities. It offers unparalleled internship and career opportunities, though living costs are relatively higher.</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">Ankara: The Academic Capital</h3>
                    <p className="text-white/90 leading-relaxed">Known for prestigious universities like Middle East Technical University and Hacettepe University. It's a quieter city, ideal for studying, with lower living costs than Istanbul.</p>
                </div>
                 <div className="glass-panel p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">Other Promising Cities</h3>
                    <ul className="list-disc list-inside space-y-2 mt-2 text-white/90">
                        <li><strong>Izmir:</strong> A beautiful coastal city with a European feel and strong universities.</li>
                        <li><strong>Sakarya:</strong> Close to Istanbul with lower costs, making it an economical choice.</li>
                        <li><strong>Kayseri:</strong> An industrial city in central Anatolia, offering opportunities for engineering students and affordable living.</li>
                    </ul>
                </div>
            </div>
        </section>

        <section className="mb-12" id="living-costs">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">Monthly Living Cost Estimates</h2>
            <SEODataTable
                caption="Table: Estimated Monthly Living Costs in Turkey (USD)"
                descriptionId="living-costs-en"
                headers={["Item", "Monthly Estimate (USD)"]}
                rows={[
                    ["Housing (Shared or Dorm)", "150 – 250"],
                    ["Food", "100 – 150"],
                    ["Transport (Student Card)", "20 – 40"],
                    ["Internet/Phone", "10 – 20"],
                    ["Miscellaneous", "50 – 100"],
                    ["Total", "330 – 560"]
                ]}
            />
            <p className="mt-4 text-sm text-white/70">Note: These figures are estimates and can vary significantly based on the city and student's lifestyle.</p>
        </section>

        <section className="mb-12" id="study-tracks">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">Study Tracks & Picking a Major</h2>
            <p className="mb-4 text-white/90">One of the most critical decisions is choosing your language of instruction. Turkish-taught programs are often less expensive but require a preparatory year. English-taught programs open up broader opportunities in the global job market.</p>
            <div className="text-center p-6 glass-panel rounded-2xl border border-primary/20">
                <p className="font-semibold text-white">Confused about which major to choose?</p>
                <a href="https://qobouli.com/en/ai-major-recommender" className="text-primary hover:underline hover:text-secondary transition-colors">Try Qobouli's recommender tool to find your best fit!</a>
            </div>
        </section>

        <section className="mb-12" id="requirements-quick">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">Admission Requirements (Quick Table)</h2>
             <SEODataTable
                caption="Table: Key Admission Documents Required"
                descriptionId="admission-req-en"
                headers={["Degree", "Key Documents Required"]}
                rows={[
                    ["Bachelor's", "High school diploma, transcript, passport."],
                    ["Master's", "Bachelor's diploma, transcript, CV, statement of purpose."],
                    ["PhD", "Master's diploma, research proposal (sometimes)."]
                ]}
            />
            <div className="mt-4 text-center">
                <Link to="/en/turkish-private-universities#requirements" className="text-primary hover:underline">See detailed requirements for private universities</Link>
            </div>
        </section>

        <section className="mb-12" id="how-to-start">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">How to Start with Qobouli</h2>
          <ol className="list-decimal list-inside space-y-4 text-white/90">
            <li><strong>Free Consultation:</strong> Contact us to assess your academic qualifications and preferences.</li>
            <li><strong>Selection & Guidance:</strong> We help you choose the most suitable city, university, and program.</li>
            <li><strong>Document Preparation:</strong> We guide you in preparing your application file, including translation and notarization if needed.</li>
            <li><strong>Application & Follow-up:</strong> We submit your application and follow up until you receive the final acceptance letter.</li>
            <li><strong>Pre-arrival Prep:</strong> We offer post-admission support for housing, residence permit, and health insurance.</li>
          </ol>
        </section>

        <section className="mb-12" id="faq">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">FAQs</h2>
          <FAQSection />
        </section>

        <section className="text-center py-10 bg-primary text-white rounded-lg" id="cta">
            <h2 className="text-3xl font-bold mb-3">Talk to us before you decide</h2>
            <p className="mb-6 text-lg opacity-90">Let us help you every step of the way, from choosing a university to arriving in Turkey.</p>
            <WhatsAppButton />
        </section>

        <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Discover More</h3>
            <div className="flex justify-center gap-4">
                <Link to="/en/turkish-private-universities" className="text-primary hover:underline hover:text-secondary transition-colors">Turkish Private Universities</Link>
                <span className="text-white/40">|</span>
                <Link to="/en/tuition-fees-turkey-2025" className="text-primary hover:underline hover:text-secondary transition-colors">Tuition Fees & Costs</Link>
            </div>
        </div>
      </div>
      
      <Footer />
      </div>
    </>
  );
}
