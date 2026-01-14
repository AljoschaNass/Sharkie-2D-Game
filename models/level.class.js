/**
 * Game level containing enemies, items, and background.
 */
class Level {
    enemies;
    poisonWaterItems;
    coins;
    backgroundObjects;
    levelEnd_x = 3600;

    /**
     * @param {Array} enemies - Level enemies
     * @param {Array} poisonWaterItems - Collectable poison bottles
     * @param {Array} coins - Collectable coins
     * @param {Array} backgroundObjects - Background images
     */
    constructor(enemies, poisonWaterItems, coins, backgroundObjects) {
        this.enemies = enemies;
        this.poisonWaterItems = poisonWaterItems;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}