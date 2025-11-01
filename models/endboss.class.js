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
    currentImageSet = this.IMAGES_INTRODUCE;


    constructor(){
        super().loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);            
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
    }


    animate() {
        setInterval(() => {
            if (!gamePaused) {
                if (this.world.character.x > 2500) {
                    this.characterReachedEndboss = true;
                }
                if (this.characterReachedEndboss) {
                    this.showEndboss();
                }
                if (this.animationIsPlayed) {
                    this.playAnimation(this.IMAGES_FLOATING); 
                    this.startMovingLeft();
                }
            }
        }, 200);
    }


    showEndboss() {
        this.playAnimationOnce(this.IMAGES_INTRODUCE);
    }

    
    startMovingLeft() {
    if (this.moveLeftInterval) {
        clearInterval(this.moveLeftInterval);
    }
    this.moveLeftInterval = setInterval(() => {
        if (!gamePaused) {
            this.x -= 0.5;
            }
        }, 40);
    }
}