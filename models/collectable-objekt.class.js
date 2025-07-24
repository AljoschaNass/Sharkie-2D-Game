class CollectableObject extends BackgroundObject {
    width = 40;
    height = 50;
    offset = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };


    calculateXPosition() {
        this.x = 400 + Math.random() * 500 * 0.8;
    }


    calculateYPosition() {
        this.y = Math.random() * 480 * 0.75;
    }
}