import { Activity, AlertTriangle, Clock, CreditCard, ShieldAlert, ArrowUpRight } from 'lucide-react';
import StandardList, { StandardListItemProps } from '@/components/custom/StandardList';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { BubbleTag } from '@/components/custom/BubbleTag';
import { formatTimestamp } from '@/utils/timeFormat';

interface TimelineItem {
  id: string;
  time: string;
  event: string;
  type: string;
  amount?: string;
  location?: string;
  status?: 'success' | 'pending' | 'failed';
  priority?: 'high' | 'medium' | 'low';
}

interface TimelineListProps {
  onTimelineClick?: (item: StandardListItemProps) => void;
}

const TimelineArtifact: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const getTypeConfig = () => {
    switch (item.type) {
      case 'transaction':
        return {
          icon: <CreditCard className="h-6 w-6" />,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50'
        };
      case 'alert':
        return {
          icon: <ShieldAlert className="h-6 w-6" />,
          color: 'text-orange-500',
          bgColor: 'bg-orange-50'
        };
      case 'activity':
        return {
          icon: <Activity className="h-6 w-6" />,
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-50'
        };
      default:
        return {
          icon: <Clock className="h-6 w-6" />,
          color: 'text-gray-500',
          bgColor: 'bg-gray-50'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-4 p-6 rounded-lg ${config.bgColor} transition-all duration-300 hover:shadow-md`}>
        <div className={`${config.color} transition-transform duration-200 hover:scale-110`}>
          {config.icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{item.event}</h2>
          <p className="text-sm text-gray-600">{formatTimestamp(item.time, 'full')}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {item.amount && (
          <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-lg font-medium">₹{item.amount}</p>
          </div>
        )}
        {item.location && (
          <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-lg">{item.location}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TimelineListItem: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const getTypeConfig = () => {
    switch (item.type) {
      case 'transaction':
        return {
          icon: <CreditCard className="h-4 w-4" />,
          color: 'blue' as const,
          text: 'Transaction',
          bgColor: 'bg-blue-50',
          hoverBg: 'hover:bg-blue-100'
        };
      case 'alert':
        return {
          icon: <ShieldAlert className="h-4 w-4" />,
          color: 'orange' as const,
          text: 'Alert',
          bgColor: 'bg-orange-50',
          hoverBg: 'hover:bg-orange-100'
        };
      case 'activity':
        return {
          icon: <Activity className="h-4 w-4" />,
          color: 'emerald' as const,
          text: 'Activity',
          bgColor: 'bg-emerald-50',
          hoverBg: 'hover:bg-emerald-100'
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          color: 'gray' as const,
          text: item.type,
          bgColor: 'bg-gray-50',
          hoverBg: 'hover:bg-gray-100'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div className={`grid grid-cols-[auto_1fr_auto] gap-3 p-3 rounded-md ${config.bgColor} ${config.hoverBg} transition-all duration-200 hover:shadow-sm`}>
      <div className={`flex items-center text-${config.color}-500 transition-transform duration-200 hover:scale-110`}>
        {config.icon}
      </div>
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900">{item.event}</p>
          {item.priority && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              item.priority === 'high' ? 'bg-rose-100 text-rose-700' :
              item.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
              'bg-slate-100 text-slate-700'
            }`}>
              {item.priority.toUpperCase()}
            </span>
          )}
        </div>
        {item.location && (
          <p className="text-xs text-gray-600">{item.location}</p>
        )}
      </div>
      <div className="flex flex-col items-end justify-between gap-2">
        <div className="text-xs text-gray-500">
          {formatTimestamp(item.time, 'relative')}
        </div>
        {item.status && (
          <BubbleTag
            text={item.status}
            color={
              item.status === 'success' ? 'green' :
              item.status === 'pending' ? 'yellow' :
              'red'
            }
          />
        )}
      </div>
    </div>
  );
};

const timelineData: TimelineItem[] = [
  {
    id: '1',
    time: '2024-03-03T23:30:00',
    event: 'High-Value Transaction',
    type: 'transaction',
    amount: '1,50,022',
    location: 'Mumbai',
    status: 'success',
    priority: 'high'
  },
  {
    id: '2',
    time: '2024-03-03T21:05:00',
    event: 'Regular Transaction',
    type: 'transaction',
    amount: '40,002',
    location: 'Mumbai',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: '3',
    time: '2024-03-02T02:15:00',
    event: 'Risk Score Increase',
    type: 'alert',
    status: 'failed',
    priority: 'high'
  },
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