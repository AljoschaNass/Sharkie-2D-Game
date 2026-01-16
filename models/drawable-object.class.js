class DrawableObjekt {
    x = 0;
    y = 100;
    height = 220;
    width = 220;
    img;
    currentImage = 0;
    imageCache = {};
    offset = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };


    /**
     * Loads a single image.
     * @param {string} path - Path to the image file
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads multiple images and saves them in the cache.
     * @param {string[]} arr - Array with image paths
     */
    loadImages(arr) {
        arr.forEach(path => {
            this.img = new Image();
            this.img.src = path;
            this.imageCache[path] = this.img;
        });
    }


    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        if (this.img && this.img instanceof HTMLImageElement) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Draws a frame around the object (Debug).
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    drawFrame(ctx) {}

    /**
     * Draws the hitbox of the object (Debug).
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    drawHitbox(ctx) {}
}