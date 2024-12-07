import { FC } from 'react';
import { LucideIcon } from 'lucide-react';
import { CheckCircle2, XCircle, AlertCircle, AlertTriangle } from 'lucide-react';

export const InfoItem = ({ 
  icon: Icon, 
  label, 
  value,
  className
}: { 
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={`flex items-start gap-3 p-4 rounded-lg border border-blue-100 bg-white/80 transition-all duration-300 hover:border-blue-200 hover:shadow-md hover:bg-blue-50/30 ${className}`}>
    <div className="shrink-0 mt-0.5 transition-transform duration-300 hover:scale-110">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div className="min-w-0 transition-all duration-300">
      <p className="text-sm font-medium text-gray-900 transition-colors duration-200 hover:text-blue-700">{value}</p>
      <p className="text-xs text-gray-500 transition-colors duration-200 hover:text-blue-600">{label}</p>
    </div>
  </div>
);

export const DocumentStatus = ({ status }: { status: string }) => {
  const config = {
    verified: { 
      icon: CheckCircle2, 
      color: 'text-emerald-500', 
      bgColor: 'bg-emerald-50',
      text: 'Verified',
      hoverColor: 'hover:text-emerald-600'
    },
    pending: { 
      icon: AlertCircle, 
      color: 'text-amber-500', 
      bgColor: 'bg-amber-50',
      text: 'Pending',
      hoverColor: 'hover:text-amber-600'
    },
    rejected: { 
      icon: XCircle, 
      color: 'text-rose-500', 
      bgColor: 'bg-rose-50',
      text: 'Rejected',
      hoverColor: 'hover:text-rose-600'
    }
  }[status] || { 
    icon: AlertTriangle, 
    color: 'text-gray-500', 
    bgColor: 'bg-gray-50',
    text: status,
    hoverColor: 'hover:text-gray-600'
  };

  const Icon = config.icon;
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bgColor} ${config.color} transition-all duration-300 hover:shadow-md hover:scale-105 ${config.hoverColor}`}>
      <Icon className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
      <span className="text-sm font-medium">{config.text}</span>
    </div>
  );
};

export const RiskIndicator = ({ score }: { score: number }) => {
  const getConfig = (score: number) => {
    if (score >= 80) return {
      color: 'bg-rose-500',
      textColor: 'text-rose-600',
      bgColor: 'bg-rose-100',
      hoverColor: 'hover:bg-rose-600'
    };
    if (score >= 50) return {
      color: 'bg-amber-500',
      textColor: 'text-amber-600', 
      bgColor: 'bg-amber-100',
      hoverColor: 'hover:bg-amber-600'
    };
    return {
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      hoverColor: 'hover:bg-emerald-600'
    };
  };

  const config = getConfig(score);

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:shadow-md">
      <div className={`flex-1 h-2.5 ${config.bgColor} rounded-full overflow-hidden transition-all duration-300 hover:h-3`}>
        <div 
          className={`h-full ${config.color} transition-all duration-500 ${config.hoverColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-sm font-semibold ${config.textColor} transition-all duration-300 hover:scale-110`}>
        {score}
      </span>
    </div>
  );
}; 