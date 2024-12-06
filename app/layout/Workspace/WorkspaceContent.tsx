import { ScrollArea } from "@/components/ui/scroll-area"

interface WorkspaceContentProps {
  content: React.ReactNode;
}

export function WorkspaceContent({ content }: WorkspaceContentProps) {
  return (
    <div className="flex-1 min-h-0 overflow-auto">
      <ScrollArea className="h-full">
        <div className="p-4">
          {content}
        </div>
      </ScrollArea>
    </div>
  );
} 