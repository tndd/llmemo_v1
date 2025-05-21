// components/views/StatsView.tsx
import React from 'react';
import { containerClasses, contentClasses, headerClasses, titleClasses } from '../common/styles';

const StatsView: React.FC = () => {
  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <h2 className={titleClasses}>Stats View</h2>
      </div>
      <div className={contentClasses}>
        {/* 統計情報の内容 */}
      </div>
    </div>
  );
};

export default StatsView;