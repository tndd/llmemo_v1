// components/views/StatsView.tsx
import clsx from "clsx";
import React from 'react';

const StatsView: React.FC = () => {
  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <h2 className={titleClasses}>Stats View</h2>
      </div>
      <div className={contentClasses}>
        {/* 統計情報の内容 */}
      </div>
    </div>
  );
};

export default StatsView;

const containerClasses = clsx("flex flex-col flex-grow h-full bg-white");
const headerClasses = clsx("flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white");
const titleClasses = clsx("text-xl font-semibold");
const contentClasses = clsx("p-6");