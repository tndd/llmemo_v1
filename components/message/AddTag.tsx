"use client";

import React, { useState, useRef, useEffect } from "react";

interface AddTagProps {
  onToggleTag: (tagName: string) => void; // For adding/removing tag on current message
  onAddNewGlobalTag?: (newTagName: string) => void; // For adding tag to global list
  currentTagsOnMessage?: string[];
  allAvailableTags: string[];
}

const AddTag: React.FC<AddTagProps> = ({
  onToggleTag,
  onAddNewGlobalTag,
  currentTagsOnMessage = [],
  allAvailableTags = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTagInput, setNewTagInput] = useState(""); // State for new tag input
  const wrapperRef = useRef<HTMLDivElement>(null); // Ref for the dropdown wrapper
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the new tag input field

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleExistingTagClick = (tagName: string) => {
    onToggleTag(tagName);
    setNewTagInput(""); // Clear newTagInput instead of non-existent setSearchTerm
    inputRef.current?.focus(); // Keep focus on input or allow re-focus for new tag entry
  };

  const handleAddNewTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagName = newTagInput.trim();
    if (tagName) {
      onToggleTag(tagName); // Adds tag to current message

      // Add to global list if function provided and tag is not already in global list
      if (onAddNewGlobalTag && !allAvailableTags.includes(tagName)) {
        onAddNewGlobalTag(tagName);
      }
      setNewTagInput(""); // Clear the input field
      inputRef.current?.focus(); // Refocus the input field
    }
  };

  // Tags to show in the selection list (all available tags not already on the message)
  const tagsForSelectionList = allAvailableTags.filter(
    (tag) => !currentTagsOnMessage.includes(tag),
  );

  return (
    <div className="relative inline-block text-left" ref={wrapperRef}>
      <button
        className="text-gray-400 hover:text-gray-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleToggleDropdown}
        aria-label="タグを追加・変更"
      >
        <span className="text-xs font-medium text-gray-500">
          +
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-2">
          <div className="mb-2">
            <div className="text-xs text-gray-500 mb-1">
              既存のタグを選択:
            </div>
            <div className="flex flex-wrap gap-1">
              {tagsForSelectionList.length > 0 ? (
                tagsForSelectionList.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleExistingTagClick(tag);
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {tag}
                  </button>
                ))
              ) : (
                <div className="text-xs text-gray-400">
                  選択可能な既存タグはありません。
                </div>
              )}
            </div>
          </div>

          {/* New tag input form */}
          <form onSubmit={handleAddNewTagSubmit}>
            <div className="text-xs text-gray-500 mb-1 pt-2 border-t mt-2">
              または新しいタグを作成:
            </div>
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onClick={(e) => e.stopPropagation()} // Prevent closing popup when clicking input
                className="flex-1 text-xs border rounded px-2 py-1 mr-1"
                placeholder="新しいタグ名"
              />
              <button
                type="submit"
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={!newTagInput.trim()}
              >
                追加
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTag;
