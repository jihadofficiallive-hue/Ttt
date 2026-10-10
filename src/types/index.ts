export type ContentType = 'movie' | 'series' | 'live_tv';

export type VideoQuality = '4K UHD' | '1080p FHD' | '720p HD' | '480p SD' | 'Auto';

export interface CastMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface MediaItem {
  id: string;
  title: string;
  banglaTitle?: string;
  type: 'movie' | 'series';
  subCategory?: 'bangla_movie' | 'hindi_movie' | 'bangla_natok' | 'international';
  description: string;
  backdropUrl: string;
  posterUrl: string;
  videoUrl: string;
  duration: string; // e.g. "2h 14m" or "3 Seasons"
  releaseYear: number;
  rating: string; // e.g. "U/A 16+", "PG-13", "TV-MA"
  imdbRating: number;
  genres: string[];
  languages: string[];
  cast: CastMember[];
  director: string;
  isTrending?: boolean;
  isTop10?: boolean;
  top10Rank?: number;
  isFeatured?: boolean;
  seasonsCount?: number;
  tags?: string[];
}

export interface EPGProgram {
  id: string;
  title: string;
  timeSlot: string;
  startTime: string; // "14:00"
  endTime: string;   // "16:00"
  progressPercent: number; // 0-100
  description: string;
}

export interface LiveChannel {
  id: string;
  name: string;
  banglaName?: string;
  country?: 'Bangladesh' | 'International';
  category: 'News' | 'Sports' | 'Entertainment' | 'Movies' | 'Kids' | 'Music';
  logoUrl: string;
  streamUrl: string;
  resolution: string;
  currentProgram: EPGProgram;
  upcomingPrograms: EPGProgram[];
  viewersCount: number;
  isLive: boolean;
  language: string;
}

export interface ContinueWatchingItem {
  mediaId: string;
  progressSeconds: number;
  totalDurationSeconds: number;
  lastWatchedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'google' | 'guest';
  planTier: 'OTT Play VIP' | 'Premium 4K Ultra' | 'Free Pass';
  autoPlayNext: boolean;
  streamQuality: VideoQuality;
  downloadQuality: 'High (1080p)' | 'Standard (720p)';
  parentalLock: boolean;
  createdAt: string;
}

export interface DownloadItem {
  id: string;
  mediaId: string;
  title: string;
  posterUrl: string;
  fileSizeBytes: number; // e.g. 1.4 GB
  quality: string;
  downloadedAt: string;
  progressPercent: number; // 100 for completed
}

export interface AdminAnalytics {
  activeUsersNow: number;
  totalSubscribers: number;
  liveBandwidthGbps: number;
  totalStreams: number;
  peakConcurrent: number;
  todayViews: number;
}
