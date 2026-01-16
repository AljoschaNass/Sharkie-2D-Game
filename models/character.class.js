/**
 * Main character.
 */
class Character extends MovableObject {
    world;
    speed = 3;
    energy = 100000;
    collectedPoisonBottles = 0;
    collectedCoins = 0;
    offset = {
        top: 110,
        left: 50,
        bottom: 55,
        right: 45
    };
    currentImageSet = this.IMAGES_IDLE;
    sharkIsAttacking = false;
    sharkIsBubbleAttacking = false;
    idleTimeout;
    isIdleTooLong = false;
    introLongIdleDone = false;
    currentHurtImages = null;
    hurtAnimationFrame = 0;
    IMAGES_IDLE = CHARACTER_IMAGES.IDLE;
    IMAGES_LONG_IDLE = CHARACTER_IMAGES.LONG_IDLE;
    IMAGES_SWIM = CHARACTER_IMAGES.SWIM;
    IMAGES_ATTACK_BUBBLE_TRAP_WITH = CHARACTER_IMAGES.ATTACK_BUBBLE_TRAP_WITH;
    IMAGES_ATTACK_BUBBLE_TRAP_WITHOUT = CHARACTER_IMAGES.ATTACK_BUBBLE_TRAP_WITHOUT;
    IMAGES_ATTACK_BUBBLE_TRAP_POISONED = CHARACTER_IMAGES.ATTACK_BUBBLE_TRAP_POISONED;
    IMAGES_ATTACK_FIN_SLAP = CHARACTER_IMAGES.ATTACK_FIN_SLAP;
    IMAGES_HURT_POISONED = CHARACTER_IMAGES.HURT_POISONED;
    IMAGES_HURT_ELECTIC_SHOCKED = CHARACTER_IMAGES.HURT_ELECTRIC_SHOCKED;
    IMAGES_DEAD_POISONED = CHARACTER_IMAGES.DEAD_POISONED;
    IMAGES_DEAD_ELECTIC_SHOCKED = CHARACTER_IMAGES.DEAD_ELECTRIC_SHOCKED;


    constructor(){
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadAllImages();
        this.animate();     
    }


    /**
     * Restarts the character by resetting position, stats, and animations.
     */
    restart() {
        this.resetPosition();
        this.resetStats();
        this.resetAnimation();
        this.resetTimerLongIdle();
    }


    /**
     * Resets the character's position to the starting point.
     */
    resetPosition() {
        this.x = 0;
        this.y = 100;
        this.otherDirection = false;
    }


    /**
     * Resets the character's health and collected items.
     */
    resetStats() {
        this.energy = 100;
        this.collectedPoisonBottles = 0;
        this.collectedCoins = 0;
        this.lastDamageFrom = 'poison';
        this.lastHit = 0;
    }


    /**
     * Resets all animation states to initial values.
     */
    resetAnimation() {
        this.currentImage = 0;
        this.currentImageSet = this.IMAGES_IDLE;
        this.sharkIsAttacking = false;
        this.sharkIsBubbleAttacking = false;
        this.isIdleTooLong = false;
        this.introLongIdleDone = false;
        this.currentHurtImages = null;
        this.hurtAnimationFrame = 0;
        this.loadImage(this.IMAGES_IDLE[0]);
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
    }


    /**
     * Loads all image sets for character animations.
     */
    loadAllImages() {
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE_TRAP_WITH);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE_TRAP_WITHOUT);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE_TRAP_POISONED);
        this.loadImages(this.IMAGES_ATTACK_FIN_SLAP);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.loadImages(this.IMAGES_HURT_ELECTIC_SHOCKED);
        this.loadImages(this.IMAGES_DEAD_POISONED);
        this.loadImages(this.IMAGES_DEAD_ELECTIC_SHOCKED);
    }


    /**
     * Starts the character animation and movement loops.
     */
    animate() {
        this.startMovementLoop();
        this.startAnimationLoop();
    }


    /**
     * Starts the movement loop for keyboard input.
     */
    startMovementLoop() {
        setInterval(() => {
            if (!gamePaused) {
                this.handleMovementInput();
                this.updateCamera();
            }
        }, 1000 / 60);
    }


    /**
     * Handles movement input from the keyboard.
     */
    handleMovementInput() {
        if (this.world.keyboard.UP && this.y > -90) {
            this.moveUp();
        }
        if (this.world.keyboard.DOWN && this.y < 300) {
            this.moveDown();
        }
        this.handleHorizontalMovement();
    }


    /**
     * Handles horizontal movement (left/right).
     */
    handleHorizontalMovement() {
        if (this.world.keyboard.LEFT && this.x > -600) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }


    /**
     * Updates the camera position.
     */
    updateCamera() {
        this.world.camera_x = -this.x + 50;
    }


    /**
     * Starts the animation loop for character actions.
     */
    startAnimationLoop() {
        setInterval(() => {
            if (!gamePaused) {
                this.handleCharacterState();
            }
        }, 150);
    }


    /**
     * Handles the current state of the character.
     */
    handleCharacterState() {
        if (this.isDead()) {
            this.dieCharacter();
        } else if (this.isAttacking()) {
            this.handleAttackState();
        } else if (this.isBubbleAttacking()) {
            this.handleBubbleAttackState();
        } else if (this.isHurt()) {
            this.handleHurtState();
        } else if (this.isSwimming()) {
            this.handleSwimmingState();
        } else if (this.isIdle()) {
            this.handleIdleState();
        }
    }


    /**
     * Handles the attack state.
     */
    handleAttackState() {
        this.setOffset(100, 45);
        CharacterActions.attack(this);
        this.resetTimerLongIdle();
    }


    /**
     * Handles the bubble attack state.
     */
    handleBubbleAttackState() {
        CharacterActions.bubbleAttack(this);
        this.resetTimerLongIdle();
    }


    /**
     * Handles the hurt state.
     */
    handleHurtState() {
        CharacterAnimations.playHurtAnimation(this);
        this.resetTimerLongIdle();
    }


    /**
     * Handles the swimming state.
     */
    handleSwimmingState() {
        this.setOffset(100, 45);
        this.playAnimation(this.IMAGES_SWIM);
        this.resetTimerLongIdle();
    }


    /**
     * Handles the idle state.
     */
    handleIdleState() {
        if (this.isIdleTooLong) {
            CharacterAnimations.playLongIdleAnimation(this, this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
        if (!this.idleTimeout) {
            this.setTimerLongIdle();
        }
    }



    /**
     * Spawns a bubble projectile from the character.
     */
    spawnBubble() {
        CharacterActions.spawnBubble(this);
    }


    /**
     * Triggers the hurt animation for the character.
     * Selects the correct hurt images based on the enemy type and resets the animation frame.
     *
     * @param {Object} enemy - The enemy causing damage to the character
     */
    hurtCharacter(enemy) {
        CharacterActions.hurtCharacter(this, enemy);
    }




    /**
     * Handles character death animation based on damage type.
     */
    dieCharacter() {
        CharacterActions.dieCharacter(this);
    }



    /**
     * Sets a timer for the long idle animation.
     */
    setTimerLongIdle() {
        this.idleTimeout = setTimeout(() => {
            this.isIdleTooLong = true;
            if (this.world && this.world.audioManager) {
                this.world.audioManager.playLoop('snoring');
            }
        }, 8000);
    }


    /**
     * Resets the long idle timer.
     */
    resetTimerLongIdle() {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
        if (this.isIdleTooLong) {
            if (this.world && this.world.audioManager) {
                this.world.audioManager.stop('snoring');
            }
        }
        this.isIdleTooLong = false;
    }


    /**
     * Checks if the character is in idle state.
     * @returns {boolean} True if character is idle
     */
    isIdle() {
        return !this.world.keyboard.SPACE &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.sharkIsAttacking;
    }


    /**
     * Checks if the character is attacking.
     * @returns {boolean} True if character is attacking
     */
    isAttacking() {
        return this.world.keyboard.SPACE || this.sharkIsAttacking;
    }


    /**
     * Checks if the character is bubble attacking.
     * @returns {boolean} True if character is bubble attacking
     */
    isBubbleAttacking() {
        return this.world.keyboard.D || this.sharkIsBubbleAttacking;
    }


    /**
     * Checks if the character is swimming.
     * @returns {boolean} True if character is swimming
     */
    isSwimming() {
        return this.world.keyboard.UP || 
            this.world.keyboard.DOWN || 
            this.world.keyboard.LEFT || 
            this.world.keyboard.RIGHT;
    }


    /**
     * Sets the collision offset for the character.
     * @param {number} top - Top offset
     * @param {number} bottom - Bottom offset
     */
    setOffset(top, bottom) {
        this.offset.top = top;
        this.offset.bottom = bottom;
    }
}