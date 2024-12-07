import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TabNavigationProps {
  canGoBack: boolean | undefined;
  canGoForward: boolean | undefined;
  onNavigate: (direction: 'back' | 'forward') => void;
}

export function TabNavigation({ canGoBack, canGoForward, onNavigate }: TabNavigationProps) {
  return (
    <ScrollArea className="max-h-[calc(100vh-4rem)]" type="hover">
      <div className="flex items-center space-x-0.5 px-0.5 sm:px-1 md:px-1.5 lg:px-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onNavigate('back')}
                disabled={!canGoBack}
                className={`
                  p-0.5 sm:p-1 md:p-1.5
                  rounded
                  hover:bg-primary/10
                  disabled:opacity-50 
                  disabled:cursor-not-allowed
                  transition-all duration-200
                `}
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary/60" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go back</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onNavigate('forward')}
                disabled={!canGoForward}
                className={`
                  p-0.5 sm:p-1 md:p-1.5
                  rounded
                  hover:bg-primary/10
                  disabled:opacity-50 
                  disabled:cursor-not-allowed
                  transition-all duration-200
                `}
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary/60" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go forward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
}