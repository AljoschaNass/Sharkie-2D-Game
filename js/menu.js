document.addEventListener("DOMContentLoaded", () => {
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
});
