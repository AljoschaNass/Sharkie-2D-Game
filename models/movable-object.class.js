class MovableObject extends DrawableObjekt{
    speed = 0.5
    energy = 100;
    lastHit = 0;
    otherDirection = false;
    animationIsPlayed = false;
    lastDamageFrom = 'poison';


    /**
     * Prüft ob dieses Objekt mit einem anderen kollidiert.
     * @param {MovableObject} mo - Objekt mit dem die Kollision geprüft wird
     * @returns {boolean} True wenn Kollision vorliegt
     */
    isCollding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }


    /**
     * Bewegt das Objekt nach oben.
     */
    moveUp() {
        this.y -= this.speed;
    }


    /**
     * Bewegt das Objekt nach unten.
     */
    moveDown(){
        this.y += this.speed;
    }


    /**
     * Bewegt das Objekt nach rechts.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Bewegt das Objekt nach links.
     */
    moveLeft(){
        this.x -= this.speed;
    }


    /**
     * Verarbeitet einen Treffer durch einen Gegner und reduziert Energie.
     * @param {MovableObject} enemy - Gegner der den Treffer verursacht
     */
    hit(enemy) {
        if (!gamePaused && !this.isHurt()) {
            let damage = 5;
            this.lastDamageFrom = 'poison';
            switch (true) {
            case enemy instanceof Endboss:
                this.lastDamageFrom = 'poison';
                damage = 15;
                break;
            case enemy instanceof Jellyfish && (enemy.color === 'green' || enemy.color === 'pink'):
                damage = 10;
                this.lastDamageFrom = 'electric';
                break;
            }
            this.energy -= damage;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }


    /**
     * Prüft ob das Objekt gerade verletzt ist.
     * @returns {boolean} True wenn verletzt
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
    }


    /**
     * Prüft ob das Objekt tot ist.
     * @returns {boolean} True wenn Energie 0 ist
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Spielt eine Animation in Dauerschleife ab.
     * @param {string[]} images - Array mit Bildpfaden der Animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Spielt eine Animation einmalig ab.
     * @param {string[]} images - Array mit Bildpfaden der Animation
     */
    playAnimationOnce(images) {
        if (!this.animationIsPlayed) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage == images.length) {
                this.animationIsPlayed = true;
            }
        }
    }
}