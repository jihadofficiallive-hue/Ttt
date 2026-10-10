import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({ isOpen, onClose }) => {
  const { user, loginGoogle, logoutUser } = useApp();
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleQuickGoogleSignIn = (email: string, name: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      loginGoogle(email, name);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const handleCustomSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    setIsSubmitting(true);
    setTimeout(() => {
      loginGoogle(customEmail, customName || customEmail.split('@')[0]);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#161922] border border-white/10 rounded-2xl p-6 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {user ? (
          <div className="text-center py-2">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 ring-2 ring-emerald-500/50">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-white mb-0.5">{user.name}</h3>
            <p className="text-xs text-slate-400 mb-4">{user.email}</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6">
              <CheckCircle size={14} />
              <span>Google Account Connected</span>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  logoutUser();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-semibold border border-red-500/20 transition-colors"
              >
                Sign Out from OTT Play
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Google One-Tap Sign In</h3>
                <p className="text-xs text-slate-400">Stream in 4K UHD across all devices</p>
              </div>
            </div>

            {/* Quick 1-Tap Profiles */}
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Select Google Account
            </p>
            <div className="space-y-2 mb-4">
              <button
                disabled={isSubmitting}
                onClick={() => handleQuickGoogleSignIn('alex.mercer@gmail.com', 'Alex Mercer')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#1E232F] hover:bg-[#252C3A] border border-white/5 hover:border-white/20 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
                    alt="Alex Mercer"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                      Alex Mercer
                    </div>
                    <div className="text-[11px] text-slate-400">alex.mercer@gmail.com</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400">One-Tap</span>
              </button>

              <button
                disabled={isSubmitting}
                onClick={() => handleQuickGoogleSignIn('sarah.connor@gmail.com', 'Sarah Connor')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#1E232F] hover:bg-[#252C3A] border border-white/5 hover:border-white/20 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Sarah Connor"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                      Sarah Connor
                    </div>
                    <div className="text-[11px] text-slate-400">sarah.connor@gmail.com</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400">One-Tap</span>
              </button>
            </div>

            {/* Custom Google account entry */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-3 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Or Use Another Account
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <form onSubmit={handleCustomSignIn} className="space-y-3 mt-2">
              <input
                type="text"
                placeholder="Full Name (optional)"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#101319] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                required
                placeholder="Google Email (e.g., user@gmail.com)"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#101319] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Authenticating with Google OAuth...' : 'Sign In with Google'}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Secured by JS Private Limited Identity Gateway</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
