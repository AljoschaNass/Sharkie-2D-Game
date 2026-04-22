/**
 * Final boss enemy. Enters after the character crosses
 * `ENDBOSS_ACTIVATION_X`, then cycles between attack and rest phases.
 */
class Endboss extends MovableObject {
    static ANIMATION_TICK_MS = 200;
    static MOVEMENT_TICK_MS = FRAME_INTERVAL;
    static ATTACK_FRAME_MS = 150;
    static HURT_FRAME_MS = 150;
    static DEATH_FRAME_MS = 350;
    static WIN_DELAY_MS = 500;
    static ATTACK_PHASE_S = 3;
    static REST_PHASE_S = 2;

    world;
    height = 300;
    width = 300;
    x = ENDBOSS_SPAWN_X;
    y = 50;
    offset = { top: 95, left: 12, bottom: 40, right: 18 };
    currentImage = 0;
    characterReachedEndboss = false;

    isAttacking = false;
    isHurtAnimating = false;
    isDying = false;
    phase = 'idle';
    phaseStartTime = 0;
    attackSpeed = 2.7;
    normalSpeed = 0.5;

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
        'img/2.Enemy/3.FinalEnemy/1.Introduce/10.png'
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
        'img/2.Enemy/3.FinalEnemy/2.floating/13.png'
    ];
    IMAGES_ATTACK = [
        'img/2.Enemy/3.FinalEnemy/Attack/1.png',
        'img/2.Enemy/3.FinalEnemy/Attack/2.png',
        'img/2.Enemy/3.FinalEnemy/Attack/3.png',
        'img/2.Enemy/3.FinalEnemy/Attack/4.png',
        'img/2.Enemy/3.FinalEnemy/Attack/5.png',
        'img/2.Enemy/3.FinalEnemy/Attack/6.png'
    ];
    IMAGES_HURT = [
        'img/2.Enemy/3.FinalEnemy/Hurt/1.png',
        'img/2.Enemy/3.FinalEnemy/Hurt/2.png',
        'img/2.Enemy/3.FinalEnemy/Hurt/3.png',
        'img/2.Enemy/3.FinalEnemy/Hurt/4.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/3.FinalEnemy/Dead/6.png',
        'img/2.Enemy/3.FinalEnemy/Dead/7.png',
        'img/2.Enemy/3.FinalEnemy/Dead/8.png',
        'img/2.Enemy/3.FinalEnemy/Dead/9.png',
        'img/2.Enemy/3.FinalEnemy/Dead/10.png'
    ];

    currentImageSet = this.IMAGES_INTRODUCE;

    constructor() {
        super().loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.energy = ENDBOSS_MAX_ENERGY;
        this.animate();
    }

    /**
     * Reset to initial state for a fresh round.
     */
    restart() {
        this.x = ENDBOSS_SPAWN_X;
        this.y = 50;
        this.energy = ENDBOSS_MAX_ENERGY;
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
     * Start the animation and movement loops.
     */
    animate() {
        IntervalManager.setInterval(() => {
            this.checkBossState();
            this.handleBossActivation();
            this.playCurrentAnimation();
        }, Endboss.ANIMATION_TICK_MS);

        IntervalManager.setInterval(() => {
            if (this.characterReachedEndboss && !this.isDying && this.animationIsPlayed) {
                this.executePhaseMovement();
            }
        }, Endboss.MOVEMENT_TICK_MS);
    }

    /**
     * Latch activation once the player has crossed the threshold.
     */
    checkBossState() {
        if (this.world.character.x > ENDBOSS_ACTIVATION_X) {
            this.characterReachedEndboss = true;
        }
    }

    handleBossActivation() {
        if (this.characterReachedEndboss && !this.isDying) {
            this.showEndboss();
            this.updatePhaseSystem();
        }
    }

    /**
     * Pick the animation for the current state. Intro plays once (latched
     * via `animationIsPlayed`), then we float unless attacking/hurt/dying.
     */
    playCurrentAnimation() {
        if (this.isDying) {
            this.playAnimation(this.IMAGES_DEAD);
            return;
        }
        if (this.animationIsPlayed && !this.isAttacking && !this.isHurtAnimating) {
            this.playAnimation(this.IMAGES_FLOATING);
        }
    }

    showEndboss() {
        this.playAnimationOnce(this.IMAGES_INTRODUCE);
    }

    /**
     * Cycle through idle → attack → rest → attack.
     */
    updatePhaseSystem() {
        const elapsed = (Date.now() - this.phaseStartTime) / 1000;

        if (this.phase === 'idle' && this.animationIsPlayed) {
            this.enterPhase('attack');
        } else if (this.phase === 'attack' && elapsed > Endboss.ATTACK_PHASE_S) {
            this.enterPhase('rest');
        } else if (this.phase === 'rest' && elapsed > Endboss.REST_PHASE_S) {
            this.enterPhase('attack');
        }
    }

    enterPhase(phase) {
        this.phase = phase;
        this.phaseStartTime = Date.now();
    }

    executePhaseMovement() {
        if (this.phase === 'attack') {
            this.moveTowardsCharacter();
            this.matchCharacterHeight();
        } else if (this.phase === 'rest') {
            this.x -= this.normalSpeed;
        }
    }

    moveTowardsCharacter() {
        const distance = this.world.character.x - this.x;
        if (Math.abs(distance) > 50) {
            this.x += distance > 0 ? this.attackSpeed : -this.attackSpeed;
        }
    }

    matchCharacterHeight() {
        const diff = (this.world.character.y - 50) - this.y;
        if (Math.abs(diff) > 5) {
            this.y += diff > 0 ? 2 : -2;
        }
    }

    /* ---------- Attack / hurt / death sequences ---------- */

    /**
     * Play the one-shot attack animation. Guarded against re-entry.
     */
    attack() {
        if (this.isAttacking) return;
        this.runOneShotAnimation({
            images: this.IMAGES_ATTACK,
            intervalMs: Endboss.ATTACK_FRAME_MS,
            stateFlag: 'isAttacking'
        });
    }

    /**
     * Play the hurt animation; trigger death when energy is depleted.
     */
    playHurtAnimation() {
        if (this.isHurtAnimating || this.isDying) return;
        this.runOneShotAnimation({
            images: this.IMAGES_HURT,
            intervalMs: Endboss.HURT_FRAME_MS,
            stateFlag: 'isHurtAnimating',
            onComplete: () => { if (this.energy <= 0) this.die(); }
        });
    }

    /**
     * Generic runner for attack/hurt that flips a flag, plays an animation once,
     * and cleans up. An optional `onComplete` runs after the final frame.
     * @param {{ images: string[], intervalMs: number, stateFlag: string, onComplete?: () => void }} cfg
     */
    runOneShotAnimation(cfg) {
        this[cfg.stateFlag] = true;
        this.currentImage = 0;

        const id = IntervalManager.setInterval(() => {
            this.playAnimationFrame(cfg.images, () => {
                IntervalManager.clear(id);
                this[cfg.stateFlag] = false;
                this.currentImage = 0;
                cfg.onComplete?.();
            });
        }, cfg.intervalMs);
    }

    /**
     * Play a single frame and fire `onComplete` once the sequence ends.
     */
    playAnimationFrame(images, onComplete) {
        this.img = this.imageCache[images[this.currentImage]];
        this.currentImage++;
        if (this.currentImage >= images.length) onComplete?.();
    }

    /**
     * Death sequence — plays once, then pauses the game and shows the win screen.
     */
    die() {
        this.isDying = true;
        this.currentImage = 0;

        const id = IntervalManager.setInterval(() => {
            this.playAnimationFrame(this.IMAGES_DEAD, () => {
                IntervalManager.clear(id);
                gamePaused = true;
                setTimeout(() => this.showWinningScreen(), Endboss.WIN_DELAY_MS);
            });
        }, Endboss.DEATH_FRAME_MS);
    }

    showWinningScreen() {
        if (typeof showWinScreen === 'function') showWinScreen();
    }
}
