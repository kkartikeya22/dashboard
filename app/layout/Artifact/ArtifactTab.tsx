/**
 * Individual Tab Component
 * 
 * Implements a browser-like tab with:
 * 1. Drag and Drop functionality
 *    - Allows reordering tabs
 *    - Smooth drag animations
 * 
 * 2. Tab States
 *    - Active/Inactive styling
 *    - Hover effects
 *    - Dragging state
 * 
 * 3. Tab Features
 *    - Title truncation for long names
 *    - Close button
 *    - Click to activate
 *    - Vertical scrolling on overflow
 * 
 * 4. Visual Feedback
 *    - Opacity changes during drag
 *    - Hover highlights
 *    - Active tab highlighting
 * 
 * 5. Responsive Design
 *    - Adapts to all screen sizes
 *    - Dynamic sizing and spacing
 *    - Mobile-optimized interactions
 */

import { useDrag, useDrop } from 'react-dnd';
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Tab, ItemType } from './Artifact';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ArtifactTabProps {
  tab: Tab;
  index: number;
  activeTabId: string | null;
  onTabClick: (tabId: string) => void;
  onRemoveTab: (tabId: string, event: React.SyntheticEvent) => void;
  onMoveTab: (dragIndex: number, hoverIndex: number) => void;
}

export function ArtifactTab({
  tab,
  index,
  activeTabId,
  onTabClick,
  onRemoveTab,
  onMoveTab,
}: ArtifactTabProps) {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType.TAB,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType.TAB,
    hover(item: { index: number }) {
      if (item.index !== index) {
        onMoveTab(item.index, index);
        item.index = index;
      }
    },
  });

  const ref = (node: HTMLDivElement | null) => {
    dragRef(node);
    dropRef(node);
  };

  return (
    <TooltipProvider>
      <ScrollArea className="h-full" type="hover">
        <div
          ref={ref}
          style={{ opacity: isDragging ? 0.5 : 1 }}
          data-tab-id={tab.id}
          className={cn(
            'flex items-center gap-0.5 sm:gap-1 min-w-0',
            'px-1.5 sm:px-2 py-0.5',
            'h-6 sm:h-7 md:h-8',
            'text-[10px] sm:text-xs',
            'border-r border-gray-100',
            'hover:bg-blue-50/50 cursor-pointer',
            'transition-colors duration-150',
            'touch-manipulation', // Better touch handling
            'overflow-y-auto', // Enable vertical scrolling
            tab.id === activeTabId 
              ? 'bg-blue-50/70 text-blue-700 font-medium' 
              : 'text-gray-600'
          )}
          onClick={() => onTabClick(tab.id)}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={cn(
                "truncate",
                "max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px]"
              )}>
                {tab.artifact?.title || 'Untitled'}
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {tab.artifact?.title || 'Untitled'}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => onRemoveTab(tab.id, e)}
                className={cn(
                  "shrink-0 rounded-sm",
                  "p-0.5 sm:p-1",
                  "hover:bg-blue-100/50",
                  "transition-colors",
                  "touch-manipulation"
                )}
              >
                <X className={cn(
                  "w-2.5 h-2.5 sm:w-3 sm:h-3",
                  "text-gray-400 hover:text-blue-600"
                )} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              Close tab
            </TooltipContent>
          </Tooltip>
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
} 