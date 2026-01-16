import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from '@/contexts/LanguageContext';
import { announcementsData, AnnouncementItem } from '@/data/announcements';

const formatText = (text: string) => text.replace(/•\s*/g, '\n• ').trim();

const Announcement: React.FC = () => {
  const { language, t } = useLanguage();
  const [announcements] = useState<AnnouncementItem[]>(announcementsData);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const item = container.children[activeIndex] as HTMLElement;
    if (item) {
      const offset =
        item.offsetLeft -
        (container.clientWidth - item.clientWidth) / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [activeIndex]);

  const goPrev = () => {
    setActiveIndex((idx) =>
      idx === 0 ? announcements.length - 1 : idx - 1
    );
  };

  const goNext = () => {
    setActiveIndex((idx) =>
      idx === announcements.length - 1 ? 0 : idx + 1
    );
  };

  return (
    <div id="announcements">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-12 md:mb-14 text-white/95">
          {t('ui.announcement.title')}
        </h2>
        
        {announcements.length === 0 ? (
          <p className="text-center text-white/60">
            {t('ui.announcement.noAnnouncements')}
          </p>
        ) : (
          <div className="relative flex items-center overflow-hidden">
            {/* Navigation Button - Left */}
            <button
              onClick={language === 'ar' ? goNext : goPrev}
              className="absolute left-0 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 -translate-y-1/2 top-1/2 transition-all duration-300 hover:bg-white/20 hover:border-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <ArrowLeft className="h-4 w-4 text-white" />
              <span className="sr-only">{t('ui.announcement.previous')}</span>
            </button>
            
            {/* Carousel Container */}
            <div
              ref={containerRef}
              className="flex w-full justify-start overflow-hidden px-10 sm:px-14"
            >
              {announcements.map((announcement, index) => {
                const isActive = index === activeIndex;
                const isPrev = index === (activeIndex - 1 + announcements.length) % announcements.length;
                const isNext = index === (activeIndex + 1) % announcements.length;
                return (
                  <div
                    key={announcement.id}
                    role="group"
                    aria-hidden={!isActive}
                    data-active={isActive}
                    className={cn(
                      "transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] mx-2 basis-4/5 sm:basis-3/4 md:basis-3/5 lg:basis-1/2 shrink-0",
                      isActive 
                        ? 'opacity-100 scale-100 z-10' 
                        : 'opacity-40 scale-[0.92] sm:scale-[0.88]'
                    )}
                  >
                    <Dialog>
                      <DialogTrigger asChild disabled={!isActive}>
                        <Card
                          className={cn(
                            "cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col h-full border-white/10 bg-white/[0.06] backdrop-blur-xl",
                            isActive && "hover:bg-white/[0.09] hover:border-primary/30"
                          )}
                          tabIndex={isActive ? 0 : -1}
                        >
                          <CardHeader>
                            <CardTitle className="text-white/95 leading-tight text-lg md:text-xl font-semibold">
                              {announcement.title[language as 'ar' | 'en']}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-white/75 whitespace-pre-line text-sm md:text-[15px] leading-relaxed">
                              {formatText(announcement.preview[language as 'ar' | 'en'])}
                            </p>
                          </CardContent>
                          <div className="p-6 pt-0 mt-auto">
                            <span className="text-sm text-primary hover:text-secondary transition-colors duration-300 font-medium">
                              {t('ui.announcement.readMore')}
                            </span>
                          </div>
                        </Card>
                      </DialogTrigger>
                      
                      <DialogContent
                        className="sm:max-w-[600px] text-right max-h-[80vh] overflow-y-auto rounded-2xl"
                        aria-describedby={`ann-desc-${announcement.id}`}
                      >
                        <DialogHeader>
                          <DialogTitle className="text-primary leading-tight text-xl md:text-2xl font-semibold">
                            {announcement.title[language as 'ar' | 'en']}
                          </DialogTitle>
                          <DialogDescription id={`ann-desc-${announcement.id}`} className="sr-only">
                            {t('ui.announcement.shortContext', 'Details about the announcement.')}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-5 text-foreground/90 whitespace-pre-line text-sm md:text-[15px] leading-relaxed">
                          {formatText(announcement.fullText[language as 'ar' | 'en'])}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                );
              })}
            </div>
            
            {/* Navigation Button - Right */}
            <button
              onClick={language === 'ar' ? goPrev : goNext}
              className="absolute right-0 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 -translate-y-1/2 top-1/2 transition-all duration-300 hover:bg-white/20 hover:border-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <ArrowRight className="h-4 w-4 text-white" />
              <span className="sr-only">{t('ui.announcement.next')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
