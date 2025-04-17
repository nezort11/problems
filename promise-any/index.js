/** Promise.any
 *
 * Cases:
 * - [] => error([])
 * - [resolve 42, 3, error]
 * - [resolve 42, error] => 42
 * - [error, resolve 42, resolve 48, error] => 42
 * - [error, error, error] => error([error, error, error])
 *
 * - [error 100ms, error 50ms, error 10ms] => error [error, error, error]
 */

/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseAny(iterable) {
  const iterableLength = iterable.length;
  if (iterableLength === 0) {
    return Promise.reject(new AggregateError([]));
  }

  const errors = [];
  // errors.length is not reliable because can be with <empty> items
  let errorsCount = 0;
  return new Promise((resolve, reject) => {
    for (let iterIndex = 0; iterIndex < iterableLength; iterIndex += 1) {
      const iter = iterable[iterIndex];
      // wrap non-promise values in promise resolve
      const promise =
        iter instanceof Promise ? iter : Promise.resolve(iter);
      promise
        .then((result) => {
          // only first "resolve" value will be saved
          resolve(result);
        })
        .catch((error) => {
          errors[iterIndex] = error;
          errorsCount += 1;

          if (errorsCount === iterableLength) {
            reject(new AggregateError(errors));
          }
        });
    }
  });
}
