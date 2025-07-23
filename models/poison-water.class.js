class PoisonWater extends CollectableObject {
    IMAGES_WATER = [
        'img/4.Marcadores/Posion/Animada/1.png',
        'img/4.Marcadores/Posion/Animada/2.png',
        'img/4.Marcadores/Posion/Animada/3.png',
        'img/4.Marcadores/Posion/Animada/4.png',
        'img/4.Marcadores/Posion/Animada/5.png',
        'img/4.Marcadores/Posion/Animada/6.png',
        'img/4.Marcadores/Posion/Animada/7.png',
        'img/4.Marcadores/Posion/Animada/8.png'
    ];
    x = 400;
    y = 200;
    offset = {
        top: 20,
        left: 5,
        bottom: 0,
        right: 5
    };


    constructor(){
        super().loadImage("img/4.Marcadores/Posion/Animada/1.png");
        this.loadImages(this.IMAGES_WATER);
        this.calculateXPosition();
        this.calculateYPosition();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WATER);   
        }, 200);
    }
}