const pauseBtnGlobal = document.getElementById('pause-btn');
if (pauseBtnGlobal) {
  pauseBtnGlobal.addEventListener('click', () => {
    gamePaused = true;
  });
}


  const shark = document.getElementById("shark");
  const sharkWin = document.getElementById("shark-win");
  let currentFrame = 0;
  const sharkFrames = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png"
  ];

  setInterval(() => {
    shark.style.backgroundImage = `url(${sharkFrames[currentFrame]})`;
    sharkWin.style.backgroundImage = `url(${sharkFrames[currentFrame]})`;
    currentFrame = (currentFrame + 1) % sharkFrames.length;
}, 150);


function setupDialog(openBtnSelector, dialogId, closeBtnId) {
  const dialog = document.getElementById(dialogId);
  const openBtn = document.querySelector(openBtnSelector);
  const closeBtn = document.getElementById(closeBtnId);
  const pauseBtn = dialogId === 'optionsMenu' ? document.getElementById('pause-btn') : null;

  if (!dialog || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => dialog.showModal());
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => dialog.showModal());
  }
  closeBtn.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inside) dialog.close();
    if (!inside) gamePaused = false;
  });
}

setupDialog('.btn-options', 'optionsMenu', 'closeOptions');
setupDialog('.btn-credits', 'creditsMenu', 'closeCreditsMenu');
setupDialog('.btn-privacy', 'privacyMenu', 'closePrivacyMenu');


const soundToggle = document.getElementById('soundToggle');
const musicToggle = document.getElementById('musicToggle');
const muteBtn = document.getElementById('mute-btn');
const muteImg = muteBtn.querySelector('img');

let previousAudioState = { soundInactive: false, musicInactive: false };
let soundInactive = localStorage.getItem('soundInactive') === 'true';
let musicInactive = localStorage.getItem('musicInactive') === 'true';


function restoreAudioSettings() {
   soundInactive = localStorage.getItem('soundInactive') === 'true';
   musicInactive = localStorage.getItem('musicInactive') === 'true';

  soundToggle.classList.toggle('inactive', soundInactive);
  musicToggle.classList.toggle('inactive', musicInactive);

  soundToggle.textContent = soundInactive ? '🔇 Off' : '🔊 On';
  musicToggle.textContent = musicInactive ? '🚫 Off' : '🎶 On';

  updateMuteIconFromStorage();
}


function updateMuteIconFromStorage() {
   soundInactive = localStorage.getItem('soundInactive') === 'true';
   musicInactive = localStorage.getItem('musicInactive') === 'true';
  muteImg.src = (soundInactive && musicInactive)
    ? 'img/Buttons/Key/sound_off.png'
    : 'img/Buttons/Key/sound_on.png';
}


function saveAudioState(soundInactive, musicInactive) {
  localStorage.setItem('soundInactive', soundInactive);
  localStorage.setItem('musicInactive', musicInactive);
}


function toggleSetting(button, storageKey, icons) {
  button.classList.toggle('inactive');
  const inactive = button.classList.contains('inactive');
  localStorage.setItem(storageKey, inactive);
  button.textContent = inactive ? icons.off : icons.on;
  updateMuteIconFromStorage();

  if (storageKey === 'soundInactive' && world?.audioManager?.effects?.snoringSound) {
    const snoring = world.audioManager.sounds.snoringSound;
    snoring.volume = inactive ? 0.0000 : 0.8;
  }
}


soundToggle.addEventListener('click', () => {
  toggleSetting(soundToggle, 'soundInactive', { off: '🔇 Off', on: '🔊 On' });
});
musicToggle.addEventListener('click', () => {
  toggleSetting(musicToggle, 'musicInactive', { off: '🚫 Off', on: '🎶 On' });
});


muteBtn.addEventListener('click', () => {
   soundInactive = localStorage.getItem('soundInactive') === 'true';
   musicInactive = localStorage.getItem('musicInactive') === 'true';
  const bothMuted = soundInactive && musicInactive;

  if (bothMuted) {
    saveAudioState(previousAudioState.soundInactive, previousAudioState.musicInactive);
  } else {
    previousAudioState = { soundInactive, musicInactive };
    saveAudioState(true, true);
  }
  restoreAudioSettings();
});
restoreAudioSettings();


const canvasRef = document.getElementById('game-container');

const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('start-btn');

const winScreen = document.getElementById('winScreen');
const btnRestart = document.getElementById('btnRestart');
const btnMenu = document.getElementById('btnMenu');

const gameOverScreen = document.getElementById('gameOverScreen');
const btnRestartGameOver = document.getElementById('btnRestartGameOver');
const btnMenuGameOver = document.getElementById('btnMenuGameOver');


function showWinScreen() {
  canvasRef.classList.add('d_none');
  winScreen.classList.remove('d_none');
  if (typeof gamePaused !== 'undefined') gamePaused = true;
  if (world && world.audioManager) world.audioManager.stopAll();
}

function showGameOverScreen() {
  canvasRef.classList.add('d_none');
  gameOverScreen.classList.remove('d_none');
  if (typeof gamePaused !== 'undefined') gamePaused = true;
  if (world && world.audioManager) world.audioManager.stopAll();
  world.audioManager.playSound('gameOverVoice');
  world.character.restart();
  world.endboss.restart();
}

btnRestart.addEventListener('click', () => {
  winScreen.classList.add('d_none');
  canvasRef.classList.remove('d_none');
  init();
});

btnMenu.addEventListener('click', () => {
  winScreen.classList.add('d_none');
  startScreen.classList.remove('d_none');
  world.audioManager.stopAll();
});

btnRestartGameOver.addEventListener('click', () => {
  gameOverScreen.classList.add('d_none');
  canvasRef.classList.remove('d_none');
  init();
});


btnMenuGameOver.addEventListener('click', () => {
  gameOverScreen.classList.add('d_none');
  startScreen.classList.remove('d_none');
  canvasRef.classList.add('d_none');
});


startBtn.addEventListener('click', () => {
  startScreen.classList.add('d_none');  
  canvasRef.classList.remove('d_none');
  init();
});