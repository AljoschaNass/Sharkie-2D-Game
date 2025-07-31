class MovableObject extends DrawableObjekt{
    speed = 0.5
    energy = 100;
    lastHit = 0;
    otherDirection = false;
    animationIsPlayed = false;
        lastDamageFrom = 'poison';



    isCollding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    moveUp() {
        this.y -= this.speed;
    }


    moveDown(){
        this.y += this.speed;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft(){
        this.x -= this.speed;
    }


    hit(enemy) {
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


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
    }


    isDead() {
        return this.energy == 0;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;  
    }


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