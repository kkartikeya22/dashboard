import { Workspace } from '@/app/layout/Workspace/Workspace';
import { OverviewTab } from './OverviewTab'
import { RiskTab } from './RiskTab';
import { RedFlagsTab } from './RedFlagsTab';
import { LinkagesTab } from './LinkagesTab';
import { DigitalFootprintTab } from './DigitalFootprintTab';

export default function InvestigationInsights() {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <OverviewTab />
    },
    {
      id: 'risk',
      label: 'Risk',
      content: <RiskTab />
    },
    {
      id: 'flags',
      label: 'Red Flags',
      content: <RedFlagsTab />
    },
    {
      id: 'linkages',
      label: 'Linkages',
      content: <LinkagesTab />
    },
    {
      id: 'digital-footprint',
      label: 'Digital Footprint',
      content: <DigitalFootprintTab />
    }
  ];

  return <Workspace tabs={tabs} />;
} 