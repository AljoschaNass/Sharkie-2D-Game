class Pufferfish extends MovableObject {
    height = 70;
    width = 70;
    IMAGES_SWIM = [
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim5.png',

    ];

    currentImage = 0;


    constructor(){
        super().loadImage("img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png");
        this.loadImages(this.IMAGES_SWIM);

        this.x = 200 + Math.random() * 500 * 0.8;
        this.y = Math.random() * 480 * 0.75;
        this.speed = 0.25 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIM.length;
            let path = this.IMAGES_SWIM[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }
}