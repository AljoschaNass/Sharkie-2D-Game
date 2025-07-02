class MovableObject {
    x = 0;
    y = 100;
    height = 220;
    width = 220;
    img;
    imageCache = {};


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

    moveRight() {
        console.log("Moving right");
        
    }

    moveLeft(){

    }
}