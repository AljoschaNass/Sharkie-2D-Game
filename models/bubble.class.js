class Bubble extends MovableObject {
    speed = 4;

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/bubble-trap/bubble.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.move();
    }

    move() {
        this.interval = setInterval(() => {
            this.x += this.speed;
            if (this.x > 3000) {
                clearInterval(this.interval);
            }
        }, 1000 / 60);
    }
}
