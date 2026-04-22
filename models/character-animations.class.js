/**
 * Animation handler for the Character class.
 * Contains all animation-related methods.
 */
class CharacterAnimations {
    /**
     * Plays an action animation once.
     * Prevents the animation from starting again while it is already running.
     *
     * @param {Character} character - The character instance
     * @param {string[]} images - Array of image paths for the animation
     * @param {string} flag - Name of the flag used to check if the animation is active
     * @param {number} [speed=100] - Time in milliseconds between frames
     */
    static playActionAnimation(character, images, flag, speed = 100) {
        if (character[flag]) return;
        character[flag] = true;
        character.currentImage = 0;

        const id = IntervalManager.setInterval(() => {
            CharacterAnimations.playAnimationFrame(character, images, () => {
                IntervalManager.clear(id);
                character[flag] = false;
                character.currentImage = 0;
            });
        }, speed);
    }


    /**
     * Plays a single frame of an animation.
     * Moves to the next frame and calls a callback when the animation finishes.
     *
     * @param {Character} character - The character instance
     * @param {string[]} images - Array of image paths for the animation
     * @param {Function} [onComplete] - Optional callback to run when the animation ends
     */
    static playAnimationFrame(character, images, onComplete) {
        const i = character.currentImage;
        const path = images[i];
        character.img = character.imageCache[path];
        character.currentImage++;

        if (character.currentImage >= images.length) {
            onComplete?.();
        }
    }


    /**
     * Starts the bubble attack animation.
     * @param {Character} character - The character instance
     * @param {Object} bubbleState - State object containing animation data
     */
    static startBubbleAttackAnimation(character, bubbleState) {
        const id = IntervalManager.setInterval(() => {
            CharacterAnimations.handleBubbleSpawn(character, bubbleState);
            CharacterAnimations.playBubbleAttackFrame(character, bubbleState.images, id);
        }, 70);
    }


    /**
     * Handles spawning of the bubble.
     * @param {Character} character - The character instance
     * @param {Object} bubbleState - State object containing spawn information
     */
    static handleBubbleSpawn(character, bubbleState) {
        if (character.currentImage === 7 && bubbleState.hasPoisonBottles && !bubbleState.bubbleSpawned) {
            character.spawnBubble();
            bubbleState.bubbleSpawned = true;
        }
    }


    /**
     * Plays one frame of the bubble attack animation.
     * @param {Character} character - The character instance
     * @param {string[]} images - Array of image paths
     * @param {number} interval - Interval ID to clear when done
     */
    static playBubbleAttackFrame(character, images, intervalId) {
        CharacterAnimations.playAnimationFrame(character, images, () => {
            IntervalManager.clear(intervalId);
            character.sharkIsBubbleAttacking = false;
            character.currentImage = 0;
        });
    }


    /**
     * Plays the hurt animation for the character.
     * @param {Character} character - The character instance
     */
    static playHurtAnimation(character) {
        if (!character.currentHurtImages) return;

        if (!character.isHurt()) {
            CharacterAnimations.resetHurtAnimation(character);
            return;
        }

        CharacterAnimations.displayHurtFrame(character);
        CharacterAnimations.advanceHurtFrame(character);
    }


    /**
     * Resets the hurt animation.
     * @param {Character} character - The character instance
     */
    static resetHurtAnimation(character) {
        character.currentHurtImages = null;
        character.hurtAnimationFrame = 0;
    }


    /**
     * Displays the current frame of the hurt animation.
     * @param {Character} character - The character instance
     */
    static displayHurtFrame(character) {
        const images = character.currentHurtImages;
        const i = character.hurtAnimationFrame % images.length;
        const path = images[i];
        character.img = character.imageCache[path];
    }


    /**
     * Advances to the next frame of the hurt animation.
     * @param {Character} character - The character instance
     */
    static advanceHurtFrame(character) {
        character.hurtAnimationFrame++;
        if (character.hurtAnimationFrame >= character.currentHurtImages.length) {
            character.hurtAnimationFrame = 0;
        }
    }


    /**
     * Plays the long idle animation.
     * Plays the intro first, then continues with the looping idle sequence.
     *
     * @param {Character} character - The character instance
     * @param {string[]} images - Array of image paths for the long idle animation
     */
    static playLongIdleAnimation(character, images) {
        if (character.currentImage > 14) {
            character.currentImage = 0;
        }

        if (!character.introLongIdleDone) {
            CharacterAnimations.playLongIdleIntro(character, images);
        } else {
            CharacterAnimations.playLongIdleLoop(character, images);
        }
    }


    /**
     * Plays the intro part of the long idle animation.
     * Marks the intro as finished and switches to the looping part.
     *
     * @param {Character} character - The character instance
     * @param {string[]} images - Array of image paths for the long idle animation
     */
    static playLongIdleIntro(character, images) {
        const i = character.currentImage;
        const path = images[i];
        character.img = character.imageCache[path];
        character.currentImage++;

        if (character.currentImage >= images.length) {
            character.introLongIdleDone = true;
            character.currentImage = 10;
        }
    }


    /**
     * Plays the long idle animation in a loop.
     * Starts looping from a specific frame and repeats the idle sequence.
     *
     * @param {Character} character - The character instance
     * @param {string[]} images - Array of image paths for the long idle animation
     */
    static playLongIdleLoop(character, images) {
        const loopStart = 10;
        const loopEnd = images.length - 1;

        character.setOffset(125, 20);
        const i = character.currentImage;
        const path = images[i];
        character.img = character.imageCache[path];
        character.currentImage++;

        if (character.currentImage > loopEnd) {
            character.currentImage = loopStart;
        }
    }


    /**
     * Plays the normal attack animation.
     * Cycles through all attack images and stops when finished.
     *
     * @param {Character} character - The character instance
     * @param {string[]} images - Array of image paths for the attack animation
     */
    static playAttackAnimation(character, images) {
        if (character.sharkIsAttacking) {
            let i = character.currentImage % images.length;
            let path = images[i];
            character.img = character.imageCache[path];
            character.currentImage++;
            if (character.currentImage >= images.length) {
                character.sharkIsAttacking = false;
                character.world.keyboard.SPACE = false;
                character.currentImage = 0;
            }
        }
    }


    /**
     * Plays the bubble attack animation.
     * Updates frames only while the bubble attack is active.
     *
     * @param {Character} character - The character instance
     * @param {string[]} images - Array of image paths for the bubble attack animation
     */
    static playBubbleAttackAnimation(character, images) {
        if (!character.sharkIsBubbleAttacking) return;

        CharacterAnimations.initializeBubbleFrame(character);
        CharacterAnimations.updateBubbleFrame(character, images);
        CharacterAnimations.checkBubbleAttackComplete(character, images);
    }


    /**
     * Initializes the bubble animation frame counter.
     * Sets the frame to 0 if it is not defined yet.
     * @param {Character} character - The character instance
     */
    static initializeBubbleFrame(character) {
        if (character.currentBubbleFrame === undefined) {
            character.currentBubbleFrame = 0;
        }
    }


    /**
     * Updates the current frame of the bubble animation.
     * Sets the next image and moves to the next frame.
     *
     * @param {Character} character - The character instance
     * @param {string[]} images - Array of image paths for the bubble animation
     */
    static updateBubbleFrame(character, images) {
        const i = character.currentBubbleFrame;
        const path = images[i];
        character.img = character.imageCache[path];
        character.currentBubbleFrame++;
    }


    /**
     * Checks if the bubble attack animation is finished.
     * Resets the attack state and related values when the animation ends.
     *
     * @param {Character} character - The character instance
     * @param {string[]} images - Array of image paths for the bubble attack animation
     */
    static checkBubbleAttackComplete(character, images) {
        if (character.currentBubbleFrame >= images.length) {
            character.sharkIsBubbleAttacking = false;
            character.world.keyboard.D = false;
            character.currentBubbleFrame = 0;
        }
    }
}
