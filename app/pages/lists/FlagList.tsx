import { Activity, Shield, Network, AlertTriangle } from "lucide-react";
import { AccordionList } from '@/components/custom/AccordionList';
import { StandardListItemProps } from '@/components/custom/StandardList';
import { FC } from 'react';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { BubbleTag } from '@/components/custom/BubbleTag';
import { formatTimestamp } from '@/utils/timeFormat';

interface FlagItemProps {
  flag: {
    severity: string;
    text: string;
    timestamp: string;
  };
}

const FlagItem = ({ flag }: FlagItemProps) => {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'red' as const,
          text: 'Critical'
        };
      case 'high':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'orange' as const,
          text: 'High'
        };
      case 'medium':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'yellow' as const,
          text: 'Medium'
        };
      default:
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'gray' as const,
          text: 'Low'
        };
    }
  };

  const config = getSeverityConfig(flag.severity);

  return (
    <div className="flex items-center gap-3 p-2 rounded-md">
      <BubbleTag
        hasOutsideIcon
        icon={config.icon}
        text={config.text}
        color={config.color}
      />
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-900">{flag.text}</p>
          <p className="text-xs text-gray-500">{formatTimestamp(flag.timestamp, 'relative')}</p>
        </div>
      </div>
    </div>
  );
};

const FlagArtifact: FC<FlagItemProps> = ({ flag }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-700';
      case 'high':
        return 'text-orange-700';
      case 'medium':
        return 'text-yellow-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Flag Details</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Severity</p>
          <p className={`text-sm capitalize ${getSeverityColor(flag.severity)}`}>
            {flag.severity}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-sm">{flag.text}</p>
        </div>
      </div>
    </div>
  );
};

const flagData = {
  transactions: [
    { severity: 'critical', text: '80% transactions between 1-4 AM', timestamp: '2024-03-15T14:30:00' },
    { severity: 'critical', text: 'Average transaction (₹70k) inconsistent with business', timestamp: '2024-03-15T12:15:00' },
    { severity: 'high', text: '80% transaction concentration with same customers', timestamp: '2024-03-15T10:45:00' },
  ],
  compliance: [
    { severity: 'critical', text: 'No GST despite ₹25 Cr processing', timestamp: '2024-03-15T09:30:00' },
    { severity: 'high', text: 'Revenue mismatch: MCA vs Actual', timestamp: '2024-03-15T08:15:00' },
    { severity: 'high', text: 'Missing EPFO registration', timestamp: '2024-03-15T07:45:00' },
  ],
  network: [
    { severity: 'high', text: 'Circular flow patterns detected', timestamp: '2024-03-14T23:30:00' },
    { severity: 'medium', text: 'Device ID linked to 50% transactions', timestamp: '2024-03-14T22:15:00' },
    { severity: 'medium', text: 'Connected to other flagged accounts', timestamp: '2024-03-14T21:45:00' },
  ]
};

interface FlagListProps {
  openAccordions: string[];
  setOpenAccordions: (value: string[]) => void;
}

export const FlagList = ({ openAccordions, setOpenAccordions }: FlagListProps) => {
  const { setArtifact } = useWorkspace();

  const handleItemClick = (item: StandardListItemProps) => {
    setArtifact({
      ...item.metadata,
      id: item.id,
      title: item.title
    });
  };

    const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'red' as const,
          text: 'Critical'
        };
      case 'high':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'orange' as const,
          text: 'High'
        };
      case 'medium':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'yellow' as const,
          text: 'Medium'
        };
      default:
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'gray' as const,
          text: 'Low'
        };
    }
  };

  const getFlagCounts = (flags: Array<{ severity: string }>) => {
    const counts = flags.reduce((acc, flag) => {
      acc[flag.severity] = (acc[flag.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return (
      <div className="flex gap-2">
        {Object.entries(counts).map(([severity, count]) => {
          const config = getSeverityConfig(severity);
          return (
            <BubbleTag
              key={severity}
              hasInsideNumber
              number={count}
              text={config.text}
              color={config.color}
            />
          );
        })}
      </div>
    );
  };

  const convertToStandardListItems = (flags: typeof flagData.transactions): StandardListItemProps[] => {
    return flags.map((flag, index) => ({
      id: `${index}`,
      title: flag.text,
      content: <FlagItem flag={flag} />,
      metadata: {
        ...flag,
        renderArtifact: () => <FlagArtifact flag={flag} />
      }
    }));
  };

  const sections = [
    {
      id: 'transactions',
      label: 'Transaction Patterns',
      icon: Activity,
      items: convertToStandardListItems(flagData.transactions),
      badges: getFlagCounts(flagData.transactions),
      onItemClick: handleItemClick
    },
    {
      id: 'compliance',
      label: 'Compliance Issues',
      icon: Shield,
      items: convertToStandardListItems(flagData.compliance),
      badges: getFlagCounts(flagData.compliance),
      onItemClick: handleItemClick
    },
    {
      id: 'network',
      label: 'Network Analysis',
      icon: Network,
      items: convertToStandardListItems(flagData.network),
      badges: getFlagCounts(flagData.network),
      onItemClick: handleItemClick
    }
  ];

  return (
    <AccordionList 
      sections={sections}
      openSections={openAccordions}
      setOpenSections={setOpenAccordions}
    />
  );
};