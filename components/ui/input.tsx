import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-indigo-200 bg-white/95 px-3 py-2 text-base text-indigo-700 shadow-sm transition-all duration-200 placeholder:text-indigo-400 file:border-0 file:bg-transparent file:text-sm file:font-medium hover:border-indigo-300 hover:bg-white focus:border-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
