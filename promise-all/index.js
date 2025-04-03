/*
primise all funciton

should return a new Prmoise

if there are no promises inside `iterable` then return iterable directly
[1, 2, 3, 4] => [1, 2, 3, 4]

if there are promise inside `iterable` only iterate inside of them
and return non-promises directly
[promise, 1, promise, 2, 3] => [value, 1, value, 2, 3]

in case any of promises goes into `catch` block it should reject with that exception
<ThrowenException>

- no way to cancel other promises...

if case all of the promises resolve to `then` then it should return the result

how to know all of the promies have been resolved?
=> create a counter that
*/

/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const result = [];
    let pendingPromiseCount = 0;
    iterable.forEach((item, index) => {
      if (item instanceof Promise) {
        pendingPromiseCount += 1;
        item
          .then((value) => {
            result[index] = value;
            pendingPromiseCount -= 1;
            // last promise has finished
            if (pendingPromiseCount === 0) {
              resolve(result);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        result[index] = item;
      }
    });

    if (pendingPromiseCount === 0) {
      resolve(result);
    }
  });
}
