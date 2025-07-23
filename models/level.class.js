class Level {
    enemies;
    poisonWaterItems;
    backgroundObjects;
    levelEnd_x = 2200;


    constructor(enemies, poisonWaterItems, backgroundObjects) {
        this.enemies = enemies;
        this.poisonWaterItems = poisonWaterItems;
        this.backgroundObjects = backgroundObjects;
    }
}