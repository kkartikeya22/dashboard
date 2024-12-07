import { FC } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { Network, Share2, Users, Building2, CreditCard, Phone, Mail, MapPin } from 'lucide-react';

interface EntityCardProps {
  title: string;
  type: string;
  icon: React.ReactNode;
  details: {
    label: string;
    value: string;
  }[];
  connectionCount: number;
  riskLevel: 'high' | 'medium' | 'low';
}

const EntityCard: FC<EntityCardProps> = ({ title, type, icon, details, connectionCount, riskLevel }) => (
  <CustomCard className="p-4 space-y-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-blue-50 rounded-lg transition-transform duration-200 hover:scale-110">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{title}</h4>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 transition-colors duration-200 hover:text-blue-600">
        <Share2 className="h-4 w-4" />
        <span className="text-sm">{connectionCount}</span>
      </div>
    </div>
    <div className="space-y-2">
      {details.map((detail, index) => (
        <div key={index} className="flex items-center justify-between text-sm transition-all duration-200 hover:bg-blue-50/50 p-1 rounded">
          <span className="text-gray-600">{detail.label}</span>
          <span className="font-medium text-gray-800">{detail.value}</span>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
        riskLevel === 'high' ? 'bg-rose-500 animate-pulse' :
        riskLevel === 'medium' ? 'bg-amber-500' :
        'bg-emerald-500'
      }`} />
      <span className="text-xs text-gray-500 capitalize">{riskLevel} Risk</span>
    </div>
  </CustomCard>
);

export const LinkagesTab: FC = () => {
  const linkedEntities = [
    {
      title: 'TechServe Solutions',
      type: 'Parent Company',
      icon: <Building2 className="h-5 w-5 text-blue-600" />,
      details: [
        { label: 'Registration', value: 'U72200KA2020PTC123456' },
        { label: 'Location', value: 'Bangalore' },
        { label: 'Common Directors', value: '2' },
      ],
      connectionCount: 5,
      riskLevel: 'medium' as const,
    },
    {
      title: 'Digital Payments Ltd',
      type: 'Sister Concern',
      icon: <CreditCard className="h-5 w-5 text-indigo-600" />,
      details: [
        { label: 'Common Address', value: 'Yes' },
        { label: 'Shared Transactions', value: '45%' },
        { label: 'Business Match', value: '80%' },
      ],
      connectionCount: 3,
      riskLevel: 'high' as const,
    },
    {
      title: 'Rahul Sharma',
      type: 'Key Individual',
      icon: <Users className="h-5 w-5 text-emerald-600" />,
      details: [
        { label: 'Role', value: 'Director' },
        { label: 'Other Companies', value: '3' },
        { label: 'Active Since', value: '2020' },
      ],
      connectionCount: 4,
      riskLevel: 'low' as const,
    }
  ];

  const commonConnections = [
    {
      type: 'Phone',
      icon: <Phone className="h-4 w-4 text-blue-500" />,
      value: '+91 98765 43210',
      sharedWith: ['TechServe Solutions', 'Digital Payments Ltd'],
    },
    {
      type: 'Email Domain',
      icon: <Mail className="h-4 w-4 text-indigo-500" />,
      value: '@techserve.com',
      sharedWith: ['TechServe Solutions', 'Digital Payments Ltd'],
    },
    {
      type: 'Address',
      icon: <MapPin className="h-4 w-4 text-emerald-500" />,
      value: '123 Business Park, Bangalore',
      sharedWith: ['TechServe Solutions', 'Digital Payments Ltd', 'Rahul Sharma'],
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Network Overview */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Network Overview</h3>
        <CustomCard className="p-4 transition-all duration-300 hover:shadow-lg hover:border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
          <div className="flex items-center gap-2 mb-3">
            <Network className="h-5 w-5 text-blue-500 transition-transform duration-200 hover:scale-110" />
            <span className="font-medium text-gray-800">Connected Entity Network</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="transition-all duration-300 hover:scale-105 p-3 rounded-lg bg-gradient-to-br from-white to-blue-50">
              <p className="text-2xl font-semibold text-blue-600">8</p>
              <p className="text-sm text-gray-500">Connected Entities</p>
            </div>
            <div className="transition-all duration-300 hover:scale-105 p-3 rounded-lg bg-gradient-to-br from-white to-amber-50">
              <p className="text-2xl font-semibold text-amber-600">4</p>
              <p className="text-sm text-gray-500">High Risk Connections</p>
            </div>
            <div className="transition-all duration-300 hover:scale-105 p-3 rounded-lg bg-gradient-to-br from-white to-indigo-50">
              <p className="text-2xl font-semibold text-indigo-600">65%</p>
              <p className="text-sm text-gray-500">Network Risk Score</p>
            </div>
          </div>
        </CustomCard>
      </div>

      {/* Linked Entities */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Linked Entities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {linkedEntities.map((entity, index) => (
            <EntityCard key={index} {...entity} />
          ))}
        </div>
      </div>

      {/* Common Connections */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Common Connections</h3>
        <CustomCard className="divide-y divide-gray-100 bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
          {commonConnections.map((connection, index) => (
            <div key={index} className="p-4 transition-all duration-300 hover:bg-blue-50/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-blue-50 rounded transition-transform duration-200 hover:scale-110">
                  {connection.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{connection.type}</p>
                  <p className="text-sm text-gray-600">{connection.value}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {connection.sharedWith.map((entity, idx) => (
                  <span key={idx} className="text-xs bg-blue-50 px-2 py-1 rounded transition-all duration-200 hover:bg-blue-100 hover:shadow-sm">
                    {entity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </CustomCard>
      </div>
    </div>
  );
};