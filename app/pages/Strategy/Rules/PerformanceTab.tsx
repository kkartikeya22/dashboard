import { FC, useState, useMemo } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { CustomSelect } from '@/components/custom/CustomSelect';
import { Calendar, BarChart2 } from 'lucide-react';
import { PerformanceTableArtifact } from './PerformanceTableArtifact';
import { RulePerformance, Rule } from './RulesPage';
import { ruleCategories, someRules } from './ConditionsTab';
import { Button } from '@/components/ui/button';

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
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <CustomSelect
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as RuleCategory)}
            options={ruleCategories}
            size="sm"
          />
          <CustomSelect
            value={viewPeriod}
            onValueChange={(value) => setViewPeriod(value as ViewPeriod)}
            options={[
              { label: 'Monthly View', value: 'monthly' },
              { label: 'Weekly View', value: 'weekly' }
            ]}
            size="sm"
          />
          <CustomSelect
            value={metricType}
            onValueChange={(value) => setMetricType(value as MetricType)}
            options={[
              { label: 'Rule Triggers', value: 'triggers' },
              { label: 'Fraud Rate', value: 'fraudRate' }
            ]}
            size="sm"
          />
          <Button onClick={handleShowPerformance}>
            Show Performance
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="space-y-4 p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Performance Analysis</h2>
              </div>

              <CustomCard 
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={handleShowPerformance}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-blue-500" />
                    <span>View Performance Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Last 3 months</span>
                  </div>
                </div>
              </CustomCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 