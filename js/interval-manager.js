/**
 * Centralized interval registry.
 *
 * All gameplay intervals should go through this class rather than calling
 * `setInterval` directly. This gives us two things for free:
 *   1. A single pause check — callbacks are skipped while `gamePaused` is true.
 *   2. A bulk teardown on restart (`IntervalManager.clearAll()`), which
 *      prevents timers from the previous round leaking into the new one.
 */
class IntervalManager {
    static intervals = new Set();

    /**
     * Schedule a pause-aware interval.
     * @param {() => void} fn - Callback invoked every tick while the game is running.
     * @param {number} ms - Tick interval in milliseconds.
     * @returns {number} The interval id (can be passed to `IntervalManager.clear`).
     */
    static setInterval(fn, ms) {
        const id = setInterval(() => {
            if (typeof gamePaused !== 'undefined' && gamePaused) return;
            fn();
        }, ms);
        this.intervals.add(id);
        return id;
    }

    /**
     * Clear a single interval previously registered via `setInterval`.
     * @param {number} id
     */
    static clear(id) {
        clearInterval(id);
        this.intervals.delete(id);
    }

    /**
     * Tear down every registered interval. Call this before starting a new round.
     */
    static clearAll() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals.clear();
    }
}
