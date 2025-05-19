// components/MainSidebarPlaceholder.tsx
import React from 'react';

interface MainSidebarPlaceholderProps {
  children?: React.ReactNode;
}

const MainSidebarLayout: React.FC<MainSidebarPlaceholderProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-[256px] bg-slate-800 text-white">
      {children}
    </div>
  );
};

export default MainSidebarLayout;