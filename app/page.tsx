"use client";
import IconSidebar from "@/components/IconSidebar";
import HomeView from "@/components/view/home/HomeView";
import LibraryView from "@/components/view/library/LibraryView";
import SettingsView from "@/components/view/settings/SettingsView";
import StatsView from "@/components/view/stats/StatsView";
import { useState, useEffect, useMemo } from "react";
import {
  View,
  Message,
  Memo,
  MessageTag,
  CategorizedMemos,
  MEMO_DATE_CATEGORIES,
  MemoDateCategory,
} from "@/lib/types";
import { initialMemos } from "../lib/data";

// Function to get all unique tag names from all messages in all memos
const getAllUniqueTagNamesFromMemos = (
  memos: Memo[],
): Set<string> => {
  const tagNames = new Set<string>();
  memos.forEach((memo) => {
    memo.messages.forEach((message) => {
      message.tags?.forEach((tag: MessageTag) =>
        tagNames.add(tag.tagName),
      );
    });
  });
  return tagNames;
};

const categorizeMemosByDate = (
  memos: Memo[],
): CategorizedMemos => {
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const firstDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  );

  const categorized: CategorizedMemos = {
    Today: [],
    Yesterday: [],
    "Previous 7 Days": [],
    "This Month": [],
    Older: [],
  };

  memos.forEach((memo) => {
    const memoDate = new Date(memo.updatedAt);
    if (memoDate >= today) {
      categorized.Today.push(memo);
    } else if (memoDate >= yesterday) {
      categorized.Yesterday.push(memo);
    } else if (memoDate >= sevenDaysAgo) {
      categorized["Previous 7 Days"].push(memo);
    } else if (memoDate >= firstDayOfMonth) {
      categorized["This Month"].push(memo);
    } else {
      categorized.Older.push(memo);
    }
  });

  // Sort memos within each category by updatedAt descending (newest first)
  for (const category of MEMO_DATE_CATEGORIES) {
    categorized[category].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime(),
    );
  }

  return categorized;
};

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [memos, setMemos] = useState<Memo[]>(initialMemos);
  const [activeMemoId, setActiveMemoId] = useState<string | null>(
    initialMemos.length > 0 ? initialMemos[0].id : null,
  );
  const [
    availableTagNamesForActiveMemo,
    setAvailableTagNamesForActiveMemo,
  ] = useState<Set<string>>(new Set());
  const [allTagNames, setAllTagNames] = useState<Set<string>>(
    () => getAllUniqueTagNamesFromMemos(initialMemos),
  );

  useEffect(() => {
    if (memos.length === 0) {
      console.log(
        "No initial memos loaded, or initialMemos was empty.",
      );
    }
  }, []);

  useEffect(() => {
    const currentActiveMemo = memos.find(
      (memo) => memo.id === activeMemoId,
    );
    if (currentActiveMemo) {
      const currentMemoTagNames = new Set<string>();
      currentActiveMemo.messages.forEach((message) => {
        if (message.tags) {
          message.tags.forEach((tag: MessageTag) =>
            currentMemoTagNames.add(tag.tagName),
          );
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
    setMemos((prevMemos) => [newMemo, ...prevMemos]);
    setActiveMemoId(newMemoId);
  };

  const handleSendMessage = (inputValue: string) => {
    if (inputValue.trim() === "" || !activeMemoId) return;

    setMemos((prevMemos) =>
      prevMemos.map((memo) => {
        if (memo.id !== activeMemoId) return memo;

        const currentMessages = memo.messages;
        const newMessage: Message = {
          id:
            // Calculate a globally unique ID
            prevMemos
              .flatMap((m) => m.messages)
              .reduce(
                (maxId, msg) => Math.max(maxId, msg.id),
                0,
              ) + 1,
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
      }),
    );
  };

  const handleToggleTag = (
    messageId: number,
    tagName: string,
  ) => {
    setMemos((prevMemos) =>
      prevMemos.map((memo) => {
        // Check if this memo contains the message to be updated
        const messageExistsInMemo = memo.messages.some(
          (msg) => msg.id === messageId,
        );
        if (!messageExistsInMemo) {
          return memo; // Not the target memo, return as is
        }

        const updatedMessages = memo.messages.map((msg) => {
          if (msg.id !== messageId) return msg;

          const currentTags = msg.tags || [];
          const tagIndex = currentTags.findIndex(
            (t: MessageTag) => t.tagName === tagName,
          );

          if (tagIndex >= 0) {
            // タグが既に存在する場合は削除
            const updatedTags = currentTags.filter(
              (_, i) => i !== tagIndex,
            );
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
        return {
          ...memo,
          messages: updatedMessages,
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const handleAddNewTagGlobally = (newTagName: string) => {
    setAllTagNames((prevTagNames) => {
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

  const categorizedMemos = useMemo(() => {
    return categorizeMemosByDate(memos);
  }, [memos]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <IconSidebar onViewChange={handleViewChange} />
      {currentView === "home" && (
        <HomeView
          messages={messagesForView}
          categorizedMemos={categorizedMemos}
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
          allMessages={memos.flatMap((memo) => memo.messages)}
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
