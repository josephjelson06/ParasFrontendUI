import React, { useState } from 'react';
import { Search, Download, FileText, Plus, MoreHorizontal, MapPin, Monitor, LogIn, ExternalLink, Edit, Trash2 } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import GlassDropdown from './ui/GlassDropdown';
import AddHotelModal from './AddHotelModal';
import { useTheme } from './ThemeProvider';

interface HotelsProps {
  onNavigate: (route: string) => void;
}

// Mock Data matching Image 1
const hotels = [
  { id: 1, name: "Royal Orchid Bangalore", location: "Bangalore", plan: "Advanced", kiosks: 4, status: "active" },
  { id: 2, name: "Lemon Tree Premier", location: "Mumbai", plan: "Standard", kiosks: 2, status: "suspended" },
  { id: 3, name: "Ginger Hotel, Panjim", location: "Panjim", plan: "Standard", kiosks: 1, status: "active" },
  { id: 4, name: "Sayaji Hotel", location: "Indore", plan: "Advanced", kiosks: 0, status: "onboarding" },
  { id: 5, name: "Taj Palace", location: "New Delhi", plan: "Advanced", kiosks: 3, status: "active" },
  { id: 6, name: "ITC Maratha", location: "Mumbai", plan: "Advanced", kiosks: 2, status: "active" },
  { id: 7, name: "Radisson Blu", location: "Chennai", plan: "Standard", kiosks: 2, status: "active" },
  { id: 8, name: "Marriott Suites", location: "Hyderabad", plan: "Advanced", kiosks: 3, status: "active" },
  { id: 9, name: "Holiday Inn", location: "Pune", plan: "Standard", kiosks: 1, status: "active" },
  { id: 10, name: "The Leela Palace", location: "Udaipur", plan: "Advanced", kiosks: 2, status: "active" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    active: "text-emerald-700 dark:text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    suspended: "text-gray-800 dark:text-gray-500 bg-gray-500/10 border-gray-500/20",
    onboarding: "text-amber-700 dark:text-amber-500 bg-amber-500/10 border-amber-500/20",
  };
  
  const dots = {
    active: "bg-emerald-600 dark:bg-emerald-500",
    suspended: "bg-gray-600 dark:bg-gray-500",
    onboarding: "bg-amber-600 dark:bg-amber-500",
  };

  const s = status as keyof typeof styles;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${styles[s]} w-fit`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[s]} shadow-[0_0_8px_currentColor]`}></span>
      <span className="text-xs font-bold uppercase tracking-wide">{status}</span>
    </div>
  );
};

const Hotels: React.FC<HotelsProps> = ({ onNavigate }) => {
  const { isDarkMode } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="p-8 space-y-8 min-h-screen pb-20">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Hotels Registry</h1>
          <p className="text-sm text-gray-800 dark:text-gray-400">Manage hotel tenants and subscriptions</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:transform hover:scale-105 transition-all duration-200"
        >
          <Plus size={18} />
          Add Hotel
        </button>
      </div>

      {/* Controls / Filter Bar */}
      <GlassCard className="flex flex-col md:flex-row gap-4 items-center justify-between" noPadding>
        <div className="p-2 w-full md:w-auto flex-1">
             <div className="relative group w-full md:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-800 dark:text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2.5 border-none rounded-xl bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Search hotels..."
                />
            </div>
        </div>
        <div className="flex items-center gap-2 p-2 pr-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-gray-300 dark:hover:border-white/10">
                <FileText size={14} />
                Export PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-gray-300 dark:hover:border-white/10">
                <Download size={14} />
                Export Excel
            </button>
        </div>
      </GlassCard>

      {/* List Header */}
      <div className="px-6 grid grid-cols-12 gap-4 text-xs font-bold text-gray-800 dark:text-gray-500 uppercase tracking-wider">
        <div className="col-span-4 md:col-span-3">Hotel Name</div>
        <div className="col-span-2 hidden md:block">Location</div>
        <div className="col-span-2 hidden md:block">Plan</div>
        <div className="col-span-2 hidden md:block">Kiosks</div>
        <div className="col-span-3 md:col-span-2">Status</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {/* Hotel List Items */}
      <div className="space-y-3">
        {hotels.map((hotel) => (
          <div 
            key={hotel.id}
            onClick={() => onNavigate('hotel-details')}
            className="
              group relative grid grid-cols-12 gap-4 items-center p-4 rounded-3xl cursor-pointer
              
              /* Base Glass & Blur */
              backdrop-blur-md
              
              /* Light Mode Styles: Visible border + Soft Inner Glow + Drop Shadow */
              bg-white/40 
              border border-white/60
              shadow-[0_4px_12px_rgba(0,0,0,0.03),inset_0_0_15px_rgba(255,255,255,0.4),inset_0_1px_0_rgba(255,255,255,0.7)]
              
              /* Dark Mode Styles: Subtle Border + Sharp Top Highlight + Volume Glow (ORANGE TINTED) */
              dark:bg-white/5
              dark:border-white/20
              dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_0_30px_rgba(249,115,22,0.1)]

              /* Hover Effects */
              hover:border-white/80 dark:hover:border-white/30 
              hover:shadow-[0_8px_20px_rgba(0,0,0,0.06),inset_0_0_20px_rgba(255,255,255,0.6)] 
              dark:hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_0_40px_rgba(249,115,22,0.15)]
              
              transition-all duration-300 ease-out hover:-translate-y-1
              z-0 hover:z-10
            "
          >
            {/* Name Column */}
            <div className="col-span-4 md:col-span-3 flex items-center gap-4">
              {/* Icon Placeholder */}
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                ${isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-blue-100 text-blue-800'}
              `}>
                <span className="font-bold text-lg">{hotel.name.charAt(0)}</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-orange-500 transition-colors">{hotel.name}</span>
            </div>

            {/* Location */}
            <div className="col-span-2 hidden md:flex items-center gap-2 text-sm text-gray-800 dark:text-gray-400">
                <MapPin size={14} className="text-gray-600 dark:text-gray-400" />
                {hotel.location}
            </div>

            {/* Plan */}
            <div className="col-span-2 hidden md:block text-sm font-medium text-gray-900 dark:text-gray-300">
                {hotel.plan}
            </div>

            {/* Kiosks */}
            <div className="col-span-2 hidden md:flex items-center gap-2">
                <Monitor size={14} className={hotel.kiosks > 0 ? "text-emerald-700 dark:text-emerald-500" : "text-gray-400"} />
                <span className={`text-lg font-bold ${hotel.kiosks > 0 ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
                    {hotel.kiosks}
                </span>
            </div>

            {/* Status */}
            <div className="col-span-3 md:col-span-2">
                <StatusBadge status={hotel.status} />
            </div>

            {/* Actions: Glass Dropdown Implementation */}
            <div className="col-span-1 flex justify-end relative" onClick={(e) => e.stopPropagation()}>
                <GlassDropdown 
                    trigger={
                         <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    }
                    items={[
                        { icon: LogIn, label: 'Login as Admin', onClick: () => console.log('Login', hotel.id), variant: 'primary', hasSeparatorAfter: true },
                        { icon: ExternalLink, label: 'View Details', onClick: () => onNavigate('hotel-details') },
                        { icon: Edit, label: 'Edit Hotel', onClick: () => console.log('Edit', hotel.id), hasSeparatorAfter: true },
                        { icon: Trash2, label: 'Delete', onClick: () => console.log('Delete', hotel.id), variant: 'danger' },
                    ]}
                />
            </div>

          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-4 pt-4 text-xs text-gray-800 dark:text-gray-400">
        <span>Showing 1 to 10 of 12 results</span>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <span>Rows:</span>
                <select className="bg-transparent border-none focus:ring-0 font-bold text-gray-900 dark:text-gray-300">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
            <div className="flex gap-1">
                <button className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded">&lt;</button>
                <span className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded text-gray-900 dark:text-white font-bold">1 / 2</span>
                <button className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded">&gt;</button>
            </div>
        </div>
      </div>

      {/* Add Hotel Modal */}
      <AddHotelModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

    </div>
  );
};

export default Hotels;