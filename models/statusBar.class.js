class StatusBar extends DrawableObjekt {
    x = 20;
    y = 0;
    height = 50;
    width = 200;
    percentage;
    IMAGES = [];


    /**
     * Erstellt eine neue Statusleiste.
     * @param {number} y - Y-Position der Statusleiste
     * @param {string[]} images - Array mit Bildpfaden für verschiedene Prozentsätze
     * @param {number} initialPercentage - Anfangswert in Prozent
     */
    constructor(y, images, initialPercentage) {
        super();
        this.y = y;
        this.IMAGES = images;
        this.loadImages(this.IMAGES);
        this.setPercentage(initialPercentage);
    }


    /**
     * Setzt den Prozentsatz und aktualisiert das angezeigte Bild.
     * @param {number} percentage - Neuer Prozentwert
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Ermittelt den Bildindex basierend auf dem aktuellen Prozentsatz.
     * @returns {number} Index des anzuzeigenden Bildes
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