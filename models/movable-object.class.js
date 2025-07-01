class MovableObject {
    x = 0;
    y = 100;
    height = 220;
    width = 220;
    img;


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log("Moving right");
        
    }

    moveLeft(){

    }
}