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
    status,
    riskScore
  } = transaction;

  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return { color: 'text-emerald-600', bgColor: 'bg-emerald-50' };
      case 'failed':
        return { color: 'text-red-600', bgColor: 'bg-red-50' };
      case 'pending':
        return { color: 'text-amber-600', bgColor: 'bg-amber-50' };
      default:
        return { color: 'text-gray-600', bgColor: 'bg-gray-50' };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="space-y-6">
      <div className={`${config.bgColor} p-6 rounded-lg transition-all duration-300 hover:shadow-lg`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-blue-500 transition-transform duration-200 hover:scale-110">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{transactionType} at {merchantType}</h2>
            <p className={`text-sm ${config.color}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="text-lg font-mono">{transactionId}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <p className="text-sm text-gray-500">Merchant</p>
            <p className="text-lg">{merchantName}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-lg font-medium">₹{amount}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <p className="text-sm text-gray-500">Risk Score</p>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-medium ${
                riskScore >= 80 ? 'text-red-600' : 
                riskScore >= 50 ? 'text-orange-600' : 
                'text-emerald-600'
              }`}>{riskScore}</span>
              <div className={`px-2 py-1 text-xs rounded-full ${
                riskScore >= 80 ? 'bg-red-100 text-red-700' : 
                riskScore >= 50 ? 'bg-orange-100 text-orange-700' : 
                'bg-emerald-100 text-emerald-700'
              }`}>
                {riskScore >= 80 ? 'High' : riskScore >= 50 ? 'Medium' : 'Low'}
              </div>
            </div>
          </div>
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
        return { color: 'green' as const, text: 'Completed', bgColor: 'bg-emerald-50', hoverBg: 'hover:bg-emerald-100' };
      case 'failed':
        return { color: 'red' as const, text: 'Failed', bgColor: 'bg-red-50', hoverBg: 'hover:bg-red-100' };
      case 'pending':
        return { color: 'yellow' as const, text: 'Pending', bgColor: 'bg-amber-50', hoverBg: 'hover:bg-amber-100' };
      default:
        return { color: 'gray' as const, text: status, bgColor: 'bg-gray-50', hoverBg: 'hover:bg-gray-100' };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`grid grid-cols-[auto_1fr_auto] gap-3 p-4 rounded-lg transition-all duration-200 ${config.bgColor} ${config.hoverBg} hover:shadow-md`}>
      <div className="flex items-center text-blue-500 transition-transform duration-200 hover:scale-110">
        {icon}
      </div>
      <div className="min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">₹{amount}</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-700">{transactionType} at {merchantType}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{merchantName}</span>
          <span>•</span>
          <span>{city}, {countryCode}</span>
          {productName && (
            <>
              <span>•</span>
              <span>{productName}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            riskScore >= 80 ? 'bg-red-100 text-red-700' :
            riskScore >= 50 ? 'bg-orange-100 text-orange-700' :
            'bg-emerald-100 text-emerald-700'
          }`}>
            Risk: {riskScore}
          </span>
          {riskDescription && (
            <span className="text-xs text-gray-500">{riskDescription}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className="text-xs text-gray-500">
          {formatTimestamp(timestamp, 'relative')}
        </div>
        <BubbleTag text={config.text} color={config.color} />
        <div className="text-xs font-mono text-gray-500">
          {transactionId}
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
