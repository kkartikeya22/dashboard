"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { InvestigationGPTInput } from "./InvestigationGPTInput"
import { InvestigationGPTSuggestions } from "./InvestigationGPTSuggestions"
import { InvestigationGPTChat } from "./InvestigationGPTChat"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useWorkspace } from "@/app/layout/Workspace/WorkspaceContext"
import { Artifact } from "@/app/layout/Artifact/Artifact"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const sampleQuestions = [
  "What are the recent high-risk transactions?",
  "Show me flagged merchants",
  "Analyze transaction patterns",
  "List suspicious activities",
  "Summarize transaction volume trends"
]

export function InvestigationGPT() {
  const { setArtifact } = useWorkspace()
  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState<Array<{ text: string; isUser: boolean }>>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = { text: message, isUser: true }
    const loadingMessage = { text: "...", isUser: false }
    const newMessages = [...messages, userMessage, loadingMessage]
    setMessages(newMessages)
    setIsLoading(true)
    
    // Create new artifact for the chat with loading state
    const chatId = `chat-${Date.now()}`
    const chatTitle = `Chat: ${message.slice(0, 30)}${message.length > 30 ? '...' : ''}`
    
    const newArtifact = {
      id: chatId,
      type: 'text' as const,
      data: {
        title: chatTitle,
        messages: newMessages.slice(0, -1)
      },
      metadata: {
        title: chatTitle,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      renderArtifact: () => (
        <InvestigationGPTChat 
          messages={newMessages.slice(0, -1)}
          isLoading={true}
        />
      ),
    }
    setArtifact(newArtifact)
    setMessage("")

    // Simulate API call
    setTimeout(() => {
      const aiResponse = { text: "This is a simulated AI response.", isUser: false }
      const finalMessages = [...newMessages.slice(0, -1), aiResponse]
      setMessages(finalMessages)
      setIsLoading(false)
      
      // Update artifact with new message
      const updatedArtifact = {
        ...newArtifact,
        data: {
          ...newArtifact.data,
          messages: finalMessages
        },
        metadata: {
          ...newArtifact.metadata,
          updatedAt: new Date()
        },
        renderArtifact: () => (
          <InvestigationGPTChat 
            messages={finalMessages}
            isLoading={false}
          />
        ),
      }
      setArtifact(updatedArtifact)
    }, 2000)
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    handleSubmit(e as unknown as React.FormEvent)
  }

  return (
    <TooltipProvider>
      <div className={cn(
        "flex-shrink-0 rounded-lg p-2 h-auto",
        "bg-gradient-to-br from-soothing-blue via-soothing-indigo to-soothing-purple",
        "shadow-lg shadow-primary/10",
        "border border-border/50",
        "backdrop-blur-sm"
      )}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <InvestigationGPTSuggestions 
                    suggestions={sampleQuestions}
                    onSuggestionClick={setMessage}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to use a sample question</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex-1">
                  <InvestigationGPTInput 
                    message={message} 
                    setMessage={setMessage} 
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Type your investigation query here</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={handleButtonClick}
                  type="button"
                  size="icon" 
                  className={cn(
                    "h-8 w-8",
                    "bg-primary/90 hover:bg-primary",
                    "shadow-md shadow-primary/20",
                    "transition-all duration-200"
                  )}
                >
                  <Send className="h-3.5 w-3.5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send your query</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </form>
      </div>
    </TooltipProvider>
  )
}
