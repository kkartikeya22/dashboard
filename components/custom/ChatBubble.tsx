import React from "react";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

export function ChatBubble({ message, isUser }: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-1`}>
      <div
        className={`max-w-[70%] rounded-2xl px-3 py-1.5 ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}