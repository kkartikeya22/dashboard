import { FC } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { AlertTriangle, Clock, User, ArrowRight, Shield, Calendar, Edit2 } from 'lucide-react';
import { Rule } from './RulesPage';

interface RuleDetailArtifactProps {
  rule: Rule;
}

export const RuleDetailArtifact: FC<RuleDetailArtifactProps> = ({ rule }) => {
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30 rounded-2xl shadow-sm">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-3 group">
            <Shield className="w-5 h-5 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              {rule.name}
            </h2>
          </div>
          <p className="text-gray-600 pl-8 leading-relaxed text-sm">{rule.description}</p>
        </div>
        <div className={`px-3 py-1.5 rounded-lg font-medium text-sm shadow-sm transition-all duration-300 hover:scale-105 ${
          rule.riskLevel === 'severe' ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-700' :
          rule.riskLevel === 'high' ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700' :
          'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700'
        }`}>
          {rule.riskLevel.toUpperCase()}
        </div>
      </div>

      <CustomCard className="p-5 hover:shadow-lg transition-all duration-500 bg-white/90 hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/50">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-600">
              <Calendar className="w-4 h-4" />
              <p className="font-medium text-sm">Created</p>
            </div>
            <p className="pl-6 text-gray-700 text-sm">{new Date(rule.dateCreated).toLocaleDateString()}</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-600">
              <Edit2 className="w-4 h-4" />
              <p className="font-medium text-sm">Last Modified</p>
            </div>
            <p className="pl-6 text-gray-700 text-sm">{new Date(rule.dateModified).toLocaleDateString()}</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-600">
              <Shield className="w-4 h-4" />
              <p className="font-medium text-sm">Category</p>
            </div>
            <p className="pl-6 text-gray-700 text-sm">{rule.category}</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-600">
              <User className="w-4 h-4" />
              <p className="font-medium text-sm">Author</p>
            </div>
            <p className="pl-6 text-gray-700 text-sm">{rule.author}</p>
          </div>
        </div>
      </CustomCard>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-indigo-600" />
          <h3 className="text-base font-semibold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Rule Conditions
          </h3>
        </div>
        <CustomCard className="p-5 bg-white/90 hover:shadow-lg transition-all duration-500 hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/50">
          <div className="space-y-2.5">
            {rule.conditions.map((condition, index) => (
              <div key={index} className="flex items-center gap-3">
                {index > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 rounded font-medium">
                    AND
                  </span>
                )}
                <div className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-lg text-gray-700 text-sm hover:from-gray-100 hover:to-indigo-100/30 transition-colors duration-300">
                  {condition}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-indigo-100">
              <ArrowRight className="w-4 h-4 text-indigo-600" />
              <div className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-lg text-sm font-medium hover:from-indigo-100 hover:to-purple-100 transition-colors duration-300">
                Route to {rule.queue}
              </div>
            </div>
          </div>
        </CustomCard>
      </div>
    </div>
  );
};