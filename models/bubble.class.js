class Bubble extends MovableObject {
    world;
    speed = 3.5;
    width = 20;
    height = 20;
    normalDirection;

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/bubble-trap/bubble.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        // this.normalDirection = true;
        this.move();
    }

    move() { 
        console.log(this.world.character.otherDirection);
        
        if (!this.world.character.otherDirection) {
            console.log("normal");
            
            this.interval = setInterval(() => {
                this.x += this.speed;
                if (this.x > 3000) {
                    clearInterval(this.interval);
                }
            }, 1000 / 60);
        } else {
            console.log("reverse");

            this.interval = setInterval(() => {
                this.x -= this.speed;
                if (this.x < 0) {
                    clearInterval(this.interval);
                }
            }, 1000 / 60);
        }
        
    }
}
