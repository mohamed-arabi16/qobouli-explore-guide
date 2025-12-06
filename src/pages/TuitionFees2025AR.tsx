import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEODataTable from '@/components/SEODataTable';
import FAQSection from '@/components/FAQSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SubPageLayout, ContentSection } from '@/components/SubPageLayout';

export default function TuitionFees2025AR() {
    const { t } = useTranslation();
    const faqItems = t('pages.universityFeesTurkey2025.faqSection.items', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <>
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>{t('pages.universityFeesTurkey2025.meta.title')}</title>
        <meta name="description" content={t('pages.universityFeesTurkey2025.meta.description')} />
        <link rel="canonical" href={t('pages.universityFeesTurkey2025.meta.canonical')} />
        <link rel="alternate" hrefLang="en" href="https://qobouli.com/en/tuition-fees-turkey-2025" />
        <meta property="og:title" content={t('pages.universityFeesTurkey2025.meta.ogTitle')} />
        <meta property="og:description" content={t('pages.universityFeesTurkey2025.meta.ogDescription')} />
        <meta property="og:url" content={t('pages.universityFeesTurkey2025.meta.ogUrl')} />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"WebPage",
          "name":t('pages.universityFeesTurkey2025.meta.title'),
          "description":t('pages.universityFeesTurkey2025.meta.description'),
          "url":t('pages.universityFeesTurkey2025.meta.canonical'),
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
                <li><Link to="/" className="hover:text-primary transition-colors">{t('pages.universityFeesTurkey2025.breadcrumbs.home')}</Link></li>
                <li className="text-white/50">/</li>
                <li><span className="text-white/50">{t('pages.universityFeesTurkey2025.breadcrumbs.studyInTurkey')}</span></li>
                <li className="text-white/50">/</li>
                <li className="text-primary">{t('pages.universityFeesTurkey2025.breadcrumbs.current')}</li>
            </ul>
        </div>
        <Link to="/en/tuition-fees-turkey-2025" className="text-sm text-primary hover:underline hover:text-secondary my-4 block transition-colors">
          {t('pages.universityFeesTurkey2025.languageSwitch')}
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('pages.universityFeesTurkey2025.header.title')}
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            {t('pages.universityFeesTurkey2025.header.subtitle')}
          </p>
        </header>

        <section className="mb-12" id="private-fees">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.universityFeesTurkey2025.privateFees.title')}</h2>
            <p className="mb-4 text-white/90">{t('pages.universityFeesTurkey2025.privateFees.intro')}</p>
            <SEODataTable
                caption={t('pages.universityFeesTurkey2025.privateFees.tableCaption')}
                descriptionId="private-fees-ar"
                headers={t('pages.universityFeesTurkey2025.privateFees.headers', { returnObjects: true }) as string[]}
                rows={t('pages.universityFeesTurkey2025.privateFees.rows', { returnObjects: true }) as string[][]}
            />
        </section>

        <section className="mb-12" id="public-fees">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.universityFeesTurkey2025.publicFees.title')}</h2>
            <p className="mb-4 text-white/90">{t('pages.universityFeesTurkey2025.publicFees.intro')}</p>
            <SEODataTable
                caption={t('pages.universityFeesTurkey2025.publicFees.tableCaption')}
                descriptionId="public-fees-ar"
                headers={t('pages.universityFeesTurkey2025.publicFees.headers', { returnObjects: true }) as string[]}
                rows={t('pages.universityFeesTurkey2025.publicFees.rows', { returnObjects: true }) as string[][]}
            />
        </section>

        <section className="mb-12" id="budget-planning">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.universityFeesTurkey2025.budgetPlanning.title')}</h2>
            <p className="mb-4">{t('pages.universityFeesTurkey2025.budgetPlanning.intro')}</p>
            <ul className="list-disc list-inside space-y-2 text-white/90">
                <li><strong>{t('pages.universityFeesTurkey2025.budgetPlanning.installments')}</strong> {t('pages.universityFeesTurkey2025.budgetPlanning.installmentsContent')}</li>
                <li><strong>{t('pages.universityFeesTurkey2025.budgetPlanning.additionalCosts')}</strong> {t('pages.universityFeesTurkey2025.budgetPlanning.additionalCostsContent')}</li>
                <li><strong>{t('pages.universityFeesTurkey2025.budgetPlanning.livingEstimate')}</strong> {t('pages.universityFeesTurkey2025.budgetPlanning.livingEstimateContent')} <Link to="/ar/study-in-turkey#living-costs" className="text-primary hover:underline">{t('pages.universityFeesTurkey2025.budgetPlanning.livingGuideLink')}</Link> {t('pages.universityFeesTurkey2025.budgetPlanning.livingEstimateEnd')}</li>
            </ul>
        </section>

        <section className="mb-12" id="payment-methods">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.universityFeesTurkey2025.paymentMethods.title')}</h2>
            <div className="space-y-4 text-white/90">
                <p>{t('pages.universityFeesTurkey2025.paymentMethods.intro')}</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>{t('pages.universityFeesTurkey2025.paymentMethods.bankTransfer')}</strong> {t('pages.universityFeesTurkey2025.paymentMethods.bankTransferContent')}</li>
                    <li><strong>{t('pages.universityFeesTurkey2025.paymentMethods.onCampus')}</strong> {t('pages.universityFeesTurkey2025.paymentMethods.onCampusContent')}</li>
                    <li><strong>{t('pages.universityFeesTurkey2025.paymentMethods.deadlines')}</strong> {t('pages.universityFeesTurkey2025.paymentMethods.deadlinesContent')}</li>
                </ul>
            </div>
        </section>

        <section className="mb-12" id="faq">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.universityFeesTurkey2025.faqSection.title')}</h2>
          <FAQSection variant="dark" faqKey="pages.universityFeesTurkey2025.faqSection.items" titleKey="pages.universityFeesTurkey2025.faqSection.title" />
        </section>

        <section className="text-center py-10 bg-primary text-white rounded-lg" id="cta">
            <h2 className="text-3xl font-bold mb-3">{t('pages.universityFeesTurkey2025.cta.title')}</h2>
            <p className="mb-6 text-lg opacity-90">{t('pages.universityFeesTurkey2025.cta.subtitle')}</p>
            <WhatsAppButton />
        </section>

        <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4 text-white">{t('pages.universityFeesTurkey2025.discoverMore.title')}</h3>
            <div className="flex justify-center gap-4">
                <Link to="/ar/turkish-private-universities" className="text-primary hover:underline hover:text-secondary transition-colors">{t('pages.universityFeesTurkey2025.discoverMore.privateUniversities')}</Link>
                <span className="text-white/40">|</span>
                <Link to="/ar/study-in-turkey" className="text-primary hover:underline hover:text-secondary transition-colors">{t('pages.universityFeesTurkey2025.discoverMore.studyGuide')}</Link>
            </div>
        </div>
      </div>
      
      <Footer />
      </SubPageLayout>
    </>
  );
}
