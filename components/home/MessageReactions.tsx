"use client";

import React from "react";
import { Reaction } from "@/types";

interface MessageReactionsProps {
  reactions: Reaction[];
  onReactionClick?: (emoji: string) => void;
  currentUser?: string; // To track if current user has reacted
}

const MessageReactions: React.FC<MessageReactionsProps> = ({
  reactions = [],
  onReactionClick,
  currentUser = "currentUser",
}) => {
  if (reactions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {reactions.map((reaction, index) => {
        const hasReacted = reaction.users.includes(currentUser);
        return (
          <button
            key={`${reaction.emoji}-${index}`}
            className={`flex items-center px-2 py-0.5 rounded-full text-sm ${
              hasReacted
                ? "bg-blue-100 text-blue-800 border border-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onReactionClick?.(reaction.emoji)}
            title={reaction.users.join(", ")}
          >
            <span className="mr-1">{reaction.emoji}</span>
            <span>{reaction.count}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MessageReactions;
