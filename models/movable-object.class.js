/**
 * Base class for anything that moves or can be hit.
 * Extends {@link DrawableObject} with movement helpers, a hit/hurt model,
 * and generic animation playback.
 */
class MovableObject extends DrawableObject {
    speed = 0.5;
    energy = PLAYER_MAX_ENERGY;
    lastHit = 0;
    otherDirection = false;
    animationIsPlayed = false;
    lastDamageFrom = 'poison';

    /**
     * AABB collision check against another object.
     * @param {MovableObject} mo - Opponent to test against.
     * @returns {boolean}
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    moveUp()    { this.y -= this.speed; }
    moveDown()  { this.y += this.speed; }
    moveLeft()  { this.x -= this.speed; }
    moveRight() { this.x += this.speed; }

    /**
     * Take damage from an enemy. Respects the post-hit invulnerability window
     * and writes the damage source so the right hurt/death animation plays.
     * @param {MovableObject} enemy
     */
    hit(enemy) {
        if (gamePaused || this.isHurt()) return;

        const { amount, source } = this.resolveDamage(enemy);
        this.lastDamageFrom = source;
        this.energy = Math.max(0, this.energy - amount);
        if (this.energy > 0) this.lastHit = Date.now();
    }

    /**
     * Look up the damage amount and source for a given attacker.
     * @param {MovableObject} enemy
     * @returns {{ amount: number, source: 'poison' | 'electric' }}
     */
    resolveDamage(enemy) {
        if (enemy instanceof Endboss) {
            return { amount: DAMAGE.ENDBOSS, source: 'poison' };
        }
        if (enemy instanceof Jellyfish && (enemy.color === 'green' || enemy.color === 'pink')) {
            return { amount: DAMAGE.ELECTRIC, source: 'electric' };
        }
        return { amount: DAMAGE.POISON, source: 'poison' };
    }

    /**
     * True while the post-hit invulnerability window is still active.
     */
    isHurt() {
        return Date.now() - this.lastHit < HURT_COOLDOWN_MS;
    }

    /**
     * True when energy has been depleted.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Cycle through `images` on each call, wrapping at the end.
     * @param {string[]} images
     */
    playAnimation(images) {
        const i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }

    /**
     * Play `images` once and latch; further calls are ignored.
     * @param {string[]} images
     */
    playAnimationOnce(images) {
        if (this.animationIsPlayed) return;

        const i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
        if (this.currentImage === images.length) this.animationIsPlayed = true;
    }
}
