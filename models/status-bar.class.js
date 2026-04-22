/**
 * Percentage-based status bar (health, poison ammo, coins).
 * Picks one of six sprite stages from 0 % to 100 %.
 */
class StatusBar extends DrawableObject {
    x = 20;
    y = 0;
    height = 50;
    width = 200;
    percentage;
    IMAGES = [];

    /**
     * @param {number} y - Vertical offset for positioning the three bars above each other.
     * @param {string[]} images - Six sprites ordered from empty (0 %) to full (100 %).
     * @param {number} initialPercentage
     */
    constructor(y, images, initialPercentage) {
        super();
        this.y = y;
        this.IMAGES = images;
        this.loadImages(images);
        this.setPercentage(initialPercentage);
    }

    /**
     * Update the displayed percentage and swap the sprite accordingly.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        this.img = this.imageCache[this.IMAGES[this.resolveImageIndex()]];
    }

    /**
     * Map `this.percentage` onto one of six sprite stages.
     * Buckets: 0 = [0,20], 1 = (20,40], 2 = (40,60], 3 = (60,80], 4 = (80,100), 5 = 100.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage > 80) return 4;
        if (this.percentage > 60) return 3;
        if (this.percentage > 40) return 2;
        if (this.percentage > 20) return 1;
        return 0;
    }
}
