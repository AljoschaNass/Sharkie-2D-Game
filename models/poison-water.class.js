/**
 * Poison bottle pickup. Refills the ammunition used by the bubble attack.
 */
class PoisonWater extends AnimatedCollectable {
    static ANIMATION_INTERVAL_MS = 200;
    static IMAGES = [
        'img/4.Marcadores/Posion/Animada/1.png',
        'img/4.Marcadores/Posion/Animada/2.png',
        'img/4.Marcadores/Posion/Animada/3.png',
        'img/4.Marcadores/Posion/Animada/4.png',
        'img/4.Marcadores/Posion/Animada/5.png',
        'img/4.Marcadores/Posion/Animada/6.png',
        'img/4.Marcadores/Posion/Animada/7.png',
        'img/4.Marcadores/Posion/Animada/8.png'
    ];

    offset = { top: 20, left: 5, bottom: 0, right: 5 };

    constructor() {
        super({ images: PoisonWater.IMAGES, interval: PoisonWater.ANIMATION_INTERVAL_MS });
    }
}
