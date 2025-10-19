class AudioManager {
  constructor() {
    this.sounds = {
      coin: new Audio('sounds/drop-coin.mp3'),
      hit: new Audio('sounds/grunt2.mp3'),
      poison: new Audio('sounds/bubble-pop-6.mp3'),
      gameOverVoice: new Audio('sounds/game-over-voice.mp3'),
      winSound: new Audio('sounds/success-fanfare.mp3'),
      winMusic: new Audio('sounds/you-win-sequence.mp3'),
      backgroundMusic: new Audio('sounds/underwater-ambience.mp3'),
    };

    this.sounds.backgroundMusic.loop = true;
    this.sounds.backgroundMusic.volume = 0.4;

    this.loadSettings();
  }

  loadSettings() {
    this.soundInactive = localStorage.getItem('soundInactive') === 'true';
    this.musicInactive = localStorage.getItem('musicInactive') === 'true';
  }


  play(name) {
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

    const music = this.sounds[name];
    if (music) {
      music.loop = true;
      music.volume = 0.5;
      music.play();
    }
  }

 
  stopAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
}
