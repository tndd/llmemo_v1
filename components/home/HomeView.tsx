"use client";
import MainSidebar from "@/components/home/MainSidebar";
import MessageInput from "@/components/home/MessageInput";
import MessageList from "@/components/home/MessageList";
import { Message } from "@/types"; // Assuming types are in @/types
import clsx from "clsx";
import React, { useState } from "react"; // Removed useEffect

interface HomeViewProps {
  messages: Message[];
  onSendMessage: (inputValue: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  // selectedTag state and handleSelectTag function are removed.
  // allTags derived state and its useEffect are removed.

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // This function is now called by MessageInput
  const handleTriggerSendMessage = () => {
    if (inputValue.trim() === "") return;
    onSendMessage(inputValue); // Call the prop function passed from page.tsx
    setInputValue(""); // Clear the input field
  };

  // handleSelectTag function is removed.

  return (
    <>
      {/* MainSidebar no longer receives tag-related props */}
      <MainSidebar />
      <div className={clsx("flex flex-col flex-grow h-full bg-white")}>
        {/* Header */}
        <div
          className={clsx(
            "flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white",
          )}
        >
          <h2 className={clsx("text-xl font-semibold")}># general</h2>
          <div>{/* Search or other icons removed */}</div>
        </div>
        {/* MessageList now receives selectedTag={null} */}
        <MessageList messages={messages} selectedTag={null} />
        <MessageInput
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSendMessage={handleTriggerSendMessage} // Renamed handler
        />
      </div>
    </>
  );
};

export default HomeView;
