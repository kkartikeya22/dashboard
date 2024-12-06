import { FC } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { RiskIndicator } from '@/app/pages/Merchant/MerchantProfile/MerchantProfileComponents';
import { AlertTriangle, TrendingUp, Calendar, CreditCard, ArrowUpRight, Building2 } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard: FC<StatCardProps> = ({ title, value, icon, trend }) => (
  <CustomCard className="p-4">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
        {trend && (
          <div className="flex items-center gap-1">
            <ArrowUpRight className={`h-4 w-4 ${trend.isPositive ? 'text-green-500' : 'text-red-500'} ${!trend.isPositive && 'rotate-90'}`} />
            <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.value}
            </span>
          </div>
        )}
      </div>
      <div className="p-2 bg-gray-50 rounded-lg">
        {icon}
      </div>
    </div>
  </CustomCard>
);

export const OverviewTab: FC = () => {
  const stats = [
    {
      title: 'Days Since Onboarding',
      value: '245',
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
    },
    {
      title: 'Average Daily Transactions',
      value: '₹2.5L',
      icon: <CreditCard className="h-5 w-5 text-purple-500" />,
      trend: {
        value: '12% vs last month',
        isPositive: true
      }
    },
    {
      title: 'Average Payout Size',
      value: '₹85K',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      trend: {
        value: '5% vs last month',
        isPositive: false
      }
    },
    {
      title: 'Active Cases',
      value: '3',
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    }
  ];

  return (
    <div className="space-y-6 p-0">

      {/* Key Stats */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Investigation Notes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Investigation Notes</h3>
        <CustomCard className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Case #123 - Unusual Transaction Patterns</p>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
            <p className="text-sm text-gray-600">
              Multiple high-value transactions detected during non-business hours. 
              Merchant explanation pending.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Case #122 - Compliance Review</p>
              <span className="text-xs text-gray-500">5 days ago</span>
            </div>
            <p className="text-sm text-gray-600">
              GST registration verification failed. Business volume exceeds threshold.
            </p>
          </div>
        </CustomCard>
      </div>
    </div>
  );
}; 