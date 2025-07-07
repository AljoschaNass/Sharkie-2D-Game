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


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
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
}