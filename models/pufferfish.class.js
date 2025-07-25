class Pufferfish extends MovableObject {
    height = 70;
    width = 70;
    offset = {
        top: 0,
        left: 0,
        bottom: 15,
        right: 0
    };
    IMAGES_SWIM = [];
    IMAGES_TRANSITION = [];
    IMAGES_BUBBLESWIM = [];

    IMAGES_SWIM_GREEN = [
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/1.swim5.png',
    ];
    IMAGES_TRANSITION_GREEN = [
        'img/2.Enemy/1.Pufferfish/2.transition/1.transition1.png',
        'img/2.Enemy/1.Pufferfish/2.transition/1.transition2.png',
        'img/2.Enemy/1.Pufferfish/2.transition/1.transition3.png',
        'img/2.Enemy/1.Pufferfish/2.transition/1.transition4.png',
        'img/2.Enemy/1.Pufferfish/2.transition/1.transition5.png',
    ];
    IMAGES_BUBBLESWIM_GREEN = [
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/1.bubbleswim5.png',
    ];
    IMAGES_SWIM_ORANGE = [
        'img/2.Enemy/1.Pufferfish/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/2.swim5.png',
    ];
    IMAGES_TRANSITION_ORANGE = [
        'img/2.Enemy/1.Pufferfish/2.transition/2.transition1.png',
        'img/2.Enemy/1.Pufferfish/2.transition/2.transition2.png',
        'img/2.Enemy/1.Pufferfish/2.transition/2.transition3.png',
        'img/2.Enemy/1.Pufferfish/2.transition/2.transition4.png',
        'img/2.Enemy/1.Pufferfish/2.transition/2.transition5.png',
    ];
    IMAGES_BUBBLESWIM_ORANGE = [
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/2.bubbleswim1.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/2.bubbleswim2.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/2.bubbleswim3.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/2.bubbleswim4.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/2.bubbleswim5.png',
    ];
    IMAGES_SWIM_RED = [
        'img/2.Enemy/1.Pufferfish/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/3.swim2.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Pufferfish/1.Swim/3.swim5.png',
    ];
    IMAGES_TRANSITION_RED = [
        'img/2.Enemy/1.Pufferfish/2.transition/3.transition1.png',
        'img/2.Enemy/1.Pufferfish/2.transition/3.transition2.png',
        'img/2.Enemy/1.Pufferfish/2.transition/3.transition3.png',
        'img/2.Enemy/1.Pufferfish/2.transition/3.transition4.png',
        'img/2.Enemy/1.Pufferfish/2.transition/3.transition5.png',
    ];
    IMAGES_BUBBLESWIM_RED = [
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/3.bubbleswim1.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/3.bubbleswim2.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/3.bubbleswim3.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/3.bubbleswim4.png',
        'img/2.Enemy/1.Pufferfish/3.Bubbleeswim/3.bubbleswim5.png',
    ];
    
    repeatCounter = 0;


    constructor(color){
        super().loadImage("img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png");
        this.loadAllImages();
        this.color = color;
        this.selectColor();
        this.setSequences();
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
        const colors = ['GREEN', 'ORANGE', 'RED'];
        const types = ['SWIM', 'TRANSITION', 'BUBBLESWIM'];

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
        this.IMAGES_TRANSITION = this[`IMAGES_TRANSITION_${suffix}`] || [];
        this.IMAGES_BUBBLESWIM = this[`IMAGES_BUBBLESWIM_${suffix}`] || [];       
    }


    setSequences() {
        this.sequences = [
            { images: this.IMAGES_SWIM, repeat: 2 },
            { images: this.IMAGES_TRANSITION, repeat: 1 },
            { images: this.IMAGES_BUBBLESWIM, repeat: 2 },
            { images: [...this.IMAGES_TRANSITION].reverse(), repeat: 1 }
        ];
    }
}