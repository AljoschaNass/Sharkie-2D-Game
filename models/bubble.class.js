class Bubble extends MovableObject {
    world;
    x;
    y;
    speed = 3.5;
    width = 50;
    height = 50;
    otherDirection;

    constructor(world, x, y, otherDirection = false) {
        super().loadImage('img/1.Sharkie/4.Attack/bubble-trap/bubble.png');
        this.world = world;
        this.x = x + this.width;
        this.y = y;
        this.otherDirection = otherDirection;
        this.moveBubble();
    }


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
}
