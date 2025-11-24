// Sound effects using Web Audio API
class SoundEffects {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Play a beep sound
  private playTone(frequency: number, duration: number, volume: number = 0.3) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // UI Click sound
  click() {
    this.playTone(800, 0.05, 0.2);
  }

  // Success sound
  success() {
    this.playTone(523.25, 0.1, 0.3); // C5
    setTimeout(() => this.playTone(659.25, 0.15, 0.3), 100); // E5
  }

  // Error sound
  error() {
    this.playTone(200, 0.2, 0.3);
  }

  // Listening sound (rising tone)
  listening() {
    this.playTone(400, 0.1, 0.2);
    setTimeout(() => this.playTone(600, 0.1, 0.2), 100);
  }

  // Processing sound (pulsing)
  processing() {
    this.playTone(440, 0.1, 0.15);
  }

  // Speaking sound (descending tone)
  speaking() {
    this.playTone(600, 0.1, 0.2);
    setTimeout(() => this.playTone(400, 0.1, 0.2), 100);
  }

  // Boot up sound sequence
  bootup() {
    this.playTone(261.63, 0.15, 0.25); // C4
    setTimeout(() => this.playTone(329.63, 0.15, 0.25), 150); // E4
    setTimeout(() => this.playTone(392.00, 0.15, 0.25), 300); // G4
    setTimeout(() => this.playTone(523.25, 0.3, 0.3), 450); // C5
  }

  // Activate/mode change sound
  activate() {
    this.playTone(523.25, 0.08, 0.25); // C5
    setTimeout(() => this.playTone(659.25, 0.12, 0.25), 80); // E5
  }
}

export const soundEffects = new SoundEffects();
