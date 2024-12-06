import * as React from "react"
import { cn } from "@/lib/utils"
import { useState } from 'react';
import { WorkspaceContent } from './WorkspaceContent';
import { WorkspaceTabBar } from './WorkspaceTabBar';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface WorkspaceProps {
  children?: React.ReactNode
  className?: string
  tabs?: Tab[]
}

export function Workspace({ children, className, tabs }: WorkspaceProps) {
  const [activeTab, setActiveTab] = useState<string | null>(tabs?.[0]?.id || null);

  if (!tabs) {
    return (
      <div className={cn("bg-white rounded-lg overflow-hidden flex flex-col h-full", className)}>
        {children}
      </div>
    )
  }

  return (
    <div className={cn("bg-white rounded-lg overflow-hidden flex flex-col h-full", className)}>
      <div className="flex flex-col h-full w-full">
        <WorkspaceTabBar 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <WorkspaceContent 
          content={activeTab ? tabs.find(tab => tab.id === activeTab)?.content : null}
        />
      </div>
    </div>
  );
}
