/**
 * Swims left across the level and plays a four-phase animation loop
 * (swim → transition → bubble-swim → transition reversed).
 */
class Pufferfish extends Enemy {
    static COLORS = ['GREEN', 'ORANGE', 'RED'];
    static TYPES = ['SWIM', 'TRANSITION', 'BUBBLESWIM'];
    static ANIMATION_INTERVAL_MS = 200;

    height = 60;
    width = 70;
    offset = { top: 5, left: 10, bottom: 15, right: 10 };

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

    /**
     * @param {'green'|'orange'|'red'} color
     */
    constructor(color) {
        super().loadImage('img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png');
        this.color = color;
        this.loadColorVariants(Pufferfish.COLORS, Pufferfish.TYPES);
        this.selectColorImages(Pufferfish.TYPES);
        this.setSequences();
        this.randomizeSpawn({ xMin: 400, xRange: 3600 });
        this.animate();
    }

    /**
     * Start movement and animation loops.
     */
    animate() {
        IntervalManager.setInterval(() => this.moveLeft(), FRAME_INTERVAL);
        this.loopAnimationSequence();
    }

    /**
     * Continuously cycle through the animation sequences.
     */
    loopAnimationSequence() {
        let sequenceIndex = 0;
        let frameIndex = 0;
        IntervalManager.setInterval(() => {
            const next = this.playSequenceFrame(sequenceIndex, frameIndex);
            sequenceIndex = next.sequenceIndex;
            frameIndex = next.frameIndex;
        }, Pufferfish.ANIMATION_INTERVAL_MS);
    }

    /**
     * Play a single frame of the given sequence and advance state.
     * @returns {{ sequenceIndex: number, frameIndex: number }}
     */
    playSequenceFrame(sequenceIndex, frameIndex) {
        const current = this.sequences[sequenceIndex];
        this.updateFrameImage(current.images, frameIndex);
        return this.handleSequenceProgress(sequenceIndex, frameIndex + 1, current);
    }

    /**
     * Swap the sprite and adjust the offset for the current animation type.
     */
    updateFrameImage(images, frameIndex) {
        this.img = this.imageCache[images[frameIndex]];
        this.setOffset(images);
    }

    /**
     * Advance the sequence counter once the current animation has played
     * its configured number of repeats.
     */
    handleSequenceProgress(sequenceIndex, frameIndex, current) {
        if (frameIndex < current.images.length) return { sequenceIndex, frameIndex };

        this.repeatCounter++;
        if (this.repeatCounter < current.repeat) return { sequenceIndex, frameIndex: 0 };

        this.repeatCounter = 0;
        return {
            sequenceIndex: (sequenceIndex + 1) % this.sequences.length,
            frameIndex: 0
        };
    }

    /**
     * Build the animation sequence — swim → transition → bubble-swim → transition reversed.
     */
    setSequences() {
        this.sequences = [
            { images: this.IMAGES_SWIM, repeat: 2 },
            { images: this.IMAGES_TRANSITION, repeat: 1 },
            { images: this.IMAGES_BUBBLESWIM, repeat: 2 },
            { images: [...this.IMAGES_TRANSITION].reverse(), repeat: 1 }
        ];
    }

    /**
     * Bubble-swim animation has a different hitbox than the other sequences.
     */
    setOffset(currentImages) {
        this.offset.bottom = currentImages === this.IMAGES_BUBBLESWIM ? 0 : 15;
    }
}
