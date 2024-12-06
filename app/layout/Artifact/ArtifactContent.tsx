/**
 * Content Display Component
 * 
 * Handles the main content area of the artifact panel, similar to a browser's viewport.
 * 
 * Features:
 * 1. Collapsible content with animations
 * 2. Tab bar integration
 * 3. Scrollable content area
 * 4. Different states for content display:
 *    - Empty state (no artifacts)
 *    - Blank tab state
 *    - Artifact content state
 * 5. Custom artifact rendering system
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { ArtifactTabsSection } from "./ArtifactTabSection"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ArtifactContentProps {
  isCollapsed: boolean;
  artifact: any;
  currentArtifact: any | null;
  tabsRef: React.RefObject<HTMLDivElement>;
  renderArtifact: (artifact: any) => React.ReactNode;
  onTabChange: (tab: any) => void;
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
    <div className={cn(
      "w-full h-full flex flex-col overflow-hidden",
      "transition-[opacity,visibility] duration-300",
      isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
    )}>
      <div ref={tabsRef}>
        <ArtifactTabsSection
          artifact={artifact} 
          onTabChange={onTabChange}
        />
      </div>

      <div className="flex-1 relative">
        <ScrollArea className="h-full w-full" type="hover">
          <div className="p-4 pl-6">
            {!currentArtifact ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-2">
                <p>No artifacts to display</p>
                <p className="text-sm">Click on an item in the workspace to view its details</p>
              </div>
            ) : currentArtifact.isBlank ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-2">
                <p>New Tab</p>
                <p className="text-sm">Click on an item in the workspace to view its details</p>
              </div>
            ) : (
              renderArtifact(currentArtifact)
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
} 