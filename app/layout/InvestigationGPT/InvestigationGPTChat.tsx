import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatBubble } from "@/components/custom/ChatBubble"
import { useRef, useEffect } from "react"
import { LoadingMessage } from "@/components/custom/LoadingMessage"

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
    <div className="h-[calc(100vh-200px)] w-full">
      <ScrollArea ref={scrollAreaRef} className="h-full">
        <div className="flex flex-col gap-1 p-4">
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
