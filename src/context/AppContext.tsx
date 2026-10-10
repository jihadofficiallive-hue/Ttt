import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MediaItem,
  LiveChannel,
  UserProfile,
  ContinueWatchingItem,
  DownloadItem,
  AdminAnalytics
} from '../types';
import {
  INITIAL_MOVIES,
  INITIAL_LIVE_CHANNELS,
  INITIAL_USER,
  INITIAL_ANALYTICS
} from '../data/mockData';

interface ToastState {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface AppContextType {
  // Navigation & Viewport
  activeTab: 'home' | 'livetv' | 'search' | 'profile' | 'admin' | 'architecture';
  setActiveTab: (tab: 'home' | 'livetv' | 'search' | 'profile' | 'admin' | 'architecture') => void;
  viewMode: 'mobile' | 'full';
  setViewMode: (mode: 'mobile' | 'full') => void;

  // Media Collections
  movies: MediaItem[];
  channels: LiveChannel[];
  addMovie: (movie: Omit<MediaItem, 'id'>) => void;
  updateMovie: (id: string, movie: Partial<MediaItem>) => void;
  deleteMovie: (id: string) => void;
  addChannel: (channel: Omit<LiveChannel, 'id'>) => void;
  updateChannel: (id: string, channel: Partial<LiveChannel>) => void;
  deleteChannel: (id: string) => void;

  // Video Playback & Details Modal
  activePlayingMedia: { media: MediaItem | LiveChannel; isLive: boolean } | null;
  playMedia: (media: MediaItem | LiveChannel, isLive?: boolean) => void;
  closePlayer: () => void;
  selectedDetailMedia: MediaItem | null;
  openDetails: (media: MediaItem) => void;
  closeDetails: () => void;

  // User Authentication
  user: UserProfile | null;
  loginGoogle: (customEmail?: string, customName?: string) => void;
  logoutUser: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

  // Admin Authentication
  isAdmin: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Watchlist & History & Downloads
  watchlist: string[];
  toggleWatchlist: (mediaId: string) => void;
  continueWatching: ContinueWatchingItem[];
  recordProgress: (mediaId: string, progressSeconds: number, totalDurationSeconds: number) => void;
  downloads: DownloadItem[];
  addDownload: (media: MediaItem) => void;
  removeDownload: (downloadId: string) => void;

  // Admin Analytics & Toasts
  analytics: AdminAnalytics;
  toasts: ToastState[];
  showToast: (message: string, type?: 'info' | 'success' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  MOVIES: 'ottplay_bd_movies_v7',
  CHANNELS: 'ottplay_bd_channels_v7',
  USER: 'ottplay_user_v2',
  IS_ADMIN: 'ottplay_is_admin_v2',
  WATCHLIST: 'ottplay_bd_watchlist_v7',
  CONTINUE: 'ottplay_bd_continue_v7',
  DOWNLOADS: 'ottplay_bd_downloads_v7',
  VIEW_MODE: 'ottplay_view_mode_v2'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'livetv' | 'search' | 'profile' | 'admin' | 'architecture'>('home');
  const [viewMode, setViewMode] = useState<'mobile' | 'full'>('mobile');

  // Media state with auto-purge of old English catalog
  const [movies, setMovies] = useState<MediaItem[]>(() => {
    try {
      // Clear legacy cache keys from previous versions
      localStorage.removeItem('ottplay_movies_v1');
      localStorage.removeItem('ottplay_movies_v2');
      localStorage.removeItem('ottplay_channels_v1');
      localStorage.removeItem('ottplay_channels_v2');
      localStorage.removeItem('ottplay_watchlist_v2');
      localStorage.removeItem('ottplay_continue_watching_v2');
      localStorage.removeItem('ottplay_downloads_v2');

      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.MOVIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.some((m: any) => m.subCategory === 'bangla_movie')) {
          return parsed;
        }
      }
      return INITIAL_MOVIES;
    } catch {
      return INITIAL_MOVIES;
    }
  });

  const [channels, setChannels] = useState<LiveChannel[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CHANNELS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.some((c: any) => c.country === 'Bangladesh')) {
          return parsed;
        }
      }
      return INITIAL_LIVE_CHANNELS;
    } catch {
      return INITIAL_LIVE_CHANNELS;
    }
  });

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Admin state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEYS.IS_ADMIN) === 'true';
    } catch {
      return false;
    }
  });

  // Watchlist state (default with Bangla & Hindi hits)
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.WATCHLIST);
      return saved ? JSON.parse(saved) : ['ott-bm-01', 'ott-bn-01', 'ott-hm-01'];
    } catch {
      return ['ott-bm-01', 'ott-bn-01', 'ott-hm-01'];
    }
  });

  // Continue Watching state
  const [continueWatching, setContinueWatching] = useState<ContinueWatchingItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CONTINUE);
      return saved ? JSON.parse(saved) : [
        { mediaId: 'ott-bm-01', progressSeconds: 3420, totalDurationSeconds: 8700, lastWatchedAt: 'আজকে' },
        { mediaId: 'ott-bn-01', progressSeconds: 920, totalDurationSeconds: 2200, lastWatchedAt: 'গতকাল' }
      ];
    } catch {
      return [
        { mediaId: 'ott-bm-01', progressSeconds: 3420, totalDurationSeconds: 8700, lastWatchedAt: 'আজকে' }
      ];
    }
  });

  // Downloads state
  const [downloads, setDownloads] = useState<DownloadItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.DOWNLOADS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'dl-1',
          mediaId: 'ott-bm-01',
          title: 'তুফান (Toofan)',
          posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
          fileSizeBytes: 1420000000,
          quality: '1080p FHD',
          downloadedAt: 'আজকে',
          progressPercent: 100
        }
      ];
    } catch {
      return [];
    }
  });

  // Player & Details Modal
  const [activePlayingMedia, setActivePlayingMedia] = useState<{ media: MediaItem | LiveChannel; isLive: boolean } | null>(null);
  const [selectedDetailMedia, setSelectedDetailMedia] = useState<MediaItem | null>(null);

  // Analytics
  const [analytics] = useState<AdminAnalytics>(INITIAL_ANALYTICS);

  // Toasts
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.MOVIES, JSON.stringify(movies));
    } catch (e) {
      console.error(e);
    }
  }, [movies]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CHANNELS, JSON.stringify(channels));
    } catch (e) {
      console.error(e);
    }
  }, [channels]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.IS_ADMIN, isAdmin ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdmin]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CONTINUE, JSON.stringify(continueWatching));
    } catch (e) {
      console.error(e);
    }
  }, [continueWatching]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.DOWNLOADS, JSON.stringify(downloads));
    } catch (e) {
      console.error(e);
    }
  }, [downloads]);

  // Auth Handlers
  const loginGoogle = (customEmail?: string, customName?: string) => {
    const newUser: UserProfile = {
      id: `usr-g-${Date.now().toString(36)}`,
      name: customName || 'Alex Mercer',
      email: customEmail || 'alex.mercer@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      provider: 'google',
      planTier: 'Premium 4K Ultra',
      autoPlayNext: true,
      streamQuality: 'Auto',
      downloadQuality: 'High (1080p)',
      parentalLock: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    showToast(`Signed in successfully as ${newUser.name}`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out of Google account', 'info');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
    showToast('Preferences updated', 'success');
  };

  const loginAdmin = (username: string, pass: string): boolean => {
    // Specs: Initial Admin Username: jspl, Password: 6623
    if (username.trim().toLowerCase() === 'jspl' && pass.trim() === '6623') {
      setIsAdmin(true);
      showToast('Admin Portal Authenticated: Welcome JS Private Limited Ops', 'success');
      return true;
    }
    showToast('Invalid admin credentials. Use username: jspl, pass: 6623', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    showToast('Logged out of Admin Portal', 'info');
  };

  // Movie CRUD
  const addMovie = (newMovieData: Omit<MediaItem, 'id'>) => {
    const id = `ott-${newMovieData.type === 'movie' ? 'm' : 's'}-${Date.now().toString(36)}`;
    const created: MediaItem = { ...newMovieData, id };
    setMovies((prev) => [created, ...prev]);
    showToast(`Added "${created.title}" to catalog`, 'success');
  };

  const updateMovie = (id: string, partial: Partial<MediaItem>) => {
    setMovies((prev) => prev.map((m) => (m.id === id ? { ...m, ...partial } : m)));
    showToast('Media updated successfully', 'success');
  };

  const deleteMovie = (id: string) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
    showToast('Media deleted from catalog', 'info');
  };

  // Channel CRUD
  const addChannel = (newChannelData: Omit<LiveChannel, 'id'>) => {
    const id = `ch-${Date.now().toString(36)}`;
    const created: LiveChannel = { ...newChannelData, id };
    setChannels((prev) => [created, ...prev]);
    showToast(`Added Live Channel "${created.name}"`, 'success');
  };

  const updateChannel = (id: string, partial: Partial<LiveChannel>) => {
    setChannels((prev) => prev.map((c) => (c.id === id ? { ...c, ...partial } : c)));
    showToast('Live Channel updated', 'success');
  };

  const deleteChannel = (id: string) => {
    setChannels((prev) => prev.filter((c) => c.id !== id));
    showToast('Live Channel removed', 'info');
  };

  // Player Handlers
  const playMedia = (media: MediaItem | LiveChannel, isLive = false) => {
    setActivePlayingMedia({ media, isLive });
  };

  const closePlayer = () => {
    setActivePlayingMedia(null);
  };

  const openDetails = (media: MediaItem) => {
    setSelectedDetailMedia(media);
  };

  const closeDetails = () => {
    setSelectedDetailMedia(null);
  };

  // Watchlist
  const toggleWatchlist = (mediaId: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(mediaId);
      if (exists) {
        showToast('Removed from Watchlist', 'info');
        return prev.filter((id) => id !== mediaId);
      } else {
        showToast('Added to Watchlist', 'success');
        return [...prev, mediaId];
      }
    });
  };

  // Continue Watching
  const recordProgress = (mediaId: string, progressSeconds: number, totalDurationSeconds: number) => {
    if (progressSeconds < 5) return;
    setContinueWatching((prev) => {
      const filtered = prev.filter((item) => item.mediaId !== mediaId);
      if (progressSeconds >= totalDurationSeconds - 15) {
        // finished
        return filtered;
      }
      return [
        {
          mediaId,
          progressSeconds,
          totalDurationSeconds,
          lastWatchedAt: 'Just now'
        },
        ...filtered
      ];
    });
  };

  // Downloads
  const addDownload = (media: MediaItem) => {
    const existing = downloads.find((d) => d.mediaId === media.id);
    if (existing) {
      showToast('Already saved in Downloads', 'info');
      return;
    }
    const newDownload: DownloadItem = {
      id: `dl-${Date.now().toString(36)}`,
      mediaId: media.id,
      title: media.title,
      posterUrl: media.posterUrl,
      fileSizeBytes: 1250000000 + Math.floor(Math.random() * 800000000),
      quality: user?.downloadQuality || 'High (1080p)',
      downloadedAt: 'Today',
      progressPercent: 100
    };
    setDownloads((prev) => [newDownload, ...prev]);
    showToast(`Downloaded "${media.title}" for offline playback`, 'success');
  };

  const removeDownload = (downloadId: string) => {
    setDownloads((prev) => prev.filter((d) => d.id !== downloadId));
    showToast('Download removed', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        movies,
        channels,
        addMovie,
        updateMovie,
        deleteMovie,
        addChannel,
        updateChannel,
        deleteChannel,
        activePlayingMedia,
        playMedia,
        closePlayer,
        selectedDetailMedia,
        openDetails,
        closeDetails,
        user,
        loginGoogle,
        logoutUser,
        updateUserProfile,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        watchlist,
        toggleWatchlist,
        continueWatching,
        recordProgress,
        downloads,
        addDownload,
        removeDownload,
        analytics,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
