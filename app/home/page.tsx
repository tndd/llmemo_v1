"use client";
import MainSidebar from '@/app/home/components/MainSidebar';
import MessageInput from '@/app/home/components/MessageInput';
import MessageList from '@/app/home/components/MessageList';
import IconSidebar from '@/components/IconSidebar';
import { Message } from '@/types'; // Assuming types are in @/types
import { useState } from 'react';

// Define view types
type View = 'home' | 'library' | 'stats';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [inputValue, setInputValue] = useState('');
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
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      user: "Your Name", // Replace with actual user name
      avatar: "/next.svg", // Replace with actual user avatar
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <IconSidebar onViewChange={handleViewChange} />
      {currentView === 'home' && (
        <>
          <MainSidebar />
          <div className="flex flex-col flex-grow h-full bg-white">
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
              <h2 className="text-xl font-semibold"># general</h2>
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
      )}
      {currentView === 'library' && (
        <div className="flex flex-col flex-grow h-full bg-white">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold">Library View</h2>
            <div>{/* Search or other icons removed */}</div>
          </div>
          <div className="p-6">
            {/* Placeholder for Library content */}
          </div>
        </div>
      )}
      {currentView === 'stats' && (
        <div className="flex flex-col flex-grow h-full bg-white">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold">Stats View</h2>
            <div>{/* Search or other icons removed */}</div>
          </div>
          <div className="p-6">
            {/* Placeholder for Stats content */}
          </div>
        </div>
      )}
    </div>
  );
}
