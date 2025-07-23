class PoisonGround extends CollectableObject {
    IMAGES_GROUND = [
        'img/4.Marcadores/Posion/Dark - Left.png',
        'img/4.Marcadores/Posion/Dark - Right.png'
    ];
    x = 100;
    y = 100;


    constructor(){
        super().loadImage("img/4.Marcadores/Posion/Dark - Left.png");
        this.loadImages(this.IMAGES_GROUND);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WATER);   
        }, 200);
    }
}