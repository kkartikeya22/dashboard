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
}

const CommunicationItem: FC<{ communication: Communication }> = ({ communication }) => {
  const getTypeConfig = () => {
    switch (communication.type) {
      case 'email':
        return {
          icon: <Mail className="h-4 w-4" />,
          color: 'blue' as const,
          text: 'Email'
        };
      case 'phone':
        return {
          icon: <Phone className="h-4 w-4" />,
          color: 'green' as const,
          text: 'Phone'
        };
      case 'chat':
        return {
          icon: <MessageSquare className="h-4 w-4" />,
          color: 'purple' as const,
          text: 'Chat'
        };
      default:
        return {
          icon: <Mail className="h-4 w-4" />,
          color: 'gray' as const,
          text: communication.type
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-3 p-2 rounded-md">
      <div className="flex items-center">
        {config.icon}
      </div>
      <div className="min-w-0 space-y-1">
        <div className="text-sm text-gray-900">
          {communication.subject}
        </div>
        <div className="text-xs text-gray-500">
          {communication.content}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className="text-xs text-gray-500">
          {formatTimestamp(communication.timestamp, 'relative')}
        </div>
        <BubbleTag
          text={communication.status}
          color={communication.status === 'received' ? 'blue' : 'gray'}
        />
      </div>
    </div>
  );
};

const CommunicationArtifact: FC<{ communication: Communication }> = ({ communication }) => {
  const getTypeConfig = () => {
    switch (communication.type) {
      case 'email':
        return { icon: <Mail className="h-5 w-5" />, color: 'text-blue-500' };
      case 'phone':
        return { icon: <Phone className="h-5 w-5" />, color: 'text-green-500' };
      case 'chat':
        return { icon: <MessageSquare className="h-5 w-5" />, color: 'text-purple-500' };
      default:
        return { icon: <Mail className="h-5 w-5" />, color: 'text-gray-500' };
    }
  };

  const config = getTypeConfig();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className={config.color}>{config.icon}</div>
        <h2 className="text-xl font-semibold">{communication.subject}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="text-sm capitalize">{communication.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-sm capitalize">{communication.status}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Content</p>
          <p className="text-sm">{communication.content}</p>
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
      subject: 'Welcome to Our Platform',
      content: 'Thank you for joining our platform...',
      timestamp: '2024-03-04T09:00:00',
      status: 'sent'
    },
    // Add more sample communications
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