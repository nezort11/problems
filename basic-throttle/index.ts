// This is a JavaScript coding problem from BFE.dev

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  let lastCalled = 0;
  return (...args) => {
    const currentTime = Date.now();
    if (currentTime - lastCalled >= wait) {
      lastCalled = currentTime;
      return func(...args);
    }
  };
}

const throttled = throttle((a) => console.log("hi", a), 1000);

throttled("a");
setTimeout(() => {
  throttled("b");
  throttled("c");
}, 2000);
