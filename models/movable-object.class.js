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