"use client";
import IconSidebar from "@/components/IconSidebar";
import HomeView from "@/components/view/home/HomeView";
import LibraryView from "@/components/view/library/LibraryView";
import SettingsView from "@/components/view/settings/SettingsView";
import StatsView from "@/components/view/stats/StatsView";
import { useState, useEffect, useMemo } from "react";
import {
  View,
  Track,
  Memo,
  TrackTag,
  CategorizedMemos,
  MEMO_DATE_CATEGORIES,
  MemoDateCategory,
} from "@/lib/types";

// Function to get all unique tag names from all tracks in all memos
const getAllUniqueTagNamesFromMemos = (memos: Memo[]): Set<string> => {
  const tagNames = new Set<string>();
  memos.forEach((memo) => {
    if (memo.tracks) {
      memo.tracks.forEach((track: Track) => {
        track.tags?.forEach((tag: TrackTag) => tagNames.add(tag.tagName));
      });
    }
  });
  return tagNames;
};

const categorizeMemosByDate = (memos: Memo[]): CategorizedMemos => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const categorized: CategorizedMemos = {
    Today: [],
    Yesterday: [],
    "This Week": [],
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
      categorized["This Week"].push(memo);
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
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }

  return categorized;
};

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [memos, setMemos] = useState<Memo[]>([]);
  const [activeMemoId, setActiveMemoId] = useState<string | null>(null);
  const [allAvailableTags, setAllAvailableTags] = useState<string[]>([]);
  const [availableTagNamesForActiveMemo, setAvailableTagNamesForActiveMemo] =
    useState<Set<string>>(new Set());

  const initializeDefaultMemo = () => {
    const initialMemoId = Date.now().toString();
    const newMemo: Memo = {
      id: initialMemoId,
      title: "新しいメモ",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tracks: [],
    };
    setMemos([newMemo]);
    setActiveMemoId(initialMemoId);
    localStorage.setItem("memos", JSON.stringify([newMemo]));
    localStorage.setItem("activeMemoId", initialMemoId);
  };

  useEffect(() => {
    const storedMemos = localStorage.getItem("memos");
    if (storedMemos) {
      try {
        const parsedMemos: any[] = JSON.parse(storedMemos);

        if (!Array.isArray(parsedMemos)) {
          console.error(
            "Stored memos is not an array, initializing default.",
          );
          initializeDefaultMemo();
          return;
        }

        const fullyInitializedMemos = parsedMemos.map((memo: any): Memo => {
          const tracks = (Array.isArray(memo.tracks) ? memo.tracks : []).map(
            (track: any): Track => ({
              id: track.id ?? Date.now() + Math.random(),
              user: track.user ?? "Your Name",
              time:
                track.time ??
                new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              text: track.text ?? "",
              tags: Array.isArray(track.tags) ? track.tags : [],
            }),
          );
          return {
            id: memo.id ?? Date.now().toString() + Math.random().toString(),
            title: memo.title ?? "新しいメモ",
            createdAt: memo.createdAt ?? new Date().toISOString(),
            updatedAt: memo.updatedAt ?? new Date().toISOString(),
            tracks: tracks,
          };
        });

        setMemos(fullyInitializedMemos);

        if (fullyInitializedMemos.length > 0) {
          const lastActiveMemoId = localStorage.getItem("activeMemoId");
          if (
            lastActiveMemoId &&
            fullyInitializedMemos.find((m) => m.id === lastActiveMemoId)
          ) {
            setActiveMemoId(lastActiveMemoId);
          } else {
            setActiveMemoId(fullyInitializedMemos[0].id);
          }
        } else {
          initializeDefaultMemo();
        }
      } catch (error) {
        console.error(
          "Failed to parse memos from localStorage or data malformed:",
          error,
        );
        initializeDefaultMemo();
      }
    } else {
      initializeDefaultMemo();
    }
  }, []);

  useEffect(() => {
    if (memos.length > 0) {
      localStorage.setItem("memos", JSON.stringify(memos));
      const allTags = getAllUniqueTagNamesFromMemos(memos);
      setAllAvailableTags(Array.from(allTags));
    }
  }, [memos]);

  useEffect(() => {
    if (activeMemoId) {
      localStorage.setItem("activeMemoId", activeMemoId);
    }
  }, [activeMemoId]);

  useEffect(() => {
    const currentActiveMemo = memos.find((memo) => memo.id === activeMemoId);
    if (currentActiveMemo) {
      const currentMemoTagNames = new Set<string>();
      currentActiveMemo.tracks.forEach((track: Track) => {
        if (track.tags) {
          track.tags.forEach((tag: TrackTag) =>
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
      tracks: [],
    };
    setMemos((prevMemos) => [newMemo, ...prevMemos]);
    setActiveMemoId(newMemoId);
  };

  const handleSendTrack = (inputValue: string) => {
    if (inputValue.trim() === "" || !activeMemoId) return;

    setMemos((prevMemos) =>
      prevMemos.map((memo) => {
        if (memo.id !== activeMemoId) return memo;

        const currentTracks = memo.tracks;
        const newTrack: Track = {
          id:
            prevMemos
              .flatMap((m) => m.tracks)
              .reduce((maxId, trk) => Math.max(maxId, trk.id), 0) + 1,
          user: "Your Name",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: inputValue,
          tags: [],
        };

        const updatedTracks = [...currentTracks, newTrack];

        return {
          ...memo,
          tracks: updatedTracks,
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const handleToggleTag = (trackId: number, tagName: string) => {
    setMemos((prevMemos) =>
      prevMemos.map((memo) => {
        const trackExistsInMemo = memo.tracks.some(
          (trk) => trk.id === trackId,
        );
        if (!trackExistsInMemo) {
          return memo;
        }

        const updatedTracks = memo.tracks.map((trk: Track) => {
          if (trk.id !== trackId) return trk;

          const currentTags = trk.tags || [];
          const tagIndex = currentTags.findIndex(
            (t: TrackTag) => t.tagName === tagName,
          );

          if (tagIndex >= 0) {
            const updatedTags = currentTags.filter((_, i) => i !== tagIndex);
            return {
              ...trk,
              tags: updatedTags,
            };
          } else {
            return {
              ...trk,
              tags: [...currentTags, { tagName }],
            };
          }
        });
        return {
          ...memo,
          tracks: updatedTracks,
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const handleAddNewTagGlobally = (newTagName: string) => {
    setAllAvailableTags((prevTagNames) => {
      if (prevTagNames.includes(newTagName)) {
        return prevTagNames;
      }
      const updatedTagNames = [...prevTagNames];
      updatedTagNames.push(newTagName);
      return updatedTagNames;
    });
  };

  const activeMemo = useMemo(() => {
    return memos.find((memo) => memo.id === activeMemoId) || null;
  }, [memos, activeMemoId]);

  const tracksForView = useMemo(() => {
    return activeMemo?.tracks || [];
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
          tracks={tracksForView}
          categorizedMemos={categorizedMemos}
          activeMemoId={activeMemoId}
          activeMemoTitle={activeMemoTitle}
          onSendTrack={handleSendTrack}
          onToggleTag={handleToggleTag}
          availableTags={allAvailableTags}
          onAddNewGlobalTag={handleAddNewTagGlobally}
          currentUser="currentUser"
          onCreateNewMemo={handleCreateNewMemo}
          onSelectMemo={setActiveMemoId}
        />
      )}
      {currentView === "library" && (
        <LibraryView
          allTracks={memos.flatMap((memo) =>
            memo.tracks ? memo.tracks : [],
          )}
          allTags={allAvailableTags}
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
