
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

const LoadingFallback = () => <div className="h-52 w-full bg-gray-200 animate-pulse rounded-md" />;

interface TranslatedFAQItem {
  q: string;
  a: string[];
}

const Index = () => {
  const { t } = useLanguage();
  const { t: tRoot } = useTranslation();

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
    <div className="min-h-screen bg-qobouli-bg-soft text-direction-rtl">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>
      <Navbar />
      <Hero />
      
      <section id="ai-tool" className="section-spacing">
        <AIMajorRecommender />
      </section>

      <Suspense fallback={<LoadingFallback />}>
        <section id="announcements" className="section-spacing bg-background">
          <Announcement />
        </section>
      </Suspense>
      
      {/* Logo section - can be part of a section or stand-alone with spacing */}
      <div className="bg-white py-12 text-center section-spacing">
        <img
          src="/lovable-uploads/133b63e3-34b5-426d-b599-9645db7180a9.png"
          alt={t('index.logoAlt')}
          className="h-40 mx-auto object-fill"
          loading="lazy"
        />
      </div>
      
      <Suspense fallback={<LoadingFallback />}>
        <section id="faq" className="section-spacing">
          <FAQSection />
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section id="roadmap" className="section-spacing bg-background">
          <Roadmap />
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
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
