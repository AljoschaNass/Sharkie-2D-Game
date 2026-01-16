class MovableObject extends DrawableObjekt{
    speed = 0.5
    energy = 100;
    lastHit = 0;
    otherDirection = false;
    animationIsPlayed = false;
    lastDamageFrom = 'poison';


    /**
     * Checks if this object collides with another object.
     * @param {MovableObject} mo - Object to check collision with
     * @returns {boolean} True if collision exists
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
     * Moves the object up.
     */
    moveUp() {
        this.y -= this.speed;
    }


    /**
     * Moves the object down.
     */
    moveDown(){
        this.y += this.speed;
    }


    /**
     * Moves the object right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object left.
     */
    moveLeft(){
        this.x -= this.speed;
    }


    /**
     * Processes a hit from an enemy and reduces energy.
     * @param {MovableObject} enemy - Enemy that caused the hit
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
     * Checks if the object is currently hurt.
     * @returns {boolean} True if hurt
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
    }


    /**
     * Checks if the object is dead.
     * @returns {boolean} True if energy is 0
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Plays an animation in a continuous loop.
     * @param {string[]} images - Array with image paths for the animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Plays an animation once.
     * @param {string[]} images - Array with image paths for the animation
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