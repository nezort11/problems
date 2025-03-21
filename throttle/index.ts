// https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/throttle

type ThrottleFunction<T extends any[]> = (...args: T) => any;

export default function throttle<T extends any[]>(
  func: ThrottleFunction<T>,
  wait: number
): ThrottleFunction<T> {
  let lastCalledAt = 0;
  return (...args: T) => {
    if (Date.now() - lastCalledAt <= wait) {
      return;
    }
    lastCalledAt = Date.now();
    return func(...args);
  };
}

// test("throttles delayed invocations", (done) => {
let i = 0;
const increment = throttle(() => {
  i++;
}, 100);

console.log(i);
increment();
console.log(i);
// expect(i).toBe(1);

setTimeout(() => {
  increment();
  // expect(i).toBe(1);
  console.log(i);
}, 25);

setTimeout(() => {
  increment();
  // expect(i).toBe(1);
  // done();
  console.log(i);
}, 50);
// });
