import { FC } from 'react';
import { Workspace } from '@/app/layout/Workspace/Workspace';
import { ConditionsTab } from './ConditionsTab';
import { PerformanceTab } from './PerformanceTab';
import { SimulationTab } from './SimulationTab';
import { FeatureEngineeringTab } from './FeatureEngineeringTab';

export interface Rule {
  id: string;
  name: string;
  description: string;
  dateCreated: string;
  dateModified: string;
  riskLevel: 'low' | 'medium' | 'high' | 'severe';
  category: string;
  conditions: string[];
  queue: string;
  triggerCount: number;
  author: string;
}

export interface RulePerformance {
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

export interface SimulationResult {
  totalAccounts: number;
  fraudAccounts: number;
  precision: number;
  recall: number;
  monthlyStats: {
    month: string;
    triggers: number;
    fraudCaught: number;
    precision: number;
  }[];
}

export interface FeaturePerformance {
  bucket: string;
  accountCount: number;
  fraudCount: number;
  fraudRate: number;
}

export default function RulesPage() {
  const tabs = [
    {
      id: 'conditions',
      label: 'Conditions',
      content: <ConditionsTab />
    },
    {
      id: 'performance',
      label: 'Performance',
      content: <PerformanceTab />
    },
    {
      id: 'simulation',
      label: 'Simulation',
      content: <SimulationTab />
    },
    {
      id: 'feature-engineering',
      label: 'Feature Engineering',
      content: <FeatureEngineeringTab />
    }
  ];

  return <Workspace tabs={tabs} />;
} 