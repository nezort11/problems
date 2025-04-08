/** EventEmitter
 *
 * - event - string key/type of event
 * - handler - function that gets passed argument when event is emitted
 *
 *
 * - for any event there can be multiple handlers/listeners
 * - trying to subscribe the same handler/listener multiple times should result - one once subscribed
 *
 *
 * - for storing listeners for specific event i will use Record<string (event), Set (set of listeners)>
 * - storing inside class using private property
 *
 * Set => Array => Map
 *
 * - new Map()
 *
 */

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export has the same interface.

class EventEmitter {
  constructor() {
    this.eventListeners = {}; // Record<string, Map<listener, listenerCount>>
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    const listeners = this.eventListeners[eventName] ?? new Map();
    const listenerCount = listeners.get(listener) ?? 0;
    listeners.set(listener, listenerCount + 1);
    this.eventListeners[eventName] = listeners;
    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    const listenerCount = this.eventListeners[eventName]?.get(listener);
    if (listenerCount) {
      if (listenerCount === 1) {
        this.eventListeners[eventName].delete(listener);
      } else {
        this.eventListeners[eventName].set(listener, listenerCount - 1);
      }
    }
    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    if (
      this.eventListeners[eventName] &&
      this.eventListeners[eventName].size > 0
    ) {
      for (const [listener, listenerCount] of this.eventListeners[
        eventName
      ]) {
        for (let i = 0; i < listenerCount; i += 1) {
          listener(...args);
        }
      }
      return true;
    } else {
      return false;
    }
  }
}

console.log("Hello, World!");

const emitter = new EventEmitter();

function addTwoNumbers(a, b) {
  console.log(`The sum is ${a + b}`);
}
emitter.on("foo", addTwoNumbers);
emitter.emit("foo", 2, 5);
// > "The sum is 7"

emitter.on("foo", (a, b) => console.log(`The product is ${a * b}`));
emitter.emit("foo", 4, 5);
// > "The sum is 9"
// > "The product is 20"

emitter.off("foo", addTwoNumbers);
emitter.emit("foo", -3, 9);
// > "The product is -27"
