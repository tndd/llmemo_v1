// components/MainSidebarLayout.tsx
import React from 'react';

interface MainSidebarLayoutProps {
  children?: React.ReactNode;
}

// TODO: home側sidebarの幅が変わってしまうのを解決する

const MainSidebarLayout: React.FC<MainSidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-[256px] bg-[rgb(75,60,75)] text-white">
      {children}
    </div>
  );
};

export default MainSidebarLayout;