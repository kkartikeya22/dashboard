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
  <CustomCard className="p-4 space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gray-50 rounded-lg">
          {icon}
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Share2 className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-600">{connectionCount}</span>
      </div>
    </div>
    <div className="space-y-2">
      {details.map((detail, index) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{detail.label}</span>
          <span className="font-medium">{detail.value}</span>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${
        riskLevel === 'high' ? 'bg-red-500' :
        riskLevel === 'medium' ? 'bg-yellow-500' :
        'bg-green-500'
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
      icon: <Building2 className="h-5 w-5 text-blue-500" />,
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
      icon: <CreditCard className="h-5 w-5 text-purple-500" />,
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
      icon: <Users className="h-5 w-5 text-green-500" />,
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
      icon: <Phone className="h-4 w-4" />,
      value: '+91 98765 43210',
      sharedWith: ['TechServe Solutions', 'Digital Payments Ltd'],
    },
    {
      type: 'Email Domain',
      icon: <Mail className="h-4 w-4" />,
      value: '@techserve.com',
      sharedWith: ['TechServe Solutions', 'Digital Payments Ltd'],
    },
    {
      type: 'Address',
      icon: <MapPin className="h-4 w-4" />,
      value: '123 Business Park, Bangalore',
      sharedWith: ['TechServe Solutions', 'Digital Payments Ltd', 'Rahul Sharma'],
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Network Overview */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Network Overview</h3>
        <CustomCard className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Network className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Connected Entity Network</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold text-blue-600">8</p>
              <p className="text-sm text-gray-500">Connected Entities</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-yellow-600">4</p>
              <p className="text-sm text-gray-500">High Risk Connections</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-purple-600">65%</p>
              <p className="text-sm text-gray-500">Network Risk Score</p>
            </div>
          </div>
        </CustomCard>
      </div>

      {/* Linked Entities */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Linked Entities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {linkedEntities.map((entity, index) => (
            <EntityCard key={index} {...entity} />
          ))}
        </div>
      </div>

      {/* Common Connections */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Common Connections</h3>
        <CustomCard className="divide-y">
          {commonConnections.map((connection, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-gray-50 rounded">
                  {connection.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{connection.type}</p>
                  <p className="text-sm text-gray-600">{connection.value}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {connection.sharedWith.map((entity, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
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