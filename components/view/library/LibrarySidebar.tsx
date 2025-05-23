// components/library/LibrarySidebar.tsx
"use client";

import clsx from "clsx";
import React from "react";
import SidebarLayout from "@/components/SidebarLayout";

interface LibrarySidebarProps {
  allTags: Set<string>;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

const LibrarySidebar: React.FC<LibrarySidebarProps> = ({
  allTags,
  selectedTag,
  onSelectTag,
}) => {
  const headerClasses = clsx(
    "flex items-center justify-center h-16",
    "border-b border-gray-700", // Assuming dark theme for sidebar like MainSidebar
  );

  const linkClasses = clsx(
    "block px-4 py-2 rounded text-sm", // Adjusted padding/text size
    "hover:bg-gray-700", // Assuming dark theme
    "text-gray-200", // Assuming dark theme text color
  );

  const allMessagesSelected = selectedTag === null;

  return (
    <SidebarLayout>
      <div className={headerClasses}>
        <span className="text-xl font-semibold text-white">
          Library
        </span>
      </div>
      <div className="flex-grow p-4 space-y-1 overflow-y-auto">
        <a
          href="#"
          className={clsx(
            linkClasses,
            "flex items-center space-x-2",
            {
              "font-bold bg-gray-600 text-white":
                allMessagesSelected,
            },
          )}
          onClick={(e) => {
            e.preventDefault();
            onSelectTag(null);
          }}
        >
          <span>📚</span>
          <span>All Messages</span>
        </a>

        <div className="mt-4 mb-2 pl-2 text-sm font-medium text-gray-400">
          Tags
        </div>

        {allTags.size === 0 ? (
          <p className="text-gray-400 text-sm px-4">
            No tags yet.
          </p>
        ) : (
          Array.from(allTags)
            .sort()
            .map((tag) => (
              <a
                key={tag}
                href="#"
                className={clsx(linkClasses, "pl-6", {
                  "font-bold bg-gray-600 text-white":
                    tag === selectedTag,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTag(tag);
                }}
              >
                {tag}
              </a>
            ))
        )}
      </div>
    </SidebarLayout>
  );
};

export default LibrarySidebar;
