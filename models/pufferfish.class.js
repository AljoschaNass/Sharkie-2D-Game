class Pufferfish extends MovableObject {


    constructor(){
        super().loadImage("img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png");

        this.x = 200 + Math.random() * 500;
    }
}