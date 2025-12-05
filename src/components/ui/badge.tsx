import * as React from "react"
import { cn } from "@/lib/utils"
import { badgeVariants, type BadgeProps } from "./badge-variants" // Changed import

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge } // Only export Badge
// Exporting BadgeProps and badgeVariants separately if needed by consumers, from badge-variants.ts
export type { BadgeProps } from "./badge-variants";
