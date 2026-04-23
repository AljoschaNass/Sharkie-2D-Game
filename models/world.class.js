/**
 * Game world — the orchestrator.
 *
 * Owns the canvas, audio, level, character, status bars, and bubbles.
 * Drives two loops:
 *   - `draw()` via `requestAnimationFrame` — the render loop.
 *   - `checkCollisions()` via `IntervalManager` — gameplay tick (every 200 ms).
 */
class World {
    audioManager;
    character;
    bubble;
    level;
    poisonStatusBar;
    healthStatusBar;
    coinStatusBar;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collisionIntervalId;
    stopped = false;

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Keyboard} keyboard
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.audioManager = new AudioManager();
        this.level = createLevel1();
        this.character = new Character();
        this.initializeStatusBars();
        this.bubble = [];
        this.startWorld();
    }

    initializeStatusBars() {
        this.poisonStatusBar = new StatusBar(0, POISON_IMAGES, 0);
        this.healthStatusBar = new StatusBar(80, HEALTH_IMAGES, PLAYER_MAX_ENERGY);
        this.coinStatusBar = new StatusBar(40, COIN_IMAGES, 0);
    }

    /**
     * Wire the character + endboss to the world, start the render loop,
     * and kick off the collision tick.
     */
    startWorld() {
        this.setWorld();
        this.draw();
        this.startCollisionLoop();
    }

    setWorld() {
        this.character.world = this;
        const endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss) endboss.world = this;
    }

    startCollisionLoop() {
        this.collisionIntervalId = IntervalManager.setInterval(() => {
            this.collisionWithEnemy();
            this.finSlapHitsEnemy();
            this.bubbleHitsEnemy();
            this.collectPoisonWater();
            this.collectCoin();
        }, COLLISION_INTERVAL_MS);
    }

    /* ---------- Rendering ---------- */

    /**
     * Main render step. Clears, draws layered content, then schedules the next frame.
     */
    draw() {
        if (this.stopped) return;
        if (gamePaused) {
            this.scheduleNextFrame();
            return;
        }
        this.clearAndTranslate();
        this.drawBackgroundAndEnemies();
        this.drawObjectsAndCharacter();
        this.drawStatusBars();
        this.scheduleNextFrame();
    }

    /**
     * Halt the render loop and any active audio.
     * After calling this the World is inert — drop the reference.
     */
    stop() {
        this.stopped = true;
        this.audioManager?.stopAll?.();
    }

    clearAndTranslate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draw background, then enemies — the endboss only appears once triggered.
     */
    drawBackgroundAndEnemies() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                if (enemy.characterReachedEndboss) this.addToMap(enemy);
            } else {
                this.addToMap(enemy);
            }
        });
    }

    drawObjectsAndCharacter() {
        this.addObjectsToMap(this.level.poisonWaterItems);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.bubble);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawStatusBars() {
        this.addToMap(this.poisonStatusBar);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
    }

    scheduleNextFrame() {
        requestAnimationFrame(() => this.draw());
    }

    /**
     * @param {DrawableObject[]} objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * @param {DrawableObject} mo
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }

    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }

    /* ---------- Collisions ---------- */

    /**
     * Character walked into an enemy while not attacking or already hurt.
     */
    collisionWithEnemy() {
        this.level.enemies.forEach(enemy => {
            const canBeHit = this.character.isColliding(enemy)
                && !this.character.isHurt()
                && !this.character.sharkIsAttacking;
            if (!canBeHit) return;

            this.character.hit(enemy);
            this.healthStatusBar.setPercentage(this.character.energy);
            this.character.hurtCharacter(enemy);
            this.audioManager.play('hit');
            if (enemy instanceof Endboss) enemy.attack();
        });
    }

    /**
     * Fin slap: melee — damages every enemy in contact.
     */
    finSlapHitsEnemy() {
        if (!this.character.sharkIsAttacking) return;
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                this.damageEnemy(enemy, index);
                this.audioManager.play('bubbleHit');
            }
        });
    }

    /**
     * Projectile: a bubble collides with an enemy. Bubble is consumed on hit.
     */
    bubbleHitsEnemy() {
        this.bubble.forEach((bubble, bubbleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bubble.isColliding(enemy)) {
                    this.handleBubbleEnemyCollision(enemy, enemyIndex, bubbleIndex);
                }
            });
        });
    }

    handleBubbleEnemyCollision(enemy, enemyIndex, bubbleIndex) {
        this.damageEnemy(enemy, enemyIndex);
        this.bubble.splice(bubbleIndex, 1);
        this.audioManager.play('bubbleHit');
    }

    /**
     * Endboss takes fixed damage and plays its hurt animation; other enemies
     * are removed outright (one-shot kill).
     */
    damageEnemy(enemy, enemyIndex) {
        if (!(enemy instanceof Endboss)) {
            this.level.enemies.splice(enemyIndex, 1);
            return;
        }
        if (enemy.isDying || enemy.isHurtAnimating) return;

        enemy.energy = Math.max(0, enemy.energy - PLAYER_TO_ENDBOSS_DAMAGE);
        enemy.playHurtAnimation();
    }

    /* ---------- Collection ---------- */

    collectPoisonWater() {
        this.collectItems({
            items: this.level.poisonWaterItems,
            statusBar: this.poisonStatusBar,
            counterKey: 'collectedPoisonBottles',
            audioKey: 'poison'
        });
    }

    collectCoin() {
        this.collectItems({
            items: this.level.coins,
            statusBar: this.coinStatusBar,
            counterKey: 'collectedCoins',
            audioKey: 'coin'
        });
    }

    /**
     * Generic pickup loop — walks the list backwards so splicing during
     * iteration is safe.
     * @param {{ items: MovableObject[], statusBar: StatusBar, counterKey: string, audioKey: string }} cfg
     */
    collectItems({ items, statusBar, counterKey, audioKey }) {
        for (let i = items.length - 1; i >= 0; i--) {
            if (!this.character.isColliding(items[i])) continue;

            this.character[counterKey] += COLLECTABLE_VALUE_PERCENT;
            statusBar.setPercentage(this.character[counterKey]);
            items.splice(i, 1);
            this.audioManager.play(audioKey);
        }
    }
}
