"use client";
import IconSidebar from "@/components/IconSidebar";
import HomeView from "@/components/view/home/HomeView";
import LibraryView from "@/components/view/library/LibraryView";
import SettingsView from "@/components/view/settings/SettingsView";
import StatsView from "@/components/view/stats/StatsView";
import { useState, useEffect } from "react"; 
import { View, Message, Memo } from "@/lib/types"; 

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [memos, setMemos] = useState<Memo[]>([]);
  const [activeMemoId, setActiveMemoId] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (memos.length === 0) {
      const initialMessages: Message[] = [
        {
          id: 1,
          user: "Alice",
          avatar: "/next.svg",
          time: "10:00 AM",
          text: "こんにちは！これはサンプルメッセージです。",
          tags: [],
          reactions: [],
        },
        {
          id: 2,
          user: "Bob",
          avatar: "/next.svg",
          time: "10:02 AM",
          text: "これは別のサンプルメッセージです。Slack風のUIですね！",
          tags: [],
          reactions: [],
        },
      ];
      const newMemoId = `memo-${Date.now()}`;
      const defaultMemo: Memo = {
        id: newMemoId,
        title: "最初のメモ",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: initialMessages,
        tags: [], 
      };
      setMemos([defaultMemo]);
      setActiveMemoId(newMemoId);
    }
  }, []); 

  useEffect(() => {
    const currentActiveMemo = memos.find(memo => memo.id === activeMemoId);
    if (currentActiveMemo) {
      const currentMemoTags = new Set<string>();
      currentActiveMemo.messages.forEach((message) => {
        if (message.tags) {
          message.tags.forEach((tag) => currentMemoTags.add(tag));
        }
      });
      setAllTags(currentMemoTags);
    } else {
      setAllTags(new Set());
    }
  }, [activeMemoId, memos]);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const handleCreateNewMemo = () => {
    const newMemoId = `memo-${Date.now()}`;
    const newMemo: Memo = {
      id: newMemoId,
      title: `新しいメモ ${memos.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
      tags: [],
    };
    setMemos(prevMemos => [...prevMemos, newMemo]);
    setActiveMemoId(newMemoId);
  };

  const handleSendMessage = (
    inputValue: string,
    messageTags: string[] = [],
  ) => {
    if (inputValue.trim() === "" || !activeMemoId) return;

    const textTags = inputValue.match(/#\w+/g) || [];
    const combinedMessageTags = [...new Set([...messageTags, ...textTags])];

    setMemos(prevMemos => prevMemos.map(memo => {
      if (memo.id !== activeMemoId) return memo;

      const currentMessages = memo.messages;
      const newMessage: Message = {
        id:
          currentMessages.length > 0
            ? Math.max(...currentMessages.map((m) => m.id)) + 1
            : 1,
        user: "Your Name", 
        avatar: "/next.svg", 
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: inputValue,
        tags: combinedMessageTags,
        reactions: [],
      };

      const updatedMessages = [...currentMessages, newMessage];
      
      return {
        ...memo,
        messages: updatedMessages,
        updatedAt: new Date().toISOString(),
      };
    }));
  };

  const handleReaction = (messageId: number, tagName: string) => {
    if (!activeMemoId) return;

    setMemos(prevMemos => prevMemos.map(memo => {
      if (memo.id !== activeMemoId) return memo;

      const updatedMessages = memo.messages.map((msg) => {
        if (msg.id !== messageId) return msg;

        const currentUser = "currentUser"; 
        const reactions = msg.reactions || [];
        const reactionIndex = reactions.findIndex(
          (r) => r.tagName === tagName,
        );

        if (reactionIndex >= 0) {
          const existingReaction = reactions[reactionIndex];
          const userIndex =
            existingReaction.users.indexOf(currentUser);

          if (userIndex >= 0) {
            const updatedUsers = [...existingReaction.users];
            updatedUsers.splice(userIndex, 1);
            if (updatedUsers.length === 0) {
              const updatedReactions = [...reactions];
              updatedReactions.splice(reactionIndex, 1);
              return {
                ...msg,
                reactions: updatedReactions,
              };
            }
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
          } else {
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
        } else {
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
      return { ...memo, messages: updatedMessages, updatedAt: new Date().toISOString() };
    }));
  };

  const handleAddNewTag = (tagName: string) => {
    setAllTags((prevTags) => {
      const newTags = new Set(prevTags);
      newTags.add(tagName);
      return newTags;
    });
  };

  const activeMemo = memos.find(memo => memo.id === activeMemoId);
  const messagesForView = activeMemo?.messages || [];
  const activeMemoTitle = activeMemo?.title || "";

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <IconSidebar onViewChange={handleViewChange} />
      {currentView === "home" && (
        <HomeView
          messages={messagesForView} 
          memos={memos} 
          activeMemoId={activeMemoId} 
          activeMemoTitle={activeMemoTitle} 
          onSendMessage={handleSendMessage}
          onReaction={handleReaction}
          onAddNewTag={handleAddNewTag}
          availableTags={Array.from(allTags)}
          currentUser="currentUser" 
          onCreateNewMemo={handleCreateNewMemo} 
          onSelectMemo={setActiveMemoId} 
        />
      )}
      {currentView === "library" && (
        <LibraryView
          messages={messagesForView} 
          allTags={allTags} 
          onReaction={handleReaction}
          onAddNewTag={handleAddNewTag}
          currentUser="currentUser"
        />
      )}
      {currentView === "stats" && <StatsView />}
      {currentView === "settings" && <SettingsView />}
    </div>
  );
}
