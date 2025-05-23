// components/views/StatsView.tsx
import {
  containerClasses,
  contentClasses,
  headerClasses,
  titleClasses,
} from "@/lib/styles";
import React from "react";

const StatsView: React.FC = () => {
  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <h2 className={titleClasses}>Stats View</h2>
      </div>
      <div className={contentClasses}>{/* 統計情報の内容 */}</div>
    </div>
  );
};

export default StatsView;
