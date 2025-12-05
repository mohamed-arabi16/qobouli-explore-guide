import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SEODataTable from '@/components/SEODataTable';
import FAQSection from '@/components/FAQSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TuitionFees2025EN() {
    const faqItems = [
        {
            question: "Why is Medicine tuition pricier?",
            answer: "Medical programs like Medicine and Dentistry have higher tuition fees due to the high costs of lab equipment, university hospitals, practical training materials, and the longer duration of study."
        },
        {
            question: "Does the language of instruction affect tuition?",
            answer: "Yes, in most universities, programs taught in English are more expensive than the same programs taught in Turkish. This difference can range from 20% to 50%."
        },
        {
            question: "How can I secure a discount early?",
            answer: "The best way is to apply through a certified agent like Qobouli. We have direct agreements with universities that allow us to offer exclusive discounts not available to students who apply directly. Applying early also helps."
        },
        {
            question: "Are there merit scholarships?",
            answer: "Yes, some universities offer additional merit scholarships for students with high academic achievements in high school or during their university studies. These scholarships are limited and competitive."
        },
        {
            question: "What is the best timing for payment?",
            answer: "The best time to pay the first installment is immediately after receiving your preliminary acceptance letter to secure your spot. Do not delay payment, as you might lose your discount or your seat."
        }
    ];

  return (
    <>
      <Helmet>
        <html lang="en" dir="ltr" />
        <title>Tuition Fees in Turkey 2025: Private & Public University Costs</title>
        <meta name="description" content="A comprehensive guide to tuition fees in Turkey for 2025. Learn about private university costs after discounts and approximate fees for public universities." />
        <link rel="canonical" href="https://qobouli.com/en/tuition-fees-turkey-2025" />
        <link rel="alternate" hrefLang="ar" href="https://qobouli.com/ar/tuition-fees-turkey-2025" />
        <meta property="og:title" content="Tuition Fees in Turkey 2025: Private & Public University Costs" />
        <meta property="og:description" content="A comprehensive guide to tuition fees in Turkey for 2025. Learn about private university costs after discounts and approximate fees for public universities." />
        <meta property="og:url" content="https://qobouli.com/en/tuition-fees-turkey-2025" />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"WebPage",
          "name":"Tuition Fees in Turkey 2025: Private & Public University Costs",
          "description":"A comprehensive guide to tuition fees in Turkey for 2025. Learn about private university costs after discounts and approximate fees for public universities.",
          "url":"https://qobouli.com/en/tuition-fees-turkey-2025",
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
        <div className="text-sm breadcrumbs">
            <ul>
                <li><Link to="/en">Home</Link></li>
                <li>Study in Turkey</li>
                <li>Tuition Fees in Turkey</li>
            </ul>
        </div>
        <Link to="/ar/tuition-fees-turkey-2025" className="text-sm text-primary hover:underline my-4 block">
          اقرأ باللغة العربية
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Tuition Fees in Turkey 2025</h1>
          <p className="text-lg text-white/90">
            Why do fees vary so much between universities? And how can you leverage Qobouli's exclusive discounts to significantly lower your costs?
          </p>
        </header>

        <section className="mb-12" id="private-fees">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">Private University Fees (After Discount)</h2>
            <p className="mb-4 text-white/90">The following table shows examples of annual fees at some of our partner universities. These fees are after applying the exclusive Qobouli discount.</p>
            <SEODataTable
                caption="Table: Examples of Annual Private University Fees After Discount for 2025"
                descriptionId="private-fees-en"
                headers={["University", "Program", "Language", "Before Discount (USD)", "After Qobouli Discount (USD)", "Notes"]}
                rows={[
                    ["Istanbul Atlas University", "Medicine", "English", "16,000", "14,400", "10% discount"],
                    ["Bahcesehir University", "AI Engineering", "English", "8,900", "6,230", "30% discount"],
                    ["Istinye University", "Dentistry", "English", "17,850", "15,172", "15% discount"],
                    ["Medipol University", "International Relations", "English", "5,000", "3,800", "Fixed discount"],
                    ["Uskudar University", "Psychology", "Turkish", "3,900", "3,200", "Special discount"],
                    ["Nisantasi University", "Gastronomy", "Turkish", "3,400", "2,950", "Cash payment discount"]
                ]}
            />
        </section>

        <section className="mb-12" id="public-fees">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">Public University Fees (Approximate)</h2>
            <p className="mb-4 text-white/90">Admission to public universities is more competitive and requires exams (YÖS/SAT). Their fees are much lower but are not fixed and depend on the university council's decision each year. The following figures are approximate.</p>
            <SEODataTable
                caption="Table: Approximate Annual Fees for Public Universities for 2025"
                descriptionId="public-fees-en"
                headers={["University", "Program", "Language", "Approx. Fee (USD)", "Notes"]}
                rows={[
                    ["Istanbul University", "Law", "Turkish", "1,000 - 1,500", "Varies by program"],
                    ["Middle East Technical University", "Mechanical Engineering", "English", "600 - 1,000", "Low fees for international students"],
                    ["Hacettepe University", "Medicine", "Turkish", "3,000 - 5,000", "Top-tier medical school"],
                    ["Gazi University", "Education", "Turkish", "400 - 800", "Varies by specialization"]
                ]}
            />
        </section>

        <section className="mb-12" id="budget-planning">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">Building Your Yearly Budget</h2>
            <p className="mb-4">When planning your budget, don't forget to add other costs besides tuition:</p>
            <ul className="list-disc list-inside space-y-2 text-white/90">
                <li><strong>Installments:</strong> Most universities divide the fees into two payments, one for each semester.</li>
                <li><strong>Additional Costs:</strong> These include mandatory health insurance, student residence permit fees, and document translation/notarization.</li>
                <li><strong>Living Estimate:</strong> Add the monthly cost of living ($300-$600) and multiply by 12 months. Refer to our <Link to="/en/study-in-turkey#living-costs" className="text-primary hover:underline">Guide to Living in Turkey</Link> for more details.</li>
            </ul>
        </section>

        <section className="mb-12" id="payment-methods">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">Payment & Installments</h2>
            <div className="space-y-4 text-white/90">
                <p>Payment policies vary, but generally:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Bank Transfer:</strong> The most common method is transferring the first installment to the university's official bank account (SWIFT).</li>
                    <li><strong>On-Campus Payment:</strong> After arrival, remaining installments can be paid at the university's finance department.</li>
                    <li><strong>Deadlines:</strong> Each university has strict deadlines for tuition payments. Late payments can result in registration freezes or penalties.</li>
                </ul>
            </div>
        </section>

        <section className="mb-12" id="faq">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">FAQs</h2>
          <FAQSection />
        </section>

        <section className="text-center py-10 bg-primary text-white rounded-lg" id="cta">
            <h2 className="text-3xl font-bold mb-3">Get Your Discount Today</h2>
            <p className="mb-6 text-lg opacity-90">We’ll propose tailored options within 24 hours.</p>
            <WhatsAppButton />
        </section>

        <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">Discover More</h3>
            <div className="flex justify-center gap-4">
                <Link to="/en/turkish-private-universities" className="text-primary hover:underline">Turkish Private Universities</Link>
                <span className="text-gray-400">|</span>
                <Link to="/en/study-in-turkey" className="text-primary hover:underline">Study in Turkey Guide</Link>
            </div>
        </div>
      </div>
      
      <Footer />
      </div>
    </>
  );
}
