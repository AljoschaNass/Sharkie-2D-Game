/* ============================================================
 * Menu, dialogs, mute control, screen transitions.
 * Wires the start screen and in-game chrome to the World instance.
 * ============================================================ */

const DIALOGS = [
    { trigger: '.btn-controls',  dialog: 'controlsMenu',  close: 'closeControls',        pausesGame: true  },
    { trigger: '.btn-credits',   dialog: 'creditsMenu',   close: 'closeCreditsMenu',     pausesGame: false },
    { trigger: '.btn-privacy',   dialog: 'privacyMenu',   close: 'closePrivacyMenu',     pausesGame: false },
    { trigger: '.btn-impressum', dialog: 'impressumMenu', close: 'closeImpressumMenu',   pausesGame: false }
];

const pauseBtnGlobal = document.getElementById('pause-btn');

const shark = document.getElementById('shark');
const sharkWin = document.getElementById('shark-win');
const sharkFrames = generateFrames('img/1.Sharkie/3.Swim', 6);
let currentFrame = 0;

const muteBtn = document.getElementById('mute-btn');
const muteImg = muteBtn.querySelector('img');
const muteBtnStart = document.getElementById('mute-btn-start');
const muteImgStart = muteBtnStart?.querySelector('img');

const canvasRef = document.getElementById('game-container');
const startScreen = document.getElementById('startScreen');
const winScreen = document.getElementById('winScreen');
const gameOverScreen = document.getElementById('gameOverScreen');

/* ---------- Shark animation on start screen ---------- */

/**
 * Generate an array of sequential frame paths (e.g. `folder/1.png`..`folder/N.png`).
 * @param {string} folder
 * @param {number} count
 * @returns {string[]}
 */
function generateFrames(folder, count) {
    return Array.from({ length: count }, (_, i) => `${folder}/${i + 1}.png`);
}

setInterval(() => {
    const frame = `url(${sharkFrames[currentFrame]})`;
    shark.style.backgroundImage = frame;
    sharkWin.style.backgroundImage = frame;
    currentFrame = (currentFrame + 1) % sharkFrames.length;
}, 150);

/* ---------- Pause button ---------- */

if (pauseBtnGlobal) {
    pauseBtnGlobal.addEventListener('click', () => {
        gamePaused = true;
        document.getElementById('controlsMenu')?.showModal();
    });
}

/* ---------- Dialog wiring ---------- */

document.addEventListener('DOMContentLoaded', () => {
    DIALOGS.forEach(setupDialog);
});

/**
 * Wire up open/close/outside-click handlers for one dialog.
 * @param {{ trigger: string, dialog: string, close: string, pausesGame: boolean }} config
 */
function setupDialog(config) {
    const dialog = document.getElementById(config.dialog);
    const openBtns = document.querySelectorAll(config.trigger);
    const closeBtn = document.getElementById(config.close);
    if (!dialog || !openBtns.length || !closeBtn) return;

    openBtns.forEach(btn => btn.addEventListener('click', () => openDialog(dialog, config)));
    closeBtn.addEventListener('click', () => closeDialog(dialog, config));
    dialog.addEventListener('click', e => {
        if (!isClickInsideDialog(e, dialog)) closeDialog(dialog, config);
    });
}

function openDialog(dialog, config) {
    dialog.showModal();
    if (config.pausesGame) gamePaused = true;
}

function closeDialog(dialog, config) {
    dialog.close();
    if (config.pausesGame) gamePaused = false;
}

/**
 * Hit-test whether a click landed inside the dialog's rendered rectangle
 * (useful for dismissing on backdrop clicks).
 */
function isClickInsideDialog(event, dialog) {
    const r = dialog.getBoundingClientRect();
    return event.clientX >= r.left && event.clientX <= r.right
        && event.clientY >= r.top  && event.clientY <= r.bottom;
}

/* ---------- Mute control ---------- */

/**
 * Whether audio is currently muted. Falls back to localStorage when no
 * World is active (e.g. on the start screen before a run begins).
 */
function getAudioMutedState() {
    if (world?.audioManager) return world.audioManager.audioMuted;
    return localStorage.getItem('audioMuted') === 'true';
}

function toggleAudioMute() {
    if (world?.audioManager) {
        world.audioManager.toggleAudio();
    } else {
        const currentState = localStorage.getItem('audioMuted') === 'true';
        localStorage.setItem('audioMuted', !currentState);
    }
}

function updateMuteIcons() {
    const icon = getAudioMutedState()
        ? 'img/Buttons/Key/sound_off.png'
        : 'img/Buttons/Key/sound_on.png';
    if (muteImg) muteImg.src = icon;
    if (muteImgStart) muteImgStart.src = icon;
}

muteBtn.addEventListener('click', () => {
    toggleAudioMute();
    updateMuteIcons();
});

muteBtnStart?.addEventListener('click', () => {
    toggleAudioMute();
    updateMuteIcons();
});

updateMuteIcons();

/* ---------- Screen transitions ---------- */

function showScreen(hide, show) {
    hide.classList.add('d_none');
    show.classList.remove('d_none');
}

function showWinScreen() {
    gamePaused = true;
    world?.audioManager?.stopAll?.();
    showScreen(canvasRef, winScreen);
    world?.audioManager?.play?.('winSound');
}

function showGameOverScreen() {
    showScreen(canvasRef, gameOverScreen);
    gamePaused = true;
    world?.audioManager?.stopAll?.();
    world?.audioManager?.play?.('gameOverVoice');
    world?.character?.restart?.();
}

/* ---------- Button bindings ---------- */

document.getElementById('btnRestart').addEventListener('click', () => {
    winScreen.classList.add('d_none');
    document.getElementById('game-container').classList.remove('d_none');
    canvasRef.classList.remove('d_none');
    startScreen.classList.add('d_none');
    gamePaused = false;
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
