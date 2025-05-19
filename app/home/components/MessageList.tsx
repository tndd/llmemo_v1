// components/MessageList.tsx
import { Message } from '@/types'; // Assuming types are in @/types
import Image from 'next/image';
import React from 'react';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-grow p-6 space-y-4 overflow-y-auto">
      {messages.map((msg) => (
        <div key={msg.id} className="flex items-start space-x-3">
          <Image src={msg.avatar} alt={`${msg.user} Avatar`} width={40} height={40} className="rounded-full bg-gray-300 p-1" />
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-semibold">{msg.user}</span>
              <span className="text-xs text-gray-500">{msg.time}</span>
            </div>
            <p className="text-gray-700">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;