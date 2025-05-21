// components/settings/SettingsView.tsx
import clsx from "clsx";
import React from 'react';

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

const containerClasses = clsx("flex flex-col flex-grow h-full bg-white p-6");
const titleClasses = clsx("text-xl font-semibold mb-4");
