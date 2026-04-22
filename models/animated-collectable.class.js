/**
 * Intermediate base for collectables whose only difference is the image set
 * and the animation tick rate. Handles image preloading, random spawn
 * positioning, and the animation loop.
 */
class AnimatedCollectable extends CollectableObject {
    /**
     * @param {Object} config
     * @param {string[]} config.images - Animation frames in play order.
     * @param {number} config.interval - Tick interval for the animation loop (ms).
     * @param {string} [config.initialImage] - Path for the first rendered frame (defaults to `images[0]`).
     */
    constructor({ images, interval, initialImage }) {
        super().loadImage(initialImage ?? images[0]);
        this.animationImages = images;
        this.animationInterval = interval;
        this.loadImages(images);
        this.calculateXPosition();
        this.calculateYPosition();
        this.startAnimation();
    }

    /**
     * Start the frame-by-frame animation loop.
     */
    startAnimation() {
        IntervalManager.setInterval(
            () => this.playAnimation(this.animationImages),
            this.animationInterval
        );
    }
}
