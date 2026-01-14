const pauseBtnGlobal = document.getElementById('pause-btn');
if (pauseBtnGlobal) {
  pauseBtnGlobal.addEventListener('click', () => {
    gamePaused = true;
    const optionsDialog = document.getElementById('optionsMenu');
    if (optionsDialog) {
      optionsDialog.showModal();
    }
  });
}

const shark = document.getElementById("shark");
const sharkWin = document.getElementById("shark-win");

/**
 * Generates an array of frame paths for animation.
 * @param {string} folder - Path to the folder containing frames
 * @param {number} count - Number of frames
 * @returns {string[]} Array of frame paths
 */
function generateFrames(folder, count) {
  return Array.from({ length: count }, (_, i) => `${folder}/${i + 1}.png`);
}

const sharkFrames = generateFrames("img/1.Sharkie/3.Swim", 6);
let currentFrame = 0;

setInterval(() => {
  const frame = `url(${sharkFrames[currentFrame]})`;
  shark.style.backgroundImage = frame;
  sharkWin.style.backgroundImage = frame;
  currentFrame = (currentFrame + 1) % sharkFrames.length;
}, 150);

document.addEventListener('DOMContentLoaded', () => {
  setupDialog('.btn-options', 'optionsMenu', 'closeOptions');
  setupDialog('.btn-credits', 'creditsMenu', 'closeCreditsMenu');
  setupDialog('.btn-privacy', 'privacyMenu', 'closePrivacyMenu');
  setupDialog('.btn-impressum', 'impressumMenu', 'closeImpressumMenu');
});

/**
 * Sets up event handlers for a dialog (open, close, outside click).
 * @param {string} openBtnSelector - CSS selector for open buttons
 * @param {string} dialogId - ID of the dialog element
 * @param {string} closeBtnId - ID of the close button
 */
function setupDialog(openBtnSelector, dialogId, closeBtnId) {
  const elements = getDialogElements(openBtnSelector, dialogId, closeBtnId);
  if (!elements) return;

  bindDialogOpenHandlers(elements.openBtns, elements.dialog, dialogId);
  bindDialogCloseHandler(elements.closeBtn, elements.dialog, dialogId);
  bindOutsideClickHandler(elements.dialog, dialogId);
}

/**
 * Gets all DOM elements needed for dialog setup.
 * @param {string} openBtnSelector - CSS selector for open buttons
 * @param {string} dialogId - ID of the dialog element
 * @param {string} closeBtnId - ID of the close button
 * @returns {Object|null} Object containing dialog elements or null if not found
 */
function getDialogElements(openBtnSelector, dialogId, closeBtnId) {
  const dialog = document.getElementById(dialogId);
  const openBtns = document.querySelectorAll(openBtnSelector);
  const closeBtn = document.getElementById(closeBtnId);

  if (!dialog || !openBtns.length || !closeBtn) return null;

  return { dialog, openBtns, closeBtn };
}


function bindDialogOpenHandlers(openBtns, dialog, dialogId) {
  openBtns.forEach(openBtn => {
    openBtn.addEventListener('click', () => {
      dialog.showModal();
      if (dialogId === 'optionsMenu') gamePaused = true;
    });
  });
}


function bindDialogCloseHandler(closeBtn, dialog, dialogId) {
  closeBtn.addEventListener('click', () => {
    dialog.close();
    if (dialogId === 'optionsMenu') gamePaused = false;
  });
}


function bindOutsideClickHandler(dialog, dialogId) {
  dialog.addEventListener('click', (e) => {
    if (!isClickInsideDialog(e, dialog)) {
      dialog.close();
      if (dialogId === 'optionsMenu') gamePaused = false;
    }
  });
}


/**
 * Checks if a click event occurred inside a dialog element.
 * @param {MouseEvent} event - The click event
 * @param {HTMLDialogElement} dialog - The dialog element
 * @returns {boolean} True if click was inside dialog
 */
function isClickInsideDialog(event, dialog) {
  const rect = dialog.getBoundingClientRect();
  return event.clientX >= rect.left &&
         event.clientX <= rect.right &&
         event.clientY >= rect.top &&
         event.clientY <= rect.bottom;
}


const muteBtn = document.getElementById('mute-btn');
const muteImg = muteBtn.querySelector('img');
const muteBtnOptions = document.getElementById('mute-btn-options');
const muteImgOptions = muteBtnOptions?.querySelector('img');

/**
 * Gets the current audio muted state from world or localStorage.
 * @returns {boolean} True if audio is muted
 */
function getAudioMutedState() {
  if (world?.audioManager) {
    return world.audioManager.audioMuted;
  }
  return localStorage.getItem('audioMuted') === 'true';
}

/**
 * Toggles the audio mute state in world or localStorage.
 */
function toggleAudioMute() {
  if (world?.audioManager) {
    world.audioManager.toggleAudio();
  } else {
    const currentState = localStorage.getItem('audioMuted') === 'true';
    localStorage.setItem('audioMuted', !currentState);
  }
}

/**
 * Updates the mute button icons based on current mute state.
 */
function updateMuteIcons() {
  const isMuted = getAudioMutedState();
  const icon = isMuted ? 'img/Buttons/Key/sound_off.png' : 'img/Buttons/Key/sound_on.png';
  if (muteImg) muteImg.src = icon;
  if (muteImgOptions) muteImgOptions.src = icon;
}

muteBtn.addEventListener('click', () => {
  toggleAudioMute();
  updateMuteIcons();
});

muteBtnOptions.addEventListener('click', () => {
  toggleAudioMute();
  updateMuteIcons();
});

updateMuteIcons();


const canvasRef = document.getElementById('game-container');
const startScreen = document.getElementById('startScreen');
const winScreen = document.getElementById('winScreen');
const gameOverScreen = document.getElementById('gameOverScreen');

/**
 * Hides one screen and shows another.
 * @param {HTMLElement} hide - Element to hide
 * @param {HTMLElement} show - Element to show
 */
function showScreen(hide, show) {
  hide.classList.add('d_none');
  show.classList.remove('d_none');
}

/**
 * Displays the winning screen and plays win sound.
 */
function showWinScreen() {
  showScreen(canvasRef, winScreen);
  gamePaused = true;
  world?.audioManager?.stopAll?.();
  world?.audioManager?.play?.('winSound');
}

/**
 * Displays the game over screen and plays game over sound.
 */
function showGameOverScreen() {
  showScreen(canvasRef, gameOverScreen);
  gamePaused = true;
  world?.audioManager?.stopAll?.();
  world?.audioManager?.play?.('gameOverVoice');
  world?.character?.restart?.();
}

document.getElementById('btnRestart').addEventListener('click', () => {
  showScreen(winScreen, canvasRef);
  init();
});

document.getElementById('btnMenu').addEventListener('click', () => {
  showScreen(winScreen, startScreen);
  world?.audioManager?.stopAll?.();
});

document.getElementById('btnRestartGameOver').addEventListener('click', () => {
  showScreen(gameOverScreen, canvasRef);
  init();
});

document.getElementById('btnMenuGameOver').addEventListener('click', () => {
  showScreen(gameOverScreen, startScreen);
  canvasRef.classList.add('d_none');
});

document.getElementById('start-btn').addEventListener('click', () => {
  showScreen(startScreen, canvasRef);
  init();
});