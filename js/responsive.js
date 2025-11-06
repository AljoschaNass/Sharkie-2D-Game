// function resizeGame() {
//   const aspectRatio = 720 / 480;
//   let newWidth = window.innerWidth;
//   let newHeight = window.innerHeight;

//   // Prüfe, ob Querformat
//   if (newWidth < newHeight) {
//     document.getElementById('rotate-message').classList.remove('d_none');
//     startScreen.classList.add('d_none');
//     // winScreen.classList.add('d_none');
//     // gameOverScreen.classList.add('d_none');
//     return;
//   } else {
//     document.getElementById('rotate-message').classList.add('d_none');
//     startScreen.classList.remove('d_none');
//     // winScreen.classList.remove('d_none');
//     // gameOverScreen.classList.remove('d_none');
//   }

//   // Verhältnis beibehalten
//   if (newWidth / newHeight > aspectRatio) {
//     newWidth = newHeight * aspectRatio;
//   } else {
//     newHeight = newWidth / aspectRatio;
//   }

//   // Anwenden
//   canvasRef.style.width = `${newWidth}px`;
//   canvasRef.style.height = `${newHeight}px`;
//   startScreen.style.width = `${newWidth}px`;
//   startScreen.style.height = `${newHeight}px`;
//   winScreen.style.width = `${newWidth}px`;
//   winScreen.style.height = `${newHeight}px`;
//   gameOverScreen.style.width = `${newWidth}px`;
//   gameOverScreen.style.height = `${newHeight}px`;
// }

// // Beim Start und bei Fensteränderung
// // window.addEventListener('resize', resizeGame);
// // window.addEventListener('orientationchange', resizeGame);
// // resizeGame();
