class Endboss extends MovableObject {
    world;
    height = 300;
    width = 300;
    x = 1000;
    y = 0;
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


    animate() {
        setInterval(() => {
            if (this.world.character.x > 650) {
                this.characterReachedEndboss = true;
            }
            if (this.characterReachedEndboss) {
                this.showEndboss();
            }
            if (this.animationIsPlayed) {
                this.playAnimation(this.IMAGES_FLOATING); 
            }
        }, 200);
    }

    showEndboss() {
        this.playAnimationOnce(this.IMAGES_INTRODUCE);
    }
}