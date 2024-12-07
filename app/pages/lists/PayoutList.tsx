import { FC } from 'react';
import { Banknote, AlertTriangle } from 'lucide-react';
import StandardList, { StandardListItemProps } from '@/components/custom/StandardList';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { BubbleTag } from '@/components/custom/BubbleTag';
import { formatTimestamp } from '@/utils/timeFormat';

interface Payout {
  id: string;
  amount: string;
  status: 'processed' | 'pending' | 'failed';
  bankAccount: string;
  utr: string;
  timestamp: string;
  type?: 'instant' | 'scheduled';
  priority?: 'high' | 'normal';
}

const PayoutItem: FC<{ payout: Payout }> = ({ payout }) => {
  const getStatusConfig = () => {
    switch (payout.status) {
      case 'processed':
        return { color: 'green' as const, text: 'Processed', bgColor: 'bg-emerald-50', hoverBg: 'hover:bg-emerald-100' };
      case 'pending':
        return { color: 'yellow' as const, text: 'Pending', bgColor: 'bg-amber-50', hoverBg: 'hover:bg-amber-100' };
      case 'failed':
        return { color: 'red' as const, text: 'Failed', bgColor: 'bg-red-50', hoverBg: 'hover:bg-red-100' };
      default:
        return { color: 'gray' as const, text: payout.status, bgColor: 'bg-gray-50', hoverBg: 'hover:bg-gray-100' };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`grid grid-cols-[auto_1fr_auto] gap-3 p-4 rounded-lg transition-all duration-200 ${config.bgColor} ${config.hoverBg} hover:shadow-md`}>
      <div className="flex items-center">
        <Banknote className="h-5 w-5 text-blue-500 transition-transform duration-200 hover:scale-110" />
      </div>
      <div className="min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">₹{payout.amount}</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-700">{payout.bankAccount}</span>
          {payout.type && (
            <BubbleTag 
              text={payout.type === 'instant' ? 'Instant' : 'Scheduled'} 
              color={payout.type === 'instant' ? 'blue' : 'violet'}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">UTR: {payout.utr}</span>
          {payout.priority && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              payout.priority === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
            }`}>
              {payout.priority.toUpperCase()}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className="text-xs text-gray-500">
          {formatTimestamp(payout.timestamp, 'relative')}
        </div>
        <BubbleTag text={config.text} color={config.color} />
      </div>
    </div>
  );
};

const PayoutArtifact: FC<{ payout: Payout }> = ({ payout }) => {
  const getStatusConfig = () => {
    switch (payout.status) {
      case 'processed':
        return { color: 'text-emerald-600', bgColor: 'bg-emerald-50', text: 'Processed' };
      case 'pending':
        return { color: 'text-amber-600', bgColor: 'bg-amber-50', text: 'Pending' };
      case 'failed':
        return { color: 'text-red-600', bgColor: 'bg-red-50', text: 'Failed' };
      default:
        return { color: 'text-gray-600', bgColor: 'bg-gray-50', text: payout.status };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-4 p-6 rounded-lg ${config.bgColor} transition-all duration-300 hover:shadow-md`}>
        <Banknote className="h-6 w-6 text-blue-500 transition-transform duration-200 hover:scale-110" />
        <div>
          <h2 className="text-xl font-semibold">Payout Details</h2>
          <p className={`text-sm ${config.color}`}>{config.text}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <p className="text-sm text-gray-500">Amount</p>
          <p className="text-lg font-medium">₹{payout.amount}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <p className="text-sm text-gray-500">Bank Account</p>
          <p className="text-lg">{payout.bankAccount}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <p className="text-sm text-gray-500">UTR Number</p>
          <p className="text-lg font-mono">{payout.utr}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <p className="text-sm text-gray-500">Timestamp</p>
          <p className="text-lg">{formatTimestamp(payout.timestamp, 'full')}</p>
        </div>
      </div>
    </div>
  );
};

export const PayoutList: FC = () => {
  const { setArtifact } = useWorkspace();

  const payouts: Payout[] = [
    {
      id: '1',
      amount: '50,000',
      status: 'processed',
      bankAccount: 'HDFC Bank ****1234',
      utr: 'UTR123456789',
      timestamp: '2024-03-04T10:00:00',
      type: 'instant',
      priority: 'high'
    },
    {
      id: '2',
      amount: '25,000',
      status: 'pending',
      bankAccount: 'ICICI Bank ****5678',
      utr: 'UTR987654321',
      timestamp: '2024-03-04T09:30:00',
      type: 'scheduled',
      priority: 'normal'
    },
    {
      id: '3',
      amount: '75,000',
      status: 'failed',
      bankAccount: 'SBI Bank ****9012',
      utr: 'UTR456789123',
      timestamp: '2024-03-04T09:00:00',
      type: 'instant',
      priority: 'high'
    }
  ];

  const handleItemClick = (item: StandardListItemProps) => {
    setArtifact({
      ...item.metadata,
      id: item.id,
      title: item.title
    });
  };

  const items = payouts.map(payout => ({
    id: payout.id,
    title: `Payout: ₹${payout.amount}`,
    content: <PayoutItem payout={payout} />,
    metadata: {
      ...payout,
      title: `Payout: ₹${payout.amount}`,
      renderArtifact: () => <PayoutArtifact payout={payout} />
    }
  }));

  return (
    <StandardList 
      items={items}
      onItemClick={handleItemClick}
      className="space-y-3"
    />
  );
};