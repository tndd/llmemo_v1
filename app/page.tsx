"use client";
import Image from "next/image";
import { useState } from 'react';

interface Message {
  id: number;
  user: string;
  avatar: string;
  time: string;
  text: string;
}

export default function Home() {
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
  return (
    <div className="flex h-screen antialiased text-gray-800">
      {/* Thin Sidebar for Icons */}
      <div className="flex flex-col items-center w-16 bg-gray-800 text-white py-4 space-y-3">
        {/* Placeholder for icons - replace with actual icons later */}
        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">H</div> {/* Home */}
        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">D</div> {/* DMs */}
        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">A</div> {/* Activity */}
        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">L</div> {/* Later */}
        <div className="mt-auto w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">+</div> {/* Add */}
      </div>

      {/* Original Sidebar (Channels, DMs) */}
      <div className="flex flex-col w-64 bg-slate-800 text-white">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <span className="text-xl font-semibold">LLMemo</span>
        </div>
        <div className="p-4">
          <input type="text" placeholder="Search" className="w-full px-3 py-2 border border-gray-600 rounded-md text-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex-grow p-4 space-y-2 overflow-y-auto">
          {/* Channels */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">Channels</h3>
            <ul className="space-y-1">
              <li><a href="#" className="block px-2 py-1 rounded hover:bg-gray-700"># general</a></li>
              <li><a href="#" className="block px-2 py-1 rounded hover:bg-gray-700"># random</a></li>
              <li><a href="#" className="block px-2 py-1 rounded hover:bg-gray-700"># announcements</a></li>
            </ul>
          </div>
          {/* Direct Messages */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">Direct Messages</h3>
            <ul className="space-y-1">
              <li><a href="#" className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-700"><span className="w-2 h-2 bg-green-500 rounded-full"></span><span>Alice</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-700"><span className="w-2 h-2 bg-gray-500 rounded-full"></span><span>Bob</span></a></li>
            </ul>
          </div>
        </div>
        {/* User Info Section Removed */}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow h-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold"># general</h2>
          <div>{/* Search or other icons removed */}</div>
        </div>

        {/* Messages Area */}
        {/* Scrollable messages container */}
        <div className="flex-grow p-6 space-y-4 overflow-y-auto"> {/* Adjusted height and background */}
          {/* Render messages from state */}
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
          {/* More messages will be dynamically added here */}
        </div>

        {/* Message Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Message #general"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
