class Level {
    enemies;
    poisonWaterItems;
    coins;
    backgroundObjects;
    levelEnd_x = 3000;


    constructor(enemies, poisonWaterItems, coins, backgroundObjects) {
        this.enemies = enemies;
        this.poisonWaterItems = poisonWaterItems;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}