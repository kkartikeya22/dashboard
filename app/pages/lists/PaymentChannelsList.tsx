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
  const getChannelConfig = () => {
    switch (channel.type) {
      case 'website': 
        return { icon: <Globe className="h-5 w-5" />, color: 'text-blue-500', bgColor: 'bg-blue-50', hoverBg: 'hover:bg-blue-100' };
      case 'app':
        return { icon: <Smartphone className="h-5 w-5" />, color: 'text-purple-500', bgColor: 'bg-purple-50', hoverBg: 'hover:bg-purple-100' };
      case 'qr':
        return { icon: <QrCode className="h-5 w-5" />, color: 'text-green-500', bgColor: 'bg-green-50', hoverBg: 'hover:bg-green-100' };
      case 'pos':
        return { icon: <CreditCard className="h-5 w-5" />, color: 'text-orange-500', bgColor: 'bg-orange-50', hoverBg: 'hover:bg-orange-100' };
      case 'subscription':
        return { icon: <Repeat className="h-5 w-5" />, color: 'text-pink-500', bgColor: 'bg-pink-50', hoverBg: 'hover:bg-pink-100' };
      case 'payment_link':
        return { icon: <Link className="h-5 w-5" />, color: 'text-cyan-500', bgColor: 'bg-cyan-50', hoverBg: 'hover:bg-cyan-100' };
      case 'invoice':
        return { icon: <FileText className="h-5 w-5" />, color: 'text-yellow-500', bgColor: 'bg-yellow-50', hoverBg: 'hover:bg-yellow-100' };
      case 'marketplace':
        return { icon: <Store className="h-5 w-5" />, color: 'text-indigo-500', bgColor: 'bg-indigo-50', hoverBg: 'hover:bg-indigo-100' };
      default:
        return { icon: null, color: 'text-gray-500', bgColor: 'bg-gray-50', hoverBg: 'hover:bg-gray-100' };
    }
  };

  const config = getChannelConfig();

  return (
    <div className={`grid grid-cols-[auto_1fr_auto] gap-3 p-3 rounded-md transition-colors duration-200 ${config.bgColor} ${config.hoverBg}`}>
      <div className={`flex items-center ${config.color} transition-transform duration-200 hover:scale-110`}>
        {config.icon}
      </div>
      <div className="min-w-0 space-y-1">
        <div className="text-sm font-medium text-gray-900">
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
  const getChannelConfig = () => {
    switch (channel.type) {
      case 'website': 
        return { icon: <Globe className="h-6 w-6" />, color: 'text-blue-500', bgColor: 'bg-blue-50' };
      case 'app':
        return { icon: <Smartphone className="h-6 w-6" />, color: 'text-purple-500', bgColor: 'bg-purple-50' };
      case 'qr':
        return { icon: <QrCode className="h-6 w-6" />, color: 'text-green-500', bgColor: 'bg-green-50' };
      case 'pos':
        return { icon: <CreditCard className="h-6 w-6" />, color: 'text-orange-500', bgColor: 'bg-orange-50' };
      case 'subscription':
        return { icon: <Repeat className="h-6 w-6" />, color: 'text-pink-500', bgColor: 'bg-pink-50' };
      case 'payment_link':
        return { icon: <Link className="h-6 w-6" />, color: 'text-cyan-500', bgColor: 'bg-cyan-50' };
      case 'invoice':
        return { icon: <FileText className="h-6 w-6" />, color: 'text-yellow-500', bgColor: 'bg-yellow-50' };
      case 'marketplace':
        return { icon: <Store className="h-6 w-6" />, color: 'text-indigo-500', bgColor: 'bg-indigo-50' };
      default:
        return { icon: null, color: 'text-gray-500', bgColor: 'bg-gray-50' };
    }
  };

  const config = getChannelConfig();

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-4 p-6 rounded-lg ${config.bgColor} transition-all duration-300 hover:shadow-md`}>
        <div className={`${config.color} transition-transform duration-200 hover:scale-110`}>
          {config.icon}
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{channel.name}</h2>
          <p className="text-sm text-gray-600 capitalize">{channel.type.replace('_', ' ')} Integration</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(channel.details).map(([key, value]) => (
          <div key={key} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <p className="text-sm font-medium text-gray-500 capitalize">{key.replace('_', ' ')}</p>
            <p className="text-sm mt-1">{value}</p>
          </div>
        ))}
        <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <p className="text-sm font-medium text-gray-500">Status</p>
          <p className="text-sm mt-1 capitalize">{channel.status}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <p className="text-sm font-medium text-gray-500">Added On</p>
          <p className="text-sm mt-1">{formatTimestamp(channel.addedOn, 'relative')}</p>
        </div>
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
      name: 'Main E-commerce Website',
      status: 'active',
      addedOn: '2024-01-15',
      details: {
        url: 'https://shop.example.com',
        integration_type: 'REST API',
        monthly_volume: '$250,000'
      }
    },
    {
      id: '2',
      type: 'app',
      name: 'Mobile Shopping App',
      status: 'active',
      addedOn: '2024-02-01',
      details: {
        platform: 'iOS & Android',
        integration_type: 'SDK',
        monthly_users: '50,000+'
      }
    },
    {
      id: '3',
      type: 'marketplace',
      name: 'Partner Marketplace',
      status: 'active',
      addedOn: '2024-02-15',
      details: {
        partners: '15 Active Vendors',
        commission_rate: '2.5%',
        monthly_gmv: '$150,000'
      }
    }
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