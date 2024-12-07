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
  <CustomCard className="p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 transition-colors duration-200 hover:text-blue-600">{value}</p>
        {trend && (
          <div className="flex items-center gap-1.5">
            <ArrowUpRight className={`h-4 w-4 transition-transform duration-300 ${trend.isPositive ? 'text-emerald-500' : 'text-rose-500'} ${!trend.isPositive && 'rotate-90'}`} />
            <span className={`text-sm font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {trend.value}
            </span>
          </div>
        )}
      </div>
      <div className="p-3 bg-blue-50 rounded-xl transition-transform duration-200 hover:scale-110 hover:rotate-3">
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
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
    },
    {
      title: 'Average Daily Transactions',
      value: '₹2.5L',
      icon: <CreditCard className="h-5 w-5 text-indigo-600" />,
      trend: {
        value: '12% vs last month',
        isPositive: true
      }
    },
    {
      title: 'Average Payout Size',
      value: '₹85K',
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
      trend: {
        value: '5% vs last month',
        isPositive: false
      }
    },
    {
      title: 'Active Cases',
      value: '3',
      icon: <AlertTriangle className="h-5 w-5 text-rose-600" />,
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Key Stats */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Key Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Investigation Notes */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-blue-600" />
          Investigation Notes
        </h3>
        <CustomCard className="p-4 space-y-4 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
          <div className="space-y-2 p-3 rounded-lg transition-all duration-200 hover:bg-blue-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                <p className="text-sm font-medium text-gray-800">Case #123 - Unusual Transaction Patterns</p>
              </div>
              <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-full">2 days ago</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Multiple high-value transactions detected during non-business hours. 
              Merchant explanation pending. Flagged for immediate review.
            </p>
          </div>
          <div className="space-y-2 p-3 rounded-lg transition-all duration-200 hover:bg-blue-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <p className="text-sm font-medium text-gray-800">Case #122 - Compliance Review</p>
              </div>
              <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-full">5 days ago</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              GST registration verification failed. Business volume exceeds threshold.
              Documentation requested from merchant.
            </p>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};