"use client";
import IconSidebar from '@/components/IconSidebar';
import HomeView from '@/components/home/HomeView';
import LibraryView from '@/components/library/LibraryView';
import StatsView from '@/components/stats/StatsView';
import { useState } from 'react';

// Define view types
type View = 'home' | 'library' | 'stats';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <IconSidebar onViewChange={handleViewChange} />
      {currentView === 'home' && <HomeView />}
      {currentView === 'library' && <LibraryView />}
      {currentView === 'stats' && <StatsView />}
    </div>
  );
}
