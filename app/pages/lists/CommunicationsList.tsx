import { FC } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import StandardList, { StandardListItemProps } from '@/components/custom/StandardList';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { BubbleTag } from '@/components/custom/BubbleTag';
import { formatTimestamp } from '@/utils/timeFormat';

interface Communication {
  id: string;
  type: 'email' | 'phone' | 'chat';
  subject: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'received' | 'missed';
  from?: string;
  to?: string;
}

const CommunicationItem: FC<{ communication: Communication }> = ({ communication }) => {
  const getTypeConfig = () => {
    switch (communication.type) {
      case 'email':
        return {
          icon: <Mail className="h-4 w-4" />,
          color: 'indigo' as const,
          text: 'Email',
          bgColor: 'bg-indigo-50'
        };
      case 'phone':
        return {
          icon: <Phone className="h-4 w-4" />,
          color: 'blue' as const,
          text: 'Phone',
          bgColor: 'bg-blue-50'
        };
      case 'chat':
        return {
          icon: <MessageSquare className="h-4 w-4" />,
          color: 'blue' as const,
          text: 'Chat',
          bgColor: 'bg-blue-50'
        };
      default:
        return {
          icon: <Mail className="h-4 w-4" />,
          color: 'gray' as const,
          text: communication.type,
          bgColor: 'bg-gray-50'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div className={`grid grid-cols-[auto_1fr_auto] gap-3 p-3 rounded-md hover:${config.bgColor} transition-colors duration-200`}>
      <div className={`flex items-center text-${config.color}-500`}>
        {config.icon}
      </div>
      <div className="min-w-0 space-y-1">
        <div className="text-sm font-medium text-gray-900">
          {communication.subject}
        </div>
        <div className="text-xs text-gray-600 truncate">
          {communication.content}
        </div>
        {communication.from && (
          <div className="text-xs text-gray-500">
            From: {communication.from}
          </div>
        )}
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className="text-xs text-gray-500">
          {formatTimestamp(communication.timestamp, 'relative')}
        </div>
        <BubbleTag
          text={communication.status}
          color={
            communication.status === 'received' ? 'blue' :
            communication.status === 'missed' ? 'red' : 
            'gray'
          }
        />
      </div>
    </div>
  );
};

const CommunicationArtifact: FC<{ communication: Communication }> = ({ communication }) => {
  const getTypeConfig = () => {
    switch (communication.type) {
      case 'email':
        return { icon: <Mail className="h-5 w-5" />, color: 'text-indigo-500', bgColor: 'bg-indigo-50' };
      case 'phone':
        return { icon: <Phone className="h-5 w-5" />, color: 'text-blue-500', bgColor: 'bg-blue-50' };
      case 'chat':
        return { icon: <MessageSquare className="h-5 w-5" />, color: 'text-blue-500', bgColor: 'bg-blue-50' };
      default:
        return { icon: <Mail className="h-5 w-5" />, color: 'text-gray-500', bgColor: 'bg-gray-50' };
    }
  };

  const config = getTypeConfig();

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-3 p-4 rounded-lg ${config.bgColor}`}>
        <div className={config.color}>{config.icon}</div>
        <div>
          <h2 className="text-xl font-semibold">{communication.subject}</h2>
          {communication.from && <p className="text-sm text-gray-600">From: {communication.from}</p>}
          {communication.to && <p className="text-sm text-gray-600">To: {communication.to}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 rounded-lg bg-indigo-50">
          <p className="text-sm font-medium text-indigo-600">Type</p>
          <p className="text-sm capitalize mt-1">{communication.type}</p>
        </div>
        <div className="p-4 rounded-lg bg-indigo-50">
          <p className="text-sm font-medium text-indigo-600">Status</p>
          <p className="text-sm capitalize mt-1">{communication.status}</p>
        </div>
        <div className="col-span-2 p-4 rounded-lg bg-indigo-50">
          <p className="text-sm font-medium text-indigo-600">Content</p>
          <p className="text-sm mt-1 whitespace-pre-wrap">{communication.content}</p>
        </div>
      </div>
    </div>
  );
};

export const CommunicationsList: FC = () => {
  const { setArtifact } = useWorkspace();

  const communications: Communication[] = [
    {
      id: '1',
      type: 'email',
      subject: 'Account Security Alert',
      content: 'We noticed a login attempt from a new device. If this wasn\'t you, please secure your account immediately.',
      from: 'security@example.com',
      to: 'user@example.com',
      timestamp: '2024-03-15T09:00:00',
      status: 'received'
    },
    {
      id: '2',
      type: 'phone',
      subject: 'Customer Support Call',
      content: 'Discussion regarding recent transaction dispute - Case #4521',
      from: '+1 (555) 123-4567',
      timestamp: '2024-03-15T14:30:00',
      status: 'missed'
    },
    {
      id: '3',
      type: 'chat',
      subject: 'Live Support Session',
      content: 'Password reset assistance provided. Issue resolved successfully.',
      from: 'Support Agent Sarah',
      timestamp: '2024-03-15T11:15:00',
      status: 'sent'
    }
  ];

  const handleItemClick = (item: StandardListItemProps) => {
    setArtifact({
      ...item.metadata,
      id: item.id,
      title: item.title
    });
  };

  const items = communications.map(communication => ({
    id: communication.id,
    title: communication.subject,
    content: <CommunicationItem communication={communication} />,
    metadata: {
      ...communication,
      title: communication.subject,
      renderArtifact: () => <CommunicationArtifact communication={communication} />
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