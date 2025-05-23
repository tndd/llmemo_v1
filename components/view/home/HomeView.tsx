"use client";
import HomeSidebar from "@/components/view/home/HomeSidebar";
import { MessageList, MessageInput } from "@/components/message";
import { Message, Memo, Tag, CategorizedMemos } from "@/lib/types"; 
import clsx from "clsx";
import React, { useState, useMemo, useCallback } from 'react';

interface HomeViewProps {
  messages: Message[];
  onSendMessage: (inputValue: string) => void; 
  onToggleTag?: (messageId: number, tagName: string) => void; 
  onAddNewGlobalTag?: (newTagName: string) => void; 
  availableTags?: string[]; 
  currentUser?: string;
  onCreateNewMemo?: () => void; 
  activeMemoId?: string | null; 
  onSelectMemo?: (memoId: string) => void; 
  activeMemoTitle?: string;
  categorizedMemos?: CategorizedMemos;
}

const HomeView: React.FC<HomeViewProps> = ({
  messages,
  onSendMessage,
  onToggleTag, 
  onAddNewGlobalTag, 
  availableTags = [],
  currentUser = "currentUser",
  onCreateNewMemo, 
  activeMemoId = null, 
  onSelectMemo, 
  activeMemoTitle = "Memo",
  categorizedMemos,
}) => {
  const [inputValue, setInputValue] = useState("");
  
  const handleSendMessageInternal = () => {
    if (inputValue.trim() !== "") {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleInputChangeForMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={clsx("flex flex-grow h-full")}>
      <HomeSidebar 
        categorizedMemos={categorizedMemos} 
        activeMemoId={activeMemoId} 
        onCreateNewMemo={onCreateNewMemo}
        onSelectMemo={onSelectMemo}
      />
      <div className={clsx("flex flex-col flex-grow h-full bg-white")}>
        <div
          className={clsx(
            "flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white",
          )}
        >
          <h2 className={clsx("text-xl font-semibold truncate")}>
            {activeMemoTitle || "(Untitled Memo)"}
          </h2>
        </div>
        <MessageList
          messages={messages}
          selectedTag={null} 
          onToggleTag={onToggleTag} 
          onAddNewGlobalTag={onAddNewGlobalTag} 
          availableTags={availableTags} 
          currentUser={currentUser}
          showActions={true} 
        />
        <MessageInput
          inputValue={inputValue}
          onInputChange={handleInputChangeForMessageInput}
          onSendMessage={handleSendMessageInternal}
        />
      </div>
    </div>
  );
};

export default HomeView;
