/**
 * Root of the game-object hierarchy.
 * Responsible for loading and caching sprites and drawing itself on the canvas.
 */
class DrawableObject {
    x = 0;
    y = 100;
    height = 220;
    width = 220;
    img;
    currentImage = 0;
    imageCache = {};
    offset = { top: 0, left: 0, bottom: 0, right: 0 };

    /**
     * Load a single image and use it as the currently rendered sprite.
     * @param {string} path
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preload a list of sprites into the shared `imageCache`, keyed by path.
     * @param {string[]} paths
     */
    loadImages(paths) {
        paths.forEach(path => {
            const image = new Image();
            image.src = path;
            this.imageCache[path] = image;
        });
    }

    /**
     * Draw this object at its current position using its current sprite.
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        if (this.img instanceof HTMLImageElement) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}
