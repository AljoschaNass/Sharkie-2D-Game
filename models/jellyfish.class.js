class Pufferfish extends MovableObject {
    height = 60;
    width = 70;
    offset = {
        top: 0,
        left: 0,
        bottom: 15,
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
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.loopAnimationSequence();
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


    loopAnimationSequence() {
        let currentSequenceIndex = 0;
        let frameIndex = 0;

        setInterval(() => {
            const current = this.sequences[currentSequenceIndex];
            const currentImages = current.images;
            const path = currentImages[frameIndex];
            this.img = this.imageCache[path];
            frameIndex++;
            if (frameIndex >= currentImages.length) {
                frameIndex = 0;
                this.repeatCounter++;
                if (this.repeatCounter >= current.repeat) {
                    this.repeatCounter = 0;
                    currentSequenceIndex = (currentSequenceIndex + 1) % this.sequences.length;
                }
            }
        }, 200);
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
}