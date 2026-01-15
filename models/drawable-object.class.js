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
     * Lädt ein einzelnes Bild.
     * @param {string} path - Pfad zur Bilddatei
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Lädt mehrere Bilder und speichert sie im Cache.
     * @param {string[]} arr - Array mit Bildpfaden
     */
    loadImages(arr) {
        arr.forEach(path => {
            this.img = new Image();
            this.img.src = path;
            this.imageCache[path] = this.img;
        });
    }


    /**
     * Zeichnet das Objekt auf das Canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas-Kontext
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Zeichnet einen Rahmen um das Objekt (Debug).
     * @param {CanvasRenderingContext2D} ctx - Canvas-Kontext
     */
    drawFrame(ctx) {}

    /**
     * Zeichnet die Hitbox des Objekts (Debug).
     * @param {CanvasRenderingContext2D} ctx - Canvas-Kontext
     */
    drawHitbox(ctx) {}
}