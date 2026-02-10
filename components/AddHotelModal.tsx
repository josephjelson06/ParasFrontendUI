import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, ChevronDown } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { useTheme } from './ThemeProvider';

interface AddHotelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddHotelModal: React.FC<AddHotelModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation delay for unmounting
  useEffect(() => {
    if (isOpen) setIsVisible(true);
    else setTimeout(() => setIsVisible(false), 200);
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  // Shared Input Style
  const inputClass = `
    w-full px-4 py-3 rounded-xl outline-none transition-all duration-200
    ${isDarkMode 
      ? 'bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:bg-black/40 focus:border-orange-500/50' 
      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10'
    }
  `;

  const labelClass = `block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;

  // Use React Portal to render outside the main application container 
  // to ensure fixed positioning works relative to the viewport.
  return ReactDOM.createPortal(
    <div 
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center p-4
        transition-all duration-300
        ${isOpen ? 'opacity-100 backdrop-blur-sm bg-black/60' : 'opacity-0 pointer-events-none'}
      `}
    >
      {/* Click outside to close (optional, but good UX) */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className={`
          relative w-full max-w-2xl transform transition-all duration-300 z-10
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `}
      >
        <GlassCard className="relative flex flex-col max-h-[90vh] overflow-y-auto shadow-2xl" noPadding>
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Hotel</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            
            {/* Row 1: Name */}
            <div>
              <label className={labelClass}>Hotel Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="e.g., Royal Orchid Bangalore" 
                className={inputClass}
              />
            </div>

            {/* Row 2: Location & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Location <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g., Mumbai, MH" 
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Contact Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  placeholder="e.g., manager@hotel.com" 
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 3: Plan & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className={labelClass}>Plan</label>
                <div className="relative">
                  <select className={`${inputClass} appearance-none cursor-pointer`}>
                    <option>Standard</option>
                    <option>Advanced</option>
                    <option>Enterprise</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              <div className="relative">
                <label className={labelClass}>Status</label>
                <div className="relative">
                  <select className={`${inputClass} appearance-none cursor-pointer`}>
                    <option>Onboarding</option>
                    <option>Active</option>
                    <option>Suspended</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 pt-2 flex items-center justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              className="px-8 py-2.5 rounded-xl text-sm font-bold bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg hover:transform hover:scale-105 transition-all duration-200"
            >
              Add Hotel
            </button>
          </div>

        </GlassCard>
      </div>
    </div>,
    document.body
  );
};

export default AddHotelModal;