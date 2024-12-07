import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  BarChart2, 
  Table, 
  FileText, 
  Image,
  X
} from "lucide-react"

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  closeable?: boolean;
  type?: 'chart' | 'table' | 'text' | 'image';
}

interface WorkspaceTabBarProps {
  tabs: Tab[];
  activeTab: string | null;
  onTabChange: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
}

export function WorkspaceTabBar({ tabs, activeTab, onTabChange, onTabClose }: WorkspaceTabBarProps) {
  const getIcon = (type?: string) => {
    switch(type) {
      case 'chart':
        return <BarChart2 className="w-4 h-4" />;
      case 'table':
        return <Table className="w-4 h-4" />;
      case 'text':
        return <FileText className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn(
        "flex items-center gap-0.5 px-0.5 border-b shrink-0",
        "bg-gradient-to-r from-background/80 to-secondary/30",
        "backdrop-blur-sm"
      )}>
        {tabs.map((tab) => (
          <Tooltip key={tab.id}>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-1 px-2 py-1.5",
                  "text-sm font-medium rounded-t-lg",
                  "transition-all duration-200",
                  "hover:bg-secondary/50",
                  "min-w-[60px] max-w-[120px]",
                  "group relative",
                  activeTab === tab.id ? [
                    "text-primary",
                    "border-b-2 border-primary",
                    "bg-background/50"
                  ] : [
                    "text-muted-foreground",
                    "hover:text-foreground"
                  ]
                )}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.icon || getIcon(tab.type)}
                <span className="truncate text-xs">{tab.label}</span>
                {tab.closeable && onTabClose && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={cn(
                          "p-0.5 rounded-full",
                          "opacity-0 group-hover:opacity-100",
                          "hover:bg-secondary/80",
                          "transition-opacity",
                          "ml-auto"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTabClose(tab.id);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      Close tab
                    </TooltipContent>
                  </Tooltip>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {tab.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}