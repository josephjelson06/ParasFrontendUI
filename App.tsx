import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Hotels from './components/Hotels';
import HotelDetails from './components/HotelDetails';
import Plans from './components/Plans';
import { ThemeProvider, useTheme } from './components/ThemeProvider';

// Inner component to access theme context
const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentRoute, setCurrentRoute] = useState('dashboard');

  return (
    <div className={`
      flex h-screen w-screen overflow-hidden p-4 gap-4 font-sans transition-all duration-500
      ${isDarkMode ? 'bg-theme-dark' : 'bg-theme-light'}
    `}>
      {/* Floating Sidebar */}
      <Sidebar currentRoute={currentRoute} onNavigate={setCurrentRoute} />
      
      {/* Floating Main Panel containing Header and Dashboard */}
      <main className="flex-1 main-panel-glass rounded-[2.5rem] flex flex-col min-w-0 overflow-hidden relative transition-all duration-300">
        <Header />
        <div className="flex-1 overflow-y-auto scroll-smooth p-2">
          {currentRoute === 'dashboard' && <Dashboard />}
          {currentRoute === 'hotels' && <Hotels onNavigate={setCurrentRoute} />}
          {currentRoute === 'hotel-details' && <HotelDetails onNavigate={setCurrentRoute} />}
          {currentRoute === 'plans' && <Plans />}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;