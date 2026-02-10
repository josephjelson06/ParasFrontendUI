import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Globe, 
  Mail, 
  Edit, 
  LogIn, 
  Building2, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText,
  CreditCard,
  Users
} from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { useTheme } from './ThemeProvider';

interface HotelDetailsProps {
  onNavigate: (route: string) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  // Shared logic, locally defined for this view
  const styles = {
    active: "text-emerald-700 dark:text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    suspended: "text-gray-800 dark:text-gray-500 bg-gray-500/10 border-gray-500/20",
  };
  const dots = {
    active: "bg-emerald-600 dark:bg-emerald-500",
    suspended: "bg-gray-600 dark:bg-gray-500",
  };
  const s = status.toLowerCase() as keyof typeof styles;
  const style = styles[s] || styles.active;
  const dot = dots[s] || dots.active;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${style} w-fit`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot} shadow-[0_0_8px_currentColor]`}></span>
      <span className="text-xs font-bold uppercase tracking-wide">{status}</span>
    </div>
  );
};

const MetricCard = ({ label, value, subtext, subColor }: { label: string, value: string, subtext?: string, subColor?: string }) => (
  <GlassCard className="flex flex-col justify-center h-28 relative overflow-hidden group">
    {/* Decorative background glow for Image 1 vibe */}
    <div className="absolute -right-6 -top-6 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl group-hover:bg-orange-500/20 transition-colors duration-500"></div>
    
    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 z-10">{label}</p>
    <div className="flex items-baseline gap-2 z-10">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
        {subtext && <span className={`text-sm font-semibold ${subColor}`}>{subtext}</span>}
    </div>
  </GlassCard>
);

const TimelineItem = ({ 
  color, 
  title, 
  desc, 
  time 
}: { 
  color: 'green' | 'orange' | 'blue', 
  title: string, 
  desc: string, 
  time: string 
}) => {
  const dotColors = {
    green: 'bg-emerald-500 shadow-emerald-500/50',
    orange: 'bg-orange-500 shadow-orange-500/50',
    blue: 'bg-blue-500 shadow-blue-500/50',
  };
  
  return (
    <div className="flex gap-4 relative pb-8 last:pb-0">
      {/* Line */}
      <div className="absolute left-[5px] top-2 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10 last:hidden"></div>
      
      {/* Dot */}
      <div className={`w-3 h-3 mt-1.5 rounded-full shrink-0 ${dotColors[color]} shadow-lg z-10`}></div>
      
      {/* Content */}
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{title}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 leading-relaxed">{desc}</p>
        <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">{time}</span>
      </div>
    </div>
  );
};

const HotelDetails: React.FC<HotelDetailsProps> = ({ onNavigate }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { name: 'Overview', icon: FileText },
    { name: 'Kiosk Fleet', icon: Building2 },
    { name: 'Billing & Invoices', icon: CreditCard },
    { name: 'Support & Team', icon: Users },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Navigation */}
      <button 
        onClick={() => onNavigate('hotels')}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-2 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Registry
      </button>

      {/* Header Card */}
      <GlassCard className="relative overflow-hidden">
        {/* Ambient Glow similar to Image 1 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 relative z-10">
            <div className="flex items-start gap-5">
                {/* Hotel Icon */}
                <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-xl
                    ${isDarkMode ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10' : 'bg-emerald-500 text-white'}
                `}>
                    <Building2 size={32} className={isDarkMode ? 'text-emerald-400' : 'text-white'} />
                </div>
                
                <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Royal Orchid Bangalore</h1>
                        <StatusBadge status="Active" />
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="opacity-70" />
                            <span>Bangalore, KA, Bangalore</span>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <Globe size={14} className="opacity-70" />
                            <span>No website</span>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <Mail size={14} className="opacity-70" />
                            <a href="mailto:ops@royalorchid.com" className="hover:text-blue-500 dark:hover:text-orange-400 transition-colors">ops@royalorchid.com</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <button className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center gap-2">
                    <Edit size={16} />
                    Edit Profile
                </button>
                <button className="px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 bg-gray-900 dark:bg-orange-500 text-white hover:bg-gray-800 dark:hover:bg-orange-600 hover:scale-105 transition-all flex items-center gap-2">
                    <LogIn size={16} />
                    Login as Admin
                </button>
            </div>
        </div>
      </GlassCard>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
            label="Kiosks Online" 
            value="3" 
            subtext="/ 3" 
            subColor="text-gray-400 text-xl" 
        />
        <MetricCard 
            label="Subscription" 
            value="Advanced" 
            subColor="text-emerald-500" // Image 2 has green text for Advanced
        />
         <MetricCard 
            label="Open Tickets" 
            value="1" 
            subtext="" 
            // In Image 2 this is orange
            subColor="text-orange-500"
        />
         <MetricCard 
            label="Total Revenue" 
            value="₹59.0k" 
        />
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-1 gap-2 no-scrollbar">
        {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
                <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300
                        ${isActive 
                            ? (isDarkMode ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-gray-900 text-white shadow-lg') 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10'
                        }
                    `}
                >
                    <Icon size={16} />
                    {tab.name}
                </button>
            );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Contract Details */}
        <GlassCard className="flex flex-col h-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                Contract Details
            </h3>
            
            <div className="space-y-5">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Contract Start</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white font-mono">2024-06-15</span>
                </div>
                 <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Renewal Date</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white font-mono">2025-12-01</span>
                </div>
                 <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Monthly Recurring Revenue</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">₹50,000</span>
                </div>
                 <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Account Manager</span>
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Sarah Jenkins</span>
                </div>
            </div>
        </GlassCard>

        {/* Right Column: Recent Activity */}
        <GlassCard className="flex flex-col h-full">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Recent Activity
            </h3>
            
            <div className="pl-2">
                <TimelineItem 
                    color="green"
                    title="Invoice Paid"
                    desc="Invoice #INV-2024-001 was paid via Bank Transfer."
                    time="2 hours ago"
                />
                <TimelineItem 
                    color="orange"
                    title="Support Ticket Opened"
                    desc='"Kiosk in lobby not printing" reported by Front Desk.'
                    time="Yesterday"
                />
                <TimelineItem 
                    color="blue"
                    title="System Updated"
                    desc="Kiosk firmware auto-updated to v2.4.1"
                    time="3 days ago"
                />
            </div>
        </GlassCard>

      </div>
    </div>
  );
};

export default HotelDetails;