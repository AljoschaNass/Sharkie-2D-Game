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

  if (!dialog || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => dialog.showModal());
  closeBtn.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inside) dialog.close();
  });
}

setupDialog('.btn-options', 'optionsMenu', 'closeOptions');
setupDialog('.btn-credits', 'creditsMenu', 'closeCreditsMenu');
setupDialog('.btn-privacy', 'privacyMenu', 'closePrivacyMenu');


const soundToggle = document.getElementById('soundToggle');
const musicToggle = document.getElementById('musicToggle');

soundToggle.addEventListener('click', () => {
  soundToggle.classList.toggle('inactive');
  soundToggle.textContent = soundToggle.classList.contains('inactive') ? '🔇 Off' : '🔊 On';
});

musicToggle.addEventListener('click', () => {
  musicToggle.classList.toggle('inactive');
  musicToggle.textContent = musicToggle.classList.contains('inactive') ? '🚫 Off' : '🎶 On';
});


const canvasRef = document.getElementById('canvas');

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