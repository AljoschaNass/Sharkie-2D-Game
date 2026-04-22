/**
 * Base class for pickups scattered across the level.
 * Subclasses typically extend {@link AnimatedCollectable} rather than this
 * directly, but the positioning helpers live here so non-animated pickups
 * could reuse them.
 */
class CollectableObject extends MovableObject {
    static SPAWN_X_MIN = 300;
    static SPAWN_X_RANGE = 3800;
    static SPAWN_Y_FACTOR = 0.75;

    width = 40;
    height = 50;
    offset = { top: 0, left: 0, bottom: 0, right: 0 };

    /**
     * Randomize the x position within the level spawn range.
     */
    calculateXPosition() {
        this.x = CollectableObject.SPAWN_X_MIN + Math.random() * CollectableObject.SPAWN_X_RANGE;
    }

    /**
     * Randomize the y position within the upper 75 % of the viewport.
     */
    calculateYPosition() {
        this.y = Math.random() * VIEWPORT_HEIGHT * CollectableObject.SPAWN_Y_FACTOR;
    }
}
