class Endboss extends MovableObject {
    world;
    height = 300;
    width = 300;
    x = 3000;
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


    constructor(){
        super().loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    restart() {
        this.x = 3000;
        this.y = 50;
        this.energy = 100;
        this.currentImage = 0;
        this.characterReachedEndboss = false;
        this.currentImageSet = this.IMAGES_INTRODUCE;
        this.animationIsPlayed = false;
        this.isAttacking = false;
        this.isHurtAnimating = false;
        this.isDying = false;
    }


    animate() {
        setInterval(() => {
            if (!gamePaused) {
                if (this.energy <= 0 && !this.isDying) {
                    this.die();
                } else if (this.world.character.x > 2500) {
                    this.characterReachedEndboss = true;
                }

                if (this.characterReachedEndboss && !this.isDying) {
                    this.showEndboss();
                    this.checkAttackDistance();
                }

                if (this.animationIsPlayed && !this.isAttacking && !this.isHurtAnimating && !this.isDying) {
                    this.playAnimation(this.IMAGES_FLOATING);
                    this.startMovingLeft();
                }
            }
        }, 200);
    }


    showEndboss() {
        this.playAnimationOnce(this.IMAGES_INTRODUCE);
    }


    checkAttackDistance() {
        const distance = Math.abs(this.x - this.world.character.x);
        if (distance < 200 && !this.isAttacking && !this.isHurtAnimating) {
            this.attack();
        }
    }


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


    playAnimationFrame(images, onComplete) {
        const i = this.currentImage;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        if (this.currentImage >= images.length) {
            onComplete?.();
        }
    }


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


    die() {
        this.isDying = true;
        this.currentImage = 0;
        if (this.moveLeftInterval) {
            clearInterval(this.moveLeftInterval);
        }

        const interval = setInterval(() => {
            if (!gamePaused) {
                this.playAnimationFrame(this.IMAGES_DEAD, () => {
                    clearInterval(interval);
                    this.showWinningScreen();
                });
            }
        }, 200);
    }


    showWinningScreen() {
        if (typeof showWinScreen === 'function') {
            showWinScreen();
        }
    }


    startMovingLeft() {
        if (this.moveLeftInterval) {
            clearInterval(this.moveLeftInterval);
        }
        this.moveLeftInterval = setInterval(() => {
            if (!gamePaused && !this.isAttacking && !this.isHurtAnimating) {
                this.x -= 0.5;
            }
        }, 40);
    }
}