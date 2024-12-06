"use client"

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { WorkspaceProvider } from "@/app/layout/Workspace/WorkspaceContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <DndProvider backend={HTML5Backend}>
        {children}
      </DndProvider>
    </WorkspaceProvider>
  )
} 