import { Activity, AlertTriangle } from 'lucide-react';
import StandardList, { StandardListItemProps } from '@/components/custom/StandardList';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { BubbleTag } from '@/components/custom/BubbleTag';
import { formatTimestamp } from '@/utils/timeFormat';

interface TimelineItem {
  id: string;
  time: string;
  event: string;
  type: string;
}

interface TimelineListProps {
  onTimelineClick?: (item: StandardListItemProps) => void;
}

const TimelineArtifact: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'transaction':
        return <Activity className="h-5 w-5 text-blue-500" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {getIcon()}
        <h2 className="text-xl font-semibold">{item.event}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Time</p>
          <p className="text-sm">{item.time}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="text-sm capitalize">{item.type}</p>
        </div>
      </div>
    </div>
  );
};

const TimelineListItem: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const getTypeConfig = () => {
    switch (item.type) {
      case 'transaction':
        return {
          icon: <Activity className="h-4 w-4" />,
          color: 'blue' as const,
          text: 'Transaction'
        };
      case 'alert':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'orange' as const,
          text: 'Alert'
        };
      default:
        return {
          icon: <Activity className="h-4 w-4" />,
          color: 'gray' as const,
          text: item.type
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div className="flex items-center gap-3 p-2 rounded-md">
      <BubbleTag
        hasOutsideIcon
        icon={config.icon}
        text={config.text}
        color={config.color}
      />
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-900">{item.event}</p>
          <p className="text-xs text-gray-500">{formatTimestamp(item.time, 'relative')}</p>
        </div>
      </div>
    </div>
  );
};

const timelineData: TimelineItem[] = [
  { id: '1', time: '2024-03-03T23:30:00', event: 'Transaction: ₹1,50,022 (Mumbai)', type: 'transaction' },
  { id: '2', time: '2024-03-03T21:05:00', event: 'Transaction: ₹40,002 (Mumbai)', type: 'transaction' },
  { id: '3', time: '2024-03-02T02:15:00', event: 'Risk Score Increase: 88 → 92', type: 'alert' },
];

export const TimelineList: React.FC<TimelineListProps> = ({ onTimelineClick }) => {
  const { setArtifact } = useWorkspace();

  const handleItemClick = (item: StandardListItemProps) => {
    setArtifact({
      ...item.metadata,
      id: item.id,
      title: item.title
    });
    onTimelineClick?.(item);
  };

  const items = timelineData.map(item => ({
    id: item.id,
    title: item.event,
    timestamp: item.time,
    content: <TimelineListItem item={item} />,
    metadata: {
      ...item,
      renderArtifact: () => <TimelineArtifact item={item} />
    }
  }));

  return (
    <StandardList 
      items={items}
      onItemClick={handleItemClick}
      className="space-y-2"
    />
  );
}; 