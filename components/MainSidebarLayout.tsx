// components/MainSidebarLayout.tsx
import React from 'react';

interface MainSidebarLayoutProps {
  children?: React.ReactNode;
}

const MainSidebarLayout: React.FC<MainSidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-[256px] flex-shrink-0 bg-[rgb(75,60,75)] text-white">
      {children}
    </div>
  );
};

export default MainSidebarLayout;