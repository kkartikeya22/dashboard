import { FC } from 'react';
import { Workspace } from '@/app/layout/Workspace/Workspace';
import { TimelineList } from '@/app/pages/Lists/TimelineList';
import { TransactionList } from '@/app/pages/Lists/TransactionList';
import { PayoutList } from '../../Lists/PayoutList';
import { PaymentChannelsList } from '../../Lists/PaymentChannelsList';
import { CommunicationsList } from '../../Lists/CommunicationsList';
import { CreditCard, Smartphone, Building2, Factory, Globe, Globe2, Plane, GraduationCap } from 'lucide-react';
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
      icon: <CreditCard className="w-5 h-5 text-blue-500" />
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
      icon: <Smartphone className="w-5 h-5 text-purple-500" />
    },
    {
      id: '3',
      transactionType: 'International Wire',
      merchantType: 'Trading Platform',
      city: 'Singapore',
      countryCode: 'SG',
      amount: '2,99,500',
      transactionId: 'WIRE456789012',
      merchantName: 'Global Trade Solutions',
      riskScore: 92,
      riskDescription: 'Multiple high-value cross-border transactions',
      timestamp: '2024-12-01T10:45:00',
      status: 'failed' as const,
      icon: <Globe className="w-5 h-5 text-red-500" />
    },
    {
      id: '4',
      transactionType: 'NEFT Transfer',
      merchantType: 'Real Estate',
      city: 'Delhi',
      countryCode: 'IN',
      amount: '5,00,000',
      transactionId: 'NEFT234567890',
      merchantName: 'Prime Properties Ltd',
      riskScore: 75,
      riskDescription: 'Large transaction with new beneficiary',
      timestamp: '2024-12-01T09:30:00',
      status: 'completed' as const,
      icon: <Building2 className="w-5 h-5 text-green-500" />
    },
    {
      id: '5',
      transactionType: 'UPI Payment',
      merchantType: 'Food Delivery',
      city: 'Mumbai',
      countryCode: 'IN',
      productName: 'Express Delivery',
      amount: '899',
      transactionId: 'UPI567890123',
      merchantName: 'QuickBite Foods',
      riskScore: 20,
      timestamp: '2024-12-01T08:45:00',
      status: 'pending' as const,
      icon: <Smartphone className="w-5 h-5 text-purple-500" />
    },
    {
      id: '6',
      transactionType: 'RTGS Transfer',
      merchantType: 'Manufacturing',
      city: 'Pune',
      countryCode: 'IN',
      amount: '12,50,000',
      transactionId: 'RTGS789012345',
      merchantName: 'Steel Industries Ltd',
      riskScore: 65,
      riskDescription: 'Multiple large transfers in short duration',
      timestamp: '2024-12-01T08:15:00',
      status: 'completed' as const,
      icon: <Factory className="w-5 h-5 text-gray-500" />
    },
    {
      id: '7',
      transactionType: 'Card Payment',
      merchantType: 'Education',
      city: 'Chennai',
      countryCode: 'IN',
      amount: '45,000',
      transactionId: 'TXN345678901',
      merchantName: 'Global Learning Institute',
      riskScore: 15,
      timestamp: '2024-12-01T07:30:00',
      status: 'completed' as const,
      icon: <GraduationCap className="w-5 h-5 text-blue-500" />
    },
    {
      id: '8',
      transactionType: 'International Wire',
      merchantType: 'Software Services',
      city: 'London',
      countryCode: 'GB',
      amount: '1,75,000',
      transactionId: 'WIRE567890123',
      merchantName: 'TechSoft Solutions',
      riskScore: 88,
      riskDescription: 'Unusual transaction pattern detected',
      timestamp: '2024-12-01T06:45:00',
      status: 'completed' as const,
      icon: <Globe2 className="w-5 h-5 text-orange-500" />
    },
    {
      id: '9',
      transactionType: 'UPI Payment',
      merchantType: 'Healthcare',
      city: 'Hyderabad',
      countryCode: 'IN',
      productName: 'Medical Consultation',
      amount: '2,500',
      transactionId: 'UPI678901234',
      merchantName: 'HealthCare Plus',
      riskScore: 25,
      timestamp: '2024-12-01T05:30:00',
      status: 'completed' as const,
      icon: <Smartphone className="w-5 h-5 text-purple-500" />
    },
    {
      id: '10',
      transactionType: 'Card Payment',
      merchantType: 'Travel',
      city: 'Dubai',
      countryCode: 'AE',
      amount: '85,000',
      transactionId: 'TXN456789012',
      merchantName: 'Sky Travel Services',
      riskScore: 70,
      riskDescription: 'International transaction in high-risk region',
      timestamp: '2024-12-01T04:15:00',
      status: 'completed' as const,
      icon: <Plane className="w-5 h-5 text-blue-500" />
    },
    {
      id: '11',
      transactionType: 'NEFT Transfer',
      merchantType: 'Wholesale Trade',
      city: 'Ahmedabad',
      countryCode: 'IN',
      amount: '3,25,000',
      transactionId: 'NEFT678901234',
      merchantName: 'Metro Wholesalers',
      riskScore: 45,
      timestamp: '2024-12-01T03:30:00',
      status: 'completed' as const,
      icon: <Building2 className="w-5 h-5 text-green-500" />
    },
    {
      id: '12',
      transactionType: 'UPI Payment',
      merchantType: 'Retail',
      city: 'Kolkata',
      countryCode: 'IN',
      productName: 'Fashion Apparel',
      amount: '15,999',
      transactionId: 'UPI789012345',
      merchantName: 'Fashion Hub',
      riskScore: 35,
      timestamp: '2024-12-01T02:45:00',
      status: 'completed' as const,
      icon: <Smartphone className="w-5 h-5 text-purple-500" />
    },
    {
      id: '13',
      transactionType: 'International Wire',
      merchantType: 'Consulting',
      city: 'New York',
      countryCode: 'US',
      amount: '4,50,000',
      transactionId: 'WIRE789012345',
      merchantName: 'Global Consulting Group',
      riskScore: 82,
      riskDescription: 'High-value cross-border service payment',
      timestamp: '2024-12-01T02:00:00',
      status: 'completed' as const,
      icon: <Globe2 className="w-5 h-5 text-orange-500" />
    },
    {
      id: '14',
      transactionType: 'Card Payment',
      merchantType: 'Automotive',
      city: 'Gurgaon',
      countryCode: 'IN',
      amount: '35,000',
      transactionId: 'TXN890123456',
      merchantName: 'AutoCare Services',
      riskScore: 40,
      timestamp: '2024-12-01T01:15:00',
      status: 'failed' as const,
      icon: <CreditCard className="w-5 h-5 text-blue-500" />
    },
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
      icon: <Building2 className="w-5 h-5 text-green-500" />
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
      content: <TimelineList />
    },
    {
      id: 'transactions',
      label: 'Transactions',
      content: <TransactionList 
        transactions={transactions}
        onTransactionClick={handleTransactionClick}
      />
    },
    {
      id: 'payouts',
      label: 'Payouts',
      content: <PayoutList />
    },
    {
      id: 'channels',
      label: 'Channels',
      content: <PaymentChannelsList />
    },
    {
      id: 'communications',
      label: 'Communications',
      content: <CommunicationsList />
    }
  ];

  return <Workspace tabs={tabs} />;
};

export default MerchantActivity;
