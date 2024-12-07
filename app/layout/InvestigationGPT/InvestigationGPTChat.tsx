import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatBubble } from "@/components/custom/ChatBubble"
import { useRef, useEffect } from "react"
import { LoadingMessage } from "@/components/custom/LoadingMessage"
import { cn } from "@/lib/utils"

interface Message {
  text: string
  isUser: boolean
}

interface InvestigationGPTChatProps {
  messages: Message[]
  isLoading?: boolean
}

export function InvestigationGPTChat({ messages, isLoading = false }: InvestigationGPTChatProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className={cn(
      "w-full",
      "h-[calc(100vh-200px)]", // Default for larger screens
      "sm:h-[calc(100vh-180px)]", // Slightly less space on tablets
      "xs:h-[calc(100vh-160px)]", // Even less on mobile
      "min-h-[300px]", // Ensure minimum height on very small screens
      "bg-gradient-to-br from-background via-secondary/20 to-primary/10" // Subtle gradient background
    )}>
      <ScrollArea ref={scrollAreaRef} className="h-full">
        <div className={cn(
          "flex flex-col",
          "gap-1 sm:gap-2 md:gap-3", // Increasing gaps for larger screens
          "p-2 sm:p-3 md:p-4 lg:p-6", // Responsive padding
          "max-w-3xl mx-auto", // Center content with max width
          "rounded-lg",
          "bg-gradient-to-br from-background/50 to-secondary/10", // Subtle inner gradient
          "shadow-lg shadow-primary/5", // Subtle glow effect
          "border border-primary/10" // Subtle border
        )}>
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
          {isLoading && <LoadingMessage />}
        </div>
      </ScrollArea>
    </div>
  );
}
