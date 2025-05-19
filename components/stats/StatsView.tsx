// components/views/StatsView.tsx
import React from 'react';

const StatsView: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow h-full bg-white">
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-semibold">Stats View</h2>
        <div>{/* Search or other icons removed */}</div>
      </div>
      <div className="p-6">
        {/* Placeholder for Stats content */}
      </div>
    </div>
  );
};

export default StatsView;