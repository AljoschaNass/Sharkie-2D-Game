class Character extends MovableObject {
    world;
    speed = 2;
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
    idleTimeout;
    isIdleTooLong = false;
    introLongIdleDone = false;
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
    IMAGES_ATTACK_BUBBLE_TRAP = [
        'img/1.Sharkie/2.Long_IDLE/I1.png',
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
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_ATTACK_FIN_SLAP);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.loadImages(this.IMAGES_DEAD_POISONED);

        this.animate();     
    }


    animate() {       
        setInterval(() => {
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
        }, 1000 / 60);
        
        setInterval(() => {            
            if (this.isDead()) {                                
                this.dieCharacter();  
            } else if (this.isAttacking()) {
                this.attack();
                this.resetTimerLongIdle();
            } else if (this.isSwimming()) {
                this.playAnimation(this.IMAGES_SWIM);
                this.resetTimerLongIdle();
            } else if (this.isIdle() && !this.isHurt()) {
                if (this.isIdleTooLong) {
                    this.playLongIdleAnimation(this.IMAGES_LONG_IDLE);
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
                if (!this.idleTimeout) {
                    this.setTimerLongIdle();
                }
            }
        }, 150);
    }


    attack() {    
        this.sharkIsAttacking = true;
        this.world.keyboard.SPACE = false;
        this.playAttackAnimation(this.IMAGES_ATTACK_FIN_SLAP);
        this.world.keyboard.SPACE = false;        
    }


    hurtCharacter() {
        if (!this.isDead()) {
            this.playAnimationOnce(this.IMAGES_HURT_POISONED);
            this.resetTimerLongIdle();
        }
    }


    dieCharacter() {
        this.playAnimationOnce(this.IMAGES_DEAD_POISONED);
    }


    playLongIdleAnimation(images) {
        if (this.currentImage > 14) {
                this.currentImage = 0;
        }

        if (!this.introLongIdleDone) {
            const i = this.currentImage;
            const path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;

            if (this.currentImage >= images.length) {
                this.introLongIdleDone = true;
                this.currentImage = 10;
            }
        } else {
            const loopStart = 10;
            const loopEnd = images.length - 1;

            const i = this.currentImage;
            const path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;

            if (this.currentImage > loopEnd) {
                this.currentImage = loopStart;
            }
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


    setTimerLongIdle() {
        this.idleTimeout = setTimeout(() => {
            this.isIdleTooLong = true;
        }, 8000);
    }


    resetTimerLongIdle() {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
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


    isSwimming() {
        return this.world.keyboard.UP || 
            this.world.keyboard.DOWN || 
            this.world.keyboard.LEFT || 
            this.world.keyboard.RIGHT;
    }
}