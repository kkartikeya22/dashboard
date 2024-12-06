"use client"

import { useWorkspace } from "@/app/layout/Workspace/WorkspaceContext"
import { ChevronRight } from "lucide-react"

export function AppTopbar() {
  const { activeNavigation } = useWorkspace()

  return (
    <header className="border-b bg-white h-14 flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <h1 className="flex items-center text-sm font-medium">
          <span className="text-muted-foreground hover:text-foreground transition-colors">
            {activeNavigation?.group}
          </span>
          <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">
            {activeNavigation?.item}
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        {/* Add your topbar actions here */}
      </div>
    </header>
  )
}