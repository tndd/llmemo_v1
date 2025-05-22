// components/SidebarLayout.tsx
import clsx from "clsx";
import React from "react";

interface SidebarLayoutProps {
  children?: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
}) => {
  const sidebarClasses = clsx(
    "flex flex-col w-[256px] flex-shrink-0",
    "bg-[rgb(75,60,75)] text-white",
  );

  return <div className={sidebarClasses}>{children}</div>;
};

export default SidebarLayout;
