// components/MainSidebarLayout.tsx
import clsx from "clsx";
import React from "react";

interface MainSidebarLayoutProps {
  children?: React.ReactNode;
}

const MainSidebarLayout: React.FC<MainSidebarLayoutProps> = ({
  children,
}) => {
  const sidebarClasses = clsx(
    "flex flex-col w-[256px] flex-shrink-0",
    "bg-[rgb(75,60,75)] text-white",
  );

  return <div className={sidebarClasses}>{children}</div>;
};

export default MainSidebarLayout;
