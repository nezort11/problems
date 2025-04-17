/** Memoize
 *
 * (1) func => memoized func
 *
 * (2) func + this (this.n is accessed) (not pure function) => ?
 * (this = global scope)
 *
 * (3) memoize exceptional situation error =>  ?
 *
 * Apporaches:
 *
 * 1. O(n) iterate through cache array + deep equal (very slow)
 *
 * 2. JSON.stringify
 * Cons:
 * - objects keys are not sorted (should probably be the same)
 *
 * 3. Map
 * Cons:
 * - only does shallow equal (not working)
 *
 */

/**
 * @param {Function} func
 * @returns Function
 */
export default function memoize(func) {
  const cache = {};
  return function (...args) {
    const serializedArgs = JSON.stringify(args);
    if (serializedArgs in cache) {
      return cache[serializedArgs];
    }

    const result = func.call(this, ...args);
    cache[serializedArgs] = result;
    return result;
  };
}
