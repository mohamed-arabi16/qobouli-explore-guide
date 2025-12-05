
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
    { id: 1, title: t('roadmap.step1'), icon: <Phone className="h-8 w-8 text-white" /> },
    { id: 2, title: t('roadmap.step2'), icon: <Book className="h-8 w-8 text-white" /> },
    { id: 3, title: t('roadmap.step3'), icon: <University className="h-8 w-8 text-white" /> },
    { id: 4, title: t('roadmap.step4'), icon: <FileUp className="h-8 w-8 text-white" /> },
    { id: 5, title: t('roadmap.step5'), icon: <Handshake className="h-8 w-8 text-white" /> }
  ];
  
  // Scroll-based active step tracking (one-way animation)
  React.useEffect(() => {
    if (allStepsActivated) return; // Stop tracking once all steps are activated

    const handleScroll = () => {
      if (!roadmapRef.current || allStepsActivated) return;

      const roadmapTop = roadmapRef.current.getBoundingClientRect().top;
      const roadmapHeight = roadmapRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress through the roadmap section
      const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - roadmapTop) / (roadmapHeight + viewportHeight * 0.5)));
      
      // Activate steps progressively based on scroll
      const newActiveStep = Math.min(Math.floor(scrollProgress * (steps.length + 1)), steps.length);
      
      if (newActiveStep > activeStep) {
        setActiveStep(newActiveStep);
        
        // Mark all steps as activated when we reach the end
        if (newActiveStep >= steps.length) {
          setAllStepsActivated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStep, steps.length, allStepsActivated]);

  return (
    <div id={id} ref={roadmapRef} className="section-spacing bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('roadmap.title')}
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
            {t('roadmap.subtitle')}
          </p>
          
          {/* Desktop: Horizontal layout */}
          <div className="hidden md:block relative">
            {/* Background line */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/20 rounded-full"></div>
            
            {/* Animated progress line */}
            <svg className="absolute top-20 left-0 w-full h-1" style={{ transform: 'translateY(-50%)' }}>
              <defs>
                <linearGradient id="lineGradient" x1={language === 'ar' ? '100%' : '0%'} y1="0%" x2={language === 'ar' ? '0%' : '100%'} y2="0%">
                  <stop offset="0%" stopColor="#009DB0" />
                  <stop offset="100%" stopColor="#00ABAB" />
                </linearGradient>
              </defs>
              <line 
                x1={language === 'ar' ? '100%' : '0'} 
                y1="2" 
                x2={language === 'ar' ? '0' : '100%'} 
                y2="2" 
                stroke="url(#lineGradient)" 
                strokeWidth="3"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className={language === 'ar' ? 'roadmap-progress-line-desktop-rtl' : 'roadmap-progress-line-desktop'}
              />
            </svg>
            
            {/* Animated traveling dot */}
            <div className={`roadmap-traveling-dot hidden md:block ${language === 'ar' ? 'rtl' : ''}`}></div>
            
            <div className="grid grid-cols-5 gap-6">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  data-step-id={step.id}
                  className={`relative z-10 flex flex-col items-center roadmap-item group transition-all duration-300 ${
                    activeStep >= step.id ? 'active in-view' : ''
                  }`}
                >
                  <div className={`roadmap-icon flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg mb-4 transition-all duration-300 hover:scale-105 ${
                    activeStep >= step.id ? 'shadow-2xl shadow-primary/50 ring-4 ring-primary/30 scale-105' : ''
                  }`}>
                    {React.cloneElement(step.icon as React.ReactElement, { 'aria-hidden': 'true' })}
                    <span className="absolute -bottom-2 -right-2 flex items-center justify-center w-8 h-8 bg-accent text-white text-sm font-bold rounded-full shadow-lg" aria-hidden="true">
                      {step.id}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-center px-2 leading-snug text-[#0C1439]">
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical layout */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex items-start gap-4 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg flex-shrink-0">
                  {React.cloneElement(step.icon as React.ReactElement, { 'aria-hidden': 'true' })}
                  <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-accent text-white text-xs font-bold rounded-full shadow-lg" aria-hidden="true">
                    {step.id}
                  </span>
                </div>
                <div className="flex-1 p-5 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                  <h3 className="text-lg font-bold leading-snug text-white">
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
