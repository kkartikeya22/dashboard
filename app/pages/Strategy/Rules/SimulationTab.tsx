import { FC, useState } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { CustomSelect } from '@/components/custom/CustomSelect';
import { CustomInput } from '@/components/custom/CustomInput';
import { Button } from '@/components/ui/button';
import { Plus, X, Play, ArrowRight, LineChart, Target, AlertCircle } from 'lucide-react';
import { SimulationResultArtifact } from './SimulationResultArtifact';
import { SimulationResult } from './RulesPage';

interface Condition {
  field: string;
  operator: string;
  value: string;
}

const availableFields = [
  'days_since_phone_change',
  'days_since_address_change', 
  '1d_txn_amt_sum',
  'txn_velocity_1d',
  'distinct_beneficiaries_7d',
  'return_rate_30d',
  'login_attempts_24h',
  'device_change_7d',
  'ip_risk_score',
  'kyc_risk_level'
] as const;

const operators = ['≤', '≥', '=', '≠', '<', '>'] as const;

type Field = typeof availableFields[number];
type Operator = typeof operators[number];

export const SimulationTab: FC = () => {
  const { setArtifact } = useWorkspace();
  const [ruleName, setRuleName] = useState('');
  const [conditions, setConditions] = useState<Condition[]>([
    { field: availableFields[0], operator: operators[0], value: '' }
  ]);
  const [queue, setQueue] = useState('High Priority Investigation');

  const handleAddCondition = () => {
    setConditions([...conditions, { field: availableFields[0], operator: operators[0], value: '' }]);
  };

  const handleRemoveCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleConditionChange = (index: number, field: keyof Condition, value: string) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditions(newConditions);
  };

  const handleSimulate = () => {
    // Simulated results - in real implementation, this would come from an API
    const simulationResult: SimulationResult = {
      totalAccounts: 15000,
      fraudAccounts: 450,
      precision: 0.78,
      recall: 0.85,
      f1Score: 0.81,
      monthlyStats: [
        {
          month: '2024-01',
          triggers: 320,
          fraudCaught: 250,
          precision: 0.78,
          costSavings: 125000
        },
        {
          month: '2024-02',
          triggers: 380,
          fraudCaught: 295,
          precision: 0.77,
          costSavings: 147500
        },
        {
          month: '2024-03',
          triggers: 420,
          fraudCaught: 330,
          precision: 0.79,
          costSavings: 165000
        }
      ]
    };

    setArtifact({
      id: 'simulation-result',
      title: 'Rule Simulation Results',
      renderArtifact: () => (
        <SimulationResultArtifact
          ruleName={ruleName}
          conditions={conditions}
          queue={queue}
          result={simulationResult}
        />
      )
    });
  };

  return (
    <div className="w-full max-w-full overflow-hidden p-6 bg-gradient-to-br from-emerald-50/30 via-teal-50/30 to-cyan-50/30">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <LineChart className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Rule Simulation
          </h2>
        </div>

        <CustomCard className="p-6 space-y-6 bg-white/80 backdrop-blur-sm border border-emerald-100 transition-all duration-300 hover:shadow-lg">
          <div className="grid gap-4 max-w-2xl">
            <CustomInput
              label="Rule Name"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="border-emerald-200 focus:border-emerald-400 transition-colors"
            />
            
            {conditions.map((condition, index) => (
              <div key={index} className="flex gap-2 items-end group">
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <CustomSelect
                    value={condition.field}
                    onValueChange={(value) => handleConditionChange(index, 'field', value)}
                    options={availableFields}
                    className="border-emerald-200 hover:border-emerald-400 transition-colors"
                    size="sm"
                  />
                  <CustomSelect
                    value={condition.operator}
                    onValueChange={(value) => handleConditionChange(index, 'operator', value)}
                    options={operators}
                    className="border-emerald-200 hover:border-emerald-400 transition-colors"
                    size="sm"
                  />
                  <CustomInput
                    value={condition.value}
                    onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                    placeholder="Value"
                    inputSize="xs"
                    className="border-emerald-200 focus:border-emerald-400 transition-colors"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCondition(index)}
                  disabled={conditions.length === 1}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </Button>
                {index === conditions.length - 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleAddCondition}
                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-300"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <div className="flex items-center gap-2 mt-4">
              <Target className="w-4 h-4 text-emerald-600" />
              <CustomSelect
                value={queue}
                onValueChange={setQueue}
                options={['High Priority Investigation', 'Medium Priority Review', 'Low Priority Queue']}
                className="border-emerald-200 hover:border-emerald-400 transition-colors"
                size="sm"
              />
            </div>

            <Button
              onClick={handleSimulate}
              className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Run Simulation
            </Button>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};