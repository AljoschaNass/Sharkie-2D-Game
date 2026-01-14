
let canvas;
let world;
let keyboard = new Keyboard();
let gamePaused = false;

/**
 * Initializes the game world and starts the game.
 * Creates a new world instance, resets character and endboss, and starts background music.
 */
function init() {
    gamePaused = false;
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d_none");
    world = new World(canvas, keyboard);
    world.character.restart();
    const endboss = world.level.enemies.find(enemy => enemy instanceof Endboss);
    if (endboss) {
        endboss.restart();
    }
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

/**
 * Binds touch event handlers to all mobile control buttons.
 */
function bindMobileButtons() {
    const mapping = getMobileButtonMapping();
    mapping.forEach(m => bindMobileButton(m));
}

/**
 * Returns the mapping configuration for mobile buttons.
 * @returns {Array<{id: string, key: string}>} Array of button mappings
 */
function getMobileButtonMapping() {
    return [
        { id: "btn-left", key: "LEFT" },
        { id: "btn-right", key: "RIGHT" },
        { id: "btn-up", key: "UP" },
        { id: "btn-down", key: "DOWN" },
        { id: "btn-space", key: "SPACE" },
        { id: "btn-d", key: "D" }
    ];
}

/**
 * Binds touch handlers to a single mobile button.
 * @param {{id: string, key: string}} mapping - Button mapping configuration
 */
function bindMobileButton(mapping) {
    const btn = document.getElementById(mapping.id);
    if (!btn) return;

    addTouchHandlers(btn, mapping.key);
}

/**
 * Adds touchstart and touchend event handlers to a button.
 * @param {HTMLElement} btn - The button element
 * @param {string} key - The keyboard key to simulate
 */
function addTouchHandlers(btn, key) {
    btn.addEventListener("touchstart", e => {
        e.preventDefault();
        keyboard[key] = true;
        btn.classList.add("pressed");
    });

    btn.addEventListener("touchend", e => {
        e.preventDefault();
        keyboard[key] = false;
        btn.classList.remove("pressed");
    });
}