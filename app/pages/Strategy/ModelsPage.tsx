import { FC } from 'react';
import { Workspace } from '@/app/layout/Workspace/Workspace';
import { CustomCard } from '@/components/custom/CustomCard';
import { Brain, Cpu, Activity, BarChart, GitBranch, Database } from 'lucide-react';

export default function ModelsPage() {
  const tabs = [
    {
      id: 'deployed',
      label: 'Deployed Models',
      icon: <Cpu className="w-5 h-5" />,
      content: <DeployedModels />,
      color: 'from-indigo-600 to-violet-600'
    },
    {
      id: 'training',
      label: 'Training',
      icon: <Brain className="w-5 h-5" />,
      content: <TrainingModels />,
      color: 'from-fuchsia-600 to-pink-600'
    }
  ];

  return <Workspace tabs={tabs} />;
}

const DeployedModels: FC = () => {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50/30 via-violet-50/30 to-white">
      <div className="flex items-center gap-3 mb-6">
        <Cpu className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Deployed Models
        </h2>
      </div>

      <CustomCard className="p-6 space-y-4 bg-white/80 backdrop-blur-sm border border-indigo-100 transition-all duration-300 hover:shadow-lg">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-indigo-100 bg-indigo-50/50 transition-all duration-300 hover:shadow-md hover:scale-[1.01] hover:bg-indigo-50">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h4 className="font-medium text-indigo-700">Model Performance</h4>
            </div>
            <p className="text-sm text-indigo-600">Monitor real-time model metrics and performance indicators</p>
          </div>

          <div className="p-4 rounded-lg border border-violet-100 bg-violet-50/50 transition-all duration-300 hover:shadow-md hover:scale-[1.01] hover:bg-violet-50">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-violet-600" />
              <h4 className="font-medium text-violet-700">Model Registry</h4>
            </div>
            <p className="text-sm text-violet-600">Manage and version your production ML models</p>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

const TrainingModels: FC = () => {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-fuchsia-50/30 via-pink-50/30 to-white">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-fuchsia-600" />
        <h2 className="text-xl font-semibold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
          Model Training
        </h2>
      </div>

      <CustomCard className="p-6 space-y-4 bg-white/80 backdrop-blur-sm border border-fuchsia-100 transition-all duration-300 hover:shadow-lg">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border border-fuchsia-100 bg-fuchsia-50/50 transition-all duration-300 hover:shadow-md hover:scale-[1.01] hover:bg-fuchsia-50">
            <div className="flex items-center gap-2 mb-3">
              <BarChart className="w-5 h-5 text-fuchsia-600" />
              <h4 className="font-medium text-fuchsia-700">Training Progress</h4>
            </div>
            <p className="text-sm text-fuchsia-600">Monitor training metrics and validation results in real-time</p>
          </div>

          <div className="p-4 rounded-lg border border-pink-100 bg-pink-50/50 transition-all duration-300 hover:shadow-md hover:scale-[1.01] hover:bg-pink-50">
            <div className="flex items-center gap-2 mb-3">
              <GitBranch className="w-5 h-5 text-pink-600" />
              <h4 className="font-medium text-pink-700">Experiment Tracking</h4>
            </div>
            <p className="text-sm text-pink-600">Compare different model versions and hyperparameters</p>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};