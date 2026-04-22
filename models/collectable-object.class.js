class CollectableObject extends MovableObject {
    width = 40;
    height = 50;
    offset = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };


    /**
     * Calculates a random X position.
     */
    calculateXPosition() {
        this.x = 300 + Math.random() * 3800;
    }


    /**
     * Calculates a random Y position.
     */
    calculateYPosition() {
        this.y = Math.random() * 480 * 0.75;
    }
}