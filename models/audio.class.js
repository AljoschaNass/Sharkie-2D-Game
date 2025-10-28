class AudioManager {
  constructor() {
    this.audioMuted = localStorage.getItem('audioMuted') === 'true';

    this.audio = {
      background: this.createAudio('sounds/underwater-ambience.mp3', { loop: true, volume: 0.4 }),
      winMusic: this.createAudio('sounds/you-win-sequence.mp3', { loop: true, volume: 0.5 }),
      snoring: this.createAudio('sounds/snoring-sound.mp3', { loop: true, volume: 0.8 }),

      coin: this.createAudio('sounds/drop-coin.mp3'),
      hit: this.createAudio('sounds/grunt2.mp3'),
      poison: this.createAudio('sounds/bubble-pop-6.mp3'),
      gameOverVoice: this.createAudio('sounds/game-over-voice.mp3'),
      winSound: this.createAudio('sounds/success-fanfare.mp3'),
    };
    this.applyAudioSettings();
  }

  /** 🛠️ Erstellt ein Audioobjekt mit Optionen */
  createAudio(src, { loop = false, volume = 1.0 } = {}) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    return audio;
  }

  /** 💾 Zustand speichern */
  saveSettings() {
    localStorage.setItem('audioMuted', this.audioMuted);
  }

  /** 🔇 oder 🔊 anwenden */
  applyAudioSettings() {
    Object.values(this.audio).forEach(sound => {
      sound.muted = this.audioMuted;
    });
  }

  /** ▶️ Einmaliges Abspielen */
  play(name) {
    if (this.audioMuted) return;

    const sound = this.audio[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    } else {
      console.warn(`❌ Audio '${name}' nicht gefunden.`);
    }
  }

  /** 🔁 Loop starten */
  playLoop(name) {
    if (this.audioMuted) return;

    const sound = this.audio[name];
    if (sound) {
      sound.loop = true;
      sound.currentTime = 0;
      sound.play();
    } else {
      console.warn(`❌ Loop-Audio '${name}' nicht gefunden.`);
    }
  }

  /** 🛑 Einzelnes Audio stoppen */
  stop(name) {
    const sound = this.audio[name];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      sound.loop = false;
    }
  }

  /** 🛑 Alles stoppen */
  stopAll() {
    Object.values(this.audio).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
      sound.loop = false;
    });
  }

  /** 🔇 Audio deaktivieren */
  muteAll() {
    this.audioMuted = true;
    this.saveSettings();
    this.applyAudioSettings();
    this.stopAll();
  }

  /** 🔊 Audio aktivieren */
  unmuteAll() {
    this.audioMuted = false;
    this.saveSettings();
    this.applyAudioSettings();
  }

  /** 🔁 Audio an/aus umschalten */
  toggleAudio() {
    this.audioMuted = !this.audioMuted;
    this.saveSettings();
    this.applyAudioSettings();

    if (this.audioMuted) this.stopAll();
  }
}
