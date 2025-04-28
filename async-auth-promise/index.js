import asyncAuth from ".";

/**
 * `asyncAuth()` function receives a callback into which
 * an error may be passed (argument 1) or
 * data from backend (argument 2).
 *
 * You need to implement an `auth()` function
 * which executes `asyncAuth()`, but returns Promise.
 *
 * @returns {Promise}
 */
function auth() {
  return new Promise((resolve, reject) => {
    asyncAuth((error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
}

/**
 * `tryAuth()` function uses `auth()` and, in case of errors,
 * makes N additional attempts.
 *
 * @returns {Promise}
 */
function tryAuth(n) {
  if (n < 0) {
    return Promise.reject("No more attempts possible");
  }

  return new Promise((resolve, reject) => {
    auth()
      .then(resolve)
      .catch((error) => {
        if (n === 0) {
          reject(error);
        } else {
          tryAuth(n - 1)
            .then(resolve)
            .catch(reject);
        }
      });
  });
}
