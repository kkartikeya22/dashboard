"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    variant?: "default" | "subtle" | "accent"
  }
>(
  (
    { className, orientation = "horizontal", decorative = true, variant = "default", ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 transition-colors duration-200",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        variant === "default" && "bg-indigo-200 hover:bg-indigo-300",
        variant === "subtle" && "bg-indigo-100/50 hover:bg-indigo-200/50",
        variant === "accent" && "bg-indigo-500 hover:bg-indigo-600",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
