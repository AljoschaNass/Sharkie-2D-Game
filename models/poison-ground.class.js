class PoisonGround extends CollectableObject {
    IMAGES_GROUND = [
        'img/4.Marcadores/Posion/Dark - Left.png',
        'img/4.Marcadores/Posion/Dark - Right.png'
    ];
    x = 100;
    y = 100;


    /**
     * Creates a new poison bottle on the ground.
     */
    constructor(){
        super().loadImage("img/4.Marcadores/Posion/Dark - Left.png");
        this.loadImages(this.IMAGES_GROUND);
        this.animate();
    }

    /**
     * Starts the poison bottle animation.
     */
    animate() {
        setInterval(() => {
            if (!gamePaused) {
                this.playAnimation(this.IMAGES_WATER);
            }
        }, 200);
    }
}