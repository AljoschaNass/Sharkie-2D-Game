class HealthStatusBar extends StatusBar {
    y = 80;
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
}
