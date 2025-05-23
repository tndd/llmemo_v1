// components/library/LibraryView.tsx
"use client";

import { Track, TrackTag } from "@/lib/types";
import React, { useState } from "react";
import LibrarySidebar from "./LibrarySidebar";
import { TrackList } from "@/components/track"; 
import clsx from "clsx";

interface LibraryViewProps {
  allTracks: Track[];
  allTags: string[];
  onToggleTag?: (trackId: number, tagName: string) => void;
  onAddNewGlobalTag?: (newTagName: string) => void;
  currentUser?: string;
}

const LibraryView: React.FC<LibraryViewProps> = ({
  allTracks,
  allTags,
  onToggleTag,
  onAddNewGlobalTag,
  currentUser = "currentUser",
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(
    null,
  );

  const handleSelectTag = (tag: string | null) => {
    setSelectedTag((prevSelectedTag) =>
      prevSelectedTag === tag ? null : tag,
    );
  };

  const filteredTracks = selectedTag
    ? allTracks.filter((trk) =>
        trk.tags?.some((tag: TrackTag) => tag.tagName === selectedTag),
      )
    : allTracks;

  return (
    <div className={clsx("flex flex-grow h-full")}>
      <LibrarySidebar
        allTags={allTags}
        selectedTag={selectedTag}
        onSelectTag={handleSelectTag}
      />
      <div
        className={clsx(
          "flex flex-col flex-grow h-full bg-white",
        )}
      >
        <div
          className={clsx(
            "flex items-center h-16 px-6 border-b border-gray-200 bg-white",
          )}
        >
          <h2 className={clsx("text-xl font-semibold")}>
            {selectedTag ? `Tag: ${selectedTag}` : "All Tracks"}
          </h2>
          {selectedTag && (
            <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              {filteredTracks.length}{" "}
              {filteredTracks.length === 1
                ? "track"
                : "tracks"}
            </span>
          )}
        </div>
        <TrackList 
          tracks={filteredTracks}
          selectedTag={null} 
          onToggleTag={onToggleTag}
          onAddNewGlobalTag={onAddNewGlobalTag}
          availableTags={allTags}
          currentUser={currentUser}
          showActions={true}
        />
      </div>
    </div>
  );
};

export default LibraryView;
