import { FC, useState } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { CustomSelect } from '@/components/custom/CustomSelect';
import { AlertTriangle, Clock, FileText } from 'lucide-react';
import { Rule } from './RulesPage';
import { RuleDetailArtifact } from './RuleDetailArtifact';

export const ruleCategories = [
  'Account Takeover',
  'Identity Theft',
  'Transaction Laundering',
  'Synthetic Identity',
  'First Party Fraud'
] as const;

type RuleCategory = typeof ruleCategories[number];

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
    id: 'ATO02',
    name: 'Multiple Failed Login Attempts',
    description: 'Identifies brute force attempts through failed login patterns',
    dateCreated: '2024-02-01',
    dateModified: '2024-03-12',
    riskLevel: 'high',
    category: 'Account Takeover',
    conditions: ['fl_24h≥5', 'ip_ch=true'],
    queue: 'High Priority',
    triggerCount: 234,
    author: 'Risk Team'
  },
  {
    id: 'ATO03',
    name: 'Device Anomaly Pattern',
    description: 'Detects suspicious access patterns across multiple devices',
    dateCreated: '2024-02-15',
    dateModified: '2024-03-11',
    riskLevel: 'severe',
    category: 'Account Takeover',
    conditions: ['new_dev=true', 'dev_cnt_7d≥3'],
    queue: 'Medium Priority',
    triggerCount: 89,
    author: 'Risk Team'
  },
  {
    id: 'ATO04',
    name: 'Suspicious Location Access',
    description: 'Identifies access from unusual or high-risk locations',
    dateCreated: '2024-01-20',
    dateModified: '2024-03-09',
    riskLevel: 'high',
    category: 'Account Takeover',
    conditions: ['risk_loc=true', 'dist_prev≥500'],
    queue: 'High Priority',
    triggerCount: 167,
    author: 'Risk Team'
  },
  {
    id: 'ATO05',
    name: 'Password Reset Abuse',
    description: 'Detects suspicious patterns in password reset attempts',
    dateCreated: '2024-02-10',
    dateModified: '2024-03-08',
    riskLevel: 'medium',
    category: 'Account Takeover',
    conditions: ['pr_24h≥3', 'em_ch=true'],
    queue: 'Medium Priority',
    triggerCount: 45,
    author: 'Risk Team'
  },
  {
    id: 'ATO06',
    name: 'Session Hijacking Pattern',
    description: 'Identifies potential session hijacking attempts',
    dateCreated: '2024-01-25',
    dateModified: '2024-03-13',
    riskLevel: 'severe',
    category: 'Account Takeover',
    conditions: ['ua_ch=true', 'cook_mis=true'],
    queue: 'High Priority',
    triggerCount: 78,
    author: 'Risk Team'
  },
  {
    id: 'ATO07',
    name: 'Behavioral Anomaly Detection',
    description: 'Identifies unusual user behavior patterns compared to historical baseline',
    dateCreated: '2024-02-20',
    dateModified: '2024-03-14',
    riskLevel: 'high',
    category: 'Account Takeover',
    conditions: ['beh_score≥0.8', 'act_age≥90'],
    queue: 'High Priority',
    triggerCount: 143,
    author: 'Risk Team'
  },
  {
    id: 'ATO08',
    name: 'Credential Stuffing Pattern',
    description: 'Detects potential automated credential stuffing attempts',
    dateCreated: '2024-02-25',
    dateModified: '2024-03-13',
    riskLevel: 'severe',
    category: 'Account Takeover',
    conditions: ['login_vel_1h≥10', 'ip_rep=bad'],
    queue: 'High Priority',
    triggerCount: 267,
    author: 'Risk Team'
  },
  {
    id: 'ATO09',
    name: 'Account Recovery Abuse',
    description: 'Identifies suspicious patterns in account recovery attempts',
    dateCreated: '2024-03-01',
    dateModified: '2024-03-15',
    riskLevel: 'medium',
    category: 'Account Takeover',
    conditions: ['rec_att_24h≥3', 'ph_ch=true'],
    queue: 'Medium Priority',
    triggerCount: 92,
    author: 'Risk Team'
  }
];

export const ConditionsTab: FC = () => {
  const { setArtifact } = useWorkspace();
  const [selectedCategory, setSelectedCategory] = useState<RuleCategory>(ruleCategories[0]);

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

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Rule Conditions</h2>
        <CustomSelect
          value={selectedCategory}
          onValueChange={handleCategoryChange}
          options={ruleCategories}
          size="sm"
        />
      </div>
      
      <div className="space-y-4">
        {someRules
          .filter(rule => rule.category === selectedCategory)
          .map(rule => (
            <CustomCard 
              key={rule.id}
              className="p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => handleRuleClick(rule)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{rule.id}</span>
                  <span className="text-sm">{rule.name}</span>
                </div>
                <div className={`px-2 py-0.5 rounded text-xs ${
                  rule.riskLevel === 'severe' ? 'bg-red-100 text-red-700' :
                  rule.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {rule.riskLevel.toUpperCase()}
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>Created {new Date(rule.dateCreated).toLocaleDateString()}</span>
                <span>Modified {new Date(rule.dateModified).toLocaleDateString()}</span>
              </div>
            </CustomCard>
          ))}
      </div>
    </div>
  );
}; 