class Bubble extends MovableObject {
    world;
    x;
    y;
    speed = 3.5;
    width = 35;
    height = 35;
    otherDirection;

    /**
     * Creates a new bubble as a projectile.
     * @param {World} world - Reference to the game world
     * @param {number} x - Starting X position
     * @param {number} y - Starting Y position
     * @param {boolean} otherDirection - True if the bubble flies to the left
     */
    constructor(world, x, y, otherDirection = false) {
        super().loadImage('img/1.Sharkie/4.Attack/bubble-trap/poisoned-bubble.png');
        this.world = world;
        this.calculatePosition(x, y);
        this.otherDirection = otherDirection;
        this.moveBubble();
    }


    /**
     * Moves the bubble horizontally and removes it at the level end.
     */
    moveBubble() {
        const interval = setInterval(() => {
            if (!gamePaused) {
                this.x += this.otherDirection ? -this.speed : this.speed;

                if (this.x < -200 || this.x > this.world.level.levelEnd_x + 200) {
                    clearInterval(interval);
                }
            }
        }, 1000 / 60);
    }


    /**
     * Sets the starting position of the bubble.
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    calculatePosition(x, y) {
        this.x = x;
        this.y = y;
    }
}
