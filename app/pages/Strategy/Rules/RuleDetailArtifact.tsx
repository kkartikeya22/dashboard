import { FC } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { AlertTriangle, Clock, User, ArrowRight } from 'lucide-react';
import { Rule } from './RulesPage';

interface RuleDetailArtifactProps {
  rule: Rule;
}

export const RuleDetailArtifact: FC<RuleDetailArtifactProps> = ({ rule }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{rule.name}</h2>
          <p className="text-gray-500">{rule.description}</p>
        </div>
        <div className={`px-3 py-1.5 rounded text-sm ${
          rule.riskLevel === 'severe' ? 'bg-red-100 text-red-700' :
          rule.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {rule.riskLevel.toUpperCase()}
        </div>
      </div>

      <CustomCard className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Created</p>
            <p>{new Date(rule.dateCreated).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Last Modified</p>
            <p>{new Date(rule.dateModified).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Category</p>
            <p>{rule.category}</p>
          </div>
          <div>
            <p className="text-gray-500">Author</p>
            <p>{rule.author}</p>
          </div>
        </div>
      </CustomCard>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Rule Conditions</h3>
        <CustomCard className="p-4">
          <div className="space-y-2">
            {rule.conditions.map((condition, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-400">AND</span>}
                <div className="px-3 py-1.5 bg-gray-100 rounded">
                  {condition}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-4">
              <ArrowRight className="text-gray-400" />
              <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded">
                Route to {rule.queue}
              </div>
            </div>
          </div>
        </CustomCard>
      </div>
    </div>
  );
}; 