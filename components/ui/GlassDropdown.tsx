import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';

export interface DropdownItem {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'danger' | 'warning' | 'primary' | 'highlight';
  hasSeparatorAfter?: boolean;
}

interface GlassDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
}

const GlassDropdown: React.FC<GlassDropdownProps> = ({ trigger, items, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);

  // Variant styles matching the requested design language
  const getItemStyles = (variant: DropdownItem['variant'] = 'default') => {
    switch (variant) {
      case 'primary': // "Login as Admin" style (Orange text per Image 1)
        return isDarkMode 
          ? "text-orange-500 hover:bg-orange-500/10" 
          : "text-orange-600 hover:bg-orange-50";
      case 'highlight': // "Send Reminder" style (Blue background per Image 2)
        return isDarkMode
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20 border-transparent"
            : "bg-blue-500 text-white hover:bg-blue-600 shadow-md border-transparent";
      case 'danger':
        return isDarkMode 
          ? "text-red-400 hover:bg-red-500/10 hover:text-red-300" 
          : "text-red-600 hover:bg-red-50";
      case 'warning':
        return isDarkMode 
          ? "text-amber-400 hover:bg-amber-500/10" 
          : "text-amber-600 hover:bg-amber-50";
      default:
        return isDarkMode 
          ? "text-gray-200 hover:bg-white/10 hover:text-white" 
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900";
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggle} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div 
          className={`
            absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-60 z-[100]
            transform transition-all duration-200 origin-top-right
            animate-in fade-in zoom-in-95
            rounded-2xl
            
            /* Glassmorphism Styles matching Image 2 & App Theme */
            backdrop-blur-xl
            border
            
            ${isDarkMode 
              ? 'bg-gray-900/80 border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)]' 
              : 'bg-white/80 border-white/60 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.2)]'
            }
          `}
        >
          {/* Inner Glow Container */}
          <div className={`
             rounded-2xl overflow-hidden p-2
             ${isDarkMode ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_0_20px_rgba(249,115,22,0.05)]' : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'}
          `}>
            {items.map((item, index) => {
               const Icon = item.icon;
               const isHighlight = item.variant === 'highlight';
               
               return (
                <div key={index}>
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group
                      ${getItemStyles(item.variant)}
                      ${isHighlight ? '' : 'border border-transparent'}
                    `}
                  >
                    <Icon size={16} strokeWidth={2} className={isHighlight ? 'text-white' : 'opacity-70 group-hover:opacity-100 transition-opacity'} />
                    {item.label}
                  </button>
                  
                  {item.hasSeparatorAfter && (
                    <div className={`my-1.5 h-px mx-3 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200/60'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlassDropdown;