/**
 * Game entry point. Owns the top-level globals (`canvas`, `world`, `keyboard`,
 * `gamePaused`) and wires keyboard + touch input to the Keyboard handler.
 */

let canvas;
let world;
let keyboard = new Keyboard();
let gamePaused = false;

const KEY_MAP = {
    ArrowLeft: 'LEFT',
    ArrowRight: 'RIGHT',
    ArrowUp: 'UP',
    ArrowDown: 'DOWN',
    Space: 'SPACE',
    Enter: 'ENTER',
    Escape: 'ESCAPE',
    KeyD: 'D'
};

const MOBILE_BUTTONS = [
    { id: 'btn-left',  key: 'LEFT'  },
    { id: 'btn-right', key: 'RIGHT' },
    { id: 'btn-up',    key: 'UP'    },
    { id: 'btn-down',  key: 'DOWN'  },
    { id: 'btn-space', key: 'SPACE' },
    { id: 'btn-d',     key: 'D'     }
];

/**
 * (Re)initialize the game world and start the game.
 * Stops the previous World and clears leftover timers before spinning up a fresh one.
 */
function init() {
    world?.stop();
    IntervalManager.clearAll();
    gamePaused = false;

    canvas = document.getElementById('canvas');
    canvas.classList.remove('d_none');
    document.getElementById('game-container').classList.remove('d_none');

    world = new World(canvas, keyboard);
    document.getElementById('startScreen').classList.add('d_none');
    world.audioManager.playLoop('background');

    bindMobileButtons();
}

/**
 * Tear down the running game so the user can return to the start menu cleanly.
 * Stops the render loop, clears every tracked interval and drops the World reference
 * so nothing keeps animating or playing audio in the background.
 */
function returnToMenu() {
    world?.stop();
    IntervalManager.clearAll();
    gamePaused = true;
    world = null;
}

/* ---------- Keyboard input ---------- */

window.addEventListener('keydown', event => {
    const key = KEY_MAP[event.code];
    if (key) keyboard[key] = true;
});

window.addEventListener('keyup', event => {
    const key = KEY_MAP[event.code];
    if (key) keyboard[key] = false;
});

/* ---------- Touch input ---------- */

function bindMobileButtons() {
    MOBILE_BUTTONS.forEach(({ id, key }) => {
        const btn = document.getElementById(id);
        if (btn) addTouchHandlers(btn, key);
    });
}

/**
 * Wire `touchstart`/`touchend` on a button to a virtual key press.
 */
function addTouchHandlers(btn, key) {
    btn.addEventListener('touchstart', e => {
        e.preventDefault();
        keyboard[key] = true;
        btn.classList.add('pressed');
    });
    btn.addEventListener('touchend', e => {
        e.preventDefault();
        keyboard[key] = false;
        btn.classList.remove('pressed');
    });
}
