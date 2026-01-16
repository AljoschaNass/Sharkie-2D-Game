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
     * Berechnet eine zufällige X-Position.
     */
    calculateXPosition() {
        this.x = 300 + Math.random() * 3800;
    }


    /**
     * Berechnet eine zufällige Y-Position.
     */
    calculateYPosition() {
        this.y = Math.random() * 480 * 0.75;
    }
}