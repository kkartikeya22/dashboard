import { FC } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { SimulationResult } from './RulesPage';

interface SimulationResultArtifactProps {
  ruleName: string;
  conditions: {
    field: string;
    operator: string;
    value: string;
  }[];
  queue: string;
  result: SimulationResult;
}

export const SimulationResultArtifact: FC<SimulationResultArtifactProps> = ({
  ruleName,
  conditions,
  queue,
  result
}) => {
  const getPerformanceIndicator = (value: number, type: 'precision' | 'recall') => {
    const threshold = type === 'precision' ? 0.7 : 0.8;
    return value >= threshold ? (
      <div className="flex items-center gap-1 text-green-600">
        <CheckCircle className="h-4 w-4" />
        <span>Good</span>
      </div>
    ) : (
      <div className="flex items-center gap-1 text-yellow-600">
        <AlertTriangle className="h-4 w-4" />
        <span>Needs Improvement</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Rule Definition */}
      <CustomCard className="p-4 space-y-4">
        <h3 className="font-semibold">Rule Definition</h3>
        <div className="space-y-2">
          {conditions.map((condition, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">AND</span>}
              <div className="px-3 py-1.5 bg-gray-100 rounded">
                {condition.field} {condition.operator} {condition.value}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-4">
            <ArrowRight className="text-gray-400" />
            <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded">
              Route to {queue}
            </div>
          </div>
        </div>
      </CustomCard>

      {/* Overall Performance */}
      <CustomCard className="p-4">
        <h3 className="font-semibold mb-4">Overall Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500">Total Accounts</p>
            <p className="text-xl font-semibold">{result.totalAccounts.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fraud Accounts</p>
            <p className="text-xl font-semibold">{result.fraudAccounts.toLocaleString()}</p>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Precision</p>
              {getPerformanceIndicator(result.precision, 'precision')}
            </div>
            <p className="text-xl font-semibold">{(result.precision * 100).toFixed(1)}%</p>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Recall</p>
              {getPerformanceIndicator(result.recall, 'recall')}
            </div>
            <p className="text-xl font-semibold">{(result.recall * 100).toFixed(1)}%</p>
          </div>
        </div>
      </CustomCard>

      {/* Monthly Performance */}
      <CustomCard className="p-4">
        <h3 className="font-semibold mb-4">Monthly Performance</h3>
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="text-left py-2">Month</th>
              <th className="text-right">Triggers</th>
              <th className="text-right">Fraud Caught</th>
              <th className="text-right">Precision</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {result.monthlyStats.map((stat) => (
              <tr key={stat.month}>
                <td className="py-2">
                  {new Date(stat.month).toLocaleDateString('default', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </td>
                <td className="text-right">{stat.triggers.toLocaleString()}</td>
                <td className="text-right">{stat.fraudCaught.toLocaleString()}</td>
                <td className="text-right">{(stat.precision * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CustomCard>
    </div>
  );
}; 