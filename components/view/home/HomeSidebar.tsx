// components/home/HomeSidebar.tsx
import clsx from "clsx";
import React from "react";

import SidebarLayout from "@/components/SidebarLayout";

// SidebarProps is now empty or can be removed if no props are needed
interface HomeSidebarProps {}

const HomeSidebar: React.FC<
  HomeSidebarProps
> = (/* props can be removed if HomeSidebarProps is empty */) => {
  const headerClasses = clsx(
    "flex items-center justify-center h-16",
    "border-b border-gray-700",
  );

  const inputClasses = clsx(
    "w-full px-3 py-2 border border-gray-600 rounded-md text-sm",
    "bg-gray-700 text-white placeholder-gray-400",
    "focus:outline-none focus:border-blue-500",
  );

  const linkClasses = clsx(
    "block px-2 py-1 rounded",
    "hover:bg-gray-700",
  );


  return (
    <SidebarLayout>
      <div className={headerClasses}>
        <span className="text-xl font-semibold">LLMemo</span>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          className={inputClasses}
        />
      </div>
      <div className="flex-grow p-4 space-y-2 overflow-y-auto">
        {/* New Memo Button */}
        <button 
          className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          onClick={() => console.log('New memo clicked')}
        >
          + New Memo
        </button>
        
        {/* Today's Memos */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">
            Today
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className={linkClasses}>
                Meeting Notes
              </a>
            </li>
            <li>
              <a href="#" className={linkClasses}>
                Shopping List
              </a>
            </li>
            <li>
              <a href="#" className={linkClasses}>
                Project Ideas
              </a>
            </li>
          </ul>
        </div>

        {/* Yesterday's Memos */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">
            Yesterday
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className={linkClasses}>
                Team Meeting Summary
              </a>
            </li>
            <li>
              <a href="#" className={linkClasses}>
                Code Review Notes
              </a>
            </li>
          </ul>
        </div>

        {/* This Week's Memos */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">
            Week
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className={linkClasses}>
                Project Timeline
              </a>
            </li>
            <li>
              <a href="#" className={linkClasses}>
                Weekly Goals
              </a>
            </li>
            <li>
              <a href="#" className={linkClasses}>
                Learning Resources
              </a>
            </li>
          </ul>
        </div>
        {/* Tags section removed */}
      </div>
      {/* User Info Section Removed */}
    </SidebarLayout>
  );
};

export default HomeSidebar;
