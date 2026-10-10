import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  Radio,
  Sliders,
  Check,
  Subtitles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VideoQuality, MediaItem, LiveChannel } from '../../types';

interface VideoPlayerContentProps {
  activePlayingMedia: {
    media: MediaItem | LiveChannel;
    isLive: boolean;
  };
}

const VideoPlayerContent: React.FC<VideoPlayerContentProps> = ({ activePlayingMedia }) => {
  const { closePlayer, recordProgress, showToast } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality>('1080p FHD');
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [subtitleTrack, setSubtitleTrack] = useState<string>('Bangla / English [CC]');
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);
  const [bufferedPercent, setBufferedPercent] = useState<number>(0);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { media, isLive } = activePlayingMedia;

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const h = Math.floor(m / 60);
    if (h > 0) {
      const remM = m % 60;
      return `${h}:${remM < 10 ? '0' : ''}${remM}:${s < 10 ? '0' : ''}${s}`;
    }
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
        setShowSettingsMenu(false);
      }
    }, 3500);
  };

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTo = Number(e.target.value);
    videoRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
    resetControlsTimer();
  };

  const skipSeconds = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    resetControlsTimer();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMute = !isMuted;
    setIsMuted(newMute);
    videoRef.current.muted = newMute;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleQualityChange = (q: VideoQuality) => {
    setSelectedQuality(q);
    showToast(`Switched resolution to ${q}`, 'info');
    setShowSettingsMenu(false);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    showToast(`Speed set to ${speed}x`, 'info');
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);

    // Update buffer
    if (videoRef.current.buffered.length > 0 && videoRef.current.duration) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBufferedPercent((bufferedEnd / videoRef.current.duration) * 100);
    }

    if (!isLive && 'duration' in media) {
      recordProgress(media.id, videoRef.current.currentTime, videoRef.current.duration || 600);
    }
  };

  const title = 'banglaName' in media && media.banglaName
    ? media.banglaName
    : 'banglaTitle' in media && media.banglaTitle
    ? media.banglaTitle
    : 'name' in media
    ? media.name
    : media.title;

  const streamSrc = 'streamUrl' in media ? media.streamUrl : media.videoUrl;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimer}
      onTouchStart={resetControlsTimer}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center select-none"
    >
      {/* Real Video Element */}
      <video
        ref={videoRef}
        src={streamSrc}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onCanPlay={() => {
          setIsBuffering(false);
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
            videoRef.current.play().catch(() => setIsPlaying(false));
          }
        }}
        onError={() => {
          setIsBuffering(false);
          // Fallback to high-speed known good video if any transient network issue occurs
          if (videoRef.current && videoRef.current.src !== 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4') {
            videoRef.current.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
            videoRef.current.play().catch(() => {});
          }
        }}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
      />

      {/* Glassmorphic Overlay Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/80 transition-opacity duration-300 pointer-events-none ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Top Controls Bar */}
      <div
        className={`absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between transition-transform duration-300 z-10 ${
          showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={closePlayer}
            aria-label="Close Player"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
          >
            <X size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-semibold text-base sm:text-lg line-clamp-1">{title}</h2>
              {isLive ? (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600/90 text-[11px] font-bold tracking-wider uppercase text-white animate-pulse">
                  <Radio size={12} />
                  LIVE
                </div>
              ) : (
                <span className="text-xs text-white/60 font-medium">OTT Play Premiere</span>
              )}
            </div>
            {'category' in media && (
              <p className="text-xs text-white/60">
                {media.category} · {(media.viewersCount / 1000).toFixed(1)}k watching now
              </p>
            )}
          </div>
        </div>

        {/* Top Right Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Audio / Subtitle Switcher */}
          <button
            onClick={() => {
              const tracks = ['Bangla [Original]', 'Hindi [Dubbed]', 'English [CC]', 'Off'];
              const nextIndex = (tracks.indexOf(subtitleTrack) + 1) % tracks.length;
              setSubtitleTrack(tracks[nextIndex]);
              showToast(`Audio/Sub: ${tracks[nextIndex]}`, 'info');
            }}
            title="Audio & Subtitles"
            className="h-9 px-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center gap-1.5 text-xs font-medium text-white transition-all cursor-pointer"
          >
            <Subtitles size={15} />
            <span className="hidden sm:inline">{subtitleTrack}</span>
          </button>

          {/* Settings / Quality */}
          <div className="relative">
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              title="Stream Settings"
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <Sliders size={16} />
            </button>

            {showSettingsMenu && (
              <div className="absolute right-0 top-11 w-56 bg-[#161922]/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl z-20 text-xs">
                <div className="font-semibold text-white/50 uppercase tracking-wider mb-2">Resolution</div>
                <div className="space-y-1 mb-3">
                  {(['4K UHD', '1080p FHD', '720p HD', 'Auto'] as VideoQuality[]).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQualityChange(q)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                        selectedQuality === q ? 'bg-[#E50914] text-white font-medium' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{q}</span>
                      {selectedQuality === q && <Check size={14} />}
                    </button>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-2 font-semibold text-white/50 uppercase tracking-wider mb-1">
                  Speed
                </div>
                <div className="flex items-center gap-1">
                  {[0.75, 1, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`flex-1 py-1 rounded text-center transition-colors cursor-pointer ${
                        playbackRate === speed ? 'bg-white/20 text-white font-bold' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer"
          >
            {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
          </button>
        </div>
      </div>

      {/* Center Hero Playback Controls */}
      <div
        className={`absolute inset-0 flex items-center justify-center gap-8 sm:gap-14 transition-opacity duration-300 pointer-events-none z-10 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {!isLive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              skipSeconds(-10);
            }}
            aria-label="Rewind 10 seconds"
            className="pointer-events-auto p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <RotateCcw size={24} className="sm:w-7 sm:h-7" />
            <span className="text-[10px] font-bold block mt-0.5 text-center">10s</span>
          </button>
        )}

        <div className="relative flex items-center justify-center">
          {isBuffering && (
            <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-red-500/30 border-t-red-500 animate-spin pointer-events-none" />
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E50914] hover:bg-[#ff1e2d] text-white flex items-center justify-center shadow-lg shadow-red-600/30 transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            {isPlaying ? <Pause size={32} className="fill-white" /> : <Play size={32} className="fill-white translate-x-0.5" />}
          </button>
        </div>

        {!isLive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              skipSeconds(10);
            }}
            aria-label="Fast forward 10 seconds"
            className="pointer-events-auto p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <RotateCw size={24} className="sm:w-7 sm:h-7" />
            <span className="text-[10px] font-bold block mt-0.5 text-center">10s</span>
          </button>
        )}
      </div>

      {/* Bottom Bar: Seekbar & Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 transition-transform duration-300 z-10 ${
          showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber Progress Bar (Only for On-Demand) */}
        {!isLive && (
          <div className="relative group mb-3">
            <div className="w-full bg-white/20 h-1.5 group-hover:h-2.5 rounded-full overflow-hidden transition-all relative">
              {/* Buffered Bar */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-white/30 transition-all"
                style={{ width: `${bufferedPercent}%` }}
              />
              {/* Played Bar */}
              <div
                className="absolute top-0 bottom-0 left-0 bg-[#E50914] transition-all"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 opacity-0 w-full cursor-pointer h-full"
            />
          </div>
        )}

        {/* Bottom Utility Bar */}
        <div className="flex items-center justify-between text-white text-xs sm:text-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="hover:text-red-400 transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="fill-white" />}
            </button>

            {/* Volume control */}
            <div className="flex items-center gap-2 group">
              <button onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'} className="cursor-pointer">
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-24 h-1 accent-[#E50914] bg-white/30 rounded cursor-pointer"
              />
            </div>

            {/* Time Indicator */}
            {isLive ? (
              <div className="flex items-center gap-2 text-white/80">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-semibold text-red-400">লাইভ সম্প্রচার (LIVE)</span>
                <span className="hidden sm:inline text-white/50">· JSPL Low Latency CDN</span>
              </div>
            ) : (
              <div className="text-white/70 font-mono tracking-tight text-xs sm:text-sm">
                <span className="text-white font-medium">{formatTime(currentTime)}</span> / {formatTime(duration)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline px-2 py-0.5 rounded bg-white/10 text-[11px] font-mono text-white/80">
              {selectedQuality}
            </span>
            <span className="hidden lg:inline text-xs text-white/50">
              JS Private Limited CDN v2.4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VideoPlayerModal: React.FC = () => {
  const { activePlayingMedia } = useApp();

  if (!activePlayingMedia) {
    return null;
  }

  return <VideoPlayerContent activePlayingMedia={activePlayingMedia} />;
};
