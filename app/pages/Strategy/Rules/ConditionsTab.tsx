import { FC, useState } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { CustomSelect } from '@/components/custom/CustomSelect';
import { AlertTriangle, Clock, FileText, Shield, Activity, AlertCircle } from 'lucide-react';
import { Rule } from './RulesPage';
import { RuleDetailArtifact } from './RuleDetailArtifact';

export const ruleCategories = [
  'All Rules',
  'Account Takeover',
  'Identity Theft', 
  'Transaction Laundering',
  'Synthetic Identity',
  'First Party Fraud'
] as const;

type RuleCategory = typeof ruleCategories[number];

type CategoryColors = {
  [K in Exclude<RuleCategory, 'All Rules'>]: string;
};

const categoryColors: CategoryColors = {
  'Account Takeover': 'bg-purple-50 text-purple-700',
  'Identity Theft': 'bg-blue-50 text-blue-700',
  'Transaction Laundering': 'bg-emerald-50 text-emerald-700',
  'Synthetic Identity': 'bg-pink-50 text-pink-700',
  'First Party Fraud': 'bg-cyan-50 text-cyan-700'
};

export const someRules: Rule[] = [
  {
    id: 'ATO01',
    name: 'Profile Changes with High Txn',
    description: 'Detects suspicious activity based on rapid changes in user profile combined with high-value transactions',
    dateCreated: '2024-01-15',
    dateModified: '2024-03-10',
    riskLevel: 'severe',
    category: 'Account Takeover',
    conditions: ['dpc≤7', 'dac≤7', 'txn≥500k'],
    queue: 'High Priority',
    triggerCount: 156,
    author: 'Risk Team'
  },
  {
    id: 'IDT01',
    name: 'Multiple Account Creation Pattern',
    description: 'Identifies potential identity theft through multiple account creation attempts',
    dateCreated: '2024-02-05',
    dateModified: '2024-03-15',
    riskLevel: 'severe',
    category: 'Identity Theft',
    conditions: ['acc_24h≥3', 'same_dev=true'],
    queue: 'High Priority',
    triggerCount: 89,
    author: 'Risk Team'
  },
  {
    id: 'TXL01',
    name: 'Merchant Category Code Mismatch',
    description: 'Detects transaction laundering through MCC code mismatches',
    dateCreated: '2024-01-20',
    dateModified: '2024-03-12',
    riskLevel: 'high',
    category: 'Transaction Laundering',
    conditions: ['mcc_match=false', 'vol_30d≥1M'],
    queue: 'High Priority',
    triggerCount: 234,
    author: 'Risk Team'
  },
  {
    id: 'SYN01',
    name: 'Synthetic Identity Pattern',
    description: 'Identifies potentially synthetic identities through correlation',
    dateCreated: '2024-02-10',
    dateModified: '2024-03-14',
    riskLevel: 'severe',
    category: 'Synthetic Identity',
    conditions: ['ssn_age≤90', 'credit_inq≥5'],
    queue: 'High Priority',
    triggerCount: 167,
    author: 'Risk Team'
  },
  {
    id: 'FPF01',
    name: 'First Party Fraud Indicators',
    description: 'Detects potential first party fraud through patterns',
    dateCreated: '2024-01-25',
    dateModified: '2024-03-13',
    riskLevel: 'high',
    category: 'First Party Fraud',
    conditions: ['spend_vel≥0.9', 'return_rate≥0.4'],
    queue: 'High Priority',
    triggerCount: 145,
    author: 'Risk Team'
  }
];

export const ConditionsTab: FC = () => {
  const { setArtifact } = useWorkspace();
  const [selectedCategory, setSelectedCategory] = useState<RuleCategory>('All Rules');

  const handleRuleClick = (rule: Rule) => {
    setArtifact({
      id: rule.id,
      title: rule.name,
      renderArtifact: () => <RuleDetailArtifact rule={rule} />
    });
  };

  const handleCategoryChange = (value: string) => {
    if (ruleCategories.includes(value as RuleCategory)) {
      setSelectedCategory(value as RuleCategory);
    }
  };

  const filteredRules = selectedCategory === 'All Rules' 
    ? someRules 
    : someRules.filter(rule => rule.category === selectedCategory);

  const getCategoryColor = (category: Exclude<RuleCategory, 'All Rules'>) => {
    return categoryColors[category] || 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="space-y-4 p-4 max-w-6xl mx-auto bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Rule Conditions
          </h2>
        </div>
        <CustomSelect
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          options={ruleCategories}
          size="sm"
          className="border-purple-200 hover:border-purple-400 transition-colors"
        />
      </div>
      
      <div className="space-y-3">
        {filteredRules.map(rule => (
          <CustomCard 
            key={rule.id}
            className="p-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] border border-gray-100 bg-white/80 backdrop-blur-sm"
            onClick={() => handleRuleClick(rule)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <AlertCircle className={`w-4 h-4 ${
                  rule.riskLevel === 'severe' ? 'text-red-500' :
                  rule.riskLevel === 'high' ? 'text-orange-500' :
                  'text-yellow-500'
                }`} />
                <span className="text-sm font-mono bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {rule.id}
                </span>
                <span className="text-sm font-medium text-gray-700">{rule.name}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(rule.category as Exclude<RuleCategory, 'All Rules'>)}`}>
                {rule.category}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600 line-clamp-1">
              {rule.description}
            </div>
            <div className="flex justify-between items-center mt-3 text-xs">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>{new Date(rule.dateCreated).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {rule.conditions.map((condition, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 
                             rounded text-xs font-mono hover:from-purple-100 hover:to-pink-100 
                             transition-colors border border-purple-100"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </CustomCard>
        ))}
      </div>
    </div>
  );
};