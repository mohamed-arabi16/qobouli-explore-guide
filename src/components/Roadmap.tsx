
import React, { useRef } from 'react';
import { Book, FileUp, Handshake, Phone, University } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RoadmapStep {
  id: number;
  title: string;
  icon: React.ReactNode;
}

interface RoadmapProps {
  id?: string;
}

const Roadmap: React.FC<RoadmapProps> = ({ id }) => {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [allStepsActivated, setAllStepsActivated] = React.useState<boolean>(false);
  
  const steps: RoadmapStep[] = [
    { id: 1, title: t('roadmap.step1'), icon: <Phone className="h-7 w-7 text-white" /> },
    { id: 2, title: t('roadmap.step2'), icon: <Book className="h-7 w-7 text-white" /> },
    { id: 3, title: t('roadmap.step3'), icon: <University className="h-7 w-7 text-white" /> },
    { id: 4, title: t('roadmap.step4'), icon: <FileUp className="h-7 w-7 text-white" /> },
    { id: 5, title: t('roadmap.step5'), icon: <Handshake className="h-7 w-7 text-white" /> }
  ];
  
  // Scroll-based active step tracking (one-way animation)
  React.useEffect(() => {
    if (allStepsActivated) return;

    const handleScroll = () => {
      if (!roadmapRef.current || allStepsActivated) return;

      const roadmapTop = roadmapRef.current.getBoundingClientRect().top;
      const roadmapHeight = roadmapRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - roadmapTop) / (roadmapHeight + viewportHeight * 0.5)));
      const newActiveStep = Math.min(Math.floor(scrollProgress * (steps.length + 1)), steps.length);
      
      if (newActiveStep > activeStep) {
        setActiveStep(newActiveStep);
        
        if (newActiveStep >= steps.length) {
          setAllStepsActivated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStep, steps.length, allStepsActivated]);

  return (
    <div id={id} ref={roadmapRef} className="section-spacing bg-gradient-to-b from-background via-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold mb-5 gradient-text leading-tight">
              {t('roadmap.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {t('roadmap.subtitle')}
            </p>
          </div>
          
          {/* Desktop: Horizontal layout */}
          <div className="hidden md:block relative">
            {/* Background line */}
            <div className="absolute top-[70px] left-0 right-0 h-[2px] bg-gradient-to-r from-border via-primary/20 to-border rounded-full"></div>
            
            {/* Animated progress line */}
            <svg className="absolute top-[70px] left-0 w-full h-[2px]" style={{ transform: 'translateY(-50%)' }}>
              <defs>
                <linearGradient id="lineGradient" x1={language === 'ar' ? '100%' : '0%'} y1="0%" x2={language === 'ar' ? '0%' : '100%'} y2="0%">
                  <stop offset="0%" stopColor="#0A7B8A" />
                  <stop offset="100%" stopColor="#087F8C" />
                </linearGradient>
              </defs>
              <line 
                x1={language === 'ar' ? '100%' : '0'} 
                y1="1" 
                x2={language === 'ar' ? '0' : '100%'} 
                y2="1" 
                stroke="url(#lineGradient)" 
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className={language === 'ar' ? 'roadmap-progress-line-desktop-rtl' : 'roadmap-progress-line-desktop'}
              />
            </svg>
            
            {/* Traveling dot */}
            <div className={`roadmap-traveling-dot hidden md:block ${language === 'ar' ? 'rtl' : ''}`} style={{ top: '66px' }}></div>
            
            {/* Steps Grid */}
            <div className="grid grid-cols-5 gap-4 lg:gap-6">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  data-step-id={step.id}
                  className={`relative z-10 flex flex-col items-center roadmap-item group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    activeStep >= step.id ? 'active in-view' : ''
                  }`}
                >
                  {/* Icon Circle */}
                  <div className={`relative flex items-center justify-center w-16 h-16 lg:w-18 lg:h-18 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    activeStep >= step.id 
                      ? 'shadow-glow-primary-lg scale-105' 
                      : 'shadow-soft opacity-70'
                  }`}>
                    {React.cloneElement(step.icon as React.ReactElement, { 'aria-hidden': 'true' })}
                    {/* Step number badge */}
                    <span className="absolute -bottom-2 -right-2 flex items-center justify-center w-7 h-7 bg-accent text-white text-xs font-semibold rounded-lg shadow-soft" aria-hidden="true">
                      {step.id}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm lg:text-[15px] font-semibold text-center px-1 leading-snug text-foreground">
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical layout */}
          <div className="md:hidden space-y-6">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex items-start gap-4 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Icon */}
                <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glow-primary flex-shrink-0">
                  {React.cloneElement(step.icon as React.ReactElement, { 'aria-hidden': 'true', className: 'h-6 w-6 text-white' })}
                  <span className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center w-6 h-6 bg-accent text-white text-xs font-semibold rounded-lg shadow-soft" aria-hidden="true">
                    {step.id}
                  </span>
                </div>
                
                {/* Content Card */}
                <div className="flex-1 p-5 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-soft">
                  <h3 className="text-base font-semibold leading-snug text-foreground">
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
