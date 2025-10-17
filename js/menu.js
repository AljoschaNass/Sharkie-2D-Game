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

/**
 * Lädt gespeicherte Audio-Einstellungen und aktualisiert UI & Icon.
 */
function restoreAudioSettings() {
  const soundInactive = localStorage.getItem('soundInactive') === 'true';
  const musicInactive = localStorage.getItem('musicInactive') === 'true';

  soundToggle.classList.toggle('inactive', soundInactive);
  musicToggle.classList.toggle('inactive', musicInactive);

  soundToggle.textContent = soundInactive ? '🔇 Off' : '🔊 On';
  musicToggle.textContent = musicInactive ? '🚫 Off' : '🎶 On';

  updateMuteIconFromStorage();
  applyAudioMuteState(soundInactive, musicInactive);
}

/**
 * Aktualisiert das Mute-Icon basierend auf gespeicherten Zuständen.
 */
function updateMuteIconFromStorage() {
  const soundInactive = localStorage.getItem('soundInactive') === 'true';
  const musicInactive = localStorage.getItem('musicInactive') === 'true';

  muteImg.src = (soundInactive && musicInactive)
    ? 'img/Buttons/Key/sound_off.png'
    : 'img/Buttons/Key/sound_on.png';
}

/**
 * Wendet den Muting-Zustand auf echte Audio-Objekte an.
 * Hier musst du an deine Audio-/Musik-Objekte anpassen.
 */
function applyAudioMuteState(soundInactive, musicInactive) {
  // Beispiel: wenn du Audio-Elemente hast, z. B. `gameMusic` & `soundEffects`
  if (window.gameMusic) {
    window.gameMusic.muted = musicInactive;
  }
  if (window.soundEffects) {
    // Wenn soundEffects eine Liste ist:
    window.soundEffects.forEach(se => se.muted = soundInactive);
  }
}

/**
 * Toggles einen Button, speichert Zustand & icon, und wendet auf Audio an.
 */
function toggleSetting(button, storageKey, icons, isMusic) {
  button.classList.toggle('inactive');
  const inactive = button.classList.contains('inactive');
  localStorage.setItem(storageKey, inactive);
  button.textContent = inactive ? icons.off : icons.on;

  // auch Audio anwenden
  const soundInactive = localStorage.getItem('soundInactive') === 'true';
  const musicInactive = localStorage.getItem('musicInactive') === 'true';
  applyAudioMuteState(soundInactive, musicInactive);

  updateMuteIconFromStorage();
}

// Klick-Events für Toggles
soundToggle.addEventListener('click', () => {
  toggleSetting(soundToggle, 'soundInactive', { off: '🔇 Off', on: '🔊 On' }, false);
});
musicToggle.addEventListener('click', () => {
  toggleSetting(musicToggle, 'musicInactive', { off: '🚫 Off', on: '🎶 On' }, true);
});

/**
 * Handler für Mute-Button:
 * Wenn beide aktuell deaktiviert sind, dann setze beides aktiv (An), andernfalls beides aus.
 */
muteBtn.addEventListener('click', () => {
  const soundInactive = localStorage.getItem('soundInactive') === 'true';
  const musicInactive = localStorage.getItem('musicInactive') === 'true';

  if (soundInactive && musicInactive) {
    // beide aktuell aus → schalte beides an
    localStorage.setItem('soundInactive', false);
    localStorage.setItem('musicInactive', false);
  } else {
    // sonst: beides aus
    localStorage.setItem('soundInactive', true);
    localStorage.setItem('musicInactive', true);
  }

  // wende Änderungen an
  restoreAudioSettings();
});

// Initial beim Laden aufrufen
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
}

function showGameOverScreen() {
  canvasRef.classList.add('d_none');
  gameOverScreen.classList.remove('d_none');
}

btnRestart.addEventListener('click', () => {
  winScreen.classList.add('d_none');
  canvasRef.classList.remove('d_none');
  init();
});

btnMenu.addEventListener('click', () => {
  winScreen.classList.add('d_none');
  startScreen.classList.remove('d_none');
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