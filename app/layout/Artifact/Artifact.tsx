import * as React from "react"
import { useWorkspace } from "@/app/layout/Workspace/WorkspaceContext"
import { cn } from "@/lib/utils"
import { CollapseButton } from "./ArtifactCollapseButton"
import { ArtifactContent } from "./ArtifactContent"
import { ReactNode } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/**
 * Core Artifact Component
 * 
 * This component implements a browser-like panel that can be:
 * - Collapsed/expanded (similar to browser devtools)
 * - Shows multiple tabs with artifacts
 * - Maintains tab state and content
 * 
 * Key Features:
 * 1. Collapsible panel with smooth animations
 * 2. Dynamic width adjustment
 * 3. Tab height calculations for proper layout
 * 4. Artifact content rendering system
 */

export interface Artifact {
  id: string;
  title: string;
  renderArtifact: () => ReactNode;
  currentUrl?: string;
}

export interface Tab {
  id: string;
  title: string;
  artifact: Artifact | null;
  currentUrl: string;
  history: Artifact[];
  historyIndex: number;
  isBlank?: boolean;
}

export const ItemType = {
  TAB: 'tab',
}; 

export interface ArtifactProps {
  renderArtifact: (artifact: Artifact) => React.ReactNode;
}

export interface ArtifactState {
  isCollapsed: boolean;
  currentArtifact: Artifact | null;
  tabsHeight: number;
} 

export function Artifact({ renderArtifact }: ArtifactProps) {
  const { artifact, activeComponent } = useWorkspace()
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [currentArtifact, setCurrentArtifact] = React.useState<Artifact | null>(null);
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const [tabsHeight, setTabsHeight] = React.useState(0);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--artifact-width', isCollapsed ? '2.5rem' : '50%');
    return () => {
      document.documentElement.style.removeProperty('--artifact-width');
    };
  }, [isCollapsed]);

  React.useEffect(() => {
    if (!artifact) return;
    setIsCollapsed(false);
  }, [artifact]);

  React.useEffect(() => {
    setIsCollapsed(true);
  }, [activeComponent]);

  React.useEffect(() => {
    const updateTabsHeight = () => {
      if (tabsRef.current) {
        setTabsHeight(tabsRef.current.offsetHeight);
      }
    };

    updateTabsHeight();
    const observer = new ResizeObserver(updateTabsHeight);
    if (tabsRef.current) {
      observer.observe(tabsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "flex-shrink-0 relative",
            "transition-[width] duration-300 ease-in-out",
            "bg-gradient-to-br from-background via-secondary/20 to-primary/10",
            "border border-primary/20",
            "shadow-lg shadow-primary/5",
            "rounded-2xl overflow-hidden",
            isCollapsed ? "w-10" : "w-[50vw] max-w-[50%]"
          )}>
            <ArtifactContent
              isCollapsed={isCollapsed}
              artifact={artifact as Artifact}
              currentArtifact={currentArtifact}
              tabsRef={tabsRef}
              renderArtifact={renderArtifact}
              onTabChange={(tab) => {
                if (tab?.isBlank) {
                  setCurrentArtifact(null);
                } else if (tab?.artifact) {
                  setCurrentArtifact(tab.artifact);
                } else if (tab === undefined && artifact) {
                  setCurrentArtifact(artifact as Artifact);
                } else {
                  setCurrentArtifact(null);
                }
              }}
            />
            <CollapseButton
              isCollapsed={isCollapsed}
              tabsHeight={tabsHeight}
              onToggle={() => setIsCollapsed(!isCollapsed)}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="left" 
          className="bg-secondary/90 text-secondary-foreground rounded-lg"
        >
          {isCollapsed ? "Expand artifact panel" : "Collapse artifact panel"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
