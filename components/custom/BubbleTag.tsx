import { FC, ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface BubbleTagProps {
  hasInsideNumber?: boolean;
  hasOutsideIcon?: boolean;
  icon?: ReactNode;
  number?: number;
  text: string;
  color: 'red' | 'green' | 'blue' | 'yellow' | 'orange' | 'gray';
}

export const BubbleTag: FC<BubbleTagProps> = ({
  hasInsideNumber = false,
  hasOutsideIcon = false,
  icon,
  number,
  text,
  color
}) => {
  const colorMap = {
    red: 'bg-red-100 text-red-700',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    orange: 'bg-orange-100 text-orange-700',
    gray: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="flex items-center gap-1.5">
      {hasOutsideIcon && icon && (
        <span className={cn("flex-shrink-0", `text-${color}-700`)}>{icon}</span>
      )}
      <span className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
        colorMap[color]
      )}>
        {hasInsideNumber && number !== undefined && (
          <span>{number}</span>
        )}
        <span>{text}</span>
      </span>
    </div>
  );
};
