// ============================================================================
// Luxury Wedding Audio Engine - Melodious Background Soundtrack & SFX
// Single-instance audio manager with HTML5 Audio, graceful autoplay fallback,
// smooth volume ramping, and non-blocking lazy loading.
// ============================================================================

export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  isAutoplayBlocked: boolean;
  volume: number;
  trackTitle: string;
}

type AudioStateListener = (state: AudioState) => void;

class AmbientAudioController {
  private audioElement: HTMLAudioElement | null = null;
  private trackUrl: string = '/audio/wedding-melody.mp3';
  private trackTitle: string = "Pachelbel's Canon in D Major (Acoustic Strings)";
  private targetVolume: number = 0.35;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private isAutoplayBlocked: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();
  private fadeInterval: ReturnType<typeof setInterval> | null = null;
  private hasInitializedAutoplay: boolean = false;

  // Web Audio Context for sound effects (RSVP chime & wax seal stamp)
  private sfxCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // Setup autoplay trigger on DOM ready
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        this.initAutoplay();
      } else {
        window.addEventListener('DOMContentLoaded', () => this.initAutoplay());
      }
    }
  }

  // --------------------------------------------------------------------------
  // State Subscriptions
  // --------------------------------------------------------------------------
  public getState(): AudioState {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      isAutoplayBlocked: this.isAutoplayBlocked,
      volume: this.audioElement ? this.audioElement.volume : this.targetVolume,
      trackTitle: this.trackTitle
    };
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach(fn => {
      try {
        fn(state);
      } catch {
        // Safe dispatch
      }
    });
  }

  // --------------------------------------------------------------------------
  // Lazy Audio Element Initialization (Zero impact on initial render)
  // --------------------------------------------------------------------------
  private getAudio(): HTMLAudioElement {
    if (!this.audioElement && typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.src = this.trackUrl;
      this.audioElement.loop = true;
      this.audioElement.preload = 'metadata'; // Non-blocking: only load metadata until playback starts
      this.audioElement.volume = this.isMuted ? 0 : this.targetVolume;

      this.audioElement.addEventListener('ended', () => {
        // Continuous smooth loop
        if (this.audioElement && this.isPlaying) {
          this.audioElement.currentTime = 0;
          this.audioElement.play().catch(() => {});
        }
      });

      this.audioElement.addEventListener('error', () => {
        // Graceful handling if audio resource is inaccessible
        this.isPlaying = false;
        this.notify();
      });
    }
    return this.audioElement!;
  }

  // --------------------------------------------------------------------------
  // Autoplay & First Gesture Unlock
  // --------------------------------------------------------------------------
  public initAutoplay() {
    if (this.hasInitializedAutoplay || typeof window === 'undefined') return;
    this.hasInitializedAutoplay = true;

    // First, attempt direct autoplay (works if user has visited or browser policy allows)
    this.startMusicDirectly()
      .then(success => {
        if (!success) {
          this.markAutoplayBlocked();
        }
      })
      .catch(() => {
        this.markAutoplayBlocked();
      });
  }

  private markAutoplayBlocked() {
    this.isAutoplayBlocked = true;
    this.isPlaying = false;
    this.notify();

    // Attach passive one-time listeners to unlock audio on the very first user interaction
    const unlockAudioOnGesture = async () => {
      if (this.isPlaying) return;
      cleanup();
      await this.startMusic();
    };

    const cleanup = () => {
      window.removeEventListener('pointerdown', unlockAudioOnGesture);
      window.removeEventListener('click', unlockAudioOnGesture);
      window.removeEventListener('touchstart', unlockAudioOnGesture);
      window.removeEventListener('keydown', unlockAudioOnGesture);
    };

    window.addEventListener('pointerdown', unlockAudioOnGesture, { passive: true });
    window.addEventListener('click', unlockAudioOnGesture, { passive: true });
    window.addEventListener('touchstart', unlockAudioOnGesture, { passive: true });
    window.addEventListener('keydown', unlockAudioOnGesture, { passive: true });
  }

  private async startMusicDirectly(): Promise<boolean> {
    const audio = this.getAudio();
    try {
      audio.volume = 0;
      await audio.play();
      this.isPlaying = true;
      this.isAutoplayBlocked = false;
      this.fadeVolume(this.targetVolume, 1600);
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  // --------------------------------------------------------------------------
  // Public Playback Controls
  // --------------------------------------------------------------------------
  public async startMusic(): Promise<boolean> {
    const audio = this.getAudio();
    this.isAutoplayBlocked = false;
    this.isMuted = false;

    try {
      audio.volume = 0;
      await audio.play();
      this.isPlaying = true;
      this.fadeVolume(this.targetVolume, 1400);
      this.notify();
      return true;
    } catch (err) {
      console.warn('Autoplay restricted by browser policy:', err);
      this.isAutoplayBlocked = true;
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public stopMusic() {
    if (!this.audioElement) return;

    this.fadeVolume(0, 500, () => {
      if (this.audioElement) {
        this.audioElement.pause();
      }
      this.isPlaying = false;
      this.notify();
    });
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.fadeVolume(0, 400);
    } else {
      if (!this.isPlaying) {
        this.startMusic();
      } else {
        this.fadeVolume(this.targetVolume, 800);
      }
    }

    this.notify();
    return !this.isMuted;
  }

  public setVolume(vol: number) {
    this.targetVolume = Math.max(0, Math.min(1, vol));
    if (this.audioElement && !this.isMuted && this.isPlaying) {
      this.audioElement.volume = this.targetVolume;
    }
    this.notify();
  }

  public setCustomTrack(url: string, title?: string) {
    this.trackUrl = url;
    if (title) this.trackTitle = title;

    if (this.audioElement) {
      const wasPlaying = this.isPlaying;
      this.audioElement.pause();
      this.audioElement.src = url;
      this.audioElement.load();
      if (wasPlaying) {
        this.startMusic();
      }
    }
    this.notify();
  }

  // --------------------------------------------------------------------------
  // Smooth Volume Ramping (Avoids jarring sudden sound)
  // --------------------------------------------------------------------------
  private fadeVolume(target: number, durationMs: number = 1000, onComplete?: () => void) {
    if (!this.audioElement) {
      if (onComplete) onComplete();
      return;
    }

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    const startVol = this.audioElement.volume;
    const diff = target - startVol;
    const steps = 20;
    const stepDuration = durationMs / steps;
    let stepCount = 0;

    this.fadeInterval = setInterval(() => {
      stepCount++;
      if (!this.audioElement) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        return;
      }

      const progress = stepCount / steps;
      this.audioElement.volume = Math.max(0, Math.min(1, startVol + diff * progress));

      if (stepCount >= steps) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        this.audioElement.volume = target;
        if (onComplete) onComplete();
      }
    }, stepDuration);
  }

  // --------------------------------------------------------------------------
  // Interactive Sound Effects (Chime on RSVP, Wax Seal Stamp)
  // --------------------------------------------------------------------------
  private initSfxCtx() {
    if (!this.sfxCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.sfxCtx = new AudioCtx();
      }
    }
    if (this.sfxCtx && this.sfxCtx.state === 'suspended') {
      this.sfxCtx.resume().catch(() => {});
    }
  }

  public playGentleChime(frequencies: number[] = [523.25, 659.25, 783.99, 1046.50]) {
    if (this.isMuted) return;
    try {
      this.initSfxCtx();
      if (!this.sfxCtx) return;

      const now = this.sfxCtx.currentTime;
      frequencies.forEach((freq, idx) => {
        if (!this.sfxCtx) return;
        const osc = this.sfxCtx.createOscillator();
        const gain = this.sfxCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.04, now + idx * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 2.2);

        osc.connect(gain);
        gain.connect(this.sfxCtx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 2.3);
      });
    } catch {
      // Safe fallback
    }
  }

  public playSealStampSound() {
    if (this.isMuted) return;
    try {
      this.initSfxCtx();
      if (!this.sfxCtx) return;

      const now = this.sfxCtx.currentTime;
      const osc = this.sfxCtx.createOscillator();
      const gain = this.sfxCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(170, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.3);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxCtx.destination);

      osc.start(now);
      osc.stop(now + 0.38);
    } catch {
      // Safe fallback
    }
  }

  // Legacy helper for backwards compatibility
  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

// Singleton audio engine instance
export const ambientAudio = new AmbientAudioController();
