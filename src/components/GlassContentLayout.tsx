import React from 'react';
import { cn } from '@/lib/utils';

interface GlassContentLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GlassContentLayout: A wrapper component for SEO content pages that provides
 * consistent liquid glass effect styling with proper spacing and responsive design.
 */
const GlassContentLayout: React.FC<GlassContentLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "glass-content-panel rounded-2xl p-6 md:p-8 lg:p-10",
      "bg-white/5 backdrop-blur-xl",
      "border border-white/10",
      "shadow-xl shadow-black/20",
      "mb-8",
      className
    )}>
      {children}
    </div>
  );
};

export default GlassContentLayout;
