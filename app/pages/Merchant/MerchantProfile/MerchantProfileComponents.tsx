import { FC } from 'react';
import { LucideIcon } from 'lucide-react';
import { CheckCircle2, XCircle, AlertCircle, AlertTriangle } from 'lucide-react';

export const InfoItem = ({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: LucideIcon; 
  label: string; 
  value: string; 
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
    <div className="shrink-0 mt-0.5">
      <Icon className="w-5 h-5 text-gray-500" />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-medium text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  </div>
);

export const DocumentStatus = ({ status }: { status: string }) => {
  const config = {
    verified: { icon: CheckCircle2, color: 'text-green-500', text: 'Verified' },
    pending: { icon: AlertCircle, color: 'text-yellow-500', text: 'Pending' },
    rejected: { icon: XCircle, color: 'text-red-500', text: 'Rejected' }
  }[status] || { icon: AlertTriangle, color: 'text-gray-500', text: status };

  const Icon = config.icon;
  
  return (
    <div className={`flex items-center gap-1 ${config.color}`}>
      <Icon className="w-4 h-4" />
      <span className="text-sm">{config.text}</span>
    </div>
  );
};

export const RiskIndicator = ({ score }: { score: number }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full ${
          score >= 80 ? 'bg-red-500' : 
          score >= 50 ? 'bg-yellow-500' : 
          'bg-green-500'
        }`}
        style={{ width: `${score}%` }}
      />
    </div>
    <span className={`text-sm font-medium ${
      score >= 80 ? 'text-red-500' : 
      score >= 50 ? 'text-yellow-500' : 
      'text-green-500'
    }`}>
      {score}
    </span>
  </div>
); 