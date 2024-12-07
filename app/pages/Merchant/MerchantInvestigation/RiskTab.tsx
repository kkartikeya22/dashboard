import { FC } from 'react';
import { RiskIndicator } from '@/app/pages/Merchant/MerchantProfile/MerchantProfileComponents';
import { AlertTriangle, ShieldAlert, AlertCircle, Scale, Activity } from 'lucide-react';
import { CustomCard } from '@/components/custom/CustomCard';

interface RiskCategoryProps {
  title: string;
  score: number;
  indicators: {
    label: string;
    value: string;
    severity: 'high' | 'medium' | 'low';
  }[];
}

const RiskCategory: FC<RiskCategoryProps> = ({ title, score, indicators }) => (
  <CustomCard className="p-4 space-y-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
    <div className="space-y-2">
      <h4 className="font-medium text-gray-800 transition-colors duration-200 hover:text-blue-600">{title}</h4>
      <RiskIndicator score={score} />
    </div>
    <div className="space-y-2">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center justify-between text-sm transition-all duration-200 hover:bg-blue-50/50 p-1.5 rounded">
          <span className="text-gray-600">{indicator.label}</span>
          <span className={`font-medium transition-colors duration-200 ${
            indicator.severity === 'high' ? 'text-rose-600 hover:text-rose-700' :
            indicator.severity === 'medium' ? 'text-amber-600 hover:text-amber-700' :
            'text-emerald-600 hover:text-emerald-700'
          }`}>
            {indicator.value}
          </span>
        </div>
      ))}
    </div>
  </CustomCard>
);

export const RiskTab: FC = () => {
  const riskCategories = [
    {
      title: 'Transaction Risk',
      score: 85,
      icon: <Activity className="h-5 w-5 text-rose-500" />,
      indicators: [
        { label: 'High Value Transaction Rate', value: '45%', severity: 'high' as const },
        { label: 'Velocity Check Failures', value: '12', severity: 'medium' as const },
        { label: 'Cross-border Transactions', value: '8%', severity: 'low' as const },
      ]
    },
    {
      title: 'Compliance Risk',
      score: 65,
      icon: <Scale className="h-5 w-5 text-amber-500" />,
      indicators: [
        { label: 'KYC Status', value: 'Incomplete', severity: 'high' as const },
        { label: 'Document Verification', value: 'Pending', severity: 'medium' as const },
        { label: 'Regulatory Compliance', value: 'Partial', severity: 'medium' as const },
      ]
    },
    {
      title: 'Fraud Risk',
      score: 72,
      icon: <ShieldAlert className="h-5 w-5 text-orange-500" />,
      indicators: [
        { label: 'Chargeback Rate', value: '2.5%', severity: 'high' as const },
        { label: 'Suspicious Patterns', value: 'Detected', severity: 'high' as const },
        { label: 'Customer Complaints', value: '5', severity: 'medium' as const },
      ]
    },
    {
      title: 'Business Risk',
      score: 45,
      icon: <AlertCircle className="h-5 w-5 text-blue-500" />,
      indicators: [
        { label: 'Industry Risk', value: 'Moderate', severity: 'medium' as const },
        { label: 'Business Age', value: '2 years', severity: 'low' as const },
        { label: 'Financial Health', value: 'Stable', severity: 'low' as const },
      ]
    }
  ];

  const activeInvestigations = [
    {
      id: 'INV-001',
      title: 'Unusual Transaction Pattern',
      status: 'In Progress',
      priority: 'High',
      assignee: 'John Doe',
      lastUpdated: '2024-03-15T10:30:00'
    },
    {
      id: 'INV-002',
      title: 'Compliance Documentation',
      status: 'Pending Review',
      priority: 'Medium',
      assignee: 'Jane Smith',
      lastUpdated: '2024-03-14T15:45:00'
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Overall Risk Score */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Overall Risk Assessment</h3>
        <CustomCard className="p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-white via-rose-50/30 to-rose-50/50">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-rose-500 animate-pulse" />
            <span className="font-medium text-gray-800">High Risk Merchant</span>
          </div>
          <RiskIndicator score={82} />
          <p className="mt-2 text-sm text-gray-600 transition-colors duration-200 hover:text-gray-800">
            Multiple risk factors identified across transaction patterns and compliance
          </p>
        </CustomCard>
      </div>

      {/* Risk Categories */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Risk Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskCategories.map((category, index) => (
            <RiskCategory 
              key={index}
              title={category.title}
              score={category.score}
              indicators={category.indicators as { label: string; value: string; severity: 'high' | 'medium' | 'low' }[]}
            />
          ))}
        </div>
      </div>

      {/* Active Investigations */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Active Investigations</h3>
        <CustomCard className="divide-y transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
          {activeInvestigations.map((investigation) => (
            <div key={investigation.id} className="p-4 space-y-2 transition-all duration-200 hover:bg-blue-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-4 w-4 transition-colors duration-200 ${
                    investigation.priority === 'High' ? 'text-rose-500 animate-pulse' : 'text-amber-500'
                  }`} />
                  <span className="font-medium text-gray-800 transition-colors duration-200 hover:text-blue-600">{investigation.title}</span>
                </div>
                <span className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-700">
                  {new Date(investigation.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="transition-all duration-200 hover:bg-blue-100/50 p-1 rounded">
                  <span className="text-gray-500">Status:</span>
                  <span className="ml-1 text-gray-800">{investigation.status}</span>
                </div>
                <div className="transition-all duration-200 hover:bg-blue-100/50 p-1 rounded">
                  <span className="text-gray-500">Priority:</span>
                  <span className="ml-1 text-gray-800">{investigation.priority}</span>
                </div>
                <div className="transition-all duration-200 hover:bg-blue-100/50 p-1 rounded">
                  <span className="text-gray-500">Assignee:</span>
                  <span className="ml-1 text-gray-800">{investigation.assignee}</span>
                </div>
              </div>
            </div>
          ))}
        </CustomCard>
      </div>
    </div>
  );
};