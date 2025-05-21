"use client";
import IconSidebar from "@/components/IconSidebar";
import HomeView from "@/components/home/HomeView";
import LibraryView from "@/components/library/LibraryView";
import SettingsView from "@/components/settings/SettingsView";
import StatsView from "@/components/stats/StatsView";
import { useState } from "react";
import { View, Message } from "@/types"; // Added Message

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Alice",
      avatar: "/next.svg",
      time: "10:00 AM",
      text: "こんにちは！これはサンプルメッセージです。",
      tags: [],
    },
    {
      id: 2,
      user: "Bob",
      avatar: "/next.svg",
      time: "10:02 AM",
      text: "これは別のサンプルメッセージです。Slack風のUIですね！",
      tags: [],
    },
  ]);
  const [allTags, setAllTags] = useState<Set<string>>(new Set());

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const handleSendMessage = (inputValue: string) => {
    if (inputValue.trim() === "") return;

    const tags = inputValue.match(/#\w+/g) || [];

    const newMessage: Message = {
      id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1, // Ensure unique ID
      user: "Your Name", // Replace with actual user name
      avatar: "/next.svg", // Replace with actual user avatar
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: inputValue,
      tags: tags,
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    if (tags.length > 0) {
      setAllTags(prevTags => new Set([...prevTags, ...tags]));
    }
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <IconSidebar onViewChange={handleViewChange} />
      {currentView === "home" && <HomeView messages={messages} onSendMessage={handleSendMessage} />}
      {currentView === "library" && <LibraryView messages={messages} allTags={allTags} />}
      {currentView === "stats" && <StatsView />}
      {currentView === "settings" && <SettingsView />}
    </div>
  );
}
