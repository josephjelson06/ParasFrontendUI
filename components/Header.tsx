import React from 'react';
import { Search, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-6 bg-transparent">
      
      {/* Search Bar - styled to match Main Panel Look */}
      <div className="relative w-96 hidden md:block group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-orange-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-3 border-none rounded-2xl leading-5 bg-white dark:bg-black/40 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-orange-500/20 sm:text-sm transition-all shadow-sm"
          placeholder="Search for anything..."
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-xl text-gray-500 dark:text-gray-300 bg-white dark:bg-black/40 hover:shadow-md transition-all duration-300"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-3 rounded-xl text-gray-500 dark:text-gray-300 bg-white dark:bg-black/40 hover:shadow-md transition-all duration-300">
          <Bell size={20} />
          <span className="absolute top-2.5 right-3 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-black" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-white dark:border-gray-600 shadow-sm">
                 <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="Profile" />
            </div>
            <ChevronDown size={16} className="text-gray-400" />
        </div>

      </div>
    </header>
  );
};

export default Header;