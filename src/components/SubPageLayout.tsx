import React from 'react';
import { cn } from '@/lib/utils';

interface SubPageLayoutProps {
  children: React.ReactNode;
  className?: string;
  dir?: 'ltr' | 'rtl';
}

export const SubPageLayout: React.FC<SubPageLayoutProps> = ({ children, className, dir = 'ltr' }) => {
  return (
    <div 
      className={cn(
        "min-h-screen bg-gradient-to-br from-[#0C1439] via-[#162456] to-[#1a2a5e]",
        className
      )}
      dir={dir}
    >
      {children}
    </div>
  );
};

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "glass-panel p-6 md:p-8 rounded-3xl",
        "bg-white/5 backdrop-blur-xl",
        "border border-white/10",
        "shadow-lg shadow-black/10",
        className
      )}
    >
      {children}
    </div>
  );
};

interface ContentSectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const ContentSection: React.FC<ContentSectionProps> = ({ 
  id, 
  title, 
  children, 
  className,
  noPadding = false 
}) => {
  return (
    <section 
      id={id} 
      className={cn(
        noPadding ? "" : "mb-12",
        className
      )}
    >
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b-2 border-primary pb-3 text-white">
          {title}
        </h2>
      )}
      <GlassPanel>
        {children}
      </GlassPanel>
    </section>
  );
};