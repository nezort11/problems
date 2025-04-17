/** Promisify
 *
 * Cases:
 *
 * - (url, options, callback) => async (url, options)
 * - (callback) => async ()
 * - () => error ? (length 0)
 * - (...args) => error? (length 0)
 */

/**
 * @callback func
 * @returns Function
 */
export default function promisify(func) {
  return function (...args) {
    const scope = this;

    return new Promise((resolve, reject) => {
      try {
        func.call(scope, ...args, (err, val) => {
          if (err) {
            reject(err);
          } else {
            resolve(val);
          }
        });
      } catch (error) {
        // incase function was inproperly called or sync thrown error
        reject(error);
      }
    });
  };
}
