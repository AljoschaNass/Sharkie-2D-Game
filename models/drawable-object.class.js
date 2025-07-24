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


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Pufferfish || this instanceof Endboss || this instanceof PoisonWater || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Pufferfish || this instanceof Endboss || this instanceof PoisonWater || this instanceof Coin) {
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
}