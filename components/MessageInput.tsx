// components/MessageInput.tsx
import React from 'react';

interface MessageInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ inputValue, onInputChange, onSendMessage }) => {
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Message #general"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={onInputChange}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;