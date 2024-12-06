import { FC } from 'react';
import { Globe, Smartphone, QrCode, CreditCard, Repeat, Link, FileText, Store } from 'lucide-react';
import StandardList, { StandardListItemProps } from '@/components/custom/StandardList';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { BubbleTag } from '@/components/custom/BubbleTag';
import { formatTimestamp } from '@/utils/timeFormat';

interface PaymentChannel {
  id: string;
  type: 'website' | 'app' | 'qr' | 'pos' | 'subscription' | 'payment_link' | 'invoice' | 'marketplace';
  name: string;
  status: 'active' | 'inactive';
  addedOn: string;
  details: {
    [key: string]: string;
  };
}

const PaymentChannelItem: FC<{ channel: PaymentChannel }> = ({ channel }) => {
  const getChannelIcon = () => {
    switch (channel.type) {
      case 'website': return <Globe className="h-5 w-5 text-blue-500" />;
      case 'app': return <Smartphone className="h-5 w-5 text-purple-500" />;
      case 'qr': return <QrCode className="h-5 w-5 text-green-500" />;
      case 'pos': return <CreditCard className="h-5 w-5 text-orange-500" />;
      case 'subscription': return <Repeat className="h-5 w-5 text-pink-500" />;
      case 'payment_link': return <Link className="h-5 w-5 text-cyan-500" />;
      case 'invoice': return <FileText className="h-5 w-5 text-yellow-500" />;
      case 'marketplace': return <Store className="h-5 w-5 text-indigo-500" />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-3 p-2 rounded-md">
      <div className="flex items-center">
        {getChannelIcon()}
      </div>
      <div className="min-w-0 space-y-1">
        <div className="text-sm text-gray-900">
          {channel.name}
        </div>
        <div className="text-xs text-gray-500">
          Added on {formatTimestamp(channel.addedOn, 'relative')}
        </div>
      </div>
      <div className="flex items-center">
        <BubbleTag 
          text={channel.status === 'active' ? 'Active' : 'Inactive'}
          color={channel.status === 'active' ? 'green' : 'gray'}
        />
      </div>
    </div>
  );
};

const PaymentChannelArtifact: FC<{ channel: PaymentChannel }> = ({ channel }) => {
  const getChannelIcon = () => {
    switch (channel.type) {
      case 'website': return <Globe className="h-5 w-5 text-blue-500" />;
      case 'app': return <Smartphone className="h-5 w-5 text-purple-500" />;
      case 'qr': return <QrCode className="h-5 w-5 text-green-500" />;
      case 'pos': return <CreditCard className="h-5 w-5 text-orange-500" />;
      case 'subscription': return <Repeat className="h-5 w-5 text-pink-500" />;
      case 'payment_link': return <Link className="h-5 w-5 text-cyan-500" />;
      case 'invoice': return <FileText className="h-5 w-5 text-yellow-500" />;
      case 'marketplace': return <Store className="h-5 w-5 text-indigo-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {getChannelIcon()}
        <h2 className="text-xl font-semibold">{channel.name}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="text-sm capitalize">{channel.type.replace('_', ' ')}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-sm capitalize">{channel.status}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Added On</p>
          <p className="text-sm">{formatTimestamp(channel.addedOn, 'relative')}</p>
        </div>
        {Object.entries(channel.details).map(([key, value]) => (
          <div key={key}>
            <p className="text-sm text-gray-500">{key}</p>
            <p className="text-sm">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PaymentChannelsList: FC = () => {
  const { setArtifact } = useWorkspace();

  const channels: PaymentChannel[] = [
    {
      id: '1',
      type: 'website',
      name: 'Main Website',
      status: 'active',
      addedOn: '2024-01-15',
      details: {
        url: 'https://example.com',
        integration: 'API'
      }
    },
    // Add more sample channels
  ];

  const handleItemClick = (item: StandardListItemProps) => {
    setArtifact({
      ...item.metadata,
      id: item.id,
      title: item.title
    });
  };

  const items = channels.map(channel => ({
    id: channel.id,
    title: channel.name,
    content: <PaymentChannelItem channel={channel} />,
    metadata: {
      ...channel,
      title: channel.name,
      renderArtifact: () => <PaymentChannelArtifact channel={channel} />
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