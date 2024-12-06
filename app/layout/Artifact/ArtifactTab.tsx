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
 * 
 * 4. Visual Feedback
 *    - Opacity changes during drag
 *    - Hover highlights
 *    - Active tab highlighting
 */

import { useDrag, useDrop } from 'react-dnd';
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Tab, ItemType } from './Artifact';

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
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      data-tab-id={tab.id}
      className={cn(
        'flex items-center gap-1 min-w-0',
        'px-2 py-0.5',
        'h-8',
        'text-xs',
        'border-r border-gray-100',
        'hover:bg-blue-50/50 cursor-pointer',
        'transition-colors duration-150',
        tab.id === activeTabId 
          ? 'bg-blue-50/70 text-blue-700 font-medium' 
          : 'text-gray-600'
      )}
      onClick={() => onTabClick(tab.id)}
    >
      <span className="truncate max-w-[140px]">
        {tab.artifact?.title || 'Untitled'}
      </span>
      <button
        onClick={(e) => onRemoveTab(tab.id, e)}
        className="shrink-0 hover:bg-blue-100/50 rounded-sm p-0.5 transition-colors"
      >
        <X className="w-3 h-3 text-gray-400 hover:text-blue-600" />
      </button>
    </div>
  );
} 