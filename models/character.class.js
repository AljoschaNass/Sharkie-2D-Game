class Character extends MovableObject {
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
    world;
    currentImageSet = this.IMAGES_IDLE;

    speed = 1.5;
    
    idleTimeout;
    isIdleTooLong = false;


    constructor(){
        super().loadImage("/img/1.Sharkie/1.IDLE/1.png");
        this.loadImages(this.IMAGES_IDLE)

        this.animate();        
    }


    animate() {       
        setInterval(() => {
            if (this.world.keyboard.UP) {
                this.y -= this.speed;
            }
            if (this.world.keyboard.DOWN) {
                this.y += this.speed;
            }
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
            }
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
            }
        }, 1000 / 60)
        
        setInterval(() => {
            let noKeyDown = !this.world.keyboard.SPACE &&
                            !this.world.keyboard.UP &&
                            !this.world.keyboard.DOWN &&
                            !this.world.keyboard.LEFT &&
                            !this.world.keyboard.RIGHT;

            let swim =  this.world.keyboard.UP || 
                        this.world.keyboard.DOWN || 
                        this.world.keyboard.LEFT || 
                        this.world.keyboard.RIGHT;

            if (noKeyDown) {
                this.currentImageSet = this.IMAGES_IDLE;
                if (!this.idleTimeout) {
                    this.idleTimeout = setTimeout(() => {
                        this.isIdleTooLong = true;
                        this.currentImageSet = this.IMAGES_LONG_IDLE;
                    }, 5000);
                }
            } else {
                clearTimeout(this.idleTimeout);
                this.idleTimeout = null;
                this.isIdleTooLong = false;
            }
            if (this.isIdleTooLong) {
                this.currentImageSet = this.IMAGES_LONG_IDLE;
            }
            if (swim) {
                this.currentImageSet = this.IMAGES_SWIM;
            }
            if (this.world.keyboard.SPACE) {
                this.currentImageSet = this.IMAGES_ATTACK_FIN_SLAP;
            }
            this.loadImages(this.currentImageSet)

            let i = this.currentImage % this.currentImageSet.length;
            let path = this.currentImageSet[i];
            this.img = this.imageCache[path];
            this.currentImage++;      
        }, 150);      
    }
}