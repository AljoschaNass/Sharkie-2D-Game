class StatusBar extends DrawableObjekt {
    x = 0;
    y = 100;
    height = 50;
    width = 400;
    percentage = 100;
    IMAGES = [
        'img/4.Marcadores/green/Life/life_0.png',
        'img/4.Marcadores/green/Life/life_20.png',
        'img/4.Marcadores/green/Life/life_40.png',
        'img/4.Marcadores/green/Life/life_60.png',
        'img/4.Marcadores/green/Life/life_80.png',
        'img/4.Marcadores/green/Life/life_100.png',
    ]

    constructor() {
        super().loadImage(this.IMAGES);
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