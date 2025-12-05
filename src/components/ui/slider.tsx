import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, dir, ...props }, ref) => {
  const isRTL = dir === 'rtl';
  
  return (
    <SliderPrimitive.Root
      ref={ref}
      dir={dir}
      className={cn(
        "relative flex w-full touch-none select-none items-center py-1",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-white/15 backdrop-blur-sm border border-white/25 shadow-inner">
        <SliderPrimitive.Range 
          className={cn(
            "absolute h-full shadow-[0_0_10px_rgba(0,171,171,0.5)]",
            isRTL 
              ? "bg-gradient-to-l from-[#009DB0] to-[#00ABAB]" 
              : "bg-gradient-to-r from-[#009DB0] to-[#00ABAB]"
          )} 
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-2 border-white/50 bg-white/70 backdrop-blur-md shadow-lg ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-110" />
    </SliderPrimitive.Root>
  );
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
