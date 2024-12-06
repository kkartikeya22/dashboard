"use client"

import * as React from "react"
import { useWorkspace } from "@/app/layout/Workspace/WorkspaceContext"
import { Workspace } from "./Workspace/Workspace"
import { Artifact } from "./Artifact/Artifact"
import { AppBottom } from "./AppBottom"

export function AppContent({ children }: { children: React.ReactNode }) {
  const { activeComponent: Component } = useWorkspace()

  const content = React.useMemo(() => {
    if (!Component) {
      return children
    }
    return <Component />
  }, [Component, children])

  const handleRenderArtifact = (artifact: any) => {
    if (artifact.renderArtifact) {
      return artifact.renderArtifact();
    }
    return (
      <div className="p-4">
        <pre>{JSON.stringify(artifact, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 p-3 bg-gray-100">
      <main className="flex-1 overflow-hidden flex flex-col gap-4">
        <div className="flex gap-4 flex-1 min-h-0">
          <div className="flex-1 min-w-0 max-w-[calc(100%-var(--artifact-width))]">
            <Workspace className="h-full overflow-hidden">
              {content}
            </Workspace>
          </div>
          <Artifact renderArtifact={handleRenderArtifact} />
        </div>
        <AppBottom />
      </main>
    </div>
  )
}