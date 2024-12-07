/**
 * Content Display Component
 * 
 * Handles the main content area of the artifact panel, similar to a browser's viewport.
 * 
 * Features:
 * 1. Collapsible content with animations
 * 2. Tab bar integration
 * 3. Scrollable content area with overflow handling
 * 4. Different states for content display:
 *    - Empty state (no artifacts)
 *    - Blank tab state
 *    - Artifact content state
 * 5. Custom artifact rendering system
 * 6. Fully responsive across all screen sizes
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { ArtifactTabsSection } from "./ArtifactTabSection"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Artifact, Tab } from "./Artifact"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ArtifactContentProps {
  isCollapsed: boolean;
  artifact: Artifact;
  currentArtifact: Artifact | null;
  tabsRef: React.RefObject<HTMLDivElement>;
  renderArtifact: (artifact: Artifact) => React.ReactNode;
  onTabChange: (tab: Tab) => void;
}

export function ArtifactContent({
  isCollapsed,
  artifact,
  currentArtifact,
  tabsRef,
  renderArtifact,
  onTabChange
}: ArtifactContentProps) {
  return (
    <TooltipProvider>
      <div className={cn(
        "w-full h-full flex flex-col overflow-hidden",
        "transition-[opacity,visibility] duration-300 bg-background",
        isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
      )}>
        <div ref={tabsRef}>
          <ArtifactTabsSection
            artifact={artifact} 
            onTabChange={onTabChange}
          />
        </div>

        <div className="flex-1 relative min-h-0">
          <ScrollArea className="h-full w-full absolute inset-0" type="hover">
            <div className={cn(
              "p-2 sm:p-3 md:p-4 lg:p-4 xl:p-6", // Responsive padding
              "pl-3 sm:pl-4 md:pl-5 lg:pl-6 xl:pl-6", // Responsive left padding
              "bg-background/50" // Subtle background color
            )}>
              {!currentArtifact ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      "min-h-[200px] flex flex-col items-center justify-center gap-1 sm:gap-2",
                      "px-2 sm:px-4 md:px-6", // Responsive horizontal padding
                      "text-muted-foreground bg-muted/30 rounded-lg border border-border/50",
                      "cursor-help"
                    )}>
                      <p className="text-sm sm:text-base">No artifacts to display</p>
                      <p className="text-xs sm:text-sm text-center">Click on an item in the workspace to view its details</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select an item from the workspace to view its content here</p>
                  </TooltipContent>
                </Tooltip>
              ) : currentArtifact.isBlank ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      "min-h-[200px] flex flex-col items-center justify-center gap-1 sm:gap-2",
                      "px-2 sm:px-4 md:px-6", // Responsive horizontal padding
                      "text-muted-foreground bg-muted/30 rounded-lg border border-border/50",
                      "cursor-help"
                    )}>
                      <p className="text-sm sm:text-base">New Tab</p>
                      <p className="text-xs sm:text-sm text-center">Click on an item in the workspace to view its details</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a blank tab. Select content from the workspace to display it here.</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="min-w-0 w-full bg-card rounded-lg shadow-sm">
                      {renderArtifact(currentArtifact)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Viewing: {currentArtifact.title || 'Untitled Artifact'}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  )
} 