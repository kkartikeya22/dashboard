import { FC, useState, useMemo } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { CustomSelect } from '@/components/custom/CustomSelect';
import { Calendar, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';
import { PerformanceTableArtifact } from './PerformanceTableArtifact';
import { RulePerformance, Rule } from './RulesPage';
import { ruleCategories, someRules } from './ConditionsTab';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type RuleCategory = typeof ruleCategories[number];
type ViewPeriod = 'weekly' | 'monthly';
type MetricType = 'triggers' | 'fraudRate';

export const PerformanceTab: FC = () => {
  const { setArtifact } = useWorkspace();
  const [selectedCategory, setSelectedCategory] = useState<RuleCategory>(ruleCategories[0]);
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>('monthly');
  const [metricType, setMetricType] = useState<MetricType>('triggers');

  const performanceData: RulePerformance[] = useMemo(() => 
    someRules.map((rule: Rule) => ({
      ruleId: rule.id,
      ruleName: rule.name,
      category: rule.category,
      metrics: {
        '2024-01': { triggers: rule.triggerCount * 0.8, fraudRate: 0.12 },
        '2024-02': { triggers: rule.triggerCount * 0.9, fraudRate: 0.15 },
        '2024-03': { triggers: rule.triggerCount, fraudRate: 0.18 }
      }
    }))
  , []);

  const periods = useMemo(() => 
    ['2024-01', '2024-02', '2024-03'],
    []
  );

  const handleShowPerformance = () => {
    setArtifact({
      id: 'performance-analysis',
      title: 'Rule Performance Analysis',
      renderArtifact: () => (
        <PerformanceTableArtifact
          data={performanceData.filter(rule => rule.category === selectedCategory)}
          periods={periods}
          metricType={metricType}
          viewPeriod={viewPeriod}
        />
      )
    });
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center p-4 bg-gray-50/50 rounded-lg transition-all duration-300 hover:bg-gray-100/50">
          <CustomSelect
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as RuleCategory)}
            options={ruleCategories}
            size="sm"
            className="border-indigo-100 hover:border-indigo-300 transition-colors duration-200"
          />
          <CustomSelect
            value={viewPeriod}
            onValueChange={(value) => setViewPeriod(value as ViewPeriod)}
            options={[
              { label: 'Monthly View', value: 'monthly' },
              { label: 'Weekly View', value: 'weekly' }
            ]}
            size="sm"
            className="border-indigo-100 hover:border-indigo-300 transition-colors duration-200"
          />
          <CustomSelect
            value={metricType}
            onValueChange={(value) => setMetricType(value as MetricType)}
            options={[
              { label: 'Rule Triggers', value: 'triggers' },
              { label: 'Fraud Rate', value: 'fraudRate' }
            ]}
            size="sm"
            className="border-indigo-100 hover:border-indigo-300 transition-colors duration-200"
          />
          <Button 
            onClick={handleShowPerformance}
            className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 hover:shadow-lg"
          >
            Show Performance
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="space-y-4 p-4">
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-indigo-900">Performance Analysis</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <TrendingUp className="w-5 h-5" />
                    <span>Positive Trend</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="w-5 h-5" />
                    <span>3 Alerts</span>
                  </div>
                </div>
              </div>

              <CustomCard 
                className={cn(
                  "p-6 cursor-pointer transition-all duration-300",
                  "hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50",
                  "hover:shadow-lg hover:scale-[1.01]",
                  "border border-indigo-100/50"
                )}
                onClick={handleShowPerformance}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <BarChart2 className="w-6 h-6 text-indigo-600" />
                    </div>
                    <span className="text-lg font-medium text-gray-800">View Performance Analysis</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>Last 3 months</span>
                  </div>
                </div>
                <p className="text-gray-600 ml-11">
                  Analyze rule performance metrics, trends, and insights across different time periods
                </p>
              </CustomCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 