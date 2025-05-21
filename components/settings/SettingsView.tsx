// components/settings/SettingsView.tsx
import React from 'react';
import { containerClasses, titleClasses } from '../common/styles';

const SettingsView: React.FC = () => {
  return (
    <div className={containerClasses}>
      <h2 className={titleClasses}>Settings View</h2>
      <p>This is the placeholder for the settings view.</p>
      {/* Future settings options will go here */}
    </div>
  );
};

export default SettingsView;
