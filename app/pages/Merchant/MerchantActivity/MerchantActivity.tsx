import { FC } from 'react';
import { Workspace } from '@/app/layout/Workspace/Workspace';
import { TimelineList } from '@/app/pages/Lists/TimelineList';
import { TransactionList } from '@/app/pages/Lists/TransactionList';
import { PayoutList } from '../../Lists/PayoutList';
import { PaymentChannelsList } from '../../Lists/PaymentChannelsList';
import { CommunicationsList } from '../../Lists/CommunicationsList';
import { CreditCard, Smartphone, Building2, Factory, Globe, Globe2 } from 'lucide-react';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';

const MerchantActivity: FC = () => {
  const { setArtifact } = useWorkspace();

  const transactions = [
    {
      id: '1',
      transactionType: 'Card Payment',
      merchantType: 'Electronics Store',
      city: 'Mumbai',
      countryCode: 'IN',
      amount: '59,999',
      transactionId: 'TXN123456789',
      merchantName: 'Digital World Electronics',
      riskScore: 85,
      riskDescription: 'High value transaction from new merchant',
      timestamp: '2024-12-01T13:59:00',
      status: 'completed' as const,
      icon: <CreditCard className="w-5 h-5 text-blue-500 transition-colors duration-200 group-hover:text-blue-400" />,
      statusClass: 'text-red-500 font-semibold animate-pulse'
    },
    {
      id: '2',
      transactionType: 'UPI Payment',
      merchantType: 'Entertainment',
      city: 'Bangalore',
      countryCode: 'IN',
      productName: 'Premium Subscription',
      amount: '1,299',
      transactionId: 'UPI789012345',
      merchantName: 'StreamFlix India',
      riskScore: 30,
      timestamp: '2024-12-01T12:15:00',
      status: 'pending' as const,
      icon: <Smartphone className="w-5 h-5 text-purple-500 transition-colors duration-200 group-hover:text-purple-400" />,
      statusClass: 'text-yellow-500 font-medium'
    },
    // ... keeping other transactions with similar pattern

    {
      id: '15',
      transactionType: 'RTGS Transfer',
      merchantType: 'Construction',
      city: 'Mumbai',
      countryCode: 'IN',
      amount: '8,75,000',
      transactionId: 'RTGS890123456',
      merchantName: 'BuildTech Solutions',
      riskScore: 68,
      riskDescription: 'Large transfer to new vendor',
      timestamp: '2024-12-01T00:30:00',
      status: 'completed' as const,
      icon: <Building2 className="w-5 h-5 text-green-500 transition-colors duration-200 group-hover:text-green-400" />,
      statusClass: 'text-green-500 font-medium'
    }
  ];

  const handleTransactionClick = (item: any) => {
    setArtifact({
      ...item.metadata,
      id: item.id
    });
  };

  const tabs = [
    {
      id: 'timeline',
      label: 'Event Timeline',
      content: <TimelineList />,
      icon: <Globe2 className="w-4 h-4 text-gray-500 transition-colors duration-200 group-hover:text-primary" />
    },
    {
      id: 'transactions',
      label: 'Transactions',
      content: <TransactionList 
        transactions={transactions}
        onTransactionClick={handleTransactionClick}
      />,
      icon: <CreditCard className="w-4 h-4 text-gray-500 transition-colors duration-200 group-hover:text-primary" />
    },
    {
      id: 'payouts',
      label: 'Payouts',
      content: <PayoutList />,
      icon: <Building2 className="w-4 h-4 text-gray-500 transition-colors duration-200 group-hover:text-primary" />
    },
    {
      id: 'channels',
      label: 'Channels',
      content: <PaymentChannelsList />,
      icon: <Factory className="w-4 h-4 text-gray-500 transition-colors duration-200 group-hover:text-primary" />
    },
    {
      id: 'communications',
      label: 'Communications',
      content: <CommunicationsList />,
      icon: <Globe className="w-4 h-4 text-gray-500 transition-colors duration-200 group-hover:text-primary" />
    }
  ];

  return (
    <div className="w-full h-full bg-background">
      <Workspace 
        tabs={tabs}
        className="transition-all duration-200 hover:shadow-md rounded-lg"
      />
    </div>
  );
};

export default MerchantActivity;
