class Coin extends CollectableObject {
    IMAGES_ANIMATE = [
        'img/4.Marcadores/1. Coins/1.png',
        'img/4.Marcadores/1. Coins/2.png',
        'img/4.Marcadores/1. Coins/3.png',
        'img/4.Marcadores/1. Coins/4.png'
    ];
    width = 40;
    height = 40;


    /**
     * Creates a new coin.
     */
    constructor(){
        super().loadImage("img/4.Marcadores/1. Coins/1.png");
        this.loadImages(this.IMAGES_ANIMATE);
        this.calculateXPosition();
        this.calculateYPosition();
        this.animate();
    }

    /**
     * Starts the coin animation.
     */
    animate() {
        setInterval(() => {
            if (!gamePaused) {
                this.playAnimation(this.IMAGES_ANIMATE);
            }
        }, 300);
    }
}