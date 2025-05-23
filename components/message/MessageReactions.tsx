"use client";

import { Tag } from "@/lib/types";
import clsx from "clsx";
import React from "react";

interface MessageReactionsProps {
  tags: Tag[];
  onTagClick: (tagName: string) => void;
  currentUser?: string;
}

const MessageReactions: React.FC<MessageReactionsProps> = ({
  tags,
  onTagClick,
  currentUser = "currentUser",
}) => {
  if (tags.length === 0) return null;

  const reactionButtonClasses = clsx(
    "px-2 py-1 border rounded-full text-xs flex items-center space-x-1",
    "transition-colors duration-150 ease-in-out",
  );
  const userReactedClasses = clsx("bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200");
  const otherReactedClasses = clsx("bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200");

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => {
        const userHasTagged = tag.users.includes(currentUser);
        return (
          <button
            key={`${tag.tagName}-${index}`}
            onClick={() => onTagClick(tag.tagName)}
            className={clsx(
              reactionButtonClasses,
              userHasTagged ? userReactedClasses : otherReactedClasses,
            )}
            aria-label={`Tag ${tag.tagName}, count ${tag.count}`}
          >
            <span>{tag.tagName}</span>
            <span className="text-xs font-medium">{tag.count}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MessageReactions;
