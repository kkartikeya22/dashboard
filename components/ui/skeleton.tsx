import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md",
        "bg-indigo-100/50 hover:bg-indigo-200/50",
        "border border-indigo-200/30",
        "shadow-sm transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
