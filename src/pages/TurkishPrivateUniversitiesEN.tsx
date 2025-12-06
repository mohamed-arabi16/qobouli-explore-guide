import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEODataTable from '@/components/SEODataTable';
import FAQSection from '@/components/FAQSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SubPageLayout, ContentSection } from '@/components/SubPageLayout';

export default function TurkishPrivateUniversitiesEN() {
  const { t } = useTranslation();
  const faqItems = t('pages.turkishPrivateUniversities.faqSection.items', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <>
      <Helmet>
        <html lang="en" dir="ltr" />
        <title>{t('pages.turkishPrivateUniversities.meta.title')}</title>
        <meta name="description" content={t('pages.turkishPrivateUniversities.meta.description')} />
        <link rel="canonical" href={t('pages.turkishPrivateUniversities.meta.canonical')} />
        <link rel="alternate" hrefLang="ar" href="https://qobouli.com/ar/turkish-private-universities" />
        <meta property="og:title" content={t('pages.turkishPrivateUniversities.meta.ogTitle')} />
        <meta property="og:description" content={t('pages.turkishPrivateUniversities.meta.ogDescription')} />
        <meta property="og:url" content={t('pages.turkishPrivateUniversities.meta.ogUrl')} />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"WebPage",
          "name":t('pages.turkishPrivateUniversities.meta.title'),
          "description":t('pages.turkishPrivateUniversities.meta.description'),
          "url":t('pages.turkishPrivateUniversities.meta.canonical'),
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
        
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-24 text-white page-content">
        <div className="text-sm breadcrumbs mb-4">
            <ul className="flex gap-2 text-white/70">
                <li><Link to="/" className="hover:text-primary transition-colors">{t('pages.turkishPrivateUniversities.breadcrumbs.home')}</Link></li>
                <li className="text-white/50">/</li>
                <li><span className="text-white/50">{t('pages.turkishPrivateUniversities.breadcrumbs.studyInTurkey')}</span></li>
                <li className="text-white/50">/</li>
                <li className="text-primary">{t('pages.turkishPrivateUniversities.breadcrumbs.current')}</li>
            </ul>
        </div>
        <Link to="/ar/turkish-private-universities" className="text-sm text-primary hover:underline hover:text-secondary my-4 block transition-colors">
          {t('pages.turkishPrivateUniversities.languageSwitch')}
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('pages.turkishPrivateUniversities.header.title')}
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            {t('pages.turkishPrivateUniversities.header.subtitle')}
          </p>
        </header>

        <section className="mb-12" id="introduction">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.turkishPrivateUniversities.introduction.title')}</h2>
          <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-4 text-white/90">
            <p>{t('pages.turkishPrivateUniversities.introduction.paragraph1')}</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>{t('pages.turkishPrivateUniversities.introduction.value')}</strong> {t('pages.turkishPrivateUniversities.introduction.valueContent')}</li>
              <li><strong>{t('pages.turkishPrivateUniversities.introduction.promise')}</strong> {t('pages.turkishPrivateUniversities.introduction.promiseContent')}</li>
            </ul>
          </div>
        </section>

        <section className="mb-12" id="why-private">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.turkishPrivateUniversities.whyPrivate.title')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl glass-panel border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <h3 className="text-2xl font-bold mb-3 text-primary">{t('pages.turkishPrivateUniversities.whyPrivate.quality.title')}</h3>
              <p className="text-white/90 leading-relaxed">{t('pages.turkishPrivateUniversities.whyPrivate.quality.content')}</p>
            </div>
            <div className="p-8 rounded-2xl glass-panel border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
              <h3 className="text-2xl font-bold mb-3 text-primary">{t('pages.turkishPrivateUniversities.whyPrivate.english.title')}</h3>
              <p className="text-white/90 leading-relaxed">{t('pages.turkishPrivateUniversities.whyPrivate.english.content')}</p>
            </div>
            <div className="p-8 rounded-2xl glass-panel border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 md:col-span-2">
              <h3 className="text-2xl font-bold mb-3 text-primary">{t('pages.turkishPrivateUniversities.whyPrivate.flexibility.title')}</h3>
              <p className="text-white/90 leading-relaxed">{t('pages.turkishPrivateUniversities.whyPrivate.flexibility.content')}</p>
            </div>
          </div>
        </section>

        <section className="mb-12" id="key-facts">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.turkishPrivateUniversities.keyFacts.title')}</h2>
            <SEODataTable
                caption={t('pages.turkishPrivateUniversities.keyFacts.tableCaption')}
                descriptionId="private-uni-facts-en"
                headers={t('pages.turkishPrivateUniversities.keyFacts.headers', { returnObjects: true }) as string[]}
                rows={t('pages.turkishPrivateUniversities.keyFacts.rows', { returnObjects: true }) as string[][]}
            />
        </section>

        <section className="mb-12" id="requirements">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.turkishPrivateUniversities.requirements.title')}</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">{t('pages.turkishPrivateUniversities.requirements.bachelor.title')}</h3>
               <SEODataTable
                caption={t('pages.turkishPrivateUniversities.requirements.bachelor.tableCaption')}
                descriptionId="bachelor-req-en"
                headers={t('pages.turkishPrivateUniversities.requirements.bachelor.headers', { returnObjects: true }) as string[]}
                rows={t('pages.turkishPrivateUniversities.requirements.bachelor.rows', { returnObjects: true }) as string[][]}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">{t('pages.turkishPrivateUniversities.requirements.master.title')}</h3>
               <SEODataTable
                caption={t('pages.turkishPrivateUniversities.requirements.master.tableCaption')}
                descriptionId="master-req-en"
                headers={t('pages.turkishPrivateUniversities.requirements.master.headers', { returnObjects: true }) as string[]}
                rows={t('pages.turkishPrivateUniversities.requirements.master.rows', { returnObjects: true }) as string[][]}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">{t('pages.turkishPrivateUniversities.requirements.phd.title')}</h3>
              <SEODataTable
                caption={t('pages.turkishPrivateUniversities.requirements.phd.tableCaption')}
                descriptionId="phd-req-en"
                headers={t('pages.turkishPrivateUniversities.requirements.phd.headers', { returnObjects: true }) as string[]}
                rows={t('pages.turkishPrivateUniversities.requirements.phd.rows', { returnObjects: true }) as string[][]}
              />
            </div>
          </div>
        </section>

        <section className="mb-12" id="fees">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.turkishPrivateUniversities.fees.title')}</h2>
            <p className="mb-4 text-white/90">{t('pages.turkishPrivateUniversities.fees.intro')}</p>
            <SEODataTable
                caption={t('pages.turkishPrivateUniversities.fees.tableCaption')}
                descriptionId="fees-example-en"
                headers={t('pages.turkishPrivateUniversities.fees.headers', { returnObjects: true }) as string[]}
                rows={t('pages.turkishPrivateUniversities.fees.rows', { returnObjects: true }) as string[][]}
            />
            <div className="mt-4 text-center">
                <Link to="/en/tuition-fees-turkey-2025" className="text-primary hover:underline">{t('pages.turkishPrivateUniversities.fees.learnMoreLink')}</Link>
            </div>
        </section>

        <section className="mb-12" id="registration-steps">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.turkishPrivateUniversities.registrationSteps.title')}</h2>
          <ol className="list-decimal list-inside space-y-4 text-white/90">
            {(t('pages.turkishPrivateUniversities.registrationSteps.steps', { returnObjects: true }) as Array<{ title: string; content: string }>).map((step, index) => (
              <li key={index}><strong>{step.title}</strong> {step.content}</li>
            ))}
          </ol>
        </section>

        <section className="mb-12" id="scholarships">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.turkishPrivateUniversities.scholarships.title')}</h2>
            <div className="space-y-4 text-white/90">
                <p>{t('pages.turkishPrivateUniversities.scholarships.intro')}</p>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>{t('pages.turkishPrivateUniversities.scholarships.guaranteed')}</strong> {t('pages.turkishPrivateUniversities.scholarships.guaranteedContent')}</li>
                    <li><strong>{t('pages.turkishPrivateUniversities.scholarships.merit')}</strong> {t('pages.turkishPrivateUniversities.scholarships.meritContent')}</li>
                    <li><strong>{t('pages.turkishPrivateUniversities.scholarships.tips')}</strong> {t('pages.turkishPrivateUniversities.scholarships.tipsContent')}</li>
                </ul>
            </div>
        </section>

        <section className="mb-12" id="common-mistakes">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.turkishPrivateUniversities.commonMistakes.title')}</h2>
          <ul className="list-disc list-inside space-y-3 text-red-200 bg-red-900/30 border border-red-500/30 p-6 rounded-lg backdrop-blur-sm">
            {(t('pages.turkishPrivateUniversities.commonMistakes.items', { returnObjects: true }) as Array<{ title: string; content: string }>).map((item, index) => (
              <li key={index}><strong className="text-red-300">{item.title}</strong> {item.content}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12" id="faq">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.turkishPrivateUniversities.faqSection.title')}</h2>
          <FAQSection variant="dark" />
        </section>

        <section className="text-center py-10 bg-primary text-white rounded-lg" id="cta">
            <h2 className="text-3xl font-bold mb-3">{t('pages.turkishPrivateUniversities.cta.title')}</h2>
            <p className="mb-6 text-lg opacity-90">{t('pages.turkishPrivateUniversities.cta.subtitle')}</p>
            <WhatsAppButton />
        </section>

        <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4 text-white">{t('pages.turkishPrivateUniversities.discoverMore.title')}</h3>
            <div className="flex justify-center gap-4">
                <Link to="/en/study-in-turkey" className="text-primary hover:underline hover:text-secondary transition-colors">{t('pages.turkishPrivateUniversities.discoverMore.studyGuide')}</Link>
                <span className="text-white/40">|</span>
                <Link to="/en/tuition-fees-turkey-2025" className="text-primary hover:underline hover:text-secondary transition-colors">{t('pages.turkishPrivateUniversities.discoverMore.tuitionFees')}</Link>
            </div>
        </div>
      </div>
      
      <Footer />
      </div>
    </>
  );
}
