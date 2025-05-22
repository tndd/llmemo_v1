import React, { KeyboardEvent } from "react";
import { FiSend } from "react-icons/fi";

interface MessageInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  className?: string;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
  className = "",
  placeholder = "メッセージを入力...",
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className={`p-4 ${className}`}>
      <div className="flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 focus:outline-none"
        />

        <button
          type="button"
          onClick={onSendMessage}
          disabled={!inputValue.trim()}
          className={`p-2 ${
            inputValue.trim()
              ? "text-blue-500 hover:text-blue-600"
              : "text-gray-400"
          }`}
        >
          <FiSend className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
