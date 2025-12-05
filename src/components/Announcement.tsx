import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Removed CardDescription
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from '@/contexts/LanguageContext'; // Assuming you have a language context for localization
import { announcementsData, AnnouncementItem } from '@/data/announcements'; // Import from new data file

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
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-qobouli-text">
          {t('ui.announcement.title')}
        </h2>
        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">
            {t('ui.announcement.noAnnouncements')}
          </p>
        ) : (
          <div className="relative flex items-center overflow-hidden">
            <button
              onClick={language === 'ar' ? goNext : goPrev}
              className="absolute left-0 z-10 p-2 bg-white rounded-full shadow -translate-y-1/2 top-1/2 transition-transform active:scale-90 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">{t('ui.announcement.previous')}</span>
            </button>
            <div
              ref={containerRef}
              className="flex w-full justify-start overflow-hidden px-8 sm:px-12"
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
                        "transition-all duration-300 ease-in-out mx-2 basis-4/5 sm:basis-3/4 md:basis-3/5 lg:basis-1/2 shrink-0",
                        isActive ?
                          'opacity-100 scale-100 z-10' :
                          'opacity-50 scale-95 sm:scale-[0.85]'
                      )}
                  >
                    <Dialog>
                      <DialogTrigger asChild disabled={!isActive}>
                        <Card
                          className="glass-panel cursor-pointer transition-shadow duration-300 flex flex-col h-full text-right"
                          tabIndex={isActive ? 0 : -1}
                        >
                          <CardHeader>
                            <CardTitle className="text-white leading-tight text-lg md:text-xl">
                              {announcement.title[language as 'ar' | 'en']}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-white/90 whitespace-pre-line text-sm md:text-base">
                              {formatText(announcement.preview[language as 'ar' | 'en'])}
                            </p>
                          </CardContent>
                          <div className="p-6 pt-0 mt-auto">
                            <span className="text-sm text-white hover:underline">
                              {t('ui.announcement.readMore')}
                            </span>
                          </div>
                        </Card>
                      </DialogTrigger>
                      <DialogContent
                        className="sm:max-w-[600px] text-right max-h-[80vh] overflow-y-auto"
                        aria-describedby={`ann-desc-${announcement.id}`}
                      >
                        <DialogHeader>
                          <DialogTitle className="text-qobouli-primary leading-tight text-xl md:text-2xl">
                            {announcement.title[language as 'ar' | 'en']}
                          </DialogTitle>
                          <DialogDescription id={`ann-desc-${announcement.id}`} className="sr-only">
                            {/* Short description for accessibility, can be visually hidden if needed */}
                            {t('ui.announcement.shortContext', 'Details about the announcement.')}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 text-gray-700 whitespace-pre-line text-sm md:text-base">
                          {formatText(announcement.fullText[language as 'ar' | 'en'])}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                );
              })}
            </div>
            <button
              onClick={language === 'ar' ? goPrev : goNext}
              className="absolute right-0 z-10 p-2 bg-white rounded-full shadow -translate-y-1/2 top-1/2 transition-transform active:scale-90 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">{t('ui.announcement.next')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
