class Pufferfish extends MovableObject {
    height = 70;
    width = 70;

    constructor(){
        super().loadImage("img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png");

        this.x = 200 + Math.random() * 500 * 0.8;
        this.y = Math.random() * 480 * 0.75;
    }
}