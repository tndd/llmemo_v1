import clsx from "clsx";
import React from "react";
import {
  Memo,
  CategorizedMemos,
  MEMO_DATE_CATEGORIES,
  MemoDateCategory,
} from "@/lib/types";

import SidebarLayout from "@/components/SidebarLayout";

interface HomeSidebarProps {
  categorizedMemos?: CategorizedMemos;
  activeMemoId?: string | null;
  onCreateNewMemo?: () => void;
  onSelectMemo?: (memoId: string) => void;
}

const HomeSidebar: React.FC<HomeSidebarProps> = ({
  categorizedMemos,
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

  const linkClasses = (isActive: boolean) =>
    clsx(
      "block px-2 py-1 rounded truncate",
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
          placeholder="Search Memos..."
          className={inputClasses}
        />
      </div>
      <div className="flex-grow p-4 space-y-2 overflow-y-auto">
        <button
          className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          onClick={onCreateNewMemo}
        >
          + New Memo
        </button>

        {/* Memos List - Uses categorizedMemos exclusively */}
        {categorizedMemos &&
        MEMO_DATE_CATEGORIES.some(
          (category) =>
            categorizedMemos[category] &&
            categorizedMemos[category].length > 0,
        ) ? (
          MEMO_DATE_CATEGORIES.map(
            (category) =>
              categorizedMemos[category] &&
              categorizedMemos[category].length > 0 && (
                <div key={category} className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">
                    {category}
                  </h3>
                  <ul className="space-y-1">
                    {categorizedMemos[category].map((memo) => (
                      <li key={memo.id}>
                        <button
                          className={
                            linkClasses(
                              memo.id === activeMemoId,
                            ) + " w-full text-left"
                          }
                          onClick={() => onSelectMemo?.(memo.id)}
                          title={memo.title}
                        >
                          {memo.title || "(Untitled Memo)"}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
          )
        ) : (
          <p className="text-gray-400 text-sm">
            No memos yet. Create one!
          </p>
        )}

        {/* Dummy sections removed */}
      </div>
    </SidebarLayout>
  );
};

export default HomeSidebar;
