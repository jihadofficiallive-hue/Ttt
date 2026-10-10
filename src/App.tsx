import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { TopBar } from './components/common/TopBar';
import { BottomNav } from './components/common/BottomNav';
import { HomeScreen } from './components/home/HomeScreen';
import { LiveTvScreen } from './components/livetv/LiveTvScreen';
import { SearchScreen } from './components/search/SearchScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { AdminPortal } from './components/admin/AdminPortal';
import { ArchitectureDeliverables } from './components/architecture/ArchitectureDeliverables';
import { MovieDetailsModal } from './components/movie/MovieDetailsModal';
import { VideoPlayerModal } from './components/video/VideoPlayerModal';
import { GoogleAuthModal } from './components/auth/GoogleAuthModal';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, toasts } = useApp();
  const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState(false);

  return (
    <DeviceFrame>
      <div className="relative min-h-full flex flex-col bg-[#0D0F12] text-slate-100">
        {/* Sticky Top Bar */}
        <TopBar onOpenGoogleAuth={() => setIsGoogleAuthOpen(true)} />

        {/* Dynamic Route Content */}
        <main className="flex-1">
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'livetv' && <LiveTvScreen />}
          {activeTab === 'search' && <SearchScreen />}
          {activeTab === 'profile' && (
            <ProfileScreen onOpenGoogleAuth={() => setIsGoogleAuthOpen(true)} />
          )}
          {activeTab === 'admin' && <AdminPortal />}
          {activeTab === 'architecture' && <ArchitectureDeliverables />}
        </main>

        {/* Bottom Navigation */}
        <BottomNav />

        {/* Overlays & Modals */}
        <MovieDetailsModal />
        <VideoPlayerModal />
        <GoogleAuthModal
          isOpen={isGoogleAuthOpen}
          onClose={() => setIsGoogleAuthOpen(false)}
        />

        {/* Global Toast Notifications */}
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-sm px-4">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold backdrop-blur-xl border transition-all pointer-events-auto animate-fadeIn ${
                toast.type === 'success'
                  ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/30'
                  : toast.type === 'error'
                  ? 'bg-red-950/90 text-red-200 border-red-500/30'
                  : 'bg-[#181C26]/90 text-slate-200 border-white/10'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 size={15} className="text-emerald-400" />}
              {toast.type === 'error' && <AlertCircle size={15} className="text-red-400" />}
              {toast.type === 'info' && <Info size={15} className="text-cyan-400" />}
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
