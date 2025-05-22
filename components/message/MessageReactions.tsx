"use client";

import React from "react";
import { Reaction } from "@/types";

interface MessageReactionsProps {
  reactions: Reaction[];
  onReactionClick?: (tagName: string) => void;
  currentUser?: string;
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
            key={`${reaction.tagName}-${index}`}
            className={`flex items-center px-2 py-0.5 rounded-full text-xs ${
              hasReacted
                ? "bg-blue-100 text-blue-800 border border-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onReactionClick?.(reaction.tagName)}
            title={reaction.users.join(", ")}
          >
            <span className="font-medium">
              {reaction.tagName}
            </span>
            {reaction.count > 1 && (
              <span className="ml-1 text-gray-500">
                {reaction.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MessageReactions;
