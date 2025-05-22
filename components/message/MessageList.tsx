import { Message } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import MessageReactions from "./MessageReactions";
import AddReaction from "./AddReaction";

interface MessageListProps {
  messages: Message[];
  selectedTag: string | null;
  onReaction?: (messageId: number, tagName: string) => void;
  onAddNewTag?: (tagName: string) => void;
  availableTags?: string[];
  currentUser?: string;
  showActions?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  selectedTag,
  onReaction,
  onAddNewTag,
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
    ? messages.filter(
        (msg) => msg.tags && msg.tags.includes(selectedTag),
      )
    : messages;

  const handleAddReaction = (
    messageId: number,
    tagName: string
  ): void => {
    onReaction?.(messageId, tagName);
  };

  return (
    <div className={containerClasses}>
      {filteredMessages.map((msg) => (
        <div key={msg.id} className={messageRowClasses}>
          <Image
            src={msg.avatar}
            alt={`${msg.user} Avatar`}
            width={40}
            height={40}
            className={avatarClasses}
          />
          <div className={messageContentClasses}>
            <div className={userRowClasses}>
              <span className={userNameClasses}>{msg.user}</span>
              <span className={timeClasses}>{msg.time}</span>
            </div>
            <p className={textClasses}>{msg.text}</p>

            {msg.reactions && msg.reactions.length > 0 && (
              <MessageReactions
                reactions={msg.reactions || []}
                onReactionClick={(tagName: string) =>
                  handleAddReaction(msg.id, tagName)
                }
                currentUser={currentUser}
              />
            )}

            {showActions && (
              <div className={messageActionsClasses}>
                <AddReaction
                  onAddReaction={(tagName: string) =>
                    handleAddReaction(msg.id, tagName)
                  }
                  currentReactions={
                    msg.reactions?.map((r) => r.tagName) || []
                  }
                  availableTags={availableTags}
                  onAddNewTag={onAddNewTag}
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
