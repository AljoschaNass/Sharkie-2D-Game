class StatusBar extends DrawableObjekt {
    x = -45;
    y = 0;
    height = 40;
    width = 260;
    percentage = 100;
    IMAGES = [
        'img/4.Marcadores/green/Life/life_0.png',
        'img/4.Marcadores/green/Life/life_20.png',
        'img/4.Marcadores/green/Life/life_40.png',
        'img/4.Marcadores/green/Life/life_60.png',
        'img/4.Marcadores/green/Life/life_80.png',
        'img/4.Marcadores/green/Life/life_100.png'
    ];


    constructor() {
        super().loadImages(this.IMAGES);
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}