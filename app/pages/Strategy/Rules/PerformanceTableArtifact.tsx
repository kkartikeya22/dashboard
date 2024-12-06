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
      ? `rgba(59, 130, 246, ${intensity})` 
      : `rgba(239, 68, 68, ${intensity})`;
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
      <h2 className="text-xl font-semibold">
        Rule Performance - {metricType === 'triggers' ? 'Trigger Count' : 'Fraud Rate'}
      </h2>
      
      <CustomCard className="w-full">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="sticky left-0 bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-500 z-10">
                  Rule Name
                </th>
                {periods.map(period => (
                  <th key={period} className="px-4 py-2 text-left text-sm font-medium text-gray-500 whitespace-nowrap">
                    {formatPeriod(period)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map(rule => (
                <tr key={rule.ruleId}>
                  <td className="sticky left-0 bg-white px-4 py-2 text-sm font-mono z-10 truncate">
                    {rule.ruleId}
                  </td>
                  {periods.map(period => {
                    const value = metricType === 'triggers' 
                      ? rule.metrics[period].triggers 
                      : rule.metrics[period].fraudRate;
                    return (
                      <td 
                        key={period}
                        className="px-4 py-2 text-sm whitespace-nowrap"
                        style={{ backgroundColor: getBackgroundColor(value) }}
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