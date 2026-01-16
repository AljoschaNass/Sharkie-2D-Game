/**
 * Final boss enemy.
 */
class Endboss extends MovableObject {
    world;
    height = 300;
    width = 300;
    x = 3500;
    y = 50;
    offset = {
        top: 95,
        left: 12,
        bottom: 40,
        right: 18
    };
    currentImage = 0;
    characterReachedEndboss = false;


    IMAGES_INTRODUCE = [
        'img/2.Enemy/3.FinalEnemy/1.Introduce/1.png',
        'img/2.Enemy/3.FinalEnemy/1.Introduce/2.png',
        'img/2.Enemy/3.FinalEnemy/1.Introduce/3.png',
        'img/2.Enemy/3.FinalEnemy/1.Introduce/4.png',
        'img/2.Enemy/3.FinalEnemy/1.Introduce/5.png',
        'img/2.Enemy/3.FinalEnemy/1.Introduce/6.png',
        'img/2.Enemy/3.FinalEnemy/1.Introduce/7.png',
        'img/2.Enemy/3.FinalEnemy/1.Introduce/8.png',
        'img/2.Enemy/3.FinalEnemy/1.Introduce/9.png',
        'img/2.Enemy/3.FinalEnemy/1.Introduce/10.png',
    ];
    IMAGES_FLOATING = [
        'img/2.Enemy/3.FinalEnemy/2.floating/1.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/2.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/3.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/4.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/5.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/6.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/7.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/8.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/9.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/10.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/11.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/12.png',
        'img/2.Enemy/3.FinalEnemy/2.floating/13.png',
    ];
    IMAGES_ATTACK = [
        'img/2.Enemy/3.FinalEnemy/Attack/1.png',
        'img/2.Enemy/3.FinalEnemy/Attack/2.png',
        'img/2.Enemy/3.FinalEnemy/Attack/3.png',
        'img/2.Enemy/3.FinalEnemy/Attack/4.png',
        'img/2.Enemy/3.FinalEnemy/Attack/5.png',
        'img/2.Enemy/3.FinalEnemy/Attack/6.png',
    ];
    IMAGES_HURT = [
        'img/2.Enemy/3.FinalEnemy/Hurt/1.png',
        'img/2.Enemy/3.FinalEnemy/Hurt/2.png',
        'img/2.Enemy/3.FinalEnemy/Hurt/3.png',
        'img/2.Enemy/3.FinalEnemy/Hurt/4.png',
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/3.FinalEnemy/Dead/6.png',
        'img/2.Enemy/3.FinalEnemy/Dead/7.png',
        'img/2.Enemy/3.FinalEnemy/Dead/8.png',
        'img/2.Enemy/3.FinalEnemy/Dead/9.png',
        'img/2.Enemy/3.FinalEnemy/Dead/10.png',
    ];
    currentImageSet = this.IMAGES_INTRODUCE;
    isAttacking = false;
    isHurtAnimating = false;
    isDying = false;
    phase = 'idle';
    phaseStartTime = 0;
    attackSpeed = 2.7;
    normalSpeed = 0.5;


    /**
     * Creates a new endboss.
     */
    constructor(){
        super().loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    /**
     * Resets the endboss to initial values.
     */
    restart() {
        this.x = 3500;
        this.y = 50;
        this.energy = 100;
        this.currentImage = 0;
        this.characterReachedEndboss = false;
        this.currentImageSet = this.IMAGES_INTRODUCE;
        this.animationIsPlayed = false;
        this.isAttacking = false;
        this.isHurtAnimating = false;
        this.isDying = false;
        this.phase = 'idle';
        this.phaseStartTime = 0;
    }


    /**
     * Starts the animations and movement of the endboss.
     */
    animate() {
        this.startAnimationLoop();
        this.startMovementLoop();
    }


    /**
     * Starts the main animation loop.
     */
    startAnimationLoop() {
        setInterval(() => {
            if (!gamePaused) {
                this.checkBossState();
                this.handleBossActivation();
                this.playCurrentAnimation();
            }
        }, 200);
    }


    /**
     * Starts the movement loop.
     */
    startMovementLoop() {
        setInterval(() => {
            if (!gamePaused && this.characterReachedEndboss && !this.isDying && this.animationIsPlayed) {
                this.executePhaseMovement();
            }
        }, 1000 / 60);
    }


    /**
     * Checks the state of the boss (death/activation).
     */
    checkBossState() {
        if (this.energy <= 0 && !this.isDying) {
            this.die();
        } else if (this.world.character.x > 3100) {
            this.characterReachedEndboss = true;
        }
    }


    /**
     * Handles the activation of the boss.
     */
    handleBossActivation() {
        if (this.characterReachedEndboss && !this.isDying) {
            this.showEndboss();
            this.updatePhaseSystem();
        }
    }


    /**
     * Plays the current animation based on the state.
     */
    playCurrentAnimation() {
        if (this.animationIsPlayed && !this.isAttacking && !this.isHurtAnimating && !this.isDying) {
            this.playAnimation(this.IMAGES_FLOATING);
        } else if (this.isDying) {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }


    /**
     * Shows the introduction animation of the endboss.
     */
    showEndboss() {
        this.playAnimationOnce(this.IMAGES_INTRODUCE);
    }


    /**
     * Updates the phase system between attack and rest.
     */
    updatePhaseSystem() {
        const now = Date.now();
        const elapsed = (now - this.phaseStartTime) / 1000;
        if (this.phase === 'idle' && this.animationIsPlayed) {
            this.phase = 'attack';
            this.phaseStartTime = now;
        } else if (this.phase === 'attack' && elapsed > 3) {
            this.phase = 'rest';
            this.phaseStartTime = now;
        } else if (this.phase === 'rest' && elapsed > 2) {
            this.phase = 'attack';
            this.phaseStartTime = now;
        }
    }

    /**
     * Executes movement according to the current phase.
     */
    executePhaseMovement() {
        if (this.phase === 'attack') {
            this.moveTowardsCharacter();
            this.matchCharacterHeight();
        } else if (this.phase === 'rest') {
            this.x -= this.normalSpeed;
        }
    }

    /**
     * Moves the endboss towards the character.
     */
    moveTowardsCharacter() {
        const distance = this.world.character.x - this.x;
        if (Math.abs(distance) > 50) {
            this.x += distance > 0 ? this.attackSpeed : -this.attackSpeed;
        }
    }

    /**
     * Adjusts the endboss height to match the character height.
     */
    matchCharacterHeight() {
        const targetY = this.world.character.y - 50;
        const diff = targetY - this.y;
        if (Math.abs(diff) > 5) {
            this.y += diff > 0 ? 2 : -2;
        }
    }


    /**
     * Executes an attack animation.
     */
    attack() {
        if (this.isAttacking) return;
        this.isAttacking = true;
        this.currentImage = 0;

        const interval = setInterval(() => {
            if (!gamePaused) {
                this.playAnimationFrame(this.IMAGES_ATTACK, () => {
                    clearInterval(interval);
                    this.isAttacking = false;
                    this.currentImage = 0;
                });
            }
        }, 150);
    }


    /**
     * Plays a single animation frame and calls callback on completion.
     * @param {string[]} images - Array mit Bildpfaden
     * @param {Function} onComplete - Callback nach Abschluss der Animation
     */
    playAnimationFrame(images, onComplete) {
        const i = this.currentImage;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        if (this.currentImage >= images.length) {
            onComplete?.();
        }
    }


    /**
     * Plays the hurt animation.
     */
    playHurtAnimation() {
        if (this.isHurtAnimating || this.isDying) return;
        this.isHurtAnimating = true;
        this.currentImage = 0;

        const interval = setInterval(() => {
            if (!gamePaused) {
                this.playAnimationFrame(this.IMAGES_HURT, () => {
                    clearInterval(interval);
                    this.isHurtAnimating = false;
                    this.currentImage = 0;
                });
            }
        }, 150);
    }


    /**
     * Starts the death animation and then shows the win screen.
     */
    die() {
        this.isDying = true;
        this.currentImage = 0;
        let deathAnimationPlayed = false;

        const interval = setInterval(() => {
            if (!gamePaused && !deathAnimationPlayed) {
                this.playAnimationFrame(this.IMAGES_DEAD, () => {
                    deathAnimationPlayed = true;
                    clearInterval(interval);
                    gamePaused = true;
                    setTimeout(() => {
                        this.showWinningScreen();
                    }, 500);
                });
            }
        }, 350);
    }


    /**
     * Shows the win screen.
     */
    showWinningScreen() {
        if (typeof showWinScreen === 'function') {
            showWinScreen();
        }
    }
}