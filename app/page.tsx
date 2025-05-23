"use client";
import IconSidebar from "@/components/IconSidebar";
import HomeView from "@/components/view/home/HomeView";
import LibraryView from "@/components/view/library/LibraryView";
import SettingsView from "@/components/view/settings/SettingsView";
import StatsView from "@/components/view/stats/StatsView";
import { useState, useEffect } from "react"; 
import { View, Message, Memo, Tag } from "@/lib/types"; 

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [memos, setMemos] = useState<Memo[]>([]);
  const [activeMemoId, setActiveMemoId] = useState<string | null>(null);
  const [availableTagNamesForActiveMemo, setAvailableTagNamesForActiveMemo] = useState<Set<string>>(new Set());

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
        },
        {
          id: 2,
          user: "Bob",
          avatar: "/next.svg",
          time: "10:02 AM",
          text: "これは別のサンプルメッセージです。Slack風のUIですね！",
          tags: [],
        },
      ];
      const newMemoId = `memo-${Date.now()}`;
      const defaultMemo: Memo = {
        id: newMemoId,
        title: "最初のメモ",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: initialMessages,
      };
      setMemos([defaultMemo]);
      setActiveMemoId(newMemoId);
    }
  }, []); 

  useEffect(() => {
    const currentActiveMemo = memos.find(memo => memo.id === activeMemoId);
    if (currentActiveMemo) {
      const currentMemoTagNames = new Set<string>();
      currentActiveMemo.messages.forEach((message) => {
        if (message.tags) {
          message.tags.forEach((tag: Tag) => currentMemoTagNames.add(tag.tagName));
        }
      });
      setAvailableTagNamesForActiveMemo(currentMemoTagNames);
    } else {
      setAvailableTagNamesForActiveMemo(new Set());
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
    };
    setMemos(prevMemos => [...prevMemos, newMemo]);
    setActiveMemoId(newMemoId);
  };

  const handleSendMessage = (inputValue: string) => {
    if (inputValue.trim() === "" || !activeMemoId) return;

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
        tags: [],
      };

      const updatedMessages = [...currentMessages, newMessage];
      
      return {
        ...memo,
        messages: updatedMessages,
        updatedAt: new Date().toISOString(),
      };
    }));
  };

  const handleToggleTag = (messageId: number, tagName: string) => {
    if (!activeMemoId) return;

    setMemos(prevMemos => prevMemos.map(memo => {
      if (memo.id !== activeMemoId) return memo;

      const updatedMessages = memo.messages.map((msg) => {
        if (msg.id !== messageId) return msg;

        const currentUser = "currentUser"; 
        const currentTags = msg.tags || []; 
        const tagIndex = currentTags.findIndex(
          (t: Tag) => t.tagName === tagName,
        );

        if (tagIndex >= 0) { 
          const existingTag = currentTags[tagIndex];
          const userIndex = existingTag.users.indexOf(currentUser);

          if (userIndex >= 0) { 
            const updatedUsers = [...existingTag.users];
            updatedUsers.splice(userIndex, 1);
            if (updatedUsers.length === 0) { 
              const updatedMessageTags = [...currentTags];
              updatedMessageTags.splice(tagIndex, 1);
              return {
                ...msg,
                tags: updatedMessageTags,
              };
            }
            return {
              ...msg,
              tags: currentTags.map((t: Tag, i: number) =>
                i === tagIndex
                  ? { ...t, count: updatedUsers.length, users: updatedUsers }
                  : t,
              ),
            };
          } else { 
            return {
              ...msg,
              tags: currentTags.map((t: Tag, i: number) =>
                i === tagIndex
                  ? { ...t, count: t.count + 1, users: [...t.users, currentUser] }
                  : t,
              ),
            };
          }
        } else { 
          return {
            ...msg,
            tags: [
              ...currentTags,
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

  const activeMemo = memos.find(memo => memo.id === activeMemoId);
  const messagesForView = activeMemo?.messages || [];
  const activeMemoTitle = activeMemo?.title || "";

  const allTagNamesFromAllMemos = new Set<string>();
  memos.flatMap(memo => memo.messages).forEach(message => {
    if (message.tags) {
      message.tags.forEach((tag: Tag) => allTagNamesFromAllMemos.add(tag.tagName));
    }
  });

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
          onToggleTag={handleToggleTag} 
          availableTags={Array.from(availableTagNamesForActiveMemo)} 
          currentUser="currentUser" 
          onCreateNewMemo={handleCreateNewMemo} 
          onSelectMemo={setActiveMemoId} 
        />
      )}
      {currentView === "library" && (
        <LibraryView
          allMessages={memos.flatMap(memo => memo.messages)} 
          allTags={allTagNamesFromAllMemos} 
          onToggleTag={handleToggleTag} 
          currentUser="currentUser"
        />
      )}
      {currentView === "stats" && <StatsView />}
      {currentView === "settings" && <SettingsView />}
    </div>
  );
}
