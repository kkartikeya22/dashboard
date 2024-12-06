/**
 * Tab Bar Management Component
 * 
 * Implements a complete browser-like tab bar with:
 * 1. Navigation Controls
 *    - Back/Forward buttons
 *    - Navigation state management
 * 
 * 2. Tab List Features
 *    - Horizontal scrolling for many tabs
 *    - New tab button
 *    - Tab overflow handling
 * 
 * 3. Tab Operations
 *    - Add new blank tab
 *    - Tab selection
 *    - Tab removal
 *    - Tab reordering
 * 
 * 4. Scroll Behavior
 *    - Auto-scroll to new tabs
 *    - Smooth scrolling animations
 */

import * as React from "react"
import { Plus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Tab, Artifact } from './Artifact'
import { ArtifactTab } from './ArtifactTab'
import { TabNavigation } from './ArtifactTabNavigation'
import { useTabManager } from './hooks/useTabManager'
import { useScrollHelper } from './hooks/useScrollHelper'

interface ArtifactTabsSectionProps {
  onTabChange: (tab: Tab | undefined) => void;
  artifact: Artifact | null;
}

export function ArtifactTabsSection({ onTabChange, artifact }: ArtifactTabsSectionProps) {
  const {
    tabs,
    setTabs,
    activeTabId,
    setActiveTabId,
    canGoBack,
    canGoForward,
    createNewTab,
    createBlankTab,
    handleHistoryNavigation,
    handleRemoveTab,
    moveTab,
    tabsContainerRef
  } = useTabManager({ onTabChange, artifact });

  const { scrollToTab, scrollToEnd } = useScrollHelper(tabsContainerRef);

  const handleAddBlankTab = () => {
    const newTab = createBlankTab();
    setTabs(currentTabs => [...currentTabs, newTab]);
    setActiveTabId(newTab.id);
    scrollToEnd();
    onTabChange(newTab);
  };

  return (
    <div className="border-b">
      <div className="flex items-center">
        <TabNavigation 
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onNavigate={handleHistoryNavigation}
        />

        <div className="flex-1 max-w-[calc(100%-4rem)] overflow-x-auto thin-scrollbar">
          <div className="flex items-center w-max py-1" ref={tabsContainerRef}>
            {tabs.map((tab, index) => (
              <ArtifactTab
                key={tab.id}
                tab={tab}
                index={index}
                activeTabId={activeTabId}
                onTabClick={setActiveTabId}
                onRemoveTab={handleRemoveTab}
                onMoveTab={moveTab}
              />
            ))}
            <div
              onClick={handleAddBlankTab}
              className={cn(
                'flex items-center justify-center',
                'px-2 py-0.5 h-8',
                'hover:bg-blue-50/50 cursor-pointer',
                'transition-colors duration-150'
              )}
              title="New Tab"
            >
              <Plus className="w-3 h-3 text-gray-400 hover:text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
