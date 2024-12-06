import { FC } from 'react';
import { Workspace } from '@/app/layout/Workspace/Workspace';
import { CustomCard } from '@/components/custom/CustomCard';

export default function AlertsPage() {
  const tabs = [
    {
      id: 'configuration',
      label: 'Configuration',
      content: <AlertConfiguration />
    },
    {
      id: 'history',
      label: 'Alert History',
      content: <AlertHistory />
    }
  ];

  return <Workspace tabs={tabs} />;
}

const AlertConfiguration: FC = () => {
  return (
    <div className="space-y-4">
      <CustomCard className="p-4">
        <h3 className="text-lg font-semibold mb-4">Alert Configuration</h3>
        <div className="text-sm text-gray-500">
          Configure alert rules and notification settings
        </div>
      </CustomCard>
    </div>
  );
};

const AlertHistory: FC = () => {
  return (
    <div className="space-y-4">
      <CustomCard className="p-4">
        <h3 className="text-lg font-semibold mb-4">Alert History</h3>
        <div className="text-sm text-gray-500">
          View and analyze historical alerts
        </div>
      </CustomCard>
    </div>
  );
}; 