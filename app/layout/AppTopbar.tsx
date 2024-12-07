"use client"

import { useWorkspace } from "@/app/layout/Workspace/WorkspaceContext"
import { ChevronRight } from "lucide-react"

export function AppTopbar() {
  const { activeNavigation } = useWorkspace()

  return (
    <header className="border-b border-indigo-100 bg-white/90 backdrop-blur-sm h-14 flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <h1 className="flex items-center text-sm font-medium">
          <span className="text-indigo-600/70 hover:text-indigo-800 transition-colors">
            {activeNavigation?.group}
          </span>
          <ChevronRight className="mx-1 h-4 w-4 text-indigo-400" />
          <span className="font-semibold text-indigo-900">
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