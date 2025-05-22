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
  onReaction?: (messageId: number, emoji: string) => void;
  currentUser?: string;
}

const HomeView: React.FC<HomeViewProps> = ({
  messages,
  onSendMessage,
  onReaction,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleTriggerSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Combine manual tags (from #hashtags in the message) with selected tags
    const manualTags = inputValue.match(/#\w+/g) || [];
    const allMessageTags = [...new Set([...manualTags, ...selectedTags])];

    onSendMessage(inputValue, allMessageTags);
    setInputValue("");
    setSelectedTags([]);
  };

  const handleReaction = useCallback(
    (messageId: number, emoji: string) => {
      onReaction?.(messageId, emoji);
    },
    [onReaction]
  );

  return (
    <>
      <MainSidebar />
      <div className={clsx("flex flex-col flex-grow h-full bg-white")}>
        <div
          className={clsx(
            "flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white"
          )}
        >
          <h2 className={clsx("text-xl font-semibold")}># general</h2>
        </div>
        <MessageList
          messages={messages}
          selectedTag={null}
          onReaction={handleReaction}
          currentUser={currentUser}
        />
        <div className="border-t border-gray-200">
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border-b border-gray-200">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                    aria-label={`Remove ${tag}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
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
