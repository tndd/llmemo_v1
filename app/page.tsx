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

  const handleSendMessage = (inputValue: string, messageTags: string[] = []) => {
    if (inputValue.trim() === "") return;

    // Extract any remaining tags from the message text
    const textTags = inputValue.match(/#\w+/g) || [];
    const allTags = [...new Set([...messageTags, ...textTags])];

    const newMessage: Message = {
      id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
      user: "Your Name",
      avatar: "/next.svg",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: inputValue,
      tags: allTags,
      reactions: [],
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    if (allTags.length > 0) {
      setAllTags(prevTags => new Set([...prevTags, ...allTags]));
    }
  };

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        if (msg.id !== messageId) return msg;

        const currentUser = "currentUser"; // Replace with actual user ID
        const existingReactionIndex = msg.reactions?.findIndex(
          r => r.emoji === emoji
        ) ?? -1;

        // If reaction exists
        if (existingReactionIndex >= 0) {
          const existingReaction = msg.reactions![existingReactionIndex];
          const userIndex = existingReaction.users.indexOf(currentUser);
          
          // If user already reacted, remove their reaction
          if (userIndex >= 0) {
            const updatedUsers = [...existingReaction.users];
            updatedUsers.splice(userIndex, 1);
            
            // If no more users, remove the reaction
            if (updatedUsers.length === 0) {
              const updatedReactions = [...(msg.reactions || [])];
              updatedReactions.splice(existingReactionIndex, 1);
              return {
                ...msg,
                reactions: updatedReactions,
              };
            }
            
            // Otherwise, update the count
            return {
              ...msg,
              reactions: msg.reactions!.map((r, i) =>
                i === existingReactionIndex
                  ? {
                      ...r,
                      count: r.count - 1,
                      users: updatedUsers,
                    }
                  : r
              ),
            };
          }
          
          // If user hasn't reacted, add their reaction
          return {
            ...msg,
            reactions: msg.reactions!.map((r, i) =>
              i === existingReactionIndex
                ? {
                    ...r,
                    count: r.count + 1,
                    users: [...r.users, currentUser],
                  }
                : r
            ),
          };
        }
        
        // If reaction doesn't exist, add it
        return {
          ...msg,
          reactions: [
            ...(msg.reactions || []),
            {
              emoji,
              count: 1,
              users: [currentUser],
            },
          ],
        };
      })
    );
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <IconSidebar onViewChange={handleViewChange} />
      {currentView === "home" && (
        <HomeView 
          messages={messages} 
          onSendMessage={handleSendMessage}
          onReaction={handleReaction}
          currentUser="currentUser"
        />
      )}
      {currentView === "library" && <LibraryView messages={messages} allTags={allTags} />}
      {currentView === "stats" && <StatsView />}
      {currentView === "settings" && <SettingsView />}
    </div>
  );
}
