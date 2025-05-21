// components/library/LibrarySidebar.tsx
"use client";

import React from "react";
import clsx from "clsx";
import MainSidebarLayout from "../MainSidebarLayout"; // Path is correct

interface LibrarySidebarProps {
  allTags: Set<string>;
  selectedTag: string | null;
  onSelectTag: (tag: string) => void;
}

const LibrarySidebar: React.FC<LibrarySidebarProps> = ({ allTags, selectedTag, onSelectTag }) => {
  const headerClasses = clsx(
    "flex items-center justify-center h-16",
    "border-b border-gray-700", // Assuming dark theme for sidebar like MainSidebar
  );

  const linkClasses = clsx(
    "block px-4 py-2 rounded text-sm", // Adjusted padding/text size
    "hover:bg-gray-700", // Assuming dark theme
    "text-gray-200", // Assuming dark theme text color
  );

  return (
    <MainSidebarLayout>
      <div className={headerClasses}>
        <span className="text-xl font-semibold text-white">Tags</span> {/* Added text-white for dark theme */}
      </div>
      <div className="flex-grow p-4 space-y-1 overflow-y-auto">
        {allTags.size === 0 && (
          <p className="text-gray-400 text-sm px-4">No tags yet.</p>
        )}
        {Array.from(allTags).sort().map(tag => ( // Added .sort() for consistent order
          <a
            key={tag}
            href="#"
            className={clsx(linkClasses, {
              "font-bold bg-gray-600 text-white": tag === selectedTag, // Example selected style for dark theme
            })}
            onClick={(e) => {
              e.preventDefault();
              onSelectTag(tag);
            }}
          >
            {tag}
          </a>
        ))}
      </div>
    </MainSidebarLayout>
  );
};

export default LibrarySidebar;
