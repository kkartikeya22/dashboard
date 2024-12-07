"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useWorkspace } from "@/app/layout/Workspace/WorkspaceContext"

interface InvestigationGPTSuggestionsProps {
  onQuestionClick: (question: string) => void
}

export function InvestigationGPTSuggestions({ 
  onQuestionClick 
}: InvestigationGPTSuggestionsProps) {
  const { activeNavigation } = useWorkspace()
  
  type GroupQuestions = {
    merchant: {
      investigation: string[];
      activity: string[];
      profile: string[];
    };
    strategy: {
      rules: string[];
      models: string[];
      alerts: string[];
    };
  }

  const questionsByGroupAndItem: GroupQuestions = {
    merchant: {
      investigation: [
        "What are the recent investigation findings?",
        "Show me high priority investigation cases",
        "List unresolved investigations",
        "Display investigation timeline",
        "Summarize investigation outcomes"
      ],
      activity: [
        "Show recent transaction patterns",
        "What are the peak activity hours?",
        "Display unusual activity alerts",
        "List declined transactions",
        "Analyze transaction volume trends"
      ],
      profile: [
        "What is the merchant risk score?",
        "Show merchant verification status",
        "List registered business locations",
        "Display compliance history",
        "Summarize account status changes"
      ]
    },
    strategy: {
      rules: [
        "Show active rule performance",
        "What rules triggered most recently?",
        "List rules by priority",
        "Display rule effectiveness metrics",
        "Analyze false positive rates"
      ],
      models: [
        "What is the current model accuracy?",
        "Show model validation results",
        "List feature importance scores",
        "Display prediction confidence trends",
        "Analyze model performance metrics"
      ],
      alerts: [
        "Show active alert summary",
        "What are the critical alerts?",
        "List alert response times",
        "Display alert resolution rates",
        "Analyze alert frequency patterns"
      ]
    }
  }

  const getContextualQuestions = () => {
    if (!activeNavigation?.group || !activeNavigation?.item) {
      return [] // Return empty if no context
    }

    const group = activeNavigation.group.toLowerCase() as keyof GroupQuestions
    const item = activeNavigation.item.toLowerCase() as keyof GroupQuestions[typeof group]

    // Return questions for specific group and item if they exist
    return questionsByGroupAndItem[group]?.[item] || []
  }

  return (
    <>
      {getContextualQuestions().map((question: string) => (
        <button
          key={question}
          type="button"
          className={cn(
            "h-8 px-2.5 text-xs rounded-full whitespace-nowrap shrink-0",
            "bg-gradient-to-r from-secondary/30 via-primary/20 to-secondary/30",
            "text-foreground hover:text-primary-foreground",
            "border border-primary/20 hover:border-primary/40",
            "hover:bg-gradient-to-r hover:from-primary hover:via-primary/90 hover:to-primary",
            "transition-all duration-200",
            "shadow-sm shadow-primary/10"
          )}
          onClick={() => onQuestionClick(question)}
        >
          {question}
        </button>
      ))}
    </>
  )
}
