import React from 'react';
import { Wifi, Battery, Monitor, Smartphone, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { viewMode, setViewMode } = useApp();

  if (viewMode === 'full') {
    return <div className="w-full min-h-screen bg-[#0D0F12]">{children}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#07080A] py-6 sm:py-10 px-2 sm:px-4 flex flex-col items-center justify-start overflow-x-hidden">
      {/* Device Toolbar Header */}
      <div className="w-full max-w-sm sm:max-w-md mb-4 flex items-center justify-between px-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-300">iPhone 16 Pro Simulator</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('full')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-[11px]"
          >
            <Monitor size={12} className="text-cyan-400" />
            <span>Switch to Desktop View</span>
          </button>
        </div>
      </div>

      {/* Mobile Device Mockup Shell */}
      <div className="relative w-full max-w-[400px] h-[844px] rounded-[52px] bg-[#161922] p-3 shadow-2xl border-[4px] border-[#2E3444] ring-1 ring-white/10 overflow-hidden flex flex-col">
        {/* Outer Bezel Volume Buttons & Power Button Accents */}
        <div className="absolute -left-[6px] top-28 w-[3px] h-10 bg-[#3F475B] rounded-l-md" />
        <div className="absolute -left-[6px] top-42 w-[3px] h-12 bg-[#3F475B] rounded-l-md" />
        <div className="absolute -right-[6px] top-32 w-[3px] h-16 bg-[#3F475B] rounded-r-md" />

        {/* Screen Bezel & Display Viewport */}
        <div className="relative w-full h-full rounded-[44px] bg-[#0D0F12] overflow-hidden flex flex-col">
          {/* iOS Status Bar */}
          <div className="h-11 bg-transparent flex items-center justify-between px-7 text-white text-[12px] font-semibold select-none z-30 flex-shrink-0">
            <span>9:41</span>

            {/* Dynamic Island */}
            <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600/80 animate-pulse" />
              <div className="flex items-center gap-1 text-[9px] text-white/80 font-mono">
                <span>OTT</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/20" />
            </div>

            <div className="flex items-center gap-1.5 text-white/90">
              <span className="text-[10px] font-bold">5G</span>
              <Wifi size={13} />
              <Battery size={15} />
            </div>
          </div>

          {/* Scrollable Device Content Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {children}
          </div>

          {/* iOS Bottom Home Bar Indicator */}
          <div className="h-5 bg-transparent flex items-center justify-center pointer-events-none z-40 flex-shrink-0">
            <div className="w-32 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Simulator Note */}
      <div className="mt-4 text-center text-xs text-slate-500 max-w-sm">
        Cross-Platform Flutter & React Native Architecture · JS Private Limited
      </div>
    </div>
  );
};
