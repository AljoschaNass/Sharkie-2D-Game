  const shark = document.getElementById("shark");
  const sharkFrames = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png"
  ];

  let currentFrame = 0;

  setInterval(() => {
    shark.style.backgroundImage = `url(${sharkFrames[currentFrame]})`;
    currentFrame = (currentFrame + 1) % sharkFrames.length;
}, 150);


const optionsMenu = document.getElementById('optionsMenu');
const optionsBtn = document.querySelector('.btn-options');
const closeOptions = document.getElementById('closeOptions');

const soundToggle = document.getElementById('soundToggle');
const musicToggle = document.getElementById('musicToggle');

optionsBtn.addEventListener('click', () => optionsMenu.showModal());
closeOptions.addEventListener('click', () => optionsMenu.close());

optionsMenu.addEventListener('click', (e) => {
  const rect = optionsMenu.getBoundingClientRect();
  const clickedOutside =
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom;
  if (clickedOutside) optionsMenu.close();
});

soundToggle.addEventListener('click', () => {
  soundToggle.classList.toggle('inactive');
  soundToggle.textContent = soundToggle.classList.contains('inactive') ? '🔇 Off' : '🔊 On';
});

musicToggle.addEventListener('click', () => {
  musicToggle.classList.toggle('inactive');
  musicToggle.textContent = musicToggle.classList.contains('inactive') ? '🚫 Off' : '🎶 On';
});
