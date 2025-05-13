/**
 * @param {Array | ArrayLike | Promise | Iterable | Observable} input
 * @return {Observable}
 */
function from(input) {
  // input is observerable-like object
  if ("subscribe" in input) {
    return input;
  }

  return new Observable((subscriber) => {
    // input is promise
    if (input instanceof Promise) {
      input
        .then((value) => subscriber.next(value))
        .catch((error) => subscriber.error(error))
        .finally(() => subscriber.complete());
      return;
    }

    // input is iterable
    if (input[Symbol.iterator]) {
      try {
        for (const item of input) {
          subscriber.next(item);
        }
      } catch (error) {
        subscriber.error(error);
      }
    }
    // input is Array-like object
    else if (typeof input.length === "number") {
      for (let i = 0; i < input.length; i++) {
        subscriber.next(input[i]);
      }
    }

    subscriber.complete();
  });
}
