"use client"

import * as React from "react"

interface Navigation {
  group: string;
  item: string;
}

type WorkspaceContextType = {
  activeComponent: React.ComponentType<any> | null
  setActiveComponent: (component: React.ComponentType<any> | null) => void
  activeNavigation: Navigation | null
  setActiveNavigation: (navigation: Navigation | null) => void
  artifact: any | null
  setArtifact: (artifact: any | null) => void
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeComponent, setActiveComponent] = React.useState<React.ComponentType<any> | null>(null)
  const [activeNavigation, setActiveNavigation] = React.useState<Navigation | null>(null)
  const [artifact, setArtifact] = React.useState<any | null>(null)

  const value = React.useMemo(() => ({
    activeComponent,
    setActiveComponent,
    activeNavigation,
    setActiveNavigation,
    artifact,
    setArtifact
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