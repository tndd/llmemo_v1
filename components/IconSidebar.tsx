// components/IconSidebar.tsx
import React from 'react';

// Define view types
type View = 'home' | 'library' | 'stats';

interface IconSidebarProps {
  onViewChange: (view: View) => void;
}

const IconSidebar: React.FC<IconSidebarProps> = ({ onViewChange }) => {
  return (
    <div className="flex flex-col items-center w-16 bg-gray-800 text-white py-4 space-y-3 flex-shrink-0">
      {/* Placeholder for icons - replace with actual icons later */}
      <div onClick={() => onViewChange('home')} className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">H</div> {/* Home */}
      <div onClick={() => onViewChange('library')} className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">L</div> {/* Library */}
      <div onClick={() => onViewChange('stats')} className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">S</div> {/* Stats */}
      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">D</div> {/* DMs */}
      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">A</div> {/* Activity */}
      <div className="mt-auto w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">+</div> {/* Add */}
    </div>
  );
};

export default IconSidebar;