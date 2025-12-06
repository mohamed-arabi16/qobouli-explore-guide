import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEODataTable from '@/components/SEODataTable';
import FAQSection from '@/components/FAQSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SubPageLayout, ContentSection } from '@/components/SubPageLayout';

export default function StudyInTurkeyAR() {
    const { t } = useTranslation();

    const faqItems = t('pages.studyInTurkey.faqSection.items', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <>
      <Helmet>
        <html lang="ar" dir="rtl" />
        <title>{t('pages.studyInTurkey.meta.title')}</title>
        <meta name="description" content={t('pages.studyInTurkey.meta.description')} />
        <link rel="canonical" href={t('pages.studyInTurkey.meta.canonical')} />
        <link rel="alternate" hrefLang="en" href="https://qobouli.com/en/study-in-turkey" />
        <meta property="og:title" content={t('pages.studyInTurkey.meta.ogTitle')} />
        <meta property="og:description" content={t('pages.studyInTurkey.meta.ogDescription')} />
        <meta property="og:url" content={t('pages.studyInTurkey.meta.ogUrl')} />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org",
          "@type":"WebPage",
          "name":t('pages.studyInTurkey.meta.title'),
          "description":t('pages.studyInTurkey.meta.description'),
          "url":t('pages.studyInTurkey.meta.ogUrl'),
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
                <li><Link to="/" className="hover:text-primary transition-colors">{t('pages.studyInTurkey.breadcrumbs.home')}</Link></li>
                <li className="text-white/50">/</li>
                <li className="text-primary">{t('pages.studyInTurkey.breadcrumbs.current')}</li>
            </ul>
        </div>
        <Link to="/en/study-in-turkey" className="text-sm text-primary hover:underline my-4 block">
          {t('pages.studyInTurkey.languageSwitch')}
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('pages.studyInTurkey.header.title')}
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            {t('pages.studyInTurkey.header.subtitle')}
          </p>
        </header>

        <ContentSection id="intro" title={t('pages.studyInTurkey.intro.title')}>
            <p className="text-white/90 leading-relaxed">
                {t('pages.studyInTurkey.intro.content')}
            </p>
        </ContentSection>

        <ContentSection id="cities" title={t('pages.studyInTurkey.cities.title')}>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('pages.studyInTurkey.cities.istanbul.title')}</h3>
                    <p className="text-white/90 leading-relaxed">{t('pages.studyInTurkey.cities.istanbul.content')}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('pages.studyInTurkey.cities.ankara.title')}</h3>
                    <p className="text-white/90 leading-relaxed">{t('pages.studyInTurkey.cities.ankara.content')}</p>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('pages.studyInTurkey.cities.other.title')}</h3>
                    <ul className="list-disc list-inside space-y-2 mt-2 text-white/90">
                        <li><strong>إزمير:</strong> {t('pages.studyInTurkey.cities.other.izmir')}</li>
                        <li><strong>سكاريا:</strong> {t('pages.studyInTurkey.cities.other.sakarya')}</li>
                        <li><strong>قيصري:</strong> {t('pages.studyInTurkey.cities.other.kayseri')}</li>
                    </ul>
                </div>
            </div>
        </ContentSection>

        <section className="mb-12" id="living-costs">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.studyInTurkey.livingCosts.title')}</h2>
            <SEODataTable
                caption={t('pages.studyInTurkey.livingCosts.tableCaption')}
                descriptionId="living-costs-ar"
                headers={t('pages.studyInTurkey.livingCosts.headers', { returnObjects: true }) as string[]}
                rows={t('pages.studyInTurkey.livingCosts.rows', { returnObjects: true }) as string[][]}
            />
            <p className="mt-4 text-sm text-white/70">{t('pages.studyInTurkey.livingCosts.note')}</p>
        </section>

        <section className="mb-12" id="study-tracks">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 pb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent border-b-2 border-primary/30">{t('pages.studyInTurkey.studyTracks.title')}</h2>
            <p className="mb-4 text-white/90">{t('pages.studyInTurkey.studyTracks.content')}</p>
            <div className="text-center p-6 glass-panel rounded-lg">
                <p className="font-semibold text-white">{t('pages.studyInTurkey.studyTracks.cta.question')}</p>
                <a href="https://qobouli.com/ar/ai-major-recommender" className="text-primary hover:underline">{t('pages.studyInTurkey.studyTracks.cta.link')}</a>
            </div>
        </section>

        <section className="mb-12" id="requirements-quick">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">{t('pages.studyInTurkey.requirements.title')}</h2>
             <SEODataTable
                caption={t('pages.studyInTurkey.requirements.tableCaption')}
                descriptionId="admission-req-ar"
                headers={t('pages.studyInTurkey.requirements.headers', { returnObjects: true }) as string[]}
                rows={t('pages.studyInTurkey.requirements.rows', { returnObjects: true }) as string[][]}
            />
            <div className="mt-4 text-center">
                <Link to="/ar/turkish-private-universities#requirements" className="text-primary hover:underline">{t('pages.studyInTurkey.requirements.detailsLink')}</Link>
            </div>
        </section>

        <section className="mb-12" id="how-to-start">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2">{t('pages.studyInTurkey.howToStart.title')}</h2>
          <ol className="list-decimal list-inside space-y-4 text-white/90">
            {(t('pages.studyInTurkey.howToStart.steps', { returnObjects: true }) as Array<{ title: string; content: string }>).map((step, index) => (
              <li key={index}><strong>{step.title}</strong> {step.content}</li>
            ))}
          </ol>
        </section>

        <section className="mb-12" id="faq">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-primary pb-2 text-white">{t('pages.studyInTurkey.faqSection.title')}</h2>
          <FAQSection variant="dark" />
        </section>

        <section className="text-center py-10 bg-primary text-white rounded-lg" id="cta">
            <h2 className="text-3xl font-bold mb-3">{t('pages.studyInTurkey.cta.title')}</h2>
            <p className="mb-6 text-lg opacity-90">{t('pages.studyInTurkey.cta.subtitle')}</p>
            <WhatsAppButton />
        </section>

        <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4 text-white">{t('pages.studyInTurkey.discoverMore.title')}</h3>
            <div className="flex justify-center gap-4">
                <Link to="/ar/turkish-private-universities" className="text-primary hover:underline hover:text-secondary transition-colors">{t('pages.studyInTurkey.discoverMore.privateUniversities')}</Link>
                <span className="text-white/40">|</span>
                <Link to="/ar/tuition-fees-turkey-2025" className="text-primary hover:underline hover:text-secondary transition-colors">{t('pages.studyInTurkey.discoverMore.tuitionFees')}</Link>
            </div>
        </div>
      </div>

      <Footer />
      </SubPageLayout>
    </>
  );
}
