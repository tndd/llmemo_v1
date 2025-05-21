// components/views/LibraryView.tsx
import {
  containerClasses,
  contentClasses,
  headerClasses,
  titleClasses,
} from "@/styles";
import React from "react";
import MainSidebarLayout from "../MainSidebarLayout";

const LibraryView: React.FC = () => {
  return (
    <>
      <MainSidebarLayout />
      {/* Existing LibraryView content */}
      <div className={containerClasses}>
        <div className={headerClasses}>
          <h2 className={titleClasses}>Library View</h2>
        </div>
        <div className={contentClasses}>
          {/* Placeholder for Library content */}
        </div>
      </div>
    </>
  );
};

export default LibraryView;
