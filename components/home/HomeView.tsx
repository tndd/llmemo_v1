"use client";
import MainSidebar from "@/components/home/MainSidebar";
import MessageInput from "@/components/home/MessageInput";
import MessageList from "@/components/home/MessageList";
import { Message } from "@/types"; // Assuming types are in @/types
import clsx from "clsx";
import React, { useState } from "react";

const HomeView: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Alice",
      avatar: "/next.svg",
      time: "10:00 AM",
      text: "こんにちは！これはサンプルメッセージです。",
    },
    {
      id: 2,
      user: "Bob",
      avatar: "/next.svg",
      time: "10:02 AM",
      text: "これは別のサンプルメッセージです。Slack風のUIですね！",
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      user: "Your Name", // Replace with actual user name
      avatar: "/next.svg", // Replace with actual user avatar
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <>
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
        <MessageList messages={messages} />
        <MessageInput
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSendMessage={handleSendMessage}
        />
      </div>
    </>
  );
};

export default HomeView;
