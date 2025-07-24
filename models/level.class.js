class Level {
    enemies;
    poisonWaterItems;
    coins;
    backgroundObjects;
    levelEnd_x = 2200;


    constructor(enemies, poisonWaterItems, coins, backgroundObjects) {
        this.enemies = enemies;
        this.poisonWaterItems = poisonWaterItems;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}