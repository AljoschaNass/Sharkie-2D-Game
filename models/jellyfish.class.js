/**
 * Floats left through the level with a sinusoidal up/down wave motion.
 * Comes in four color variants; green and pink are "super-dangerous" and deal
 * electric damage instead of poison (see `MovableObject.hit`).
 */
class Jellyfish extends Enemy {
    static COLORS = ['LILA', 'YELLOW', 'GREEN', 'PINK'];
    static TYPES = ['SWIM', 'DEAD'];
    static ANIMATION_INTERVAL_MS = 250;
    static WAVE_AMPLITUDE = 40;
    static WAVE_PERIOD_MS = 300;

    height = 80;
    width = 60;
    offset = { top: 10, left: 10, bottom: 10, right: 10 };

    IMAGES_SWIM = [];
    IMAGES_DEAD = [];

    IMAGES_SWIM_LILA = [
        'img/2.Enemy/2.Jellyfish/Regular damage/Lila 1.png',
        'img/2.Enemy/2.Jellyfish/Regular damage/Lila 2.png',
        'img/2.Enemy/2.Jellyfish/Regular damage/Lila 3.png',
        'img/2.Enemy/2.Jellyfish/Regular damage/Lila 4.png'
    ];
    IMAGES_SWIM_YELLOW = [
        'img/2.Enemy/2.Jellyfish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2.Jellyfish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2.Jellyfish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2.Jellyfish/Regular damage/Yellow 4.png',
    ];
    IMAGES_SWIM_GREEN = [
        'img/2.Enemy/2.Jellyfish/Super-Dangerous/Green 1.png',
        'img/2.Enemy/2.Jellyfish/Super-Dangerous/Green 2.png',
        'img/2.Enemy/2.Jellyfish/Super-Dangerous/Green 3.png',
        'img/2.Enemy/2.Jellyfish/Super-Dangerous/Green 4.png'
    ];
    IMAGES_SWIM_PINK = [
        'img/2.Enemy/2.Jellyfish/Super-Dangerous/Pink 1.png',
        'img/2.Enemy/2.Jellyfish/Super-Dangerous/Pink 2.png',
        'img/2.Enemy/2.Jellyfish/Super-Dangerous/Pink 3.png',
        'img/2.Enemy/2.Jellyfish/Super-Dangerous/Pink 4.png'
    ];
    IMAGES_DEAD_LILA = [
        'img/2.Enemy/2.Jellyfish/Dead/Lila/L1.png',
        'img/2.Enemy/2.Jellyfish/Dead/Lila/L2.png',
        'img/2.Enemy/2.Jellyfish/Dead/Lila/L3.png',
        'img/2.Enemy/2.Jellyfish/Dead/Lila/L4.png'
    ];
    IMAGES_DEAD_YELLOW = [
        'img/2.Enemy/2.Jellyfish/Dead/Yellow/y1.png',
        'img/2.Enemy/2.Jellyfish/Dead/Yellow/y2.png',
        'img/2.Enemy/2.Jellyfish/Dead/Yellow/y3.png',
        'img/2.Enemy/2.Jellyfish/Dead/Yellow/y4.png'
    ];
    IMAGES_DEAD_GREEN = [
        'img/2.Enemy/2.Jellyfish/Dead/green/g1.png',
        'img/2.Enemy/2.Jellyfish/Dead/green/g2.png',
        'img/2.Enemy/2.Jellyfish/Dead/green/g3.png',
        'img/2.Enemy/2.Jellyfish/Dead/green/g4.png'
    ];
    IMAGES_DEAD_PINK = [
        'img/2.Enemy/2.Jellyfish/Dead/Pink/P1.png',
        'img/2.Enemy/2.Jellyfish/Dead/Pink/P2.png',
        'img/2.Enemy/2.Jellyfish/Dead/Pink/P3.png',
        'img/2.Enemy/2.Jellyfish/Dead/Pink/P4.png'
    ];

    /**
     * @param {'lila'|'yellow'|'green'|'pink'} color
     */
    constructor(color) {
        super().loadImage('img/2.Enemy/2.Jellyfish/Regular damage/Lila 1.png');
        this.color = color;
        this.loadColorVariants(Jellyfish.COLORS, Jellyfish.TYPES);
        this.selectColorImages(Jellyfish.TYPES);
        this.randomizeSpawn({ xMin: 600, xRange: 3400 });
        this.waveOffset = Math.random() * 1000;
        this.baseY = this.y;
        this.animate();
    }

    /**
     * Start movement and animation loops.
     */
    animate() {
        IntervalManager.setInterval(() => this.moveLeftWithWave(), FRAME_INTERVAL);
        IntervalManager.setInterval(() => this.playAnimation(this.IMAGES_SWIM), Jellyfish.ANIMATION_INTERVAL_MS);
    }

    /**
     * Drift left with a vertical sine wave around `baseY`.
     */
    moveLeftWithWave() {
        this.x -= this.speed;
        this.y = this.baseY + Math.sin((Date.now() + this.waveOffset) / Jellyfish.WAVE_PERIOD_MS) * Jellyfish.WAVE_AMPLITUDE;
    }
}
