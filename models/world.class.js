class World {
    character = new Character();
    level = level1;
    poisonStatusBar = new PoisonStatusBar();
    healthStatusBar = new HealthStatusBar();
    coinStatusBar = new CoinStatusBar();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    setWorld() {        
        this.character.world = this;
        this.level.enemies[3].world = this;
    }


    checkCollisions() {
        setInterval(() => {
            this.collisionWithEnemy();
            this.collectPoisonWater();
            this.collectCoin();
        }, 500);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.poisonWaterItems);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.poisonStatusBar);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawHitbox(this.ctx)
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1)
            mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    collisionWithEnemy() {
        this.level.enemies.forEach( (enemy) => {
            if (this.character.isCollding(enemy)) {                
                this.character.hit(enemy);
                this.healthStatusBar.setPercentage(this.character.energy);
                this.character.hurtCharacter(enemy);
            }
        });
    }


    collectPoisonWater() {
        for (let i = this.level.poisonWaterItems.length - 1; i >= 0; i--) {
            const poisonWater = this.level.poisonWaterItems[i];
            if (this.character.isCollding(poisonWater)) {
                this.character.collectedPoisonBottles = this.character.collectedPoisonBottles + 21;
                this.poisonStatusBar.setPercentage(this.character.collectedPoisonBottles);
                this.level.poisonWaterItems.splice(i, 1);
            }
        }
    }


    collectCoin() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            const coin = this.level.coins[i];
            if (this.character.isCollding(coin)) {
                this.character.collectedCoins = this.character.collectedCoins + 21;
                this.coinStatusBar.setPercentage(this.character.collectedCoins);
                this.level.coins.splice(i, 1);
            }
        }
    }
}