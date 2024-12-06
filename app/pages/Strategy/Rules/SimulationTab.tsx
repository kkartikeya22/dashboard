import { FC, useState } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { CustomSelect } from '@/components/custom/CustomSelect';
import { CustomInput } from '@/components/custom/CustomInput';
import { Button } from '@/components/ui/button';
import { Plus, X, Play, ArrowRight } from 'lucide-react';
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
  'return_rate_30d'
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
      monthlyStats: [
        {
          month: '2024-01',
          triggers: 320,
          fraudCaught: 250,
          precision: 0.78
        },
        {
          month: '2024-02',
          triggers: 380,
          fraudCaught: 295,
          precision: 0.77
        },
        {
          month: '2024-03',
          triggers: 420,
          fraudCaught: 330,
          precision: 0.79
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
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4">
        <div className="grid gap-4 max-w-2xl">
          <CustomInput
            label="Rule Name"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
          />
          
          {conditions.map((condition, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1 grid grid-cols-3 gap-2">
                <CustomSelect
                  value={condition.field}
                  onValueChange={(value) => handleConditionChange(index, 'field', value)}
                  options={availableFields}
                  className="w-64"
                  size="sm"
                />
                <CustomSelect
                  value={condition.operator}
                  onValueChange={(value) => handleConditionChange(index, 'operator', value)}
                  options={operators}
                  className="w-24"
                  size="sm"
                />
                <CustomInput
                  value={condition.value}
                  onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                  placeholder="Value"
                  inputSize="xs"
                  className="w-48"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCondition(index)}
                disabled={conditions.length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
              {index === conditions.length - 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAddCondition}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          {/* Add condition button */}
          {/* Queue selection */}
          {/* Simulate button */}
        </div>
      </div>
    </div>
  );
}; 