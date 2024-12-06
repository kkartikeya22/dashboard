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
  LineChart,
  Sparkles,
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

const sidebarGroups = [
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

  React.useEffect(() => {
    const defaultGroup = sidebarGroups.find(g => g.label === "Strategy")
    const defaultItem = defaultGroup?.items.find(i => i.label === "Rules")
    
    if (defaultGroup && defaultItem) {
      handleItemClick(defaultGroup.label, defaultItem)
    }
  }, [])

  const handleItemClick = React.useCallback((group: string, item: any) => {
    if ('component' in item) {
      setActiveComponent(() => item.component)
      setActiveNavigation({ group, item: item.label })
    }
  }, [setActiveComponent, setActiveNavigation])

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="h-14 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={cn(
            "transition-all duration-200",
            "group-data-[collapsible=icon]:opacity-0"
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
          <SidebarTrigger>
            {state === "collapsed" ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContentRoot>
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            {group.items.map((item) => (
              <SidebarMenuButton
                key={item.label}
                icon={item.icon}
                tooltip={item.label}
                onClick={() => handleItemClick(group.label, item)}
                isActive={activeNavigation?.group === group.label && activeNavigation?.item === item.label}
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
  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarContents />
    </SidebarProvider>
  )
}