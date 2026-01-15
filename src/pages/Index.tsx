
import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AIMajorRecommender from '@/components/AIMajorRecommender';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLanguage } from '@/contexts/LanguageContext';

// Lazy load below-the-fold components
const Announcement = React.lazy(() => import('@/components/Announcement'));
const FAQSection = React.lazy(() => import('@/components/FAQSection'));
const Roadmap = React.lazy(() => import('@/components/Roadmap'));
const ResourceToolbox = React.lazy(() => import('@/components/ResourceToolbox'));

const LoadingFallback = () => (
  <div className="h-52 w-full bg-muted/30 animate-pulse rounded-2xl mx-auto max-w-3xl" />
);

interface TranslatedFAQItem {
  q: string;
  a: string[];
}

const Index = () => {
  const { t, language } = useLanguage();
  const { t: tRoot } = useTranslation();
  const isRTL = language === 'ar';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Qobouli",
    "url": "https://qobouli.com",
    "logo": "https://qobouli.com/og-logo.png",
    "sameAs": [
      "https://www.instagram.com/qobouli/"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://qobouli.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://qobouli.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqItems = tRoot('faq.items', { returnObjects: true }) as TranslatedFAQItem[] | string;
  let faqSchema = null;
  if (Array.isArray(faqItems)) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a.join(" ")
        }
      }))
    };
  }
  
  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <html lang={language} dir={isRTL ? 'rtl' : 'ltr'} />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>
      
      <Navbar />
      <Hero />
      
      {/* AI Major Recommender Section */}
      <section id="ai-tool" className="section-spacing bg-gradient-to-b from-background to-muted/20">
        <AIMajorRecommender />
      </section>

      {/* Announcements Section */}
      <Suspense fallback={<div className="section-spacing"><LoadingFallback /></div>}>
        <section id="announcements" className="section-spacing bg-accent">
          <Announcement />
        </section>
      </Suspense>
      
      {/* Logo Section - Clean and Minimal */}
      <div className="bg-background py-16 md:py-20 text-center">
        <img
          src="/lovable-uploads/133b63e3-34b5-426d-b599-9645db7180a9.png"
          alt={t('index.logoAlt')}
          className="h-32 md:h-40 mx-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
          loading="lazy"
        />
      </div>
      
      {/* FAQ Section */}
      <Suspense fallback={<div className="section-spacing"><LoadingFallback /></div>}>
        <section id="faq" className="section-spacing bg-background">
          <FAQSection />
        </section>
      </Suspense>

      {/* Roadmap Section */}
      <Suspense fallback={<div className="section-spacing"><LoadingFallback /></div>}>
        <section id="roadmap">
          <Roadmap />
        </section>
      </Suspense>

      {/* Resource Toolbox Section */}
      <Suspense fallback={<div className="section-spacing"><LoadingFallback /></div>}>
        <div className="bg-accent section-spacing">
          <ResourceToolbox />
        </div>
      </Suspense>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
