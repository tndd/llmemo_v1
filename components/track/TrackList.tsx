import { Track, TrackTag } from "@/lib/types";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import TrackTags from "./TrackTags";
import AddTrackTag from "./AddTrackTag";

interface TrackListProps {
  tracks: Track[];
  selectedTag: string | null;
  onToggleTag?: (trackId: number, tagName: string) => void;
  onAddNewGlobalTag?: (newTagName: string) => void;
  availableTags?: string[];
  currentUser?: string;
  showActions?: boolean;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  selectedTag,
  onToggleTag,
  onAddNewGlobalTag,
  availableTags = [],
  currentUser = "currentUser",
  showActions = true,
}) => {
  const containerClasses = clsx(
    "flex-grow p-6 space-y-4 overflow-y-auto",
  );
  const messageRowClasses = clsx(
    "group flex items-start space-x-3 hover:bg-gray-50 p-2 rounded",
  );
  const avatarClasses = clsx(
    "rounded-full bg-gray-300 p-1 flex-shrink-0",
  );
  const userRowClasses = clsx("flex items-baseline space-x-2");
  const userNameClasses = clsx("font-semibold");
  const timeClasses = clsx("text-xs text-gray-500");
  const textClasses = clsx("text-gray-700");
  const messageContentClasses = clsx("flex-1");
  const messageActionsClasses = clsx(
    "flex items-center space-x-1 mt-1",
  );

  const filteredTracks = selectedTag
    ? tracks.filter((trk) =>
        trk.tags?.some((tag: TrackTag) => tag.tagName === selectedTag),
      )
    : tracks;

  const handleToggleTagInternal = (
    trackId: number,
    tagName: string,
  ): void => {
    onToggleTag?.(trackId, tagName);
  };

  return (
    <div className={containerClasses}>
      {filteredTracks.map((trk) => (
        <div key={trk.id} className={messageRowClasses}>
          <div className={messageContentClasses}>
            <div className={userRowClasses}>
              <span className={userNameClasses}>{trk.user}</span>
              <span className={timeClasses}>{trk.time}</span>
            </div>
            <p className={textClasses}>{trk.text}</p>

            {trk.tags && trk.tags.length > 0 && (
              <TrackTags
                tags={trk.tags || []}
                onTagClick={(tagName: string) =>
                  handleToggleTagInternal(trk.id, tagName)
                }
              />
            )}

            {showActions && (
              <div className={messageActionsClasses}>
                <AddTrackTag
                  onToggleTag={(tagName: string) =>
                    handleToggleTagInternal(trk.id, tagName)
                  }
                  onAddNewGlobalTag={onAddNewGlobalTag}
                  currentTagsOnTrack={
                    trk.tags?.map((t: TrackTag) => t.tagName) || []
                  }
                  allAvailableTags={availableTags}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
