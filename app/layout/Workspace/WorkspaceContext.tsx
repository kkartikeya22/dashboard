"use client"

import * as React from "react"

interface Navigation {
  group: string;
  item: string;
  icon?: React.ReactNode;
  color?: string;
}

interface WorkspaceArtifact {
  id: string;
  type: 'chart' | 'table' | 'text' | 'image';
  data: unknown;
  metadata?: {
    title?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface WorkspaceComponent {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  component: React.ComponentType<{ artifact?: WorkspaceArtifact }>;
}

type WorkspaceContextType = {
  activeComponent: WorkspaceComponent | null;
  setActiveComponent: (component: WorkspaceComponent | null) => void;
  activeNavigation: Navigation | null;
  setActiveNavigation: (navigation: Navigation | null) => void;
  artifact: WorkspaceArtifact | null;
  setArtifact: (artifact: WorkspaceArtifact | null) => void;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const defaultTheme = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)', 
  accent: 'var(--accent)'
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeComponent, setActiveComponent] = React.useState<WorkspaceComponent | null>(null)
  const [activeNavigation, setActiveNavigation] = React.useState<Navigation | null>(null)
  const [artifact, setArtifact] = React.useState<WorkspaceArtifact | null>(null)

  const value = React.useMemo(() => ({
    activeComponent,
    setActiveComponent,
    activeNavigation, 
    setActiveNavigation,
    artifact,
    setArtifact,
    theme: defaultTheme
  }), [activeComponent, activeNavigation, artifact])

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const context = React.useContext(WorkspaceContext)
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider")
  }
  return context
}