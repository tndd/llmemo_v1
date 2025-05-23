"use client";

import { Tag } from "@/lib/types";
import clsx from "clsx";
import React from "react";

interface MessageTagsProps {
  tags: Tag[];
  onTagClick: (tagName: string) => void;
}

const MessageTags: React.FC<MessageTagsProps> = ({
  tags,
  onTagClick,
}) => {
  if (tags.length === 0) return null;

  const tagButtonClasses = clsx(
    "px-2 py-1 border rounded-full text-xs",
    "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200",
    "transition-colors duration-150 ease-in-out",
  );

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => (
        <button
          key={`${tag.tagName}-${index}`}
          onClick={() => onTagClick(tag.tagName)}
          className={tagButtonClasses}
          aria-label={`Tag ${tag.tagName}`}
        >
          {tag.tagName}
        </button>
      ))}
    </div>
  );
};

export default MessageTags;
