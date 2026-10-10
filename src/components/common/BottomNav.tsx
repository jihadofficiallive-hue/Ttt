import React from 'react';
import { Home, Tv, Search, User, Shield, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, isAdmin } = useApp();

  const navItems = [
    { id: 'home', label: 'হোম', icon: Home },
    { id: 'livetv', label: 'লাইভ টিভি', icon: Tv, badge: 'LIVE' },
    { id: 'search', label: 'সার্চ', icon: Search },
    { id: 'profile', label: 'প্রোফাইল', icon: User },
    { id: 'admin', label: 'অ্যাডমিন', icon: Shield, highlight: isAdmin },
    { id: 'architecture', label: 'আর্কিটেকচার', icon: Layers, isSpec: true }
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0E1118]/90 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex items-center justify-around select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative group cursor-pointer ${
              isActive ? 'text-[#E50914]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
              {'badge' in item && item.badge && (
                <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full bg-red-600 text-white font-extrabold text-[8px] animate-pulse">
                  {item.badge}
                </span>
              )}
            </div>

            <span
              className={`text-[10px] mt-0.5 tracking-tight ${
                isActive ? 'font-bold text-white' : 'font-medium'
              }`}
            >
              {item.label}
            </span>

            {/* Active Indicator Underline */}
            {isActive && (
              <span className="absolute -bottom-1 w-5 h-0.5 bg-[#E50914] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
