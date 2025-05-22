// components/IconSidebar.tsx
import { View } from "@/types";
import clsx from "clsx";
import React from "react";

interface IconSidebarProps {
  onViewChange: (view: View) => void;
}

const IconSidebar: React.FC<IconSidebarProps> = ({
  onViewChange,
}) => {
  const sidebarClasses = clsx(
    "flex flex-col items-center w-16 py-4 space-y-3 flex-shrink-0",
    "bg-gray-800 text-white",
  );
  const iconClasses = clsx(
    "w-10 h-10 bg-gray-700 rounded-lg",
    "flex items-center justify-center cursor-pointer",
    "hover:bg-gray-600",
  );

  return (
    <div className={sidebarClasses}>
      <div
        onClick={() => onViewChange("home")}
        className={iconClasses}
      >
        H
      </div>{" "}
      {/* Home */}
      <div
        onClick={() => onViewChange("library")}
        className={iconClasses}
      >
        L
      </div>{" "}
      {/* Library */}
      <div
        onClick={() => onViewChange("stats")}
        className={iconClasses}
      >
        S
      </div>{" "}
      {/* Stats */}
      <div
        onClick={() => onViewChange("settings")}
        className={iconClasses}
      >
        Set
      </div>{" "}
      {/* Settings */}
      <div className={clsx(iconClasses, "mt-auto")}>+</div>{" "}
      {/* Add */}
    </div>
  );
};

export default IconSidebar;
