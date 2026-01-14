/**
 * Manages all game audio and sound effects.
 */
class AudioManager {
  constructor() {
    this.loadMuteSettings();
    this.initializeAudioLibrary();
    this.applyAudioSettings();
  }


  loadMuteSettings() {
    this.audioMuted = localStorage.getItem('audioMuted') === 'true';
  }


  initializeAudioLibrary() {
    this.audio = {
      background: this.createAudio('sounds/underwater-ambience.mp3', { loop: true, volume: 0.4 }),
      winMusic: this.createAudio('sounds/you-win-sequence.mp3', { loop: true, volume: 0.5 }),
      snoring: this.createAudio('sounds/snoring-sound.mp3', { loop: true, volume: 0.8 }),
      coin: this.createAudio('sounds/drop-coin.mp3'),
      hit: this.createAudio('sounds/grunt2.mp3'),
      bubbleHit: this.createAudio('sounds/bubble-pop.mp3'),
      poison: this.createAudio('sounds/bubble-pop-6.mp3'),
      gameOverVoice: this.createAudio('sounds/game-over-voice.mp3'),
      winSound: this.createAudio('sounds/success-fanfare.mp3'),
    };
  }


  createAudio(src, { loop = false, volume = 1.0 } = {}) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    return audio;
  }


  saveSettings() {
    localStorage.setItem('audioMuted', this.audioMuted);
  }


  applyAudioSettings() {
    Object.values(this.audio).forEach(sound => {
      sound.muted = this.audioMuted;
    });
  }


  play(name) {
    if (this.audioMuted) return;

    const sound = this.audio[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }


  playLoop(name) {
    if (this.audioMuted) return;

    const sound = this.audio[name];
    if (sound) {
      sound.loop = true;
      sound.currentTime = 0;
      sound.play();
    }
  }


  stop(name) {
    const sound = this.audio[name];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      sound.loop = false;
    }
  }


  stopAll() {
    Object.values(this.audio).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
      sound.loop = false;
    });
  }


  muteAll() {
    this.audioMuted = true;
    this.saveSettings();
    this.applyAudioSettings();
    this.stopAll();
  }


  unmuteAll() {
    this.audioMuted = false;
    this.saveSettings();
    this.applyAudioSettings();
  }


  toggleAudio() {
    this.audioMuted = !this.audioMuted;
    this.saveSettings();
    this.applyAudioSettings();

    if (this.audioMuted) {
      this.stopAll();
    } else {
      this.playLoop('background');
    }
  }


  isMuted() {
    return this.audioMuted;
  }
}
