import React, { useState } from 'react';
import { Check, Monitor, Users, HardDrive, Plus, MoreHorizontal } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import CreatePlanPanel from './CreatePlanPanel';
import { useTheme } from './ThemeProvider';

interface PlanProps {
  name: string;
  price: string;
  description: string;
  kiosks: string;
  users: string;
  storage: string;
  features: string[];
  isPopular?: boolean;
}

const PlanCard: React.FC<PlanProps> = ({ 
  name, 
  price, 
  description, 
  kiosks, 
  users, 
  storage, 
  features, 
  isPopular = false 
}) => {
  const { isDarkMode } = useTheme();

  // Dynamic Styles based on "Popular" status and Theme
  // Dark Mode Popular: Orange Gradient (Image 2 style)
  // Light Mode Popular: Navy Blue (User Request)
  // Standard: Glass Card style
  
  const isHighlighted = isPopular;

  const cardClasses = isHighlighted
    ? isDarkMode
      ? "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 border-orange-400/50 shadow-[0_20px_50px_-10px_rgba(249,115,22,0.3)] text-white"
      : "bg-gradient-to-br from-slate-800 to-slate-950 border-slate-700 shadow-xl text-white"
    : "glass-card hover:bg-white/50 dark:hover:bg-white/10"; // Default Glass

  const titleColor = isHighlighted ? "text-white" : "text-gray-900 dark:text-white";
  const descColor = isHighlighted ? "text-white/80" : "text-gray-500 dark:text-gray-400";
  const subTextColor = isHighlighted ? "text-white/60" : "text-gray-400 dark:text-gray-500";
  const dividerColor = isHighlighted ? "border-white/20" : "border-gray-100 dark:border-white/10";
  const iconColor = isHighlighted ? "text-white" : "text-gray-400 dark:text-gray-500";
  const checkIconColor = isHighlighted 
    ? "text-white" 
    : isDarkMode ? "text-emerald-400" : "text-emerald-500";
  
  const badgeClass = isHighlighted
    ? isDarkMode 
      ? "bg-white text-orange-600" 
      : "bg-white text-slate-900"
    : "hidden";

  return (
    <div className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-300 ${cardClasses} ${isHighlighted ? 'scale-105 z-10' : 'hover:-translate-y-1'}`}>
      
      {/* Top Right Actions / Badge */}
      <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
        <button className={`p-1 rounded-full transition-colors ${isHighlighted ? 'hover:bg-white/20 text-white' : 'text-gray-400 hover:bg-black/5 dark:hover:bg-white/10'}`}>
             <MoreHorizontal size={20} />
        </button>
        {isPopular && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm ${badgeClass}`}>
                Popular
            </span>
        )}
      </div>

      {/* Header */}
      <div className="mb-6 pr-8">
        <h3 className={`text-xl font-bold mb-4 ${titleColor}`}>{name}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className={`text-4xl font-bold ${titleColor}`}>{price}</span>
          <span className={`text-sm ${subTextColor}`}>/monthly</span>
        </div>
        <p className={`text-sm leading-relaxed ${descColor}`}>
          {description}
        </p>
      </div>

      {/* Stats Row */}
      <div className={`grid grid-cols-3 gap-2 py-6 border-t border-b ${dividerColor} mb-6`}>
        {/* Kiosks */}
        <div className="flex flex-col items-center justify-center text-center">
            <Monitor size={20} className={`mb-2 ${iconColor}`} />
            <span className={`text-lg font-bold ${titleColor}`}>{kiosks}</span>
            <span className={`text-[10px] uppercase tracking-wider font-semibold ${subTextColor}`}>Kiosks</span>
        </div>
        {/* Users */}
        <div className="flex flex-col items-center justify-center text-center border-l border-r border-transparent">
             {/* Note: In a real flex/grid, borders between items can be tricky. Simplified here. */}
            <Users size={20} className={`mb-2 ${iconColor}`} />
            <span className={`text-lg font-bold ${titleColor}`}>{users}</span>
            <span className={`text-[10px] uppercase tracking-wider font-semibold ${subTextColor}`}>Users</span>
        </div>
        {/* Storage */}
        <div className="flex flex-col items-center justify-center text-center">
            <HardDrive size={20} className={`mb-2 ${iconColor}`} />
            <span className={`text-lg font-bold ${titleColor}`}>{storage}</span>
            <span className={`text-[10px] uppercase tracking-wider font-semibold ${subTextColor}`}>Storage</span>
        </div>
      </div>

      {/* Features List */}
      <div className="flex-1 space-y-4 mb-8">
        <p className={`text-xs font-bold uppercase tracking-widest opacity-70 mb-4 ${titleColor}`}>Included Features</p>
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className={`mt-0.5 shrink-0 ${checkIconColor}`}>
                <Check size={16} strokeWidth={3} />
            </div>
            <span className={`text-sm font-medium ${isHighlighted ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Decorative Bottom Corner (from Image 1) */}
      <div className={`absolute bottom-0 right-0 p-6 opacity-10 pointer-events-none ${isHighlighted ? 'text-white' : 'text-gray-400'}`}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
      </div>

    </div>
  );
};

const Plans: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);

  return (
    <div className="p-8 space-y-8 min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Subscription Plans</h1>
          <p className="text-sm text-gray-800 dark:text-gray-400">Manage pricing tiers, entitlements, and features.</p>
        </div>
        <button 
          onClick={() => setIsCreatePanelOpen(true)}
          className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:transform hover:scale-105 transition-all duration-200"
        >
          <Plus size={18} />
          Create New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Starter */}
        <PlanCard 
            name="Starter"
            price="₹4,999"
            description="Perfect for small boutique hotels starting with automation."
            kiosks="2"
            users="3"
            storage="10GB"
            features={[
                "Basic Kiosk Mode",
                "Email Support",
                "7-Day Data Retention"
            ]}
        />

        {/* Professional (Highlighted) */}
        <PlanCard 
            name="Professional"
            price="₹12,999"
            description="Advanced features for scaling hotel chains and busy locations."
            kiosks="10"
            users="15"
            storage="100GB"
            isPopular={true}
            features={[
                "Voice AI Enabled",
                "Priority 24/7 Support",
                "90-Day Data Retention",
                "Custom Branding"
            ]}
        />

        {/* Enterprise */}
        <PlanCard 
            name="Enterprise"
            price="₹24,999"
            description="Full-scale solution for luxury properties with complex needs."
            kiosks="50"
            users="999"
            storage="Unlimited"
            features={[
                "Dedicated Account Manager",
                "SLA Guarantee",
                "Unlimited History",
                "API Access",
                "On-premise Deployment"
            ]}
        />

      </div>

      {/* Side Panel for Creating Plans */}
      <CreatePlanPanel 
        isOpen={isCreatePanelOpen}
        onClose={() => setIsCreatePanelOpen(false)}
      />

    </div>
  );
};

export default Plans;