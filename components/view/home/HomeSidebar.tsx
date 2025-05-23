// components/home/HomeSidebar.tsx
import clsx from "clsx";
import React from "react";
import { Memo } from "@/lib/types"; // Added Memo

import SidebarLayout from "@/components/SidebarLayout";

interface HomeSidebarProps {
  memos?: Memo[];
  activeMemoId?: string | null;
  onCreateNewMemo?: () => void;
  onSelectMemo?: (memoId: string) => void;
}

const HomeSidebar: React.FC<HomeSidebarProps> = ({
  memos = [],
  activeMemoId = null,
  onCreateNewMemo,
  onSelectMemo,
}) => {
  const headerClasses = clsx(
    "flex items-center justify-center h-16",
    "border-b border-gray-700",
  );

  const inputClasses = clsx(
    "w-full px-3 py-2 border border-gray-600 rounded-md text-sm",
    "bg-gray-700 text-white placeholder-gray-400",
    "focus:outline-none focus:border-blue-500",
  );

  const linkClasses = (isActive: boolean) => clsx(
    "block px-2 py-1 rounded truncate", // Added truncate for long titles
    "hover:bg-gray-700",
    isActive ? "bg-gray-600 font-semibold" : "",
  );


  return (
    <SidebarLayout>
      <div className={headerClasses}>
        <span className="text-xl font-semibold">LLMemo</span>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Memos..." // Updated placeholder
          className={inputClasses}
        />
      </div>
      <div className="flex-grow p-4 space-y-2 overflow-y-auto">
        {/* New Memo Button */}
        <button 
          className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          onClick={onCreateNewMemo} // Use passed in handler
        >
          + New Memo
        </button>
        
        {/* Memos List */}
        {memos.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">
              All Memos
            </h3>
            <ul className="space-y-1">
              {memos.map((memo) => (
                <li key={memo.id}>
                  <button 
                    className={linkClasses(memo.id === activeMemoId) + " w-full text-left"} // Added w-full and text-left for button behavior
                    onClick={() => onSelectMemo?.(memo.id)}
                    title={memo.title} // Added title attribute for full title on hover
                  >
                    {memo.title || "(Untitled Memo)"} 
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No memos yet. Create one!</p>
        )}

        {/* Dummy sections removed */}
      </div>
    </SidebarLayout>
  );
};

export default HomeSidebar;
