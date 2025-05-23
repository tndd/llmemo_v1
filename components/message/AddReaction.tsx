"use client";

import React, { useState, useRef, useEffect } from "react";

interface AddReactionProps {
  onAddTag: (tagName: string) => void;
  currentTags?: string[];
  availableTags: string[];
}

const AddReaction: React.FC<AddReactionProps> = ({
  onAddTag,
  currentTags = [],
  availableTags = [],
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
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const handleTagClick = (tagName: string) => {
    onAddTag(tagName);
    setIsOpen(false);
  };

  const availableTagsToShow = availableTags.filter(
    (tag) => !currentTags.includes(tag),
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
        aria-label="タグを追加"
      >
        <span className="text-xs font-medium text-gray-500">
          +
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-2">
          <div className="mb-2">
            <div className="text-xs text-gray-500 mb-1">
              タグを選択:
            </div>
            <div className="flex flex-wrap gap-1">
              {availableTagsToShow.length > 0 ? (
                availableTagsToShow.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTagClick(tag);
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {tag}
                  </button>
                ))
              ) : (
                <div className="text-xs text-gray-400">利用可能な新しいタグはありません。</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReaction;
