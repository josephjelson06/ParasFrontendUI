import React from 'react';
import GlassCard from './ui/GlassCard';
import { Building, Monitor, Zap, TrendingUp, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import CheckInTrend from './charts/CheckInTrend';
import SystemHealth from './charts/SystemHealth';
import KioskStatus from './charts/KioskStatus';
import AlertList from './AlertList';
import QuickAccess from './QuickAccess';
import GlassDatePicker from './ui/GlassDatePicker';

const StatCard = ({ title, value, sub, subColor, icon: Icon, iconColor }: any) => (
  <GlassCard className="flex flex-col justify-between h-32 relative group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-bold text-gray-600 dark:text-gray-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-2.5 rounded-lg ${iconColor} bg-opacity-10 text-opacity-100`}>
        <Icon size={20} className={iconColor.replace('bg-', 'text-')} />
      </div>
    </div>
    <div>
        <p className={`text-xs font-semibold ${subColor} flex items-center gap-1`}>
            {sub}
        </p>
    </div>
  </GlassCard>
);

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 min-h-screen pb-20">
      
      {/* Welcome & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Good evening, Admin</h1>
            <p className="text-sm text-gray-700 dark:text-gray-400">Sunday, February 8 • 1 items need attention</p>
        </div>
        
        {/* New Glass Date Picker replaces old buttons */}
        <div className="flex items-center gap-3 z-20">
            <GlassDatePicker />
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Hotels" 
            value="12" 
            sub="9 active" 
            subColor="text-gray-600" 
            icon={Building} 
            iconColor="bg-blue-500"
        />
        <StatCard 
            title="Active Kiosks" 
            value="18" 
            sub="↗ 13 ↘ 2" 
            subColor="text-emerald-600 dark:text-green-400" 
            icon={Monitor} 
            iconColor="bg-emerald-500"
        />
        <StatCard 
            title="AI Adoption" 
            value="74%" 
            sub="Guests using AI kiosk" 
            subColor="text-emerald-600 dark:text-green-400" 
            icon={Zap} 
            iconColor="bg-amber-500"
        />
        <StatCard 
            title="Check-ins Today" 
            value="198" 
            sub="+8% vs yesterday" 
            subColor="text-purple-600 dark:text-purple-400" 
            icon={TrendingUp} 
            iconColor="bg-purple-500"
        />
      </div>

      {/* Middle Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-80">
        <GlassCard className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Check-in Trend</h3>
                <button className="text-xs text-emerald-600 dark:text-orange-500 font-medium hover:text-emerald-700 dark:hover:text-orange-400">View Details &gt;</button>
            </div>
            <div className="flex-1 min-h-0">
                <CheckInTrend />
            </div>
        </GlassCard>
        
        <GlassCard className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">System Health</h3>
                <button className="text-xs text-emerald-600 dark:text-orange-500 font-medium hover:text-emerald-700 dark:hover:text-orange-400">View Fleet &gt;</button>
            </div>
            <div className="flex-1 min-h-0">
                <SystemHealth />
            </div>
        </GlassCard>

        <GlassCard className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Kiosk Status</h3>
                <button className="text-xs text-emerald-600 dark:text-orange-500 font-medium hover:text-emerald-700 dark:hover:text-orange-400">Manage &gt;</button>
            </div>
            <div className="flex-1 min-h-0">
                <KioskStatus />
            </div>
            {/* Custom Legend - Re-implemented outside chart for better control */}
            <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-orange-500"></span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Online</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-white/20"></span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Offline</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-white/60"></span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Warning</span>
                </div>
            </div>
        </GlassCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-80">
            <AlertList />
        </div>
        <div className="lg:col-span-2 h-80">
            <QuickAccess />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;