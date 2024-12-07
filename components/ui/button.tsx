import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-600 text-white shadow hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md active:scale-[0.98]",
        outline:
          "border border-indigo-200 bg-white text-indigo-700 shadow-sm hover:bg-indigo-50/50 hover:text-indigo-800 hover:border-indigo-300 hover:shadow-md active:scale-[0.98]",
        secondary:
          "bg-indigo-100 text-indigo-700 shadow-sm hover:bg-indigo-200 hover:text-indigo-800 hover:shadow-md active:scale-[0.98]",
        ghost: "text-indigo-600 hover:bg-indigo-50/50 hover:text-indigo-700 active:scale-[0.98]",
        link: "text-indigo-600 underline-offset-4 hover:text-indigo-700 hover:underline",
        success: "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md active:scale-[0.98]",
        warning: "bg-amber-500 text-white shadow-sm hover:bg-amber-600 hover:shadow-md active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
        xs: "h-8 rounded-md px-2.5 text-xs",
        xl: "h-12 rounded-md px-10 text-base",
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
