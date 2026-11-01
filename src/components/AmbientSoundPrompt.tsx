import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, X } from 'lucide-react';
import { ambientAudio, type AudioState } from '../utils/audio';

export const AmbientSoundPrompt: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioState>(() => ambientAudio.getState());
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = ambientAudio.subscribe((state) => {
      setAudioState(state);
      if (state.isPlaying) {
        setHasInteracted(true);
      }
    });
    return () => unsubscribe();
  }, []);

  // If dismissed and music is paused, allow expanding via small floating icon
  if (isMinimized && !audioState.isPlaying) {
    return (
      <aside aria-label="Audio Controls" className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            setIsMinimized(false);
            ambientAudio.startMusic();
          }}
          className="w-10 h-10 rounded-full bg-[#1A1D20]/95 border border-[#B38B59]/60 text-[#B38B59] flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer group"
          title="Play melodious wedding music"
          aria-label="Play melodious background music"
        >
          <Music size={16} className="group-hover:text-[#F5F2EB]" />
        </button>
      </aside>
    );
  }

  // If autoplay was blocked by the browser, show elegant invitation prompt
  if (audioState.isAutoplayBlocked && !audioState.isPlaying && !hasInteracted) {
    return (
      <aside 
        aria-label="Background Music Notice"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm animate-fadeIn"
      >
        <div className="bg-[#1A1D20]/95 backdrop-blur-md border border-[#B38B59]/70 rounded-xl p-3.5 sm:p-4 shadow-2xl text-[#F5F2EB] flex items-center gap-3">
          <button
            onClick={() => ambientAudio.startMusic()}
            className="w-10 h-10 rounded-full bg-[#B38B59] text-[#1A1D20] flex items-center justify-center shrink-0 hover:bg-[#CFAB7A] transition-colors cursor-pointer shadow-md group"
            title="Enable Melodious Wedding Music"
            aria-label="Start playing melodious background music"
          >
            <Play size={18} className="fill-current ml-0.5 group-hover:scale-110 transition-transform" />
          </button>

          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#B38B59]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38B59] animate-pulse" />
              <span>Wedding Ambiance</span>
            </div>
            <p className="font-serif text-xs text-[#F5F2EB] font-medium truncate mt-0.5">
              Pachelbel's Canon in D
            </p>
            <p className="font-mono text-[9px] text-[#F5F2EB]/65 tracking-tight">
              Tap anywhere or press play to begin
            </p>
          </div>

          <button
            onClick={() => setIsMinimized(true)}
            className="text-[#F5F2EB]/50 hover:text-[#F5F2EB] p-1 rounded-full transition-colors cursor-pointer shrink-0"
            title="Dismiss audio prompt"
            aria-label="Dismiss audio prompt"
          >
            <X size={14} />
          </button>
        </div>
      </aside>
    );
  }

  // Standard Compact Floating Audio Companion
  return (
    <aside 
      aria-label="Background Music Player"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
    >
      <div className="bg-[#1A1D20]/95 backdrop-blur-md border border-[rgba(179,139,89,0.35)] hover:border-[#B38B59] rounded-full pl-3 pr-2 py-1.5 shadow-xl text-[#F5F2EB] flex items-center gap-2.5 transition-all text-xs">
        
        {/* Animated Equalizer Wave / Music Note */}
        <div className="flex items-center gap-1.5 shrink-0">
          {audioState.isPlaying ? (
            <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
              <span className="w-[2px] h-2 bg-[#B38B59] animate-pulse rounded-full" />
              <span className="w-[2px] h-3.5 bg-[#B38B59] animate-pulse rounded-full" style={{ animationDelay: '150ms' }} />
              <span className="w-[2px] h-1.5 bg-[#B38B59] animate-pulse rounded-full" style={{ animationDelay: '300ms' }} />
            </span>
          ) : (
            <Music size={13} className="text-stone-400" />
          )}
        </div>

        {/* Track Title Info */}
        <div className="hidden sm:flex flex-col text-left pr-1 select-none">
          <span className="font-serif text-[11px] text-[#F5F2EB]/95 leading-none">
            Canon in D Major
          </span>
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#B38B59] leading-tight">
            {audioState.isPlaying ? 'Acoustic Strings' : 'Paused'}
          </span>
        </div>

        {/* Controls: Play / Pause */}
        <button
          onClick={() => ambientAudio.togglePlay()}
          className="w-6 h-6 rounded-full bg-[#B38B59]/20 hover:bg-[#B38B59] text-[#B38B59] hover:text-[#1A1D20] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          title={audioState.isPlaying ? 'Pause music' : 'Play melodious music'}
          aria-label={audioState.isPlaying ? 'Pause music' : 'Play melodious music'}
        >
          {audioState.isPlaying ? (
            <Pause size={11} className="fill-current" />
          ) : (
            <Play size={11} className="fill-current ml-0.5" />
          )}
        </button>

        {/* Controls: Mute / Unmute */}
        <button
          onClick={() => ambientAudio.toggleMute()}
          className="text-stone-400 hover:text-[#F5F2EB] p-1 transition-colors cursor-pointer shrink-0"
          title={audioState.isMuted ? 'Unmute' : 'Mute'}
          aria-label={audioState.isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {audioState.isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        </button>

        {/* Optional Minimize */}
        <button
          onClick={() => setIsMinimized(true)}
          className="text-stone-500 hover:text-stone-300 p-0.5 transition-colors cursor-pointer shrink-0"
          title="Minimize player"
          aria-label="Minimize player"
        >
          <X size={12} />
        </button>
      </div>
    </aside>
  );
};
