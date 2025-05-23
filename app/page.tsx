"use client";
import IconSidebar from "@/components/IconSidebar";
import HomeView from "@/components/view/home/HomeView";
import LibraryView from "@/components/view/library/LibraryView";
import SettingsView from "@/components/view/settings/SettingsView";
import StatsView from "@/components/view/stats/StatsView";
import { useState, useEffect, useMemo } from "react"; 
import { View, Message, Memo, Tag } from "@/lib/types"; 
import { initialMemos } from "../lib/data"; 

// Function to get all unique tag names from all messages in all memos
const getAllUniqueTagNamesFromMemos = (memos: Memo[]): Set<string> => {
  const tagNames = new Set<string>();
  memos.forEach(memo => {
    memo.messages.forEach(message => {
      message.tags?.forEach(tag => tagNames.add(tag.tagName));
    });
  });
  return tagNames;
};

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [memos, setMemos] = useState<Memo[]>(initialMemos); 
  const [activeMemoId, setActiveMemoId] = useState<string | null>(
    initialMemos.length > 0 ? initialMemos[0].id : null 
  );
  const [availableTagNamesForActiveMemo, setAvailableTagNamesForActiveMemo] = useState<Set<string>>(new Set());
  const [allTagNames, setAllTagNames] = useState<Set<string>>(() => 
    getAllUniqueTagNamesFromMemos(initialMemos)
  );

  useEffect(() => {
    if (memos.length === 0) {
      console.log("No initial memos loaded, or initialMemos was empty.");
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
    setMemos(prevMemos => [newMemo, ...prevMemos]);
    setActiveMemoId(newMemoId);
  };

  const handleSendMessage = (inputValue: string) => {
    if (inputValue.trim() === "" || !activeMemoId) return;

    setMemos(prevMemos => prevMemos.map(memo => {
      if (memo.id !== activeMemoId) return memo;

      const currentMessages = memo.messages;
      const newMessage: Message = {
        id:
          // Calculate a globally unique ID
          prevMemos.flatMap(m => m.messages).reduce((maxId, msg) => Math.max(maxId, msg.id), 0) + 1,
        user: "Your Name",
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
    setMemos(prevMemos => prevMemos.map(memo => {
      // Check if this memo contains the message to be updated
      const messageExistsInMemo = memo.messages.some(msg => msg.id === messageId);
      if (!messageExistsInMemo) {
        return memo; // Not the target memo, return as is
      }

      const updatedMessages = memo.messages.map((msg) => {
        if (msg.id !== messageId) return msg;

        const currentTags = msg.tags || [];
        const tagIndex = currentTags.findIndex(
          (t: Tag) => t.tagName === tagName,
        );

        if (tagIndex >= 0) {
          // タグが既に存在する場合は削除
          const updatedTags = currentTags.filter((_, i) => i !== tagIndex);
          return {
            ...msg,
            tags: updatedTags,
          };
        } else {
          // タグが存在しない場合は追加
          return {
            ...msg,
            tags: [...currentTags, { tagName }],
          };
        }
      });
      return { ...memo, messages: updatedMessages, updatedAt: new Date().toISOString() };
    }));
  };

  const handleAddNewTagGlobally = (newTagName: string) => {
    setAllTagNames(prevTagNames => {
      if (prevTagNames.has(newTagName)) {
        return prevTagNames; // Tag already exists, no change
      }
      const updatedTagNames = new Set(prevTagNames);
      updatedTagNames.add(newTagName);
      return updatedTagNames;
    });
  };

  const activeMemo = useMemo(() => {
    return memos.find((memo) => memo.id === activeMemoId) || null;
  }, [memos, activeMemoId]);

  const messagesForView = useMemo(() => {
    return activeMemo?.messages || [];
  }, [activeMemo]);

  const activeMemoTitle = useMemo(() => {
    return activeMemo?.title || "";
  }, [activeMemo]);

  const allTagNamesFromAllMemos = useMemo(() => {
    return getAllUniqueTagNamesFromMemos(memos);
  }, [memos]);

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
          availableTags={Array.from(allTagNames)} 
          onAddNewGlobalTag={handleAddNewTagGlobally} 
          currentUser="currentUser" 
          onCreateNewMemo={handleCreateNewMemo} 
          onSelectMemo={setActiveMemoId} 
        />
      )}
      {currentView === "library" && (
        <LibraryView
          allMessages={memos.flatMap(memo => memo.messages)} 
          allTags={allTagNames} 
          onToggleTag={handleToggleTag} 
          onAddNewGlobalTag={handleAddNewTagGlobally} 
          currentUser="currentUser"
        />
      )}
      {currentView === "stats" && <StatsView />}
      {currentView === "settings" && <SettingsView />}
    </div>
  );
}
