
let canvas;
let world;
let keyboard = new Keyboard();
let gamePaused = false;


function init() {
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d_none");
    world = new World(canvas, keyboard);
    document.getElementById("startScreen").classList.add("d_none");
}


window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowLeft":
            keyboard.LEFT = true;
            break;
        case "ArrowRight":
            keyboard.RIGHT = true;
            break;
        case "ArrowUp":
            keyboard.UP = true;
            break;
        case "ArrowDown":
            keyboard.DOWN = true;
            break;
        case "Space":
            keyboard.SPACE = true;
            break;
        case "Enter":
            keyboard.ENTER = true;
            break;
        case "Escape":
            keyboard.ESCAPE = true;
            break;
        case "KeyD":
            keyboard.D = true;
            break;
    }
});


window.addEventListener("keyup", (event) => {
    switch (event.code) {
        case "ArrowLeft":
            keyboard.LEFT = false;
            break;
        case "ArrowRight":
            keyboard.RIGHT = false;
            break;
        case "ArrowUp":
            keyboard.UP = false;
            break;
        case "ArrowDown":
            keyboard.DOWN = false;
            break;
        case "Space":
            keyboard.SPACE = false;
            break;
        case "Enter":
            keyboard.ENTER = false;
            break;
        case "Escape":
            keyboard.ESCAPE = false;
            break;
        case "KeyD":
            keyboard.D = false;
            break;
    }
});