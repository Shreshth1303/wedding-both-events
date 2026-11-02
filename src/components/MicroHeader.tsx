import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { EVENTS_DATA } from '../data/invitationData';
import { ambientAudio, type AudioState } from '../utils/audio';

interface MicroHeaderProps {
  // Navigation is strictly section-based for visitors
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const target = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}

export const MicroHeader: React.FC<MicroHeaderProps> = () => {
  const [nikahTime, setNikahTime] = useState<TimeLeft>(() => calculateTimeLeft(EVENTS_DATA.nikah.isoDate));
  const [receptionTime, setReceptionTime] = useState<TimeLeft>(() => calculateTimeLeft(EVENTS_DATA.reception.isoDate));
  const [audioState, setAudioState] = useState<AudioState>(() => ambientAudio.getState());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeEvent, setActiveEvent] = useState<'nikah' | 'reception'>('nikah');

  // Synchronize audio playback state with single AmbientAudioController instance
  useEffect(() => {
    const unsubscribe = ambientAudio.subscribe((state) => {
      setAudioState(state);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNikahTime(calculateTimeLeft(EVENTS_DATA.nikah.isoDate));
      setReceptionTime(calculateTimeLeft(EVENTS_DATA.reception.isoDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Automatic gentle toggle on mobile every 6 seconds if user hasn't tapped
  useEffect(() => {
    const autoSwitcher = setInterval(() => {
      setActiveEvent(prev => (prev === 'nikah' ? 'reception' : 'nikah'));
    }, 6000);
    return () => clearInterval(autoSwitcher);
  }, []);

  const handleAudioToggle = () => {
    ambientAudio.togglePlay();
  };

  const pad = (n: number) => (n < 10 ? '0' + n : n);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1A1D20]/95 backdrop-blur-md text-[#F5F2EB] border-b border-[rgba(179,139,89,0.25)] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-13 sm:h-14 flex items-center justify-between gap-3 text-xs">
        
        {/* Left: Brand Monogram & Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a 
            href="#hero" 
            className="flex items-center gap-2 text-inherit no-underline group"
          >
            <span className="w-7 h-7 rounded-full border border-[#B38B59] flex items-center justify-center font-serif text-xs font-bold text-[#B38B59] group-hover:bg-[#B38B59] group-hover:text-[#1A1D20] transition-all shadow-xs">
              J&amp;S
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#B38B59] leading-none">
                Folio 2027 // Chronicle
              </span>
              <span className="font-serif tracking-wider text-xs sm:text-[13px] text-[#F5F2EB]/95 font-medium">
                Jassim &amp; Shifa
              </span>
            </div>
          </a>
        </div>

        {/* Center: Live Dual-Timezone Countdown Clocks (Strict No-Wrap Layout) */}
        <div className="shrink-0 flex items-center justify-center">
          
          {/* Desktop Display (lg+): Side-by-Side Dual Badges */}
          <div className="hidden lg:flex items-center gap-3 bg-[#121416] px-3.5 py-1.5 rounded-full border border-[rgba(179,139,89,0.3)] shadow-inner">
            {/* Nikah Display */}
            <div className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B38B59] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B38B59]" />
              </span>
              <span className="text-[#B38B59] font-bold uppercase tracking-wider text-[10px]">Nikah:</span>
              <span className="text-white font-mono tracking-tight tabular-nums font-medium">
                {nikahTime.days}d {pad(nikahTime.hours)}h {pad(nikahTime.minutes)}m {pad(nikahTime.seconds)}s
              </span>
              <span className="text-[9px] text-[#B38B59]/70 uppercase tracking-widest">Nashik</span>
            </div>

            <div className="w-[1px] h-3.5 bg-[rgba(179,139,89,0.35)]" />

            {/* Reception Display */}
            <div className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[#CFAB7A] font-bold uppercase tracking-wider text-[10px]">Reception:</span>
              <span className="text-white font-mono tracking-tight tabular-nums font-medium">
                {receptionTime.days}d {pad(receptionTime.hours)}h {pad(receptionTime.minutes)}m {pad(receptionTime.seconds)}s
              </span>
              <span className="text-[9px] text-[#CFAB7A]/70 uppercase tracking-widest">Thane</span>
            </div>
          </div>

          {/* Tablet & Mobile Clean Horizontal Badges with Interactive Tap */}
          <div className="flex lg:hidden items-center bg-[#121416] border border-[rgba(179,139,89,0.35)] rounded-full px-2.5 sm:px-3 py-1 shadow-sm whitespace-nowrap">
            <button
              onClick={() => setActiveEvent(prev => (prev === 'nikah' ? 'reception' : 'nikah'))}
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none text-[10px] sm:text-[11px] font-mono tracking-tight"
              title="Tap to switch countdown between Nikah & Reception"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  activeEvent === 'nikah' ? 'bg-[#B38B59]' : 'bg-emerald-400'
                } opacity-75`} />
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                  activeEvent === 'nikah' ? 'bg-[#B38B59]' : 'bg-emerald-500'
                }`} />
              </span>

              <span className="text-[#B38B59] uppercase font-bold tracking-wider text-[9px] sm:text-[10px]">
                {activeEvent === 'nikah' ? 'Nikah (Nashik)' : 'Reception (Thane)'}:
              </span>

              <span className="text-white tabular-nums font-medium">
                {activeEvent === 'nikah'
                  ? `${nikahTime.days}d ${pad(nikahTime.hours)}h ${pad(nikahTime.minutes)}m ${pad(nikahTime.seconds)}s`
                  : `${receptionTime.days}d ${pad(receptionTime.hours)}h ${pad(receptionTime.minutes)}m ${pad(receptionTime.seconds)}s`
                }
              </span>

              <span className="text-[9px] text-[#B38B59]/70 ml-0.5 opacity-80 hover:opacity-100">
                ↻
              </span>
            </button>
          </div>

        </div>

        {/* Right: Nav Links & Audio Ambiance */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Desktop Nav Links (Clean, visitor-facing sections only) */}
          <nav className="hidden xl:flex items-center gap-5 text-[10px] uppercase font-mono tracking-[0.16em] text-[#F5F2EB]/70">
            <a href="#nikah" className="hover:text-[#B38B59] transition-colors">01. Nikah</a>
            <a href="#reception" className="hover:text-[#B38B59] transition-colors">02. Reception</a>
            <a href="#concierge" className="hover:text-[#B38B59] transition-colors">03. Destination Guide</a>
          </nav>

          {/* Audio Ambiance Controller */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer select-none ${
              audioState.isPlaying 
                ? 'bg-[#B38B59]/20 border-[#B38B59] text-[#B38B59] shadow-[0_0_12px_rgba(179,139,89,0.25)]' 
                : 'border-[rgba(179,139,89,0.3)] text-stone-400 hover:text-stone-200'
            }`}
            title={audioState.isPlaying ? "Pause background music" : "Play Canon in D background music"}
            aria-label={audioState.isPlaying ? "Pause melodious background music" : "Play melodious background music"}
          >
            {audioState.isPlaying ? (
              <>
                <Volume2 size={14} className="shrink-0" />
                <span className="flex items-end gap-[2px] h-2.5" aria-hidden="true">
                  <span className="w-[2px] h-2 bg-[#B38B59] animate-pulse rounded-full" />
                  <span className="w-[2px] h-3 bg-[#B38B59] animate-pulse rounded-full" style={{ animationDelay: '180ms' }} />
                  <span className="w-[2px] h-1.5 bg-[#B38B59] animate-pulse rounded-full" style={{ animationDelay: '360ms' }} />
                </span>
                <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-wider text-[#B38B59]">
                  Melody
                </span>
              </>
            ) : (
              <>
                <VolumeX size={14} className="shrink-0" />
                <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-wider text-stone-400">
                  Music
                </span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-1.5 text-[#F5F2EB] hover:text-[#B38B59] transition-colors cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Strictly visitor-facing legitimate sections) */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#1A1D20] border-t border-[rgba(179,139,89,0.2)] px-4 py-3 flex flex-col gap-2.5 font-mono text-xs uppercase tracking-wider text-[#F5F2EB]/80 animate-fadeIn">
          <a 
            href="#nikah" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-2 hover:text-[#B38B59] flex items-center justify-between border-b border-white/5"
          >
            <span>01. Nikah</span>
            <span className="text-[10px] text-[#B38B59]">Nashik</span>
          </a>
          <a 
            href="#reception" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-2 hover:text-[#B38B59] flex items-center justify-between border-b border-white/5"
          >
            <span>02. Reception</span>
            <span className="text-[10px] text-[#B38B59]">Thane</span>
          </a>
          <a 
            href="#concierge" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-2 hover:text-[#B38B59] border-b border-white/5"
          >
            03. Destination &amp; Travel Guide
          </a>
        </div>
      )}
    </header>
  );
};
