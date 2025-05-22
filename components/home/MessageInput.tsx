// components/MessageInput.tsx
import React, { useState, useRef, useEffect } from "react";

interface MessageInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onAddTag: (tag: string) => void;
  availableTags: string[];
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
  onAddTag,
  availableTags,
}) => {
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const tagSelectorRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close tag selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagSelectorRef.current && 
        !tagSelectorRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowTagSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredTags = availableTags.filter(tag => 
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const handleTagSelect = (tag: string) => {
    onAddTag(tag);
    setShowTagSelector(false);
    setTagSearch("");
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200 relative">
      <div className="flex items-center">
        <button
          ref={buttonRef}
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setShowTagSelector(!showTagSelector)}
          aria-label="Add tag"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Message #general"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={onInputChange}
          onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onSendMessage}
        >
          Send
        </button>
      </div>
      
      {showTagSelector && (
        <div 
          ref={tagSelectorRef}
          className="absolute bottom-full left-4 mb-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden"
        >
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search tags..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <button
                  key={tag}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                {tagSearch ? 'No matching tags' : 'No tags available'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
