/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  const promisesLength = promises.length;
  if (promisesLength === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    let settledCount = 0;
    const result = [];
    for (
      let promiseIndex = 0;
      promiseIndex < promisesLength;
      promiseIndex++
    ) {
      const promise = Promise.resolve(promises[promiseIndex]);
      promise
        .then((value) => {
          result[promiseIndex] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          result[promiseIndex] = { status: "rejected", reason };
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promisesLength) {
            resolve(result);
          }
        });
    }
  });
}
