"use client"

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
        "What are the recent high-risk transactions?",
        "Show me flagged merchants",
        "Analyze transaction patterns",
        "List suspicious activities",
        "Summarize transaction volume trends"
      ],
      activity: [
        "Show recent merchant activity patterns",
        "List high-volume transactions",
        "Display weekly activity summary",
        "Show merchant category trends",
        "Analyze peak transaction times"
      ],
      profile: [
        "Show merchant risk profile",
        "List historical compliance issues",
        "Display merchant category details",
        "Show business verification status",
        "Analyze merchant location patterns"
      ]
    },
    strategy: {
      rules: [
        "Show triggered rule statistics",
        "List most effective rules",
        "Display rule violation patterns",
        "Show rule performance metrics",
        "Analyze false positive rates"
      ],
      models: [
        "Show model performance metrics",
        "List model prediction accuracy",
        "Display model training data",
        "Show feature importance analysis",
        "Compare model versions"
      ],
      alerts: [
        "Show recent alert patterns",
        "List high-priority alerts",
        "Display alert resolution times",
        "Show alert category distribution",
        "Analyze alert frequency trends"
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
            "bg-gray-100 text-gray-700 hover:bg-gray-200",
            "transition-colors duration-200"
          )}
          onClick={() => onQuestionClick(question)}
        >
          {question}
        </button>
      ))}
    </>
  )
}
