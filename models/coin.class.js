/**
 * Spinning coin pickup.
 */
class Coin extends AnimatedCollectable {
    static ANIMATION_INTERVAL_MS = 300;
    static IMAGES = [
        'img/4.Marcadores/1. Coins/1.png',
        'img/4.Marcadores/1. Coins/2.png',
        'img/4.Marcadores/1. Coins/3.png',
        'img/4.Marcadores/1. Coins/4.png'
    ];

    width = 40;
    height = 40;

    constructor() {
        super({ images: Coin.IMAGES, interval: Coin.ANIMATION_INTERVAL_MS });
    }
}
