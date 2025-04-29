// copied from lib.es5.d.ts
declare interface Array<T> {
  myReduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  myReduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  myReduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;
}

// const Void = Symbol();
Array.prototype.myReduce = function (
  callback: any,
  initialValue = undefined
) {
  const initialValuePassed = arguments.length > 1;
  if (initialValue === undefined && this.length === 0) {
    throw new TypeError("no items nor initial value");
  }

  let accumulator = initialValuePassed ? initialValue : this[0];
  for (let i = initialValuePassed ? 0 : 1; i < this.length; i += 1) {
    const item = this[i];
    accumulator = callback(accumulator, item, i, this);
  }
  return accumulator;
};

// console.log([1,2,3].myReduce((sum, item) => sum + item));

const arr = [1];
const reducer = (a, b) => {
  return "" + a + b;
};
console.log("calling reduce");
console.log(arr.myReduce(reducer, undefined));
