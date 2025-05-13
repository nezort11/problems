/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 */
function myFinally(promise, onFinally) {
  // return new Promise((resolve, reject) => {
  //   promise
  //     .then((value) => {
  //       Promise.resolve(onFinally())
  //         .then(() => resolve(value))
  //         .catch((finallyReason) => reject(finallyReason))
  //     })
  //     .catch((reason) => {
  //       Promise.resolve(onFinally())
  //         .then(() => reject(reason))
  //         .catch((finallyReason) => reject(finallyReason))
  //     })
  //     .catch((finallySyncReason) => {
  //       reject(finallySyncReason);
  //     })
  // });
  // return new Promise((resolve, reject) => {
  //   promise
  //     .then((value) => {
  //       return Promise.resolve(onFinally())
  //         .then(() => resolve(value))
  //     })
  //     .catch((reason) => {
  //       return Promise.resolve(onFinally())
  //         .then(() => reject(reason))
  //     })
  //     .catch((finallySyncReason) => {
  //       reject(finallySyncReason);
  //     })
  // });
  // return promise
  //     .then((value) => {
  //       return Promise.resolve(onFinally())
  //         .then(() => Promise.resolve(value));
  //     })
  //     .catch((reason) => {
  //       return Promise.resolve(onFinally())
  //         .then(() => Promise.reject(reason))
  //     });
  return promise
    .then((value) =>
      Promise.resolve(onFinally()).then(() => Promise.resolve(value))
    )
    .catch((reason) =>
      Promise.resolve(onFinally()).then(() => Promise.reject(reason))
    );
  // return promise
  //   .then(
  //     (value) => Promise.resolve(onFinally()).then(() => Promise.resolve(value)),
  //     (reason) => Promise.resolve(onFinally()).then(() => Promise.reject(reason))
  //   );
  // return promise.then(
  //   (value) => Promise.resolve(onFinally()).then(() => value),
  //   (reason) =>
  //     Promise.resolve(onFinally()).then(() => {
  //       throw reason;
  //     }),
  // );

  // try {
  //   await onFinally();
  //   return promise;
  // } catch(error) {
  //   throw error;
  // }
}
