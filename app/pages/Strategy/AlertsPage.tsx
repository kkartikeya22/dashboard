import { FC } from 'react';
import { Workspace } from '@/app/layout/Workspace/Workspace';
import { CustomCard } from '@/components/custom/CustomCard';
import { Bell, History, Settings, AlertTriangle } from 'lucide-react';

export default function AlertsPage() {
  const tabs = [
    {
      id: 'configuration',
      label: 'Configuration',
      icon: <Settings className="w-5 h-5" />,
      content: <AlertConfiguration />,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'history', 
      label: 'Alert History',
      icon: <History className="w-5 h-5" />,
      content: <AlertHistory />,
      color: 'from-blue-600 to-cyan-600'
    }
  ];

  return <Workspace tabs={tabs} />;
}

const AlertConfiguration: FC = () => {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-white">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Alert Configuration
        </h2>
      </div>

      <CustomCard className="p-6 space-y-4 bg-white/80 backdrop-blur-sm border border-purple-100 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-purple-900">Alert Rules</h3>
        </div>
        <div className="grid gap-4">
          <div className="p-4 rounded-lg border border-purple-100 bg-purple-50/50 transition-all duration-300 hover:shadow-md hover:scale-[1.01] hover:bg-purple-50">
            <h4 className="font-medium text-purple-700 mb-2">Notification Settings</h4>
            <p className="text-sm text-purple-600">Configure email, Slack and other notification channels</p>
          </div>
          <div className="p-4 rounded-lg border border-pink-100 bg-pink-50/50 transition-all duration-300 hover:shadow-md hover:scale-[1.01] hover:bg-pink-50">
            <h4 className="font-medium text-pink-700 mb-2">Alert Conditions</h4>
            <p className="text-sm text-pink-600">Set up triggering conditions and thresholds</p>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

const AlertHistory: FC = () => {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50/30 via-cyan-50/30 to-white">
      <div className="flex items-center gap-3 mb-6">
        <History className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Alert History
        </h2>
      </div>

      <CustomCard className="p-6 space-y-4 bg-white/80 backdrop-blur-sm border border-blue-100 transition-all duration-300 hover:shadow-lg">
        <div className="grid gap-4">
          <div className="p-4 rounded-lg border border-blue-100 bg-blue-50/50 transition-all duration-300 hover:shadow-md hover:scale-[1.01] hover:bg-blue-50">
            <h4 className="font-medium text-blue-700 mb-2">Recent Alerts</h4>
            <p className="text-sm text-blue-600">View alerts from the last 24 hours</p>
          </div>
          <div className="p-4 rounded-lg border border-cyan-100 bg-cyan-50/50 transition-all duration-300 hover:shadow-md hover:scale-[1.01] hover:bg-cyan-50">
            <h4 className="font-medium text-cyan-700 mb-2">Alert Analytics</h4>
            <p className="text-sm text-cyan-600">Analyze alert patterns and trends</p>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};