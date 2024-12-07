import { FC } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { ArrowRight, CheckCircle, AlertTriangle, TrendingUp, Calendar, Target, Users } from 'lucide-react';
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
      <div className="flex items-center gap-1 text-emerald-600 transition-all duration-300 hover:scale-105">
        <CheckCircle className="h-4 w-4" />
        <span>Good</span>
      </div>
    ) : (
      <div className="flex items-center gap-1 text-amber-600 transition-all duration-300 hover:scale-105">
        <AlertTriangle className="h-4 w-4" />
        <span>Needs Improvement</span>
      </div>
    );
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Rule Definition */}
      <CustomCard className="p-4 space-y-3 bg-gradient-to-br from-white to-purple-50/30 transition-all duration-300 hover:shadow-lg">
        <h3 className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Rule Definition
        </h3>
        <div className="space-y-2">
          {conditions.map((condition, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-purple-400 font-medium">AND</span>}
              <div className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100 
                            transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:from-purple-100 hover:to-pink-100">
                <code className="text-purple-700">{condition.field} {condition.operator} {condition.value}</code>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-3">
            <ArrowRight className="text-purple-400" />
            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg
                          transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:from-blue-100 hover:to-cyan-100
                          border border-blue-100">
              Route to {queue}
            </div>
          </div>
        </div>
      </CustomCard>

      {/* Overall Performance */}
      <CustomCard className="p-4 bg-gradient-to-br from-white to-blue-50/30 transition-all duration-300 hover:shadow-lg">
        <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Overall Performance
        </h3>
        <div className="grid grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100
                         transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:from-purple-100 hover:to-pink-100">
            <div className="flex items-center gap-1.5 text-purple-600 mb-1">
              <Users className="h-4 w-4" />
              <p className="text-xs">Total Accounts</p>
            </div>
            <p className="text-sm font-semibold text-purple-700">{result.totalAccounts.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-br from-red-50 to-orange-50 border border-red-100
                         transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:from-red-100 hover:to-orange-100">
            <div className="flex items-center gap-1.5 text-red-600 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-xs">Fraud Accounts</p>
            </div>
            <p className="text-sm font-semibold text-red-700">{result.fraudAccounts.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100
                         transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:from-emerald-100 hover:to-teal-100">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Target className="h-4 w-4" />
                <p className="text-xs">Precision</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-emerald-700">{(result.precision * 100).toFixed(1)}%</p>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100
                         transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:from-blue-100 hover:to-cyan-100">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-blue-600">
                <TrendingUp className="h-4 w-4" />
                <p className="text-xs">Recall</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-blue-700">{(result.recall * 100).toFixed(1)}%</p>
          </div>
        </div>
      </CustomCard>

      {/* Monthly Performance */}
      <CustomCard className="p-4 bg-gradient-to-br from-white to-emerald-50/30 transition-all duration-300 hover:shadow-lg">
        <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Monthly Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm border-b border-gray-200">
                <th className="text-left py-2 text-gray-600">Month</th>
                <th className="text-right text-gray-600">Triggers</th>
                <th className="text-right text-gray-600">Fraud Caught</th>
                <th className="text-right text-gray-600">Precision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {result.monthlyStats.map((stat) => (
                <tr key={stat.month} className="transition-colors duration-200 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50">
                  <td className="py-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-emerald-500" />
                    {new Date(stat.month).toLocaleDateString('default', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="text-right font-medium text-gray-700">{stat.triggers.toLocaleString()}</td>
                  <td className="text-right font-medium text-gray-700">{stat.fraudCaught.toLocaleString()}</td>
                  <td className="text-right font-medium text-gray-700">{(stat.precision * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CustomCard>
    </div>
  );
};