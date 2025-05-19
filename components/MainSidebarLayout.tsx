// components/MainSidebarLayout.tsx
import React from 'react';

interface MainSidebarLayoutProps {
  children?: React.ReactNode;
}

const MainSidebarLayout: React.FC<MainSidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-[256px] bg-slate-800 text-white">
      {children}
    </div>
  );
};

export default MainSidebarLayout;