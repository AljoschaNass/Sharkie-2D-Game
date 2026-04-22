class StatusBar extends DrawableObject {
    x = 20;
    y = 0;
    height = 50;
    width = 200;
    percentage;
    IMAGES = [];


    /**
     * Creates a new status bar.
     * @param {number} y - Y position of the status bar
     * @param {string[]} images - Array with image paths for different percentages
     * @param {number} initialPercentage - Initial value in percent
     */
    constructor(y, images, initialPercentage) {
        super();
        this.y = y;
        this.IMAGES = images;
        this.loadImages(this.IMAGES);
        this.setPercentage(initialPercentage);
    }


    /**
     * Sets the percentage and updates the displayed image.
     * @param {number} percentage - New percentage value
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Gets the image index based on the current percentage.
     * @returns {number} Index of the image to display
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}