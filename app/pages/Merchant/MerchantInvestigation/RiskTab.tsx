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
  <CustomCard className="p-4 space-y-3">
    <div className="space-y-2">
      <h4 className="font-medium">{title}</h4>
      <RiskIndicator score={score} />
    </div>
    <div className="space-y-2">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{indicator.label}</span>
          <span className={`font-medium ${
            indicator.severity === 'high' ? 'text-red-600' :
            indicator.severity === 'medium' ? 'text-yellow-600' :
            'text-green-600'
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
      icon: <Activity className="h-5 w-5 text-red-500" />,
      indicators: [
        { label: 'High Value Transaction Rate', value: '45%', severity: 'high' as const },
        { label: 'Velocity Check Failures', value: '12', severity: 'medium' as const },
        { label: 'Cross-border Transactions', value: '8%', severity: 'low' as const },
      ]
    },
    {
      title: 'Compliance Risk',
      score: 65,
      icon: <Scale className="h-5 w-5 text-yellow-500" />,
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
    <div className="space-y-6 p-6">
      {/* Overall Risk Score */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Overall Risk Assessment</h3>
        <CustomCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="font-medium">High Risk Merchant</span>
          </div>
          <RiskIndicator score={82} />
          <p className="mt-2 text-sm text-gray-600">
            Multiple risk factors identified across transaction patterns and compliance
          </p>
        </CustomCard>
      </div>

      {/* Risk Categories */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Risk Categories</h3>
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
        <h3 className="text-lg font-semibold">Active Investigations</h3>
        <CustomCard className="divide-y">
          {activeInvestigations.map((investigation) => (
            <div key={investigation.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-4 w-4 ${
                    investigation.priority === 'High' ? 'text-red-500' : 'text-yellow-500'
                  }`} />
                  <span className="font-medium">{investigation.title}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(investigation.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className="ml-1">{investigation.status}</span>
                </div>
                <div>
                  <span className="text-gray-500">Priority:</span>
                  <span className="ml-1">{investigation.priority}</span>
                </div>
                <div>
                  <span className="text-gray-500">Assignee:</span>
                  <span className="ml-1">{investigation.assignee}</span>
                </div>
              </div>
            </div>
          ))}
        </CustomCard>
      </div>
    </div>
  );
}; 