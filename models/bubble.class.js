/**
 * Poison bubble projectile spawned by the bubble attack.
 * Flies horizontally in the direction the character was facing and
 * self-destructs when it leaves the level bounds.
 */
class Bubble extends MovableObject {
    static OFF_SCREEN_MARGIN = 200;

    speed = 3.5;
    width = 35;
    height = 35;

    /**
     * @param {World} world
     * @param {number} x - Starting x position.
     * @param {number} y - Starting y position.
     * @param {boolean} [otherDirection=false] - True if the bubble flies left.
     */
    constructor(world, x, y, otherDirection = false) {
        super().loadImage('img/1.Sharkie/4.Attack/bubble-trap/poisoned-bubble.png');
        this.world = world;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.startMovement();
    }

    /**
     * Fly horizontally and remove self once off-screen.
     */
    startMovement() {
        const id = IntervalManager.setInterval(() => {
            this.x += this.otherDirection ? -this.speed : this.speed;
            if (this.isOffScreen()) IntervalManager.clear(id);
        }, FRAME_INTERVAL);
    }

    /**
     * True once the bubble has flown past either level edge.
     */
    isOffScreen() {
        const levelEnd = this.world.level.levelEnd_x;
        return this.x < -Bubble.OFF_SCREEN_MARGIN || this.x > levelEnd + Bubble.OFF_SCREEN_MARGIN;
    }
}
