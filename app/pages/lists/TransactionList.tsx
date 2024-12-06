import { FC } from 'react';
import StandardList, { StandardListItemProps } from '@/components/custom/StandardList';
import { BubbleTag } from '@/components/custom/BubbleTag';
import { formatTimestamp } from '@/utils/timeFormat';

interface Transaction {
  id: string;
  transactionType: string;
  merchantType: string; 
  amount: string;
  transactionId: string;
  merchantName: string;
  city: string;
  countryCode: string;
  productName?: string;
  riskScore: number;
  riskDescription?: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  icon: JSX.Element;
}

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionClick?: (item: StandardListItemProps) => void;
}

const TransactionArtifact: FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { 
    icon, 
    transactionType, 
    merchantType, 
    amount, 
    transactionId, 
    merchantName,
    timestamp, 
    status 
  } = transaction;

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-semibold">{transactionType} at {merchantType}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Transaction ID</p>
          <p className="text-sm">{transactionId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Merchant</p>
          <p className="text-sm">{merchantName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="text-sm font-medium">₹{amount}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className={`text-sm capitalize ${getStatusColor()}`}>
            {status}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Timestamp</p>
          <p className="text-sm">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const TransactionItem: FC<Transaction> = ({
  transactionType,
  merchantType,
  amount,
  transactionId,
  merchantName,
  city,
  countryCode,
  productName,
  riskScore,
  riskDescription,
  status,
  icon,
  timestamp
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          color: 'green' as const,
          text: 'Completed'
        };
      case 'failed':
        return {
          color: 'red' as const,
          text: 'Failed'
        };
      case 'pending':
        return {
          color: 'yellow' as const,
          text: 'Pending'
        };
      default:
        return {
          color: 'gray' as const,
          text: status
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-3 p-2 rounded-md">
      <div className="flex items-center">
        {icon}
      </div>
      <div className="min-w-0 space-y-1">
        <div className="text-sm text-gray-900">
          {transactionType} at {merchantType} • ₹{amount}
        </div>
        <div className="text-xs text-gray-500">
          {merchantName} • {city} {countryCode} {productName && ` • ${productName}`}
        </div>
        <div className="text-xs">
          <span className={`font-medium ${riskScore >= 80 ? 'text-red-600' : riskScore >= 50 ? 'text-orange-600' : 'text-green-600'}`}>
            Risk Score: {riskScore}
          </span>
          {riskDescription && ` • ${riskDescription}`}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between min-h-[60px]">
        <div className="text-xs text-gray-500">
          {formatTimestamp(timestamp, 'relative')}
        </div>
        <BubbleTag
          text={config.text}
          color={config.color}
        />
        <div className="text-xs text-gray-500">
          ID: {transactionId}
        </div>
      </div>
    </div>
  );
};

export const TransactionList: FC<TransactionListProps> = ({ transactions, onTransactionClick }) => {
  const items = transactions.map(transaction => ({
    id: transaction.id,
    title: `${transaction.transactionType} at ${transaction.merchantType}`,
    content: <TransactionItem {...transaction} />,
    metadata: {
      ...transaction,
      title: `${transaction.transactionType} at ${transaction.merchantType}`,
      renderArtifact: () => <TransactionArtifact transaction={transaction} />
    }
  }));

  return (
    <StandardList 
      items={items}
      onItemClick={onTransactionClick}
      className="space-y-2"
    />
  );
};
