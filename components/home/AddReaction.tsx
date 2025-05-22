"use client";

import React, { useState, useRef, useEffect } from "react";

interface AddReactionProps {
  onAddReaction: (emoji: string) => void;
  currentReactions?: string[];
}

const EMOJIS = ["👍", "👎", "❤️", "😂", "😮", "😢", "🎉", "🙏", "👀", "🤔"];

const AddReaction: React.FC<AddReactionProps> = ({
  onAddReaction,
  currentReactions = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emoji: string) => {
    onAddReaction(emoji);
    setIsOpen(false);
  };

  const availableEmojis = EMOJIS.filter(
    (emoji) => !currentReactions.includes(emoji)
  );

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        className="text-gray-400 hover:text-gray-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Add reaction"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-1 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
          <div className="grid grid-cols-5 gap-1">
            {availableEmojis.map((emoji) => (
              <button
                key={emoji}
                className="text-xl p-1 hover:bg-gray-100 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleEmojiClick(emoji);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReaction;
