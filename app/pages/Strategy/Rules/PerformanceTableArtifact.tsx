import { FC } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';

interface RulePerformance {
  ruleId: string;
  ruleName: string;
  category: string;
  metrics: {
    [period: string]: {
      triggers: number;
      fraudRate: number;
    };
  };
}

interface PerformanceTableArtifactProps {
  data: RulePerformance[];
  periods: string[];
  metricType: 'triggers' | 'fraudRate';
  viewPeriod: 'weekly' | 'monthly';
}

export const PerformanceTableArtifact: FC<PerformanceTableArtifactProps> = ({
  data,
  periods,
  metricType,
  viewPeriod
}) => {
  const getMaxValue = () => {
    return Math.max(...data.flatMap(rule => 
      Object.values(rule.metrics).map(m => 
        metricType === 'triggers' ? m.triggers : m.fraudRate
      )
    ));
  };

  const getBackgroundColor = (value: number) => {
    const maxValue = getMaxValue();
    const intensity = Math.max(0.1, value / maxValue);
    return metricType === 'triggers' 
      ? `rgba(56, 189, 248, ${intensity})` // Lighter blue for triggers
      : `rgba(244, 63, 94, ${intensity})`; // Rose red for fraud rate
  };

  const formatValue = (value: number) => {
    return metricType === 'triggers' 
      ? value.toLocaleString()
      : `${(value * 100).toFixed(1)}%`;
  };

  const formatPeriod = (period: string) => {
    const date = new Date(period);
    return viewPeriod === 'monthly'
      ? date.toLocaleDateString('default', { month: 'short', year: 'numeric' })
      : `Week ${getWeekNumber(date)}`;
  };

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl font-semibold text-gray-800 transition-colors duration-200">
        Rule Performance - {metricType === 'triggers' ? 'Trigger Count' : 'Fraud Rate'}
      </h2>
      
      <CustomCard className="w-full shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-600 z-10 border-b border-gray-200">
                  Rule Name
                </th>
                {periods.map(period => (
                  <th key={period} className="px-4 py-3 text-left text-sm font-medium text-gray-600 whitespace-nowrap border-b border-gray-200">
                    {formatPeriod(period)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map(rule => (
                <tr 
                  key={rule.ruleId}
                  className="transition-colors duration-150 hover:bg-gray-50"
                >
                  <td className="sticky left-0 bg-white px-4 py-3 text-sm font-mono z-10 truncate group">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
                        {rule.ruleId}
                      </span>
                      <span className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {rule.category}
                      </span>
                    </div>
                  </td>
                  {periods.map(period => {
                    const value = metricType === 'triggers' 
                      ? rule.metrics[period].triggers 
                      : rule.metrics[period].fraudRate;
                    return (
                      <td 
                        key={period}
                        className="px-4 py-3 text-sm whitespace-nowrap transition-all duration-200 hover:scale-105"
                        style={{ 
                          backgroundColor: getBackgroundColor(value),
                          color: value / getMaxValue() > 0.5 ? 'white' : 'black'
                        }}
                      >
                        {formatValue(value)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CustomCard>
    </div>
  );
};

function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}