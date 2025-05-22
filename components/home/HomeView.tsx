"use client";
import MainSidebar from "@/components/home/MainSidebar";
import MessageInput from "@/components/home/MessageInput";
import MessageList from "@/components/home/MessageList";
import { Message, Reaction } from "@/types";
import clsx from "clsx";
import React, { useState, useMemo, useCallback } from "react";

interface HomeViewProps {
  messages: Message[];
  onSendMessage: (inputValue: string, tags?: string[]) => void;
  onReaction?: (messageId: number, tagName: string) => void;
  onAddNewTag?: (tagName: string) => void;
  availableTags?: string[];
  currentUser?: string;
}

const HomeView: React.FC<HomeViewProps> = ({
  messages,
  onSendMessage,
  onReaction,
  onAddNewTag,
  availableTags = [],
  currentUser = "currentUser",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags from messages for the tag selector
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    messages.forEach((message) => {
      if (message.tags) {
        message.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [messages]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(
      selectedTags.filter((tag) => tag !== tagToRemove),
    );
  };

  const handleTriggerSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Combine manual tags (from #hashtags in the message) with selected tags
    const manualTags = inputValue.match(/#\w+/g) || [];
    const allMessageTags = [
      ...new Set([...manualTags, ...selectedTags]),
    ];

    onSendMessage(inputValue, allMessageTags);
    setInputValue("");
    setSelectedTags([]);
  };

  const handleReaction = useCallback(
    (messageId: number, emoji: string) => {
      onReaction?.(messageId, emoji);
    },
    [onReaction],
  );

  return (
    <>
      <MainSidebar />
      <div
        className={clsx(
          "flex flex-col flex-grow h-full bg-white",
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white",
          )}
        >
          <h2 className={clsx("text-xl font-semibold")}>
            # general
          </h2>
        </div>
        <MessageList
          messages={messages}
          selectedTag={null}
          onReaction={onReaction}
          onAddNewTag={onAddNewTag}
          availableTags={availableTags}
          currentUser={currentUser}
        />
        <div className="border-t border-gray-200">
          <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border-b border-gray-200">
            {/* Available tags */}
            <div className="text-xs text-gray-500 w-full mb-1">
              タグを選択:
            </div>
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.preventDefault();
                  handleAddTag(tag);
                }}
                className={`text-xs px-2 py-1 rounded ${
                  selectedTags.includes(tag)
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}

            {/* Selected tags */}
            {selectedTags.length > 0 && (
              <>
                <div className="w-full border-t my-2"></div>
                <div className="text-xs text-gray-500 w-full mb-1">
                  選択中のタグ:
                </div>
                {selectedTags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveTag(tag);
                      }}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                      aria-label={`Remove ${tag}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          <MessageInput
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onSendMessage={handleTriggerSendMessage}
            onAddTag={handleAddTag}
            availableTags={allTags}
          />
        </div>
      </div>
    </>
  );
};

export default HomeView;
