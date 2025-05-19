// components/MainSidebar.tsx
import React from 'react';

import MainSidebarPlaceholder from '../MainSidebarPlaceholder';

const MainSidebar: React.FC = () => {
  return (
    <MainSidebarPlaceholder>
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <span className="text-xl font-semibold">LLMemo</span>
      </div>
      <div className="p-4">
        <input type="text" placeholder="Search" className="w-full px-3 py-2 border border-gray-600 rounded-md text-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" />
      </div>
      <div className="flex-grow p-4 space-y-2 overflow-y-auto">
        {/* Channels */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">Channels</h3>
          <ul className="space-y-1">
            <li><a href="#" className="block px-2 py-1 rounded hover:bg-gray-700"># general</a></li>
            <li><a href="#" className="block px-2 py-1 rounded hover:bg-gray-700"># random</a></li>
            <li><a href="#" className="block px-2 py-1 rounded hover:bg-gray-700"># announcements</a></li>
          </ul>
        </div>
        {/* Direct Messages */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-1">Direct Messages</h3>
          <ul className="space-y-1">
            <li><a href="#" className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-700"><span className="w-2 h-2 bg-green-500 rounded-full"></span><span>Alice</span></a></li>
            <li><a href="#" className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-700"><span className="w-2 h-2 bg-gray-500 rounded-full"></span><span>Bob</span></a></li>
          </ul>
        </div>
      </div>
      {/* User Info Section Removed */}
    </MainSidebarPlaceholder>
  );
};

export default MainSidebar;