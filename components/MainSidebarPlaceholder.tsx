// components/MainSidebarPlaceholder.tsx
import React from 'react';

interface MainSidebarPlaceholderProps {
  children?: React.ReactNode;
}

const MainSidebarPlaceholder: React.FC<MainSidebarPlaceholderProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-64 bg-slate-800 text-white">
      {children}
    </div>
  );
};

export default MainSidebarPlaceholder;