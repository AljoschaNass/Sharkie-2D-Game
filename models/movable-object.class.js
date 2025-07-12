class MovableObject {
    x = 0;
    y = 100;
    height = 220;
    width = 220;
    speed = 0.5
    img;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    animationIsPlayed = false;
    offset = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Pufferfish || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Pufferfish || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';

            const hitboxX = this.x + this.offset.left;
            const hitboxY = this.y + this.offset.top;
            const hitboxWidth = this.width - this.offset.left - this.offset.right;
            const hitboxHeight = this.height - this.offset.top - this.offset.bottom;

            ctx.rect(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
            ctx.stroke();
        }
    }


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach(path => {
            this.img = new Image();
            this.img.src = path;
            this.imageCache[path] = this.img;
        });
    }


    isCollding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    moveUp() {
        setInterval(() => {
            this.y -= this.speed;
        }, 1000 / 60);
    }


    moveDown(){
        setInterval(() => {
            this.y += this.speed;
        }, 1000 / 60);
    }


    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 1000 / 60);
    }


    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
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