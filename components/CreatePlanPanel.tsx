import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Plus, Trash2, Check, ChevronDown, Sparkles, AlertCircle } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface CreatePlanPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type EntitlementType = 'text' | 'number' | 'toggle';

interface Entitlement {
  id: string;
  name: string;
  value: string | boolean;
  type: EntitlementType;
  locked?: boolean; // For default fields like Kiosks/Users
}

const CreatePlanPanel: React.FC<CreatePlanPanelProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  // Unified Entitlements State
  const [entitlements, setEntitlements] = useState<Entitlement[]>([
    { id: '1', name: 'Max Kiosks', value: '5', type: 'number', locked: true },
    { id: '2', name: 'Max Users', value: '2', type: 'number', locked: true },
    { id: '3', name: 'Storage Limit', value: '10GB', type: 'text', locked: true },
    { id: '4', name: 'Email Support', value: true, type: 'toggle' },
    { id: '5', name: 'Basic Reporting', value: true, type: 'toggle' },
    { id: '6', name: 'API Access', value: false, type: 'toggle' },
  ]);

  const [newEntitlementName, setNewEntitlementName] = useState('');

  useEffect(() => {
    if (isOpen) setIsVisible(true);
    else setTimeout(() => setIsVisible(false), 300); // Wait for slide out
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const handleUpdateEntitlement = (id: string, newValue: string | boolean) => {
    setEntitlements(prev => prev.map(e => e.id === id ? { ...e, value: newValue } : e));
  };

  const handleAddEntitlement = () => {
    if (newEntitlementName.trim()) {
      setEntitlements([...entitlements, {
        id: Date.now().toString(),
        name: newEntitlementName.trim(),
        value: true,
        type: 'toggle'
      }]);
      setNewEntitlementName('');
    }
  };

  const handleDeleteEntitlement = (id: string) => {
    setEntitlements(prev => prev.filter(e => e.id !== id));
  };

  // Styles matched to reference image (clean table rows, dark theme optimization)
  const inputClass = `w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 text-sm font-medium border
    ${isDarkMode 
      ? 'bg-black/20 border-white/10 text-white placeholder-gray-500 focus:bg-black/40 focus:border-orange-500/50' 
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10'
    }`;
    
  const labelClass = `block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const sectionHeaderClass = `text-sm font-bold flex items-center gap-2 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`;
  
  // Table Row Styles
  const rowClass = `flex items-center justify-between py-4 border-b last:border-0 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`;

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[9998] transition-opacity duration-300 ${isOpen ? 'opacity-100 bg-black/60 backdrop-blur-sm' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div 
        className={`
          fixed inset-y-0 right-0 z-[9999] w-full max-w-md 
          transform transition-transform duration-300 ease-out shadow-2xl
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          backdrop-blur-xl
          ${isDarkMode 
            ? 'bg-[#09090b]/90 border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]' 
            : 'bg-white/90 border-l border-white/40 shadow-[-10px_0_40px_rgba(0,0,0,0.1)]'
          }
        `}
      >
        <div className="h-full flex flex-col relative overflow-hidden">
            
            {/* Header */}
            <div className={`px-6 py-5 border-b shrink-0 flex items-center justify-between
                ${isDarkMode ? 'border-white/10' : 'border-gray-200/50'}
            `}>
                <div>
                    <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create New Plan</h2>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Configure pricing tiers and entitlements.</p>
                </div>
                <button 
                  onClick={onClose} 
                  className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <X size={20} />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                
                {/* Plan Identity */}
                <section>
                    <div className={sectionHeaderClass}>
                        <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-100 text-blue-600'}`}>
                           <Sparkles size={14} />
                        </div>
                        <span>Plan Details</span>
                    </div>
                    
                    <div className="space-y-5">
                        <div>
                            <label className={labelClass}>Plan Name <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="e.g. Enterprise Gold" className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea rows={2} placeholder="Short description..." className={`${inputClass} resize-none`} />
                        </div>
                    </div>
                </section>

                {/* Pricing Card */}
                <section className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white/50 border-gray-100 shadow-sm'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <label className={labelClass}>Monthly Price <span className="text-red-500">*</span></label>
                        <div className="flex items-center gap-1">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-100 text-blue-600'}`}>INR</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>₹</span>
                            <input type="number" placeholder="0.00" className={`${inputClass} pl-8 text-lg font-bold`} />
                        </div>
                         <div className="relative w-32">
                             <select className={`${inputClass} appearance-none cursor-pointer bg-transparent`}>
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
                        </div>
                    </div>
                </section>

                {/* Unified Entitlements Table (Matches Image 2 Style) */}
                <section>
                    <div className={sectionHeaderClass}>
                         <span>Plan Entitlements</span>
                    </div>
                    
                    <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className="px-5">
                            {entitlements.map((item) => (
                                <div key={item.id} className={rowClass}>
                                    <div className="flex items-center gap-3">
                                        {!item.locked && (
                                            <button 
                                                onClick={() => handleDeleteEntitlement(item.id)}
                                                className="text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                            {item.name}
                                        </span>
                                    </div>

                                    {/* Right Side Control */}
                                    <div className="flex items-center justify-end w-32">
                                        {item.type === 'toggle' ? (
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only peer" 
                                                    checked={item.value as boolean} 
                                                    onChange={(e) => handleUpdateEntitlement(item.id, e.target.checked)}
                                                />
                                                <div className={`
                                                  w-9 h-5 bg-gray-600/50 peer-focus:outline-none rounded-full peer 
                                                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                                                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                                                  after:h-4 after:w-4 after:transition-all 
                                                  ${isDarkMode ? 'peer-checked:bg-orange-500' : 'peer-checked:bg-blue-600'}
                                                `}></div>
                                            </label>
                                        ) : (
                                            <input 
                                                type={item.type} 
                                                value={item.value as string}
                                                onChange={(e) => handleUpdateEntitlement(item.id, e.target.value)}
                                                className={`
                                                    w-full text-right bg-transparent border-none focus:ring-0 p-0 text-sm font-bold
                                                    ${isDarkMode ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'}
                                                `}
                                                placeholder="Unlimited"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Add New Row */}
                            <div className={`flex items-center gap-2 py-3 ${isDarkMode ? 'border-t border-white/10' : 'border-t border-gray-100'}`}>
                                <Plus size={16} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                                <input 
                                    type="text" 
                                    value={newEntitlementName}
                                    onChange={(e) => setNewEntitlementName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddEntitlement()}
                                    placeholder="Add new feature..." 
                                    className={`bg-transparent border-none focus:ring-0 text-sm w-full p-0 ${isDarkMode ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'}`}
                                />
                                {newEntitlementName && (
                                    <button 
                                        onClick={handleAddEntitlement}
                                        className={`text-xs font-bold uppercase px-2 py-1 rounded ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
                                    >
                                        Add
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Active Toggle */}
                 <div className={`p-5 rounded-2xl flex items-center justify-between border 
                    ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <div>
                        <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Active Plan</h4>
                        <p className="text-xs text-gray-500 mt-1">Visible to customers during checkout</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className={`
                          w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                          dark:bg-gray-700 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                          ${isDarkMode ? 'peer-checked:bg-orange-500' : 'peer-checked:bg-blue-600'}
                        `}></div>
                    </label>
                </div>

            </div>

            {/* Footer */}
            <div className={`px-6 py-4 border-t shrink-0 flex justify-end gap-3
                ${isDarkMode ? 'border-white/10 bg-black/20' : 'border-gray-200/50 bg-white/50'}
            `}>
                <button 
                  onClick={onClose} 
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    Cancel
                </button>
                <button 
                  onClick={onClose}
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-white text-black' : 'bg-gray-900'}`}
                >
                    Save Plan
                </button>
            </div>
            
        </div>
      </div>
    </>
  , document.body);
};

export default CreatePlanPanel;