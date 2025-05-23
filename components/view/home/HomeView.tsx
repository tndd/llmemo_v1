"use client";
import HomeSidebar from "@/components/view/home/HomeSidebar";
import { TrackList, TrackInput } from "@/components/track";
import {
  Track,
  Memo,
  CategorizedMemos,
} from "@/lib/types";
import clsx from "clsx";
import React from "react";

interface HomeViewProps {
  tracks: Track[];
  onSendTrack: (inputValue: string) => void;
  onToggleTag?: (trackId: number, tagName: string) => void;
  onAddNewGlobalTag?: (newTagName: string) => void;
  availableTags?: string[];
  currentUser?: string;
  onCreateNewMemo?: () => void;
  activeMemoId?: string | null;
  onSelectMemo?: (memoId: string) => void;
  activeMemoTitle?: string;
  categorizedMemos?: CategorizedMemos;
}

const HomeView: React.FC<HomeViewProps> = ({
  tracks,
  onSendTrack,
  onToggleTag,
  onAddNewGlobalTag,
  availableTags = [],
  currentUser = "currentUser",
  onCreateNewMemo,
  activeMemoId = null,
  onSelectMemo,
  activeMemoTitle = "Memo",
  categorizedMemos,
}) => {
  return (
    <div className={clsx("flex flex-grow h-full")}>
      <HomeSidebar
        categorizedMemos={categorizedMemos}
        activeMemoId={activeMemoId}
        onCreateNewMemo={onCreateNewMemo}
        onSelectMemo={onSelectMemo}
      />
      <div
        className={clsx(
          "flex flex-col flex-grow h-full bg-white",
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white",
          )}
        >
          <h2 className={clsx("text-xl font-semibold truncate")}>
            {activeMemoTitle || "(Untitled Memo)"}
          </h2>
        </div>
        <TrackList
          tracks={tracks}
          selectedTag={null}
          onToggleTag={onToggleTag}
          onAddNewGlobalTag={onAddNewGlobalTag}
          availableTags={availableTags}
          currentUser={currentUser}
          showActions={true}
        />
        <TrackInput
          onSendTrack={onSendTrack}
          disabled={!activeMemoId}
        />
      </div>
    </div>
  );
};

export default HomeView;
