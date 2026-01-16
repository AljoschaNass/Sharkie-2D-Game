
let canvas;
let world;
let keyboard = new Keyboard();
let gamePaused = false;

const KEY_MAP = {
    "ArrowLeft": "LEFT",
    "ArrowRight": "RIGHT",
    "ArrowUp": "UP",
    "ArrowDown": "DOWN",
    "Space": "SPACE",
    "Enter": "ENTER",
    "Escape": "ESCAPE",
    "KeyD": "D"
};

/**
 * Initializes the game world and starts the game.
 * Creates a new world instance, resets character and endboss, and starts background music.
 */
function init() {
    gamePaused = false;
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d_none");
    const gameContainer = document.getElementById("game-container");
    gameContainer.classList.remove("d_none");
    if (world) {
        world.clearCollisionInterval();
    }
    world = new World(canvas, keyboard);
    document.getElementById("startScreen").classList.add("d_none");
    world.audioManager.playLoop('background');
    bindMobileButtons();
}

window.addEventListener("keydown", (event) => {
    const key = KEY_MAP[event.code];
    if (key) keyboard[key] = true;
});

window.addEventListener("keyup", (event) => {
    const key = KEY_MAP[event.code];
    if (key) keyboard[key] = false;
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