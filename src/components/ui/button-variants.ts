import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react" // For ButtonProps

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-button hover:shadow-button-hover hover:bg-primary/92 hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-button hover:shadow-button-hover hover:bg-destructive/92 hover:-translate-y-0.5",
        outline:
          "border border-input bg-background hover:bg-muted/50 hover:border-primary/30 hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground shadow-button hover:shadow-button-hover hover:bg-secondary/92 hover:-translate-y-0.5",
        ghost: "hover:bg-muted/50 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
