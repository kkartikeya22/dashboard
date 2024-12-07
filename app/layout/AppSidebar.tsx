"use client"

import * as React from "react"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent as SidebarContentRoot,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Footprints,
  Microscope,
  ChevronsLeft,
  ChevronsRight,
  Store,
  BookOpen,
  Brain,
  Bell
} from "lucide-react"
import { useWorkspace } from "@/app/layout/Workspace/WorkspaceContext"
import dynamic from 'next/dynamic'
import { cn } from "@/lib/utils"
import MerchantProfile from "../pages/Merchant/MerchantProfile/MerchantProfile"
import MerchantActivity from "../pages/Merchant/MerchantActivity/MerchantActivity"
import RulesPage from "../pages/Strategy/Rules/RulesPage"
import ModelsPage from "../pages/Strategy/ModelsPage"
import AlertsPage from "../pages/Strategy/AlertsPage"

// Dynamically import components with no SSR
const InvestigationInsights = dynamic(() => import('@/app/pages/Merchant/MerchantInvestigation/InvestigationInsights'), { ssr: false })

interface SidebarItem {
  label: string;
  component: React.ComponentType;
  icon: React.ComponentType;
}

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: "Merchant", 
    items: [
      {
        label: "Investigation",
        component: InvestigationInsights,
        icon: Microscope,
      },
      {
        label: "Activity",
        component: MerchantActivity,
        icon: Footprints,
      },
      {
        label: "Profile",
        component: MerchantProfile,
        icon: Store,
      }
    ],
  },
  {
    label: "Strategy",
    items: [
      {
        label: "Rules",
        component: RulesPage,
        icon: BookOpen,
      },
      {
        label: "Models",
        component: ModelsPage,
        icon: Brain,
      },
      {
        label: "Alerts",
        component: AlertsPage,
        icon: Bell,
      }
    ],
  }
]

const SidebarContents = () => {
  const { setActiveComponent, setActiveNavigation, activeNavigation } = useWorkspace()
  const { state } = useSidebar()
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  React.useEffect(() => {
    const defaultGroup = sidebarGroups.find(g => g.label === "Strategy")
    const defaultItem = defaultGroup?.items.find(i => i.label === "Rules")
    
    if (defaultGroup && defaultItem) {
      handleItemClick(defaultGroup.label, defaultItem)
    }
  }, [])

  const handleItemClick = React.useCallback((group: string, item: SidebarItem) => {
    setActiveComponent(() => item.component)
    setActiveNavigation({ group, item: item.label })
  }, [setActiveComponent, setActiveNavigation])

  return (
    <Sidebar 
      variant="sidebar" 
      collapsible="icon"
      className={cn(
        "h-full",
        "transition-all duration-300 ease-in-out",
        "bg-gradient-to-b from-white to-indigo-50/30",
        isMobile ? "w-16" : "w-64",
        state === "collapsed" && "w-16"
      )}
    >
      <SidebarHeader className="h-14 relative bg-white/80 backdrop-blur-sm border-b border-indigo-100">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={cn(
            "transition-all duration-200",
            state === "collapsed" ? "opacity-0" : "opacity-100"
          )}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <SidebarTrigger className="text-indigo-600 hover:text-indigo-800 transition-colors">
            {state === "collapsed" ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="bg-indigo-100" />
      <SidebarContentRoot>
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-indigo-900/70 font-medium">{group.label}</SidebarGroupLabel>
            {group.items.map((item) => (
              <SidebarMenuButton
                key={item.label}
                icon={item.icon}
                tooltip={item.label}
                onClick={() => handleItemClick(group.label, item)}
                isActive={activeNavigation?.group === group.label && activeNavigation?.item === item.label}
                className={cn(
                  "text-indigo-700 hover:bg-indigo-100/50",
                  activeNavigation?.group === group.label && activeNavigation?.item === item.label && 
                  "bg-indigo-100 text-indigo-900 hover:bg-indigo-200/70"
                )}
              >
                {item.label}
              </SidebarMenuButton>
            ))}
          </SidebarGroup>
        ))}
      </SidebarContentRoot>
    </Sidebar>
  )
}

export function AppSidebar() {
  const [defaultOpen, setDefaultOpen] = React.useState(true)

  React.useEffect(() => {
    setDefaultOpen(window.innerWidth > 767)
  }, [])

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SidebarContents />
    </SidebarProvider>
  )
}