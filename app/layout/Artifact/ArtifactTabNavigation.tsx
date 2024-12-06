import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TabNavigationProps {
  canGoBack: boolean | undefined;
  canGoForward: boolean | undefined;
  onNavigate: (direction: 'back' | 'forward') => void;
}

export function TabNavigation({ canGoBack, canGoForward, onNavigate }: TabNavigationProps) {
  return (
    <div className="flex items-center px-1 space-x-0.5">
      <button
        onClick={() => onNavigate('back')}
        disabled={!canGoBack}
        className={`p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronLeft className="w-4 h-4 text-gray-500" />
      </button>
      <button
        onClick={() => onNavigate('forward')}
        disabled={!canGoForward}
        className={`p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
} 