// components/MainSidebar.tsx
import clsx from "clsx";
import React from "react";

import MainSidebarLayout from "../MainSidebarLayout";

interface MainSidebarProps {
  allTags: Set<string>;
  selectedTag: string | null;
  onSelectTag: (tag: string) => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ allTags, selectedTag, onSelectTag }) => {
  const headerClasses = clsx(
    "flex items-center justify-center h-16",
    "border-b border-gray-700",
  );

  const inputClasses = clsx(
    "w-full px-3 py-2 border border-gray-600 rounded-md text-sm",
    "bg-gray-700 text-white placeholder-gray-400",
    "focus:outline-none focus:border-blue-500",
  );

  const linkClasses = clsx("block px-2 py-1 rounded", "hover:bg-gray-700");

  const dmLinkClasses = clsx(
    "flex items-center space-x-2 px-2 py-1 rounded",
    "hover:bg-gray-700",
  );

  return (
    <MainSidebarLayout>
      <div className={headerClasses}>
        <span className="text-xl font-semibold">LLMemo</span>
      </div>
      <div className="p-4">
        <input type="text" placeholder="Search" className={inputClasses} />
      </div>
      <div className="flex-grow p-4 space-y-2 overflow-y-auto">
        {/* Channels */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">
            Channels
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className={linkClasses}>
                # general
              </a>
            </li>
            <li>
              <a href="#" className={linkClasses}>
                # random
              </a>
            </li>
            <li>
              <a href="#" className={linkClasses}>
                # announcements
              </a>
            </li>
          </ul>
        </div>
        {/* Direct Messages */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">
            Direct Messages
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className={dmLinkClasses}>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Alice</span>
              </a>
            </li>
            <li>
              <a href="#" className={dmLinkClasses}>
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span>Bob</span>
              </a>
            </li>
          </ul>
        </div>
        {/* Tags */}
        {allTags.size > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">
              Tags
            </h3>
            <ul className="space-y-1">
              {Array.from(allTags).map(tag => (
                <li key={tag}>
                  <a
                    href="#"
                    className={clsx(linkClasses, { 'font-bold bg-gray-600': tag === selectedTag })}
                    onClick={(e) => { e.preventDefault(); onSelectTag(tag); }}
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* User Info Section Removed */}
    </MainSidebarLayout>
  );
};

export default MainSidebar;
