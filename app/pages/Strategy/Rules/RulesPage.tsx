import { FC, useState } from 'react';
import { Workspace } from '@/app/layout/Workspace/Workspace';
import { ConditionsTab } from './ConditionsTab';
import { PerformanceTab } from './PerformanceTab';
import { SimulationTab } from './SimulationTab';
import { FeatureEngineeringTab } from './FeatureEngineeringTab';
import { Shield, Activity, LineChart, Cpu } from 'lucide-react';

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
  status?: 'active' | 'inactive' | 'draft';
  lastTriggered?: string;
  avgResponseTime?: number;
}

export interface RulePerformance {
  ruleId: string;
  ruleName: string;
  category: string;
  metrics: {
    [period: string]: {
      triggers: number;
      fraudRate: number;
      falsePositives: number;
      avgProcessingTime: number;
      riskScore: number;
    };
  };
}

export interface SimulationResult {
  totalAccounts: number;
  fraudAccounts: number;
  precision: number;
  recall: number;
  f1Score: number;
  monthlyStats: {
    month: string;
    triggers: number;
    fraudCaught: number;
    precision: number;
    costSavings: number;
  }[];
}

export interface FeaturePerformance {
  bucket: string;
  accountCount: number;
  fraudCount: number;
  fraudRate: number;
  importance: number;
  correlation: number;
  stabilityIndex: number;
}

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState('conditions');

  const tabs = [
    {
      id: 'conditions',
      label: 'Conditions',
      icon: <Shield className="w-5 h-5" />,
      content: <ConditionsTab />,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'performance',
      label: 'Performance', 
      icon: <Activity className="w-5 h-5" />,
      content: <PerformanceTab />,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'simulation',
      label: 'Simulation',
      icon: <LineChart className="w-5 h-5" />,
      content: <SimulationTab />,
      color: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'feature-engineering',
      label: 'Feature Engineering',
      icon: <Cpu className="w-5 h-5" />,
      content: <FeatureEngineeringTab />,
      color: 'from-amber-600 to-orange-600'
    }
  ].map(tab => ({
    ...tab,
    className: `
      flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
      ${activeTab === tab.id ? 
        `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105` :
        'text-gray-600 hover:bg-gray-50 hover:scale-102'
      }
    `
  }));

  return <Workspace tabs={tabs} onTabChange={setActiveTab} activeTab={activeTab} />;
}