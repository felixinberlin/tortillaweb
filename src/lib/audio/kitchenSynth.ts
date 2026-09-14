/**
 * Web Audio API Synthesizer & Speech Companion
 * Provides reliable, zero-asset acoustic sound cues and spoken voice prompts
 * for hands-free cooking in the kitchen.
 */

export type ChimeType =
  | 'stepStart'
  | 'stepComplete'
  | 'countdown'
  | 'flipCue'
  | 'halfway'
  | 'metronome'
  | 'safetyAlert';

class KitchenSynthEngine {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private voiceEnabled: boolean = true;
  private volume: number = 0.8;

  constructor() {
    // Lazy AudioContext initialization on first user interaction
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    if (!enabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public isVoiceEnabled(): boolean {
    return this.voiceEnabled;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Play synthesized acoustic cues without any external media files.
   */
  public playChime(type: ChimeType) {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume, now);
    masterGain.connect(ctx.destination);

    switch (type) {
      case 'metronome': {
        // Woodblock-like short click for slicing cadence (60 bpm)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.045);
        break;
      }

      case 'countdown': {
        // Crisp 880Hz sine blip for 3, 2, 1
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.13);
        break;
      }

      case 'flipCue': {
        // Bright 1760Hz double chime for "¡VOLTEO!"
        [0, 0.08].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1760, now + offset);
          gain.gain.setValueAtTime(0.6, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + offset);
          osc.stop(now + offset + 0.2);
        });
        break;
      }

      case 'stepStart': {
        // Gentle ascending two-tone warm chime (C5 -> G5)
        const notes = [523.25, 783.99];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startTime = now + i * 0.12;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.4, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(startTime);
          osc.stop(startTime + 0.36);
        });
        break;
      }

      case 'halfway': {
        // Soft double chime indicating midpoint
        [0, 0.15].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(659.25, now + offset); // E5
          gain.gain.setValueAtTime(0.35, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.25);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + offset);
          osc.stop(now + offset + 0.26);
        });
        break;
      }

      case 'safetyAlert': {
        // Two-tone attention chime for thermal verification & pasteurization
        const freqs = [880, 1174.66]; // A5 -> D6
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + idx * 0.14;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.45, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t);
          osc.stop(t + 0.32);
        });
        break;
      }

      case 'stepComplete': {
        // Celebratory four-note culinary arpeggio (C5 -> E5 -> G5 -> C6)
        const arpeggio = [523.25, 659.25, 783.99, 1046.5];
        arpeggio.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + i * 0.1;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.4, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(t);
          osc.stop(t + 0.42);
        });
        break;
      }
    }
  }

  /**
   * Spoken voice guidance using Web Speech API with multilingual voice matching.
   */
  public speakVoice(text: string, lang: 'es' | 'en' | 'de' = 'es') {
    if (!this.voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = this.volume;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const langMap: Record<string, string> = {
        es: 'es-ES',
        en: 'en-US',
        de: 'de-DE',
      };
      utterance.lang = langMap[lang] || 'es-ES';

      // Pick best matching native voice if available
      const voices = window.speechSynthesis.getVoices();
      const targetPrefix = langMap[lang].slice(0, 2);
      const matchedVoice = voices.find((v) => v.lang.startsWith(targetPrefix));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Gracefully fall back if browser restricts speech synthesis
    }
  }
}

export const kitchenSynth = new KitchenSynthEngine();
