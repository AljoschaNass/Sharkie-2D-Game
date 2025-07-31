class Jellyfish extends MovableObject {
    height = 80;
    width = 60;
    offset = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };
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
    repeatCounter = 0;


    constructor(color){
        super().loadImage("img/2.Enemy/2.Jellyfish/Regular damage/Lila 1.png");
        this.loadAllImages();
        this.color = color;
        this.selectColor();
        this.calculatePosition();
        this.waveOffset = Math.random() * 1000;
        this.baseY = this.y;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeftWithWave();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIM);
        }, 250);
    }


    loadAllImages() {
        const colors = ['LILA', 'YELLOW', 'GREEN', 'PINK'];
        const types = ['SWIM', 'DEAD'];

        colors.forEach(color => {
            types.forEach(type => {
                const key = `IMAGES_${type}_${color}`;
                this.loadImages(this[key]);
            });
        });
    }


    calculatePosition() {
        this.x = 200 + Math.random() * 500 * 0.8;
        this.y = Math.random() * 480 * 0.75;
        this.speed = 0.25 + Math.random() * 0.25;
    }


    selectColor() {
        const suffix = this.color.toUpperCase();

        this.IMAGES_SWIM = this[`IMAGES_SWIM_${suffix}`] || [];
        this.IMAGES_DEAD = this[`IMAGES_DEAD_${suffix}`] || [];
    }


    moveLeftWithWave() {
        this.x -= this.speed;
        this.y = this.baseY + Math.sin((Date.now() + this.waveOffset) / 300) * 20;
    }
}