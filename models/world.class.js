/**
 * Main game world that handles rendering, collisions, and game state.
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

    /**
     * @param {HTMLCanvasElement} canvas - The game canvas
     * @param {Keyboard} keyboard - Keyboard input handler
     */
    constructor(canvas, keyboard){
        this.initializeCanvas(canvas);
        this.initializeKeyboard(keyboard);
        this.initializeManagers();
        this.initializeLevel();
        this.initializeCharacter();
        this.initializeStatusBars();
        this.initializeBubbles();
        this.startWorld();
    }


    /**
     * Initializes the canvas and context.
     * @param {HTMLCanvasElement} canvas - The game canvas
     */
    initializeCanvas(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
    }


    /**
     * Initializes the keyboard handler.
     * @param {Keyboard} keyboard - Keyboard input handler
     */
    initializeKeyboard(keyboard) {
        this.keyboard = keyboard;
    }


    /**
     * Initializes the audio manager.
     */
    initializeManagers() {
        this.audioManager = new AudioManager();
    }


    /**
     * Initializes the game level.
     */
    initializeLevel() {
        this.level = createLevel1();
    }


    /**
     * Initializes the main character.
     */
    initializeCharacter() {
        this.character = new Character();
        this.character.energy = 100;
    }


    /**
     * Initializes all status bars for the game.
     */
    initializeStatusBars() {
        this.poisonStatusBar = new StatusBar(0, POISON_IMAGES, 0);
        this.healthStatusBar = new StatusBar(80, HEALTH_IMAGES, 100);
        this.coinStatusBar = new StatusBar(40, COIN_IMAGES, 0);
    }


    /**
     * Initializes the bubble array.
     */
    initializeBubbles() {
        this.bubble = [];
    }


    /**
     * Starts the game world by drawing and checking collisions.
     */
    startWorld() {
        this.draw();
        this.setWorld();
        this.clearCollisionInterval();
        this.checkCollisions();
    }


    /**
     * Clears the collision check interval.
     */
    clearCollisionInterval() {
        if (this.collisionIntervalId) {
            clearInterval(this.collisionIntervalId);
            this.collisionIntervalId = null;
        }
    }


    /**
     * Sets the world reference for character and endboss.
     */
    setWorld() {
        this.character.world = this;
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            endboss.world = this;
        }
    }


    /**
     * Starts checking for collisions at regular intervals.
     */
    checkCollisions() {
        this.collisionIntervalId = setInterval(() => {
            if (typeof gamePaused !== 'undefined' && gamePaused) return;
            this.collisionWithEnemy();
            this.finSlapHitsEnemy();
            this.bubbleHitsEnemy();
            this.collectPoisonWater();
            this.collectCoin();
        }, 200);
    }


    /**
     * Main draw function called every frame.
     * Skips drawing if the game is paused and calls all helper functions.
     */
    draw() {
        if (typeof gamePaused !== 'undefined' && gamePaused) {
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
     * Clears the canvas and applies the camera translation.
     */
    clearAndTranslate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * Draws background objects and enemies.
     * Only draws the endboss if the character reached it.
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


    /**
     * Draws game items, the player character, and bubbles.
     * Resets the canvas translation after drawing.
     */
    drawObjectsAndCharacter() {
        this.addObjectsToMap(this.level.poisonWaterItems);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.bubble);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Draws all status bars: poison, health, and coins.
     */
    drawStatusBars() {
        this.addToMap(this.poisonStatusBar);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
    }


    /**
     * Schedules the next animation frame using requestAnimationFrame.
     */
    scheduleNextFrame() {
        let self = this;
        requestAnimationFrame(function() { self.draw(); });
    }


    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - Array of objects to add
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Adds a single object to the map.
     * @param {DrawableObjekt} mo - Object to add
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips an image horizontally for drawing.
     * @param {DrawableObjekt} mo - Object to flip
     */
    flipImage(mo) {
        this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1)
            mo.x = mo.x * -1;
    }


    /**
     * Flips an image back to normal orientation.
     * @param {DrawableObjekt} mo - Object to flip back
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * Checks for collisions between character and enemies.
     */
    collisionWithEnemy() {
        this.level.enemies.forEach( (enemy) => {
            if (this.character.isCollding(enemy) && !this.character.isHurt() && !this.character.sharkIsAttacking) {
                this.character.hit(enemy);
                this.healthStatusBar.setPercentage(this.character.energy);
                this.character.hurtCharacter(enemy);
                this.audioManager.play('hit');
                if (enemy instanceof Endboss) {
                    enemy.attack();
                }
            }
        });
    }


    /**
     * Checks if fin slap attack hits an enemy.
     */
    finSlapHitsEnemy() {
        if (this.character.sharkIsAttacking) {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (this.character.isCollding(enemy)) {
                    this.damageEnemy(enemy, enemyIndex);
                    this.audioManager.play('bubbleHit');
                }
            });
        }
    }


    /**
     * Checks if bubbles hit enemies.
     */
    bubbleHitsEnemy() {
        this.bubble.forEach((bubble, bubbleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bubble.isCollding(enemy)) {
                    this.handleBubbleEnemyCollision(enemy, enemyIndex, bubbleIndex);
                }
            });
        });
    }


    /**
     * Handles collision between bubble and enemy.
     * @param {MovableObject} enemy - The enemy that was hit
     * @param {number} enemyIndex - Index of the enemy
     * @param {number} bubbleIndex - Index of the bubble
     */
    handleBubbleEnemyCollision(enemy, enemyIndex, bubbleIndex) {
        this.damageEnemy(enemy, enemyIndex);
        this.removeBubble(bubbleIndex);
        this.audioManager.play('bubbleHit');
    }


    /**
     * Damages an enemy or removes it if not an endboss.
     * @param {MovableObject} enemy - The enemy to damage
     * @param {number} enemyIndex - Index of the enemy
     */
    damageEnemy(enemy, enemyIndex) {
        if (enemy instanceof Endboss) {
            if (enemy.isDying || enemy.isHurtAnimating) return;

            enemy.energy -= 20;
            if (enemy.energy <= 0) {
                enemy.energy = 0;
            }
            enemy.playHurtAnimation();
        } else {
            this.removeEnemy(enemyIndex);
        }
    }


    /**
     * Removes an enemy from the level.
     * @param {number} enemyIndex - Index of the enemy to remove
     */
    removeEnemy(enemyIndex) {
        this.level.enemies.splice(enemyIndex, 1);
    }


    /**
     * Removes a bubble from the game.
     * @param {number} bubbleIndex - Index of the bubble to remove
     */
    removeBubble(bubbleIndex) {
        this.bubble.splice(bubbleIndex, 1);
    }


    /**
     * Checks for and handles poison water collection.
     */
    collectPoisonWater() {
        for (let i = this.level.poisonWaterItems.length - 1; i >= 0; i--) {
            const poisonWater = this.level.poisonWaterItems[i];
            if (this.character.isCollding(poisonWater)) {
                this.character.collectedPoisonBottles = this.character.collectedPoisonBottles + 12.5;
                this.poisonStatusBar.setPercentage(this.character.collectedPoisonBottles);
                this.level.poisonWaterItems.splice(i, 1);
                this.audioManager.play('poison');
            }
        }
    }


    /**
     * Checks for and handles coin collection.
     */
    collectCoin() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            const coin = this.level.coins[i];
            if (this.character.isCollding(coin)) {
                this.character.collectedCoins = this.character.collectedCoins + 12.5;
                this.coinStatusBar.setPercentage(this.character.collectedCoins);
                this.level.coins.splice(i, 1);
                this.audioManager.play('coin');
            }
        }
    }
}