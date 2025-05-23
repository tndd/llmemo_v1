import { Message, MessageTag } from "@/lib/types";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import MessageTags from "./MessageTags";
import AddTag from "./AddTag";

interface MessageListProps {
  messages: Message[];
  selectedTag: string | null;
  onToggleTag?: (messageId: number, tagName: string) => void;
  onAddNewGlobalTag?: (newTagName: string) => void;
  availableTags?: string[];
  currentUser?: string;
  showActions?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
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

  const filteredMessages = selectedTag
    ? messages.filter((msg) =>
        msg.tags?.some((tag: MessageTag) => tag.tagName === selectedTag),
      )
    : messages;

  const handleToggleTagInternal = (
    messageId: number,
    tagName: string,
  ): void => {
    onToggleTag?.(messageId, tagName);
  };

  return (
    <div className={containerClasses}>
      {filteredMessages.map((msg) => (
        <div key={msg.id} className={messageRowClasses}>
          <div className={messageContentClasses}>
            <div className={userRowClasses}>
              <span className={userNameClasses}>{msg.user}</span>
              <span className={timeClasses}>{msg.time}</span>
            </div>
            <p className={textClasses}>{msg.text}</p>

            {msg.tags && msg.tags.length > 0 && (
              <MessageTags
                tags={msg.tags || []}
                onTagClick={(tagName: string) =>
                  handleToggleTagInternal(msg.id, tagName)
                }
              />
            )}

            {showActions && (
              <div className={messageActionsClasses}>
                <AddTag
                  onToggleTag={(tagName: string) =>
                    handleToggleTagInternal(msg.id, tagName)
                  }
                  onAddNewGlobalTag={onAddNewGlobalTag}
                  currentTagsOnMessage={
                    msg.tags?.map((t) => t.tagName) || []
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

export default MessageList;
