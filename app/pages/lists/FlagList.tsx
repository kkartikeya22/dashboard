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
          text: 'Critical',
          bgColor: 'bg-red-50',
          hoverBgColor: 'hover:bg-red-100',
          borderColor: 'border-red-200'
        };
      case 'high':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'orange' as const,
          text: 'High',
          bgColor: 'bg-orange-50',
          hoverBgColor: 'hover:bg-orange-100',
          borderColor: 'border-orange-200'
        };
      case 'medium':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'yellow' as const,
          text: 'Medium',
          bgColor: 'bg-yellow-50',
          hoverBgColor: 'hover:bg-yellow-100',
          borderColor: 'border-yellow-200'
        };
      default:
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'gray' as const,
          text: 'Low',
          bgColor: 'bg-gray-50',
          hoverBgColor: 'hover:bg-gray-100',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getSeverityConfig(flag.severity);

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${config.borderColor} ${config.bgColor} ${config.hoverBgColor} transition-all duration-200 ease-in-out transform hover:scale-[1.01] hover:shadow-sm`}>
      <BubbleTag
        hasOutsideIcon
        icon={config.icon}
        text={config.text}
        color={config.color}
      />
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200">{flag.text}</p>
          <p className="text-xs text-gray-500">{formatTimestamp(flag.timestamp, 'relative')}</p>
        </div>
      </div>
    </div>
  );
};

const FlagArtifact: FC<FlagItemProps> = ({ flag }) => {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'high':
        return {
          color: 'text-orange-700',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      case 'medium':
        return {
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      default:
        return {
          color: 'text-gray-700',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getSeverityConfig(flag.severity);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-gray-900">Flag Details</h2>
      </div>
      <div className={`grid grid-cols-2 gap-6 p-6 rounded-xl border ${config.borderColor} ${config.bgColor}`}>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Severity</p>
          <p className={`text-sm font-semibold capitalize ${config.color}`}>
            {flag.severity}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Description</p>
          <p className="text-sm text-gray-900">{flag.text}</p>
        </div>
      </div>
    </div>
  );
};

const flagData = {
  transactions: [
    { severity: 'critical', text: 'Unusual high-value transactions detected outside business hours (1-4 AM)', timestamp: '2024-03-15T14:30:00' },
    { severity: 'critical', text: 'Transaction volume (₹70k avg) significantly exceeds business profile', timestamp: '2024-03-15T12:15:00' },
    { severity: 'high', text: 'Suspicious concentration: 80% transactions with repeat counterparties', timestamp: '2024-03-15T10:45:00' },
  ],
  compliance: [
    { severity: 'critical', text: 'Missing GST registration despite ₹25 Cr annual processing volume', timestamp: '2024-03-15T09:30:00' },
    { severity: 'high', text: 'Significant revenue discrepancy between MCA filings and actual processing', timestamp: '2024-03-15T08:15:00' },
    { severity: 'high', text: 'Non-compliance: Missing mandatory EPFO registration for business size', timestamp: '2024-03-15T07:45:00' },
  ],
  network: [
    { severity: 'high', text: 'Complex circular transaction patterns identified across multiple accounts', timestamp: '2024-03-14T23:30:00' },
    { severity: 'medium', text: 'Single device ID associated with 50% of total transaction volume', timestamp: '2024-03-14T22:15:00' },
    { severity: 'medium', text: 'Network analysis reveals connections to previously flagged entities', timestamp: '2024-03-14T21:45:00' },
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