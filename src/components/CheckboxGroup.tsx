
import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

export const CheckboxGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <div 
      className={cn("space-y-2", className)} 
      dir={isRTL ? "rtl" : "ltr"}
      {...props} 
    />
  );
};

export const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-qobouli-cta ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-qobouli-cta data-[state=checked]:text-white",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

CheckboxItem.displayName = "CheckboxItem";
