class DrawableObjekt {
    x = 0;
    y = 100;
    height = 220;
    width = 220;
    img;
    currentImage = 0;
    imageCache = {};


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
}