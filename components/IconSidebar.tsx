// components/IconSidebar.tsx
import React from 'react';

const IconSidebar: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-16 bg-gray-800 text-white py-4 space-y-3">
      {/* Placeholder for icons - replace with actual icons later */}
      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">H</div> {/* Home */}
      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">D</div> {/* DMs */}
      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">A</div> {/* Activity */}
      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">L</div> {/* Later */}
      <div className="mt-auto w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">+</div> {/* Add */}
    </div>
  );
};

export default IconSidebar;