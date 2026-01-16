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
     * Startet die Animationsschleife für Charakteraktionen.
     */
    startAnimationLoop() {
        setInterval(() => {
            if (!gamePaused) {
                this.handleCharacterState();
            }
        }, 150);
    }


    /**
     * Verarbeitet den aktuellen Zustand des Charakters.
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
     * Verarbeitet den Angriffszustand.
     */
    handleAttackState() {
        this.setOffset(100, 45);
        this.attack();
        this.resetTimerLongIdle();
    }


    /**
     * Verarbeitet den Blasen-Angriffszustand.
     */
    handleBubbleAttackState() {
        this.bubbleAttack();
        this.resetTimerLongIdle();
    }


    /**
     * Verarbeitet den Verletztenzustand.
     */
    handleHurtState() {
        this.playHurtAnimation();
        this.resetTimerLongIdle();
    }


    /**
     * Verarbeitet den Schwimmzustand.
     */
    handleSwimmingState() {
        this.setOffset(100, 45);
        this.playAnimation(this.IMAGES_SWIM);
        this.resetTimerLongIdle();
    }


    /**
     * Verarbeitet den Idle-Zustand.
     */
    handleIdleState() {
        if (this.isIdleTooLong) {
            this.playLongIdleAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
        if (!this.idleTimeout) {
            this.setTimerLongIdle();
        }
    }


    playActionAnimation(images, flag, speed = 100) {
        if (this[flag]) return;
        this[flag] = true;
        this.currentImage = 0;

        const interval = setInterval(() => {
            this.playAnimationFrame(images, () => {
                clearInterval(interval);
                this[flag] = false;
                this.currentImage = 0;
            });
        }, speed);
    }


    attack() {
        this.playActionAnimation(this.IMAGES_ATTACK_FIN_SLAP, 'sharkIsAttacking');
    }


    bubbleAttack() {
        if (this.sharkIsBubbleAttacking) return;

        this.initializeBubbleAttack();
        const bubbleState = this.prepareBubbleAttackState();
        this.startBubbleAttackAnimation(bubbleState);
    }


    /**
     * Initialisiert den Blasen-Angriff.
     */
    initializeBubbleAttack() {
        this.sharkIsBubbleAttacking = true;
        this.currentImage = 0;
    }


    /**
     * Bereitet den Zustand für den Blasen-Angriff vor.
     */
    prepareBubbleAttackState() {
        const hasPoisonBottles = this.collectedPoisonBottles > 0;
        const images = hasPoisonBottles ? this.IMAGES_ATTACK_BUBBLE_TRAP_POISONED : this.IMAGES_ATTACK_BUBBLE_TRAP_WITHOUT;
        return { hasPoisonBottles, images, bubbleSpawned: false };
    }


    /**
     * Startet die Blasen-Angriffs-Animation.
     */
    startBubbleAttackAnimation(bubbleState) {
        const interval = setInterval(() => {
            if (!gamePaused) {
                this.handleBubbleSpawn(bubbleState);
                this.playBubbleAttackFrame(bubbleState.images, interval);
            }
        }, 70);
    }


    /**
     * Behandelt das Spawnen der Blase.
     */
    handleBubbleSpawn(bubbleState) {
        if (this.currentImage === 7 && bubbleState.hasPoisonBottles && !bubbleState.bubbleSpawned) {
            this.spawnBubble();
            bubbleState.bubbleSpawned = true;
        }
    }


    /**
     * Spielt ein Frame der Blasen-Angriffs-Animation ab.
     */
    playBubbleAttackFrame(images, interval) {
        this.playAnimationFrame(images, () => {
            clearInterval(interval);
            this.sharkIsBubbleAttacking = false;
            this.currentImage = 0;
        });
    }

 
    spawnBubble() {
        if (!this.world) return;

        const bubbleX = this.otherDirection
            ? this.x
            : this.x + this.width - this.offset.right;
        const bubbleY = this.y + (this.height / 2);

        const bubble = new Bubble(this.world, bubbleX, bubbleY, this.otherDirection);
        this.world.bubble.push(bubble);
        this.collectedPoisonBottles = this.collectedPoisonBottles - 12.5;
        this.world.poisonStatusBar.setPercentage(this.collectedPoisonBottles);
    }


    playAnimationFrame(images, onComplete) {
        const i = this.currentImage;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        if (this.currentImage >= images.length) {
            onComplete?.();
        }
    }


    hurtCharacter(enemy) {
        if (!gamePaused) {
            this.currentHurtImages = this.IMAGES_HURT_POISONED;
            if (enemy instanceof Jellyfish) {
                this.currentHurtImages = this.IMAGES_HURT_ELECTIC_SHOCKED;
            }
            this.hurtAnimationFrame = 0;
        }
    }


    playHurtAnimation() {
        if (!this.currentHurtImages) return;

        if (!this.isHurt()) {
            this.resetHurtAnimation();
            return;
        }

        this.displayHurtFrame();
        this.advanceHurtFrame();
    }


    /**
     * Setzt die Verletzungsanimation zurück.
     */
    resetHurtAnimation() {
        this.currentHurtImages = null;
        this.hurtAnimationFrame = 0;
    }


    /**
     * Zeigt das aktuelle Frame der Verletzungsanimation an.
     */
    displayHurtFrame() {
        const images = this.currentHurtImages;
        const i = this.hurtAnimationFrame % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
    }


    /**
     * Geht zum nächsten Frame der Verletzungsanimation.
     */
    advanceHurtFrame() {
        this.hurtAnimationFrame++;
        if (this.hurtAnimationFrame >= this.currentHurtImages.length) {
            this.hurtAnimationFrame = 0;
        }
    }


    dieCharacter() {
        if (this.lastDamageFrom == 'poison') {
            this.playAnimationOnce(this.IMAGES_DEAD_POISONED);
        }
        if (this.lastDamageFrom == 'electric') {
            this.playAnimationOnce(this.IMAGES_DEAD_ELECTIC_SHOCKED);
        }
        showGameOverScreen();
    }


    playLongIdleAnimation(images) {
        if (this.currentImage > 14) {
            this.currentImage = 0;
        }

        if (!this.introLongIdleDone) {
            this.playLongIdleIntro(images);
        } else {
            this.playLongIdleLoop(images);
        }
    }


    playLongIdleIntro(images) {
        const i = this.currentImage;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        if (this.currentImage >= images.length) {
            this.introLongIdleDone = true;
            this.currentImage = 10;
        }
    }


    playLongIdleLoop(images) {
        const loopStart = 10;
        const loopEnd = images.length - 1;

        this.setOffset(125, 20);
        const i = this.currentImage;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        if (this.currentImage > loopEnd) {
            this.currentImage = loopStart;
        }
    }


    playAttackAnimation(images) {        
        if (this.sharkIsAttacking) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;              
            if (this.currentImage >= images.length) {
                this.sharkIsAttacking = false;
                this.world.keyboard.SPACE = false;
                this.currentImage = 0;                  
            }
        }
    } 


    playBubbleAttackAnimation(images) {
        if (!this.sharkIsBubbleAttacking) return;

        this.initializeBubbleFrame();
        this.updateBubbleFrame(images);
        this.checkBubbleAttackComplete(images);
    }


    initializeBubbleFrame() {
        if (this.currentBubbleFrame === undefined) {
            this.currentBubbleFrame = 0;
        }
    }


    updateBubbleFrame(images) {
        const i = this.currentBubbleFrame;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentBubbleFrame++;
    }


    checkBubbleAttackComplete(images) {
        if (this.currentBubbleFrame >= images.length) {
            this.sharkIsBubbleAttacking = false;
            this.world.keyboard.D = false;
            this.currentBubbleFrame = 0;
        }
    }


    setTimerLongIdle() {
        this.idleTimeout = setTimeout(() => {
            this.isIdleTooLong = true;
            if (this.world && this.world.audioManager) {
                this.world.audioManager.playLoop('snoring');
            }
        }, 8000);
    }


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


    isIdle() {
        return !this.world.keyboard.SPACE &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.sharkIsAttacking;
    }


    isAttacking() {
        return this.world.keyboard.SPACE || this.sharkIsAttacking;
    }


    isBubbleAttacking() {
        return this.world.keyboard.D || this.sharkIsBubbleAttacking;
    }


    isSwimming() {
        return this.world.keyboard.UP || 
            this.world.keyboard.DOWN || 
            this.world.keyboard.LEFT || 
            this.world.keyboard.RIGHT;
    }


    setOffset(top, bottom) {
        this.offset.top = top;
        this.offset.bottom = bottom;
    }
}