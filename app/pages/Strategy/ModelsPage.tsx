import { FC } from 'react';
import { Workspace } from '@/app/layout/Workspace/Workspace';
import { CustomCard } from '@/components/custom/CustomCard';

export default function ModelsPage() {
  const tabs = [
    {
      id: 'deployed',
      label: 'Deployed Models',
      content: <DeployedModels />
    },
    {
      id: 'training',
      label: 'Training',
      content: <TrainingModels />
    }
  ];

  return <Workspace tabs={tabs} />;
}

const DeployedModels: FC = () => {
  return (
    <div className="space-y-4">
      <CustomCard className="p-4">
        <h3 className="text-lg font-semibold mb-4">Deployed Models</h3>
        <div className="text-sm text-gray-500">
          Monitor and manage your deployed ML models
        </div>
      </CustomCard>
    </div>
  );
};

const TrainingModels: FC = () => {
  return (
    <div className="space-y-4">
      <CustomCard className="p-4">
        <h3 className="text-lg font-semibold mb-4">Training Models</h3>
        <div className="text-sm text-gray-500">
          Track model training progress and performance
        </div>
      </CustomCard>
    </div>
  );
}; 