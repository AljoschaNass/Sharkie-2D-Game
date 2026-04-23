/**
 * Action handler for the Character class.
 * Contains all action-related methods like attacks and bubble spawning.
 */
class CharacterActions {
    /**
     * Performs a fin slap attack.
     * @param {Character} character - The character instance
     */
    static attack(character) {
        CharacterAnimations.playActionAnimation(character, character.IMAGES_ATTACK_FIN_SLAP, 'sharkIsAttacking');
    }


    /**
     * Performs a bubble attack if poison bottles are available.
     * @param {Character} character - The character instance
     */
    static bubbleAttack(character) {
        if (character.sharkIsBubbleAttacking) return;

        CharacterActions.initializeBubbleAttack(character);
        const bubbleState = CharacterActions.prepareBubbleAttackState(character);
        CharacterActions.startBubbleAttackAnimation(character, bubbleState);
    }


    /**
     * Initializes the bubble attack.
     * @param {Character} character - The character instance
     */
    static initializeBubbleAttack(character) {
        character.sharkIsBubbleAttacking = true;
        character.currentImage = 0;
    }


    /**
     * Prepares the state for the bubble attack.
     * @param {Character} character - The character instance
     * @returns {Object} Bubble state object
     */
    static prepareBubbleAttackState(character) {
        const hasPoisonBottles = character.collectedPoisonBottles > 0;
        const images = hasPoisonBottles ? character.IMAGES_ATTACK_BUBBLE_TRAP_POISONED : character.IMAGES_ATTACK_BUBBLE_TRAP_WITHOUT;
        return { hasPoisonBottles, images, bubbleSpawned: false };
    }


    /**
     * Starts the bubble attack animation.
     * @param {Character} character - The character instance
     * @param {Object} bubbleState - State object containing animation data
     */
    static startBubbleAttackAnimation(character, bubbleState) {
        CharacterAnimations.startBubbleAttackAnimation(character, bubbleState);
    }


    /**
     * Spawns a bubble projectile from the character.
     * @param {Character} character - The character instance
     */
    static spawnBubble(character) {
        if (!character.world) return;

        const bubbleX = character.otherDirection
            ? character.x
            : character.x + character.width - character.offset.right;
        const bubbleY = character.y + (character.height / 2);

        const bubble = new Bubble(character.world, bubbleX, bubbleY, character.otherDirection);
        character.world.bubble.push(bubble);
        character.collectedPoisonBottles -= COLLECTABLE_VALUE_PERCENT;
        character.world.poisonStatusBar.setPercentage(character.collectedPoisonBottles);
    }


    /**
     * Triggers the hurt animation for the character.
     * Selects the correct hurt images based on the enemy type and resets the animation frame.
     *
     * @param {Character} character - The character instance
     * @param {Object} enemy - The enemy causing damage to the character
     */
    static hurtCharacter(character, enemy) {
        if (!gamePaused) {
            character.currentHurtImages = character.IMAGES_HURT_POISONED;
            character.lastDamageFrom = 'poison';

            if (enemy instanceof Jellyfish) {
                character.currentHurtImages = character.IMAGES_HURT_ELECTRIC_SHOCKED;
                character.lastDamageFrom = 'electric';
            }
            character.hurtAnimationFrame = 0;
        }
    }


    /**
     * Triggers the death sequence.
     * Sets the dying flag and determines which death animation to use.
     * @param {Character} character - The character instance
     */
    static dieCharacter(character) {
        if (!character.isDying) {
            character.isDying = true;
            character.currentImage = 0;
        }
    }


    /**
     * Plays the death animation based on damage type.
     * When the last frame is reached, hands off to the falling phase.
     * @param {Character} character - The character instance
     */
    static playDeathAnimation(character) {
        const deathImages = character.lastDamageFrom === 'electric'
            ? character.IMAGES_DEAD_ELECTRIC_SHOCKED
            : character.IMAGES_DEAD_POISONED;
        if (character.currentImage < deathImages.length) {
            character.img = character.imageCache[deathImages[character.currentImage]];
            character.currentImage++;
            return;
        }
        character.img = character.imageCache[deathImages[deathImages.length - 1]];
        character.isDying = false;
        character.isFalling = true;
    }

    /**
     * Sinks the dead character toward the ocean floor. Once past the fall
     * threshold, pauses the world and shows the game over screen.
     * @param {Character} character - The character instance
     */
    static playFallingDownAnimation(character) {
        character.y += DEATH_FALL_SPEED;
        if (character.y >= DEATH_FALL_END_Y) {
            character.isFalling = false;
            gamePaused = true;
            setTimeout(() => showGameOverScreen(), DEATH_GAMEOVER_DELAY_MS);
        }
    }
}
