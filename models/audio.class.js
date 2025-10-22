class AudioManager {
  constructor() {
    this.musics = {
      backgroundMusic: new Audio('sounds/underwater-ambience.mp3'),
      winMusic: new Audio('sounds/you-win-sequence.mp3'),
    };
    this.musics.backgroundMusic.loop = true;
    this.musics.backgroundMusic.volume = 0.4;

    this.sounds = {
      coin: new Audio('sounds/drop-coin.mp3'),
      hit: new Audio('sounds/grunt2.mp3'),
      poison: new Audio('sounds/bubble-pop-6.mp3'),
      gameOverVoice: new Audio('sounds/game-over-voice.mp3'),
      winSound: new Audio('sounds/success-fanfare.mp3'),
    };

    this.loadSettings();
  }

  loadSettings() {
    this.soundInactive = localStorage.getItem('soundInactive') === 'true';
    this.musicInactive = localStorage.getItem('musicInactive') === 'true';
  }

  saveSettings() {
    localStorage.setItem('soundInactive', this.soundInactive);
    localStorage.setItem('musicInactive', this.musicInactive);
  }

  playSound(name) {
    this.loadSettings();
    if (this.soundInactive) return;

    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  playMusic(name) {
    this.loadSettings();
    if (this.musicInactive) return;

    const music = this.musics[name];
    if (music) {
      music.loop = true;
      music.volume = 0.5;
      music.play();
    }
  }

  stopMusic() {
    Object.values(this.musics).forEach(track => {
      track.pause();
      track.currentTime = 0;
    });
  }

    stopSounds() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  stopAll() {
    this.stopMusic();
    this.stopSounds();
  }

  toggleSound() {
    this.soundInactive = !this.soundInactive;
    this.saveSettings();
  }

  toggleMusic() {
    this.musicInactive = !this.musicInactive;
    if (this.musicInactive) this.stopMusic();
    this.saveSettings();
  }

  muteAll() {
    this.soundInactive = true;
    this.musicInactive = true;
    this.stopAll();
    this.saveSettings();
  }

  unmuteAll() {
    this.soundInactive = false;
    this.musicInactive = false;
    this.saveSettings();
  }
}
