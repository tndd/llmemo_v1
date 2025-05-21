// components/library/LibraryView.tsx
"use client";

import { Message } from "@/types";
import React, { useState } from "react";
import LibrarySidebar from "./LibrarySidebar"; // Path is correct
import MessageList from "../home/MessageList"; // Path is correct
import clsx from "clsx";

interface LibraryViewProps {
  messages: Message[];
  allTags: Set<string>;
}

const LibraryView: React.FC<LibraryViewProps> = ({ messages, allTags }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleSelectTag = (tag: string) => {
    setSelectedTag(prevSelectedTag => (prevSelectedTag === tag ? null : tag));
  };

  const filteredMessages = selectedTag
    ? messages.filter(msg => msg.tags && msg.tags.includes(selectedTag))
    : messages;

  return (
    <div className={clsx("flex flex-grow h-full")}> {/* Use flex-grow to take available space */}
      <LibrarySidebar
        allTags={allTags}
        selectedTag={selectedTag}
        onSelectTag={handleSelectTag}
      />
      <div className={clsx("flex flex-col flex-grow h-full bg-white")}> {/* Main content area */}
        {/* Optional: Header for Library View */}
        <div
          className={clsx(
            "flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white",
          )}
        >
          <h2 className={clsx("text-xl font-semibold")}>
            {selectedTag ? `Tagged: ${selectedTag}` : "All Library Messages"}
          </h2>
        </div>
        {/* Pass null as selectedTag to MessageList as filtering is handled by LibraryView */}
        <MessageList messages={filteredMessages} selectedTag={null} />
      </div>
    </div>
  );
};

export default LibraryView;
