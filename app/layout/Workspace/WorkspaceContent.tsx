import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface WorkspaceContentProps {
  content: React.ReactNode;
  className?: string;
}

export function WorkspaceContent({ content, className }: WorkspaceContentProps) {
  return (
    <div className={cn(
      "flex-1 min-h-0 overflow-auto",
      "bg-gradient-to-br from-background to-secondary/30",
      className
    )}>
      <ScrollArea className="h-full">
        <div className={cn(
          "p-6",
          "rounded-lg",
          "transition-all duration-200",
          "hover:shadow-lg hover:shadow-primary/5"
        )}>
          {content}
        </div>
      </ScrollArea>
    </div>
  );
} 