import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  MonitorSmartphone, 
  FileText, 
  CreditCard, 
  Receipt, 
  BarChart3, 
  Users, 
  Shield, 
  History, 
  Settings, 
  HelpCircle, 
  User,
  Zap,
  LogOut
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active = false,
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean,
  onClick?: () => void
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
      flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-200 group
      ${active 
        ? 'bg-white text-blue-600 shadow-md dark:bg-white/10 dark:text-white dark:shadow-none dark:border-l-4 dark:border-orange-500 dark:rounded-r-2xl dark:rounded-l-none' 
        : 'text-gray-700 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-white/5'
      }
    `}>
      <Icon size={20} className={active ? 'text-blue-600 dark:text-orange-500' : 'group-hover:scale-110 transition-transform text-gray-600 dark:text-gray-400'} />
      <span className={`text-sm font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
    </div>
  );
}

const SidebarSection = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="px-4 text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3 opacity-80">
      {title}
    </h3>
    <div className="space-y-1.5">
      {children}
    </div>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate }) => {
  return (
    /* Removed shadow-xl to allow CSS var(--glass-shadow) to control the glow */
    <aside className="hidden lg:flex flex-col w-72 h-full sidebar-glass rounded-[2.5rem] border border-white/20 z-20 transition-all duration-300">
      <div className="p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3 mb-10 px-2 mt-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 dark:shadow-orange-500/20 transition-colors">
            <Zap size={22} fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">ATC Admin</span>
        </div>

        {/* User Card */}
        <div className="bg-white/40 dark:bg-white/5 rounded-2xl p-4 mb-8 border border-white/40 dark:border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-blue-600 dark:text-gray-300 shadow-inner">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1">
            <SidebarSection title="Main">
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={currentRoute === 'dashboard'} 
              onClick={() => onNavigate('dashboard')}
            />
            <SidebarItem 
              icon={Building2} 
              label="Hotels" 
              active={currentRoute === 'hotels'} 
              onClick={() => onNavigate('hotels')}
            />
            <SidebarItem icon={MonitorSmartphone} label="Kiosk Fleet" />
            </SidebarSection>

            <SidebarSection title="Finance">
            <SidebarItem 
              icon={FileText} 
              label="Plans" 
              active={currentRoute === 'plans'}
              onClick={() => onNavigate('plans')} 
            />
            <SidebarItem icon={CreditCard} label="Subscriptions" />
            <SidebarItem icon={Receipt} label="Invoices" />
            <SidebarItem icon={BarChart3} label="Reports" />
            </SidebarSection>

            <SidebarSection title="Settings">
            <SidebarItem icon={Users} label="Team" />
            <SidebarItem icon={Shield} label="Access" />
            </SidebarItem> 
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200/30 dark:border-white/10">
            <div className="cursor-pointer flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
                <LogOut size={20} />
                <span className="text-sm font-medium">Log Out</span>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;