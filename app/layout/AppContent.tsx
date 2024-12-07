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
      <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm border border-indigo-100 transition-all duration-300 hover:shadow-lg hover:bg-indigo-50/80">
        <pre className="text-indigo-700 font-mono text-sm">{JSON.stringify(artifact, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 p-3 bg-gradient-to-br from-indigo-50/30 via-violet-50/30 to-white">
      <main className="flex-1 overflow-hidden flex flex-col gap-4">
        <div className="flex gap-4 flex-1 min-h-0">
          <div className="flex-1 min-w-0 max-w-[calc(100%-var(--artifact-width))] transition-transform duration-300 hover:scale-[1.002]">
            <Workspace className="h-full overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/90 backdrop-blur-sm border border-indigo-100 hover:bg-indigo-50/90 hover:border-indigo-200">
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