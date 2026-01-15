class PoisonGround extends CollectableObject {
    IMAGES_GROUND = [
        'img/4.Marcadores/Posion/Dark - Left.png',
        'img/4.Marcadores/Posion/Dark - Right.png'
    ];
    x = 100;
    y = 100;


    /**
     * Erstellt eine neue Giftflasche am Boden.
     */
    constructor(){
        super().loadImage("img/4.Marcadores/Posion/Dark - Left.png");
        this.loadImages(this.IMAGES_GROUND);
        this.animate();
    }

    /**
     * Startet die Animation der Giftflasche.
     */
    animate() {
        setInterval(() => {
            if (!gamePaused) {
                this.playAnimation(this.IMAGES_WATER);
            }
        }, 200);
    }
}