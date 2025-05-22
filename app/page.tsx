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

  const handleSendMessage = (
    inputValue: string,
    messageTags: string[] = [],
  ) => {
    if (inputValue.trim() === "") return;

    // Extract any remaining tags from the message text
    const textTags = inputValue.match(/#\w+/g) || [];
    const allTags = [...new Set([...messageTags, ...textTags])];

    const newMessage: Message = {
      id:
        messages.length > 0
          ? Math.max(...messages.map((m) => m.id)) + 1
          : 1,
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

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    if (allTags.length > 0) {
      setAllTags(
        (prevTags) => new Set([...prevTags, ...allTags]),
      );
    }
  };

  const handleReaction = (messageId: number, tagName: string) => {
    setMessages((prevMessages) => {
      return prevMessages.map((msg) => {
        if (msg.id !== messageId) return msg;

        const currentUser = "currentUser";
        const reactions = msg.reactions || [];
        const reactionIndex = reactions.findIndex(
          (r) => r.tagName === tagName,
        );

        // If reaction exists
        if (reactionIndex >= 0) {
          const existingReaction = reactions[reactionIndex];
          const userIndex =
            existingReaction.users.indexOf(currentUser);

          // If user already reacted, remove their reaction
          if (userIndex >= 0) {
            const updatedUsers = [...existingReaction.users];
            updatedUsers.splice(userIndex, 1);

            // If no more users, remove the reaction
            if (updatedUsers.length === 0) {
              const updatedReactions = [...reactions];
              updatedReactions.splice(reactionIndex, 1);
              return {
                ...msg,
                reactions: updatedReactions,
              };
            }

            // Otherwise, update the count
            return {
              ...msg,
              reactions: reactions.map((r, i) =>
                i === reactionIndex
                  ? {
                      ...r,
                      count: r.count - 1,
                      users: updatedUsers,
                    }
                  : r,
              ),
            };
          }
          // If user hasn't reacted, add their reaction
          else {
            return {
              ...msg,
              reactions: reactions.map((r, i) =>
                i === reactionIndex
                  ? {
                      ...r,
                      count: r.count + 1,
                      users: [...r.users, currentUser],
                    }
                  : r,
              ),
            };
          }
        }
        // If this is a new reaction
        else {
          return {
            ...msg,
            reactions: [
              ...reactions,
              {
                tagName,
                count: 1,
                users: [currentUser],
              },
            ],
          };
        }
      });
    });
  };

  const handleAddNewTag = (tagName: string) => {
    setAllTags((prevTags) => {
      const newTags = new Set(prevTags);
      newTags.add(tagName);
      return newTags;
    });
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <IconSidebar onViewChange={handleViewChange} />
      {currentView === "home" && (
        <HomeView
          messages={messages}
          onSendMessage={handleSendMessage}
          onReaction={handleReaction}
          onAddNewTag={handleAddNewTag}
          availableTags={Array.from(allTags)}
          currentUser="currentUser"
        />
      )}
      {currentView === "library" && (
        <LibraryView messages={messages} allTags={allTags} />
      )}
      {currentView === "stats" && <StatsView />}
      {currentView === "settings" && <SettingsView />}
    </div>
  );
}
