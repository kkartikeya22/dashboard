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
}

const PayoutItem: FC<{ payout: Payout }> = ({ payout }) => {
  const getStatusConfig = () => {
    switch (payout.status) {
      case 'processed':
        return { color: 'green' as const, text: 'Processed' };
      case 'pending':
        return { color: 'yellow' as const, text: 'Pending' };
      case 'failed':
        return { color: 'red' as const, text: 'Failed' };
      default:
        return { color: 'gray' as const, text: payout.status };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-3 p-2 rounded-md">
      <div className="flex items-center">
        <Banknote className="h-5 w-5 text-blue-500" />
      </div>
      <div className="min-w-0 space-y-1">
        <div className="text-sm text-gray-900">
          ₹{payout.amount} • {payout.bankAccount}
        </div>
        <div className="text-xs text-gray-500">
          UTR: {payout.utr}
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
        return { color: 'text-green-600', text: 'Processed' };
      case 'pending':
        return { color: 'text-yellow-600', text: 'Pending' };
      case 'failed':
        return { color: 'text-red-600', text: 'Failed' };
      default:
        return { color: 'text-gray-600', text: payout.status };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Banknote className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Payout Details</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="text-sm font-medium">₹{payout.amount}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className={`text-sm capitalize ${config.color}`}>
            {config.text}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Bank Account</p>
          <p className="text-sm">{payout.bankAccount}</p>
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
      timestamp: '2024-03-04T10:00:00'
    },
    // Add more sample payouts as needed
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
      className="space-y-2"
    />
  );
};