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


  /**
   * Creates a new audio element with specified options.
   * @param {string} src - Path to audio file
   * @param {Object} options - Audio options
   * @param {boolean} options.loop - Whether audio should loop
   * @param {number} options.volume - Volume level (0.0 to 1.0)
   * @returns {HTMLAudioElement} Configured audio element
   */
  createAudio(src, { loop = false, volume = 1.0 } = {}) {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    return audio;
  }

  /**
   * Saves current mute settings to localStorage.
   */
  saveSettings() {
    localStorage.setItem('audioMuted', this.audioMuted);
  }

  /**
   * Applies mute settings to all audio elements.
   */
  applyAudioSettings() {
    Object.values(this.audio).forEach(sound => {
      sound.muted = this.audioMuted;
    });
  }

  /**
   * Plays a sound effect once.
   * @param {string} name - Name of the sound to play
   */
  play(name) {
    if (this.audioMuted) return;

    const sound = this.audio[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Plays a sound in loop mode.
   * @param {string} name - Name of the sound to loop
   */
  playLoop(name) {
    if (this.audioMuted) return;

    const sound = this.audio[name];
    if (sound) {
      sound.loop = true;
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Stops a playing sound.
   * @param {string} name - Name of the sound to stop
   */
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
