import * as React from "react"
import { useWorkspace } from "@/app/layout/Workspace/WorkspaceContext"
import { cn } from "@/lib/utils"
import { CollapseButton } from "./ArtifactCollapseButton"
import { ArtifactContent } from "./ArtifactContent"
import { ReactNode } from "react"

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
  [key: string]: any;
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
  renderArtifact: (artifact: any) => React.ReactNode;
}

export interface ArtifactState {
  isCollapsed: boolean;
  currentArtifact: any | null;
  tabsHeight: number;
} 

export function Artifact({ renderArtifact }: ArtifactProps) {
  const { artifact, setArtifact, activeComponent } = useWorkspace()
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [currentArtifact, setCurrentArtifact] = React.useState<any | null>(null);
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
    <div className={cn(
      "flex-shrink-0 bg-white rounded-lg relative",
      "transition-[width] duration-300 ease-in-out",
      isCollapsed ? "w-10" : "w-[50vw] max-w-[50%]"
    )}>
      <ArtifactContent
        isCollapsed={isCollapsed}
        artifact={artifact}
        currentArtifact={currentArtifact}
        tabsRef={tabsRef}
        renderArtifact={renderArtifact}
        onTabChange={(tab) => {
          if (tab?.isBlank) {
            setCurrentArtifact(null);
          } else if (tab?.artifact) {
            setCurrentArtifact(tab.artifact);
          } else if (tab === undefined && artifact) {
            setCurrentArtifact(artifact);
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
  );
}
