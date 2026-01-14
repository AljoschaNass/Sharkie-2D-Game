class Character extends MovableObject {
    world;
    speed = 2;
    energy = 100000;
    collectedPoisonBottles = 0;
    collectedCoins = 0;
    offset = {
        top: 100,
        left: 40,
        bottom: 45,
        right: 35
    };
    currentImageSet = this.IMAGES_IDLE;
    sharkIsAttacking = false;
    sharkIsBubbleAttacking = false;
    idleTimeout;
    isIdleTooLong = false;
    introLongIdleDone = false;
    currentHurtImages = null;
    hurtAnimationFrame = 0;
    IMAGES_IDLE = [
        '/img/1.Sharkie/1.IDLE/1.png',
        '/img/1.Sharkie/1.IDLE/2.png',
        '/img/1.Sharkie/1.IDLE/3.png',
        '/img/1.Sharkie/1.IDLE/4.png',
        '/img/1.Sharkie/1.IDLE/5.png',
        '/img/1.Sharkie/1.IDLE/6.png',
        '/img/1.Sharkie/1.IDLE/7.png',
        '/img/1.Sharkie/1.IDLE/8.png',
        '/img/1.Sharkie/1.IDLE/9.png',
        '/img/1.Sharkie/1.IDLE/10.png',
        '/img/1.Sharkie/1.IDLE/11.png',
        '/img/1.Sharkie/1.IDLE/12.png',
        '/img/1.Sharkie/1.IDLE/13.png',
        '/img/1.Sharkie/1.IDLE/14.png',
        '/img/1.Sharkie/1.IDLE/15.png',
        '/img/1.Sharkie/1.IDLE/16.png',
        '/img/1.Sharkie/1.IDLE/17.png',
        '/img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/I1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png'
    ];
    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_ATTACK_BUBBLE_TRAP_WITH = [
        'img/1.Sharkie/4.Attack/bubble-trap/with-bubble/1.png',
        'img/1.Sharkie/4.Attack/bubble-trap/with-bubble/2.png',
        'img/1.Sharkie/4.Attack/bubble-trap/with-bubble/3.png',
        'img/1.Sharkie/4.Attack/bubble-trap/with-bubble/4.png',
        'img/1.Sharkie/4.Attack/bubble-trap/with-bubble/5.png',
        'img/1.Sharkie/4.Attack/bubble-trap/with-bubble/6.png',
        'img/1.Sharkie/4.Attack/bubble-trap/with-bubble/7.png',
        'img/1.Sharkie/4.Attack/bubble-trap/with-bubble/8.png'
    ];
    IMAGES_ATTACK_BUBBLE_TRAP_WITHOUT = [
        'img/1.Sharkie/4.Attack/bubble-trap/without-bubble/1.png',
        'img/1.Sharkie/4.Attack/bubble-trap/without-bubble/2.png',
        'img/1.Sharkie/4.Attack/bubble-trap/without-bubble/3.png',
        'img/1.Sharkie/4.Attack/bubble-trap/without-bubble/4.png',
        'img/1.Sharkie/4.Attack/bubble-trap/without-bubble/5.png',
        'img/1.Sharkie/4.Attack/bubble-trap/without-bubble/6.png',
        'img/1.Sharkie/4.Attack/bubble-trap/without-bubble/7.png'
    ];
    IMAGES_ATTACK_BUBBLE_TRAP_POISONED = [
        'img/1.Sharkie/4.Attack/bubble-trap/poisoned/1.png',
        'img/1.Sharkie/4.Attack/bubble-trap/poisoned/2.png',
        'img/1.Sharkie/4.Attack/bubble-trap/poisoned/3.png',
        'img/1.Sharkie/4.Attack/bubble-trap/poisoned/4.png',
        'img/1.Sharkie/4.Attack/bubble-trap/poisoned/5.png',
        'img/1.Sharkie/4.Attack/bubble-trap/poisoned/6.png',
        'img/1.Sharkie/4.Attack/bubble-trap/poisoned/7.png',
        'img/1.Sharkie/4.Attack/bubble-trap/poisoned/8.png'
    ];
    IMAGES_ATTACK_FIN_SLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png'
    ];
    IMAGES_HURT_POISONED = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];
    IMAGES_HURT_ELECTIC_SHOCKED = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ];
    IMAGES_DEAD_POISONED = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];
    IMAGES_DEAD_ELECTIC_SHOCKED = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ];


    constructor(){
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadAllImages();
        this.animate();     
    }

        restart() {
        this.x = 0;
        this.y = 100;
        this.energy = 100;
        this.collectedPoisonBottles = 0;
        this.collectedCoins = 0;
        this.currentImage = 0;
        this.currentImageSet = this.IMAGES_IDLE;
        this.sharkIsAttacking = false;
        this.isIdleTooLong = false;
        this.introLongIdleDone = false;
        this.lastDamageFrom = 'poison';
        this.otherDirection = false;
        this.currentHurtImages = null;
        this.hurtAnimationFrame = 0;
        this.lastHit = 0;
        this.resetTimerLongIdle();
    }


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


    animate() {       
        setInterval(() => {
            if (!gamePaused) {
                if (this.world.keyboard.UP && this.y > -90) {
                    this.moveUp();            }
                if (this.world.keyboard.DOWN && this.y < 300) {
                    this.moveDown();
                }
                if (this.world.keyboard.LEFT && this.x > -100) {
                    this.moveLeft();
                    this.otherDirection = true;
                }
                if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
                    this.moveRight();
                    this.otherDirection = false;
                }
                this.world.camera_x = -this.x + 50;  
            }          
        }, 1000 / 60);
        
        setInterval(() => {
            if (!gamePaused) {
                if (this.isDead()) {
                    this.dieCharacter();
                } else if (this.isHurt()) {
                    this.playHurtAnimation();
                    this.resetTimerLongIdle();
                } else if (this.isAttacking()) {
                    this.setOffset(100, 45);
                    this.attack();
                    this.resetTimerLongIdle();
                } else if (this.isBubbleAttacking()) {
                    this.bubbleAttack();
                    this.resetTimerLongIdle();
                } else if (this.isSwimming()) {
                    this.setOffset(100, 45);
                    this.playAnimation(this.IMAGES_SWIM);
                    this.resetTimerLongIdle();
                } else if (this.isIdle()) {
                    if (this.isIdleTooLong) {
                        this.playLongIdleAnimation(this.IMAGES_LONG_IDLE);
                    } else {
                        this.playAnimation(this.IMAGES_IDLE);
                    }
                    if (!this.idleTimeout) {
                        this.setTimerLongIdle();
                    }
                }
            }
        }, 150);
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

        if (this.collectedPoisonBottles > 0) {
            this.playActionAnimation(this.IMAGES_ATTACK_BUBBLE_TRAP_POISONED, 'sharkIsBubbleAttacking');
            if (this.currentImage === 7) {
                this.spawnBubble();
            }
        } else {
            this.playActionAnimation(this.IMAGES_ATTACK_BUBBLE_TRAP_WITHOUT, 'sharkIsBubbleAttacking');
        }        
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
            this.currentHurtImages = null;
            this.hurtAnimationFrame = 0;
            return;
        }

        const images = this.currentHurtImages;
        let i = this.hurtAnimationFrame % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.hurtAnimationFrame++;

        if (this.hurtAnimationFrame >= images.length) {
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