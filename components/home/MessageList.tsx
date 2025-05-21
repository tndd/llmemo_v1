// components/MessageList.tsx
import { Message } from "@/types"; // Assuming types are in @/types
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface MessageListProps {
  messages: Message[];
  selectedTag: string | null;
}

const MessageList: React.FC<MessageListProps> = ({ messages, selectedTag }) => {
  const containerClasses = clsx("flex-grow p-6 space-y-4 overflow-y-auto");
  const messageRowClasses = clsx("flex items-start space-x-3");
  const avatarClasses = clsx("rounded-full bg-gray-300 p-1");
  const userRowClasses = clsx("flex items-baseline space-x-2");
  const userNameClasses = clsx("font-semibold");
  const timeClasses = clsx("text-xs text-gray-500");
  const textClasses = clsx("text-gray-700");

  const filteredMessages = selectedTag
    ? messages.filter(msg => msg.tags && msg.tags.includes(selectedTag))
    : messages;

  return (
    <div className={containerClasses}>
      {filteredMessages.map((msg) => (
        <div key={msg.id} className={messageRowClasses}>
          <Image
            src={msg.avatar}
            alt={`${msg.user} Avatar`}
            width={40}
            height={40}
            className={avatarClasses}
          />
          <div>
            <div className={userRowClasses}>
              <span className={userNameClasses}>{msg.user}</span>
              <span className={timeClasses}>{msg.time}</span>
            </div>
            <p className={textClasses}>{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
