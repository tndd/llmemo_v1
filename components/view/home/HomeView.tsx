"use client";
import HomeSidebar from "@/components/view/home/HomeSidebar";
import { MessageList, MessageInput } from "@/components/message";
import { Message, Reaction } from "@/types";
import clsx from "clsx";
import React, { useState, useMemo, useCallback } from 'react';

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
  // タグの選択状態は新しいMessageInputコンポーネント内で管理されるようになったため削除
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

  // タグの選択状態は新しいMessageInputコンポーネント内で管理されるようになったため削除

  const handleTriggerSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Extract tags from the message text (e.g., #tag)
    const tags = inputValue.match(/#\w+/g) || [];
    
    onSendMessage(inputValue, [...new Set(tags)]);
    setInputValue("");
  };

  const handleReaction = useCallback(
    (messageId: number, emoji: string) => {
      onReaction?.(messageId, emoji);
    },
    [onReaction],
  );

  return (
    <>
      <HomeSidebar />
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
          <MessageInput
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onSendMessage={handleTriggerSendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default HomeView;
