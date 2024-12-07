import * as React from "react"
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CollapseButtonProps {
  isCollapsed: boolean;
  tabsHeight: number;
  onToggle: () => void;
}

export function CollapseButton({ isCollapsed, tabsHeight, onToggle }: CollapseButtonProps) {
  return (
    <button
      onClick={onToggle}
      style={isCollapsed ? undefined : { top: `${tabsHeight}px` }}
      className={cn(
        "absolute left-0 bottom-0",
        "w-10 flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        isCollapsed
          ? "top-0 hover:bg-gradient-to-r hover:from-transparent hover:to-primary/20"
          : "hover:bg-gradient-to-r hover:from-primary/20 hover:to-transparent",
        "group"
      )}
      title={isCollapsed ? "Expand panel" : "Collapse panel"}
    >
      <div className={cn(
        "relative z-10",
        "transition-transform duration-300 ease-in-out",
        "text-primary/60 group-hover:text-primary/80",
        isCollapsed ? "-translate-x-0.5" : "translate-x-0.5"
      )}>
        {isCollapsed ? 
          <ChevronsLeft className="w-4 h-4" /> : 
          <ChevronsRight className="w-4 h-4" />
        }
      </div>
    </button>
  )
} 