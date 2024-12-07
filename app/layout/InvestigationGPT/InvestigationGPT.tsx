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

const sampleQuestions = [
  "What are the recent high-risk transactions?",
  "Show me flagged merchants",
  "Analyze transaction patterns",
  "List suspicious activities",
  "Summarize transaction volume trends"
]

export function InvestigationGPT() {
  const { setArtifact, artifact } = useWorkspace()
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
    
    const newArtifact: Artifact = {
      id: chatId,
      title: chatTitle,
      currentUrl: `/chat/${chatId}`,
      renderArtifact: () => (
        <InvestigationGPTChat 
          messages={newMessages.slice(0, -1)} // Remove loading message from regular messages
          isLoading={true}
        />
      ),
    }
    setArtifact(newArtifact)
    setMessage("")

    // Simulate API call
    setTimeout(() => {
      const aiResponse = { text: "This is a simulated AI response.", isUser: false }
      const finalMessages = [...newMessages.slice(0, -1), aiResponse] // Remove loading message
      setMessages(finalMessages)
      setIsLoading(false)
      
      // Update artifact with new message
      const updatedArtifact = {
        ...newArtifact,
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
    <div className={cn("flex-shrink-0 bg-white rounded-lg p-2", "h-auto")}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 flex items-center gap-2">
          <InvestigationGPTSuggestions 
            questions={sampleQuestions}
            onQuestionClick={setMessage}
          />
          <InvestigationGPTInput 
            message={message} 
            setMessage={setMessage} 
          />
          <Button 
            onClick={handleButtonClick}
            type="button"
            size="icon" 
            className="h-8 w-8"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  )
}