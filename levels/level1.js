/**
 * Background is composed of five parallax layers that repeat horizontally.
 * Each tile is `LEVEL_TILE_WIDTH` wide, alternating between variants `D1` and `D2`.
 */
const BACKGROUND_LAYERS = ['5. Water', '4.Fondo 2', '3.Fondo 1', '2. Floor', '1. Light'];

/**
 * Build one repeating strip of parallax background tiles.
 * @param {number} [start=-2] - First tile index (negative values extend to the left of origin).
 * @param {number} [count=8] - Total number of tiles to emit.
 * @returns {BackgroundObject[]}
 */
function buildBackgroundLayers(start = -2, count = 8) {
    const tiles = [];
    for (let i = start; i < start + count; i++) {
        const variant = i % 2 === 0 ? 'D1' : 'D2';
        const x = i * LEVEL_TILE_WIDTH;
        BACKGROUND_LAYERS.forEach(layer => {
            tiles.push(new BackgroundObject(`img/3.Background/Layers/${layer}/${variant}.png`, x));
        });
    }
    return tiles;
}

/**
 * Build the full enemy roster — varied pufferfish colors, an endboss,
 * and a mix of regular and super-dangerous jellyfish.
 * @returns {MovableObject[]}
 */
function buildEnemies() {
    const pufferfishColors = ['green', 'orange', 'red', 'green', 'orange', 'red', 'green', 'orange'];
    const jellyfishColors = ['lila', 'yellow', 'green', 'pink', 'lila', 'yellow', 'green', 'pink'];

    return [
        ...pufferfishColors.map(c => new Pufferfish(c)),
        new Endboss(),
        ...jellyfishColors.map(c => new Jellyfish(c))
    ];
}

/**
 * Spawn `count` instances of `Ctor` with no arguments.
 */
function spawnPickups(Ctor, count) {
    return Array.from({ length: count }, () => new Ctor());
}

/**
 * Configure and return level 1.
 * @returns {Level}
 */
function createLevel1() {
    return new Level(
        buildEnemies(),
        spawnPickups(PoisonWater, 12),
        spawnPickups(Coin, 12),
        buildBackgroundLayers()
    );
}
