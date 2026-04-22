/**
 * Player character (Sharkie). Reads input from the world's keyboard,
 * drives the camera, and delegates animation/action logic to
 * {@link CharacterActions} and {@link CharacterAnimations}.
 */
class Character extends MovableObject {
    static MOVEMENT_TICK_MS = FRAME_INTERVAL;
    static ANIMATION_TICK_MS = 150;
    static LONG_IDLE_DELAY_MS = 8000;

    world;
    speed = 3;
    energy = PLAYER_MAX_ENERGY;
    collectedPoisonBottles = 0;
    collectedCoins = 0;
    offset = { top: 110, left: 50, bottom: 55, right: 45 };

    sharkIsAttacking = false;
    sharkIsBubbleAttacking = false;
    idleTimeout;
    isIdleTooLong = false;
    introLongIdleDone = false;
    currentHurtImages = null;
    hurtAnimationFrame = 0;
    isDying = false;

    IMAGES_IDLE = CHARACTER_IMAGES.IDLE;
    IMAGES_LONG_IDLE = CHARACTER_IMAGES.LONG_IDLE;
    IMAGES_SWIM = CHARACTER_IMAGES.SWIM;
    IMAGES_ATTACK_BUBBLE_TRAP_WITH = CHARACTER_IMAGES.ATTACK_BUBBLE_TRAP_WITH;
    IMAGES_ATTACK_BUBBLE_TRAP_WITHOUT = CHARACTER_IMAGES.ATTACK_BUBBLE_TRAP_WITHOUT;
    IMAGES_ATTACK_BUBBLE_TRAP_POISONED = CHARACTER_IMAGES.ATTACK_BUBBLE_TRAP_POISONED;
    IMAGES_ATTACK_FIN_SLAP = CHARACTER_IMAGES.ATTACK_FIN_SLAP;
    IMAGES_HURT_POISONED = CHARACTER_IMAGES.HURT_POISONED;
    IMAGES_HURT_ELECTRIC_SHOCKED = CHARACTER_IMAGES.HURT_ELECTRIC_SHOCKED;
    IMAGES_DEAD_POISONED = CHARACTER_IMAGES.DEAD_POISONED;
    IMAGES_DEAD_ELECTRIC_SHOCKED = CHARACTER_IMAGES.DEAD_ELECTRIC_SHOCKED;

    currentImageSet = this.IMAGES_IDLE;

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadAllImages();
        this.animate();
    }

    /**
     * Reset character to its starting state (used after a game over).
     */
    restart() {
        this.resetPosition();
        this.resetStats();
        this.resetAnimation();
        this.resetTimerLongIdle();
    }

    resetPosition() {
        this.x = 0;
        this.y = 100;
        this.otherDirection = false;
    }

    resetStats() {
        this.energy = PLAYER_MAX_ENERGY;
        this.collectedPoisonBottles = 0;
        this.collectedCoins = 0;
        this.lastDamageFrom = 'poison';
        this.lastHit = 0;
    }

    resetAnimation() {
        this.currentImage = 0;
        this.currentImageSet = this.IMAGES_IDLE;
        this.sharkIsAttacking = false;
        this.sharkIsBubbleAttacking = false;
        this.isIdleTooLong = false;
        this.introLongIdleDone = false;
        this.currentHurtImages = null;
        this.hurtAnimationFrame = 0;
        this.isDying = false;
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
    }

    /**
     * Preload every animation set so frame swaps never hit a cold image.
     */
    loadAllImages() {
        [
            this.IMAGES_IDLE,
            this.IMAGES_LONG_IDLE,
            this.IMAGES_SWIM,
            this.IMAGES_ATTACK_BUBBLE_TRAP_WITH,
            this.IMAGES_ATTACK_BUBBLE_TRAP_WITHOUT,
            this.IMAGES_ATTACK_BUBBLE_TRAP_POISONED,
            this.IMAGES_ATTACK_FIN_SLAP,
            this.IMAGES_HURT_POISONED,
            this.IMAGES_HURT_ELECTRIC_SHOCKED,
            this.IMAGES_DEAD_POISONED,
            this.IMAGES_DEAD_ELECTRIC_SHOCKED
        ].forEach(set => this.loadImages(set));
    }

    /**
     * Start the two main interval loops — one reading input, one driving animations.
     */
    animate() {
        IntervalManager.setInterval(() => {
            this.handleMovementInput();
            this.updateCamera();
        }, Character.MOVEMENT_TICK_MS);

        IntervalManager.setInterval(() => this.handleCharacterState(), Character.ANIMATION_TICK_MS);
    }

    /**
     * Translate keyboard state into movement within the world bounds.
     */
    handleMovementInput() {
        if (this.world.keyboard.UP && this.y > PLAYER_MIN_Y) this.moveUp();
        if (this.world.keyboard.DOWN && this.y < PLAYER_MAX_Y) this.moveDown();
        this.handleHorizontalMovement();
    }

    handleHorizontalMovement() {
        if (this.world.keyboard.LEFT && this.x > PLAYER_MIN_X) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    updateCamera() {
        this.world.camera_x = -this.x + 50;
    }

    /**
     * Pick the right animation for the current state.
     * Order matters: death overrides everything, then attacks, then hurt/swim/idle.
     */
    handleCharacterState() {
        if (this.isDying)                 return CharacterActions.playDeathAnimation(this);
        if (this.isDead())                return this.dieCharacter();
        if (this.isAttacking())           return this.handleAttackState();
        if (this.isBubbleAttacking())     return this.handleBubbleAttackState();
        if (this.isHurt())                return this.handleHurtState();
        if (this.isSwimming())            return this.handleSwimmingState();
        if (this.isIdle())                return this.handleIdleState();
    }

    handleAttackState() {
        this.setOffset(100, 45);
        CharacterActions.attack(this);
        this.resetTimerLongIdle();
    }

    handleBubbleAttackState() {
        CharacterActions.bubbleAttack(this);
        this.resetTimerLongIdle();
    }

    handleHurtState() {
        CharacterAnimations.playHurtAnimation(this);
        this.resetTimerLongIdle();
    }

    handleSwimmingState() {
        this.setOffset(100, 45);
        this.playAnimation(this.IMAGES_SWIM);
        this.resetTimerLongIdle();
    }

    handleIdleState() {
        if (this.isIdleTooLong) {
            CharacterAnimations.playLongIdleAnimation(this, this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
        if (!this.idleTimeout) this.setTimerLongIdle();
    }

    /* ---------- Thin wrappers kept for the public API ---------- */

    spawnBubble() {
        CharacterActions.spawnBubble(this);
    }

    hurtCharacter(enemy) {
        CharacterActions.hurtCharacter(this, enemy);
    }

    dieCharacter() {
        CharacterActions.dieCharacter(this);
    }

    /* ---------- Long-idle timer ---------- */

    setTimerLongIdle() {
        this.idleTimeout = setTimeout(() => {
            this.isIdleTooLong = true;
            this.world?.audioManager?.playLoop('snoring');
        }, Character.LONG_IDLE_DELAY_MS);
    }

    resetTimerLongIdle() {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
        if (this.isIdleTooLong) this.world?.audioManager?.stop('snoring');
        this.isIdleTooLong = false;
    }

    /* ---------- State predicates ---------- */

    isIdle() {
        const kb = this.world.keyboard;
        return !kb.SPACE && !kb.UP && !kb.DOWN && !kb.LEFT && !kb.RIGHT && !this.sharkIsAttacking;
    }

    isAttacking() {
        return this.world.keyboard.SPACE || this.sharkIsAttacking;
    }

    isBubbleAttacking() {
        return this.world.keyboard.D || this.sharkIsBubbleAttacking;
    }

    isSwimming() {
        const kb = this.world.keyboard;
        return kb.UP || kb.DOWN || kb.LEFT || kb.RIGHT;
    }

    setOffset(top, bottom) {
        this.offset.top = top;
        this.offset.bottom = bottom;
    }
}
