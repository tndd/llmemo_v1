// components/library/LibraryView.tsx
"use client";

import { Message, Tag } from "@/lib/types";
import React, { useState } from "react";
import LibrarySidebar from "./LibrarySidebar";
import { MessageList } from "@/components/message";
import clsx from "clsx";

interface LibraryViewProps {
  allMessages: Message[];
  allTags: Set<string>;
  onToggleTag?: (messageId: number, tagName: string) => void;
  onAddNewGlobalTag?: (newTagName: string) => void;
  currentUser?: string;
}

const LibraryView: React.FC<LibraryViewProps> = ({
  allMessages,
  allTags,
  onToggleTag,
  onAddNewGlobalTag,
  currentUser = "currentUser",
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(
    null,
  );

  const handleSelectTag = (tag: string | null) => {
    setSelectedTag((prevSelectedTag) =>
      prevSelectedTag === tag ? null : tag,
    );
  };

  const filteredMessages = selectedTag
    ? allMessages.filter((msg) =>
        msg.tags?.some((tag: Tag) => tag.tagName === selectedTag),
      )
    : allMessages;

  return (
    <div className={clsx("flex flex-grow h-full")}>
      <LibrarySidebar
        allTags={allTags}
        selectedTag={selectedTag}
        onSelectTag={handleSelectTag}
      />
      <div
        className={clsx(
          "flex flex-col flex-grow h-full bg-white",
        )}
      >
        <div
          className={clsx(
            "flex items-center h-16 px-6 border-b border-gray-200 bg-white",
          )}
        >
          <h2 className={clsx("text-xl font-semibold")}>
            {selectedTag ? `Tag: ${selectedTag}` : "All Messages"}
          </h2>
          {selectedTag && (
            <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              {filteredMessages.length}{" "}
              {filteredMessages.length === 1
                ? "message"
                : "messages"}
            </span>
          )}
        </div>
        <MessageList
          messages={filteredMessages}
          selectedTag={null}
          onToggleTag={onToggleTag}
          onAddNewGlobalTag={onAddNewGlobalTag}
          availableTags={Array.from(allTags)}
          currentUser={currentUser}
          showActions={true}
        />
      </div>
    </div>
  );
};

export default LibraryView;
