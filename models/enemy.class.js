/**
 * Base class for enemies that share color-variant image loading,
 * random spawn positioning, and color selection.
 *
 * Subclasses declare image arrays named `IMAGES_{TYPE}_{COLOR}` (e.g.
 * `IMAGES_SWIM_GREEN`) and then call {@link Enemy#loadColorVariants} and
 * {@link Enemy#selectColorImages} with the lists of types and colors.
 */
class Enemy extends MovableObject {
    repeatCounter = 0;

    /**
     * Load every color × type permutation declared on the subclass into the
     * image cache.
     * @param {string[]} colors - Upper-case color tokens, e.g. `['GREEN', 'ORANGE']`.
     * @param {string[]} types - Upper-case animation-type tokens, e.g. `['SWIM', 'DEAD']`.
     */
    loadColorVariants(colors, types) {
        colors.forEach(color => {
            types.forEach(type => {
                const variant = this[`IMAGES_${type}_${color}`];
                if (variant) this.loadImages(variant);
            });
        });
    }

    /**
     * Populate `this.IMAGES_{TYPE}` with the variant matching `this.color`.
     * @param {string[]} types - Upper-case animation-type tokens.
     */
    selectColorImages(types) {
        const suffix = this.color.toUpperCase();
        types.forEach(type => {
            this[`IMAGES_${type}`] = this[`IMAGES_${type}_${suffix}`] || [];
        });
    }

    /**
     * Randomize spawn position and swim speed.
     * @param {Object} config
     * @param {number} config.xMin - Minimum x-coordinate.
     * @param {number} config.xRange - Additional random range on top of xMin.
     * @param {number} [config.yMaxFactor=0.75] - Fraction of the viewport height usable for y.
     * @param {number} [config.speedMin=0.6]
     * @param {number} [config.speedRange=0.5]
     */
    randomizeSpawn({ xMin, xRange, yMaxFactor = 0.75, speedMin = 0.6, speedRange = 0.5 }) {
        this.x = xMin + Math.random() * xRange;
        this.y = Math.random() * VIEWPORT_HEIGHT * yMaxFactor;
        this.speed = speedMin + Math.random() * speedRange;
    }
}
