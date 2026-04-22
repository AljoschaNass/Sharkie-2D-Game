/* ============================================================
 * Game-wide constants
 * ============================================================ */

/** Frames per second — the draw loop and all movement loops tick at this rate. */
const FPS = 60;

/** Milliseconds per frame (≈ 16.67ms at 60 fps). */
const FRAME_INTERVAL = 1000 / FPS;

/** How often collisions are evaluated (ms). */
const COLLISION_INTERVAL_MS = 200;

/** Invulnerability window after taking damage (ms). */
const HURT_COOLDOWN_MS = 1000;

/* ---- Damage ---- */

/** Damage dealt to the player, grouped by source. */
const DAMAGE = Object.freeze({
    POISON: 5,
    ELECTRIC: 10,
    ENDBOSS: 15
});

/** Damage dealt by the player's bubble to the endboss. */
const PLAYER_TO_ENDBOSS_DAMAGE = 20;

/* ---- World / level ---- */

/** Width of a single background tile (must match artwork). */
const LEVEL_TILE_WIDTH = 719;

/** Canvas dimensions. */
const VIEWPORT_WIDTH = 720;
const VIEWPORT_HEIGHT = 480;

/* ---- Endboss ---- */

/** Spawn position of the endboss. */
const ENDBOSS_SPAWN_X = 3500;

/** Player X position that triggers the endboss introduction. */
const ENDBOSS_ACTIVATION_X = 3100;

/** Endboss starting energy. */
const ENDBOSS_MAX_ENERGY = 100;

/* ---- Player ---- */

/** Starting and maximum player energy. */
const PLAYER_MAX_ENERGY = 100;

/** Player world-space bounds. */
const PLAYER_MIN_X = -600;
const PLAYER_MIN_Y = -90;
const PLAYER_MAX_Y = 300;

/** Collectable value, expressed as a percentage of the status bar (1 bottle = 12.5%). */
const COLLECTABLE_VALUE_PERCENT = 12.5;

/* ---- Status bar images ---- */

/**
 * Image paths for the poison status bar.
 */
const POISON_IMAGES = [
    'img/4.Marcadores/green/poisoned bubbles/poison_0.png',
    'img/4.Marcadores/green/poisoned bubbles/poison_20.png',
    'img/4.Marcadores/green/poisoned bubbles/poison_40.png',
    'img/4.Marcadores/green/poisoned bubbles/poison_60.png',
    'img/4.Marcadores/green/poisoned bubbles/poison_80.png',
    'img/4.Marcadores/green/poisoned bubbles/poison_100.png'
];

/**
 * Image paths for the health status bar.
 */
const HEALTH_IMAGES = [
    'img/4.Marcadores/green/Life/life_0.png',
    'img/4.Marcadores/green/Life/life_20.png',
    'img/4.Marcadores/green/Life/life_40.png',
    'img/4.Marcadores/green/Life/life_60.png',
    'img/4.Marcadores/green/Life/life_80.png',
    'img/4.Marcadores/green/Life/life_100.png'
];

/**
 * Image paths for the coin status bar.
 */
const COIN_IMAGES = [
    'img/4.Marcadores/green/Coin/coin_0.png',
    'img/4.Marcadores/green/Coin/coin_20.png',
    'img/4.Marcadores/green/Coin/coin_40.png',
    'img/4.Marcadores/green/Coin/coin_60.png',
    'img/4.Marcadores/green/Coin/coin_80.png',
    'img/4.Marcadores/green/Coin/coin_100.png'
];
