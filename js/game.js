
let canvas;
let world;
let keyboard = new Keyboard();
let gamePaused = false;


function init() {
    gamePaused = false;
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d_none");
    world = new World(canvas, keyboard);
    world.character.restart();
    document.getElementById("startScreen").classList.add("d_none");
    world.audioManager.playLoop('background');
    bindMobileButtons();
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

function bindMobileButtons() {
    const mapping = [
        { id: "btn-left", key: "LEFT" },
        { id: "btn-right", key: "RIGHT" },
        { id: "btn-up", key: "UP" },
        { id: "btn-down", key: "DOWN" },
        { id: "btn-space", key: "SPACE" },
        { id: "btn-d", key: "D" }
    ];

    mapping.forEach(m => {
        const btn = document.getElementById(m.id);
        if (!btn) return;

        const press = () => {
            keyboard[m.key] = true;
            btn.classList.add("pressed");
        };

        const release = () => {
            keyboard[m.key] = false;
            btn.classList.remove("pressed");
        };

        btn.addEventListener("touchstart", e => {
            e.preventDefault();
            press();
        });
        btn.addEventListener("touchend", e => {
            e.preventDefault();
            release();
        });
    });
}