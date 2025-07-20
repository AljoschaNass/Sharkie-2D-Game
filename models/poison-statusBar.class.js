class PoisonStatusBar extends StatusBar {
    y = 0;
    percentage = 0;
    IMAGES = [
        'img/4.Marcadores/green/poisoned bubbles/poison_0.png',
        'img/4.Marcadores/green/poisoned bubbles/poison_20.png',
        'img/4.Marcadores/green/poisoned bubbles/poison_40.png',
        'img/4.Marcadores/green/poisoned bubbles/poison_60.png',
        'img/4.Marcadores/green/poisoned bubbles/poison_80.png',
        'img/4.Marcadores/green/poisoned bubbles/poison_100.png'
    ];


    constructor() {
        super().loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}
