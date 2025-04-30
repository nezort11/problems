// copied from lib.es5.d.ts
declare interface Array<T> {
  myMap<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];
}

Array.prototype.myMap = function (callback, callbackThis) {
  const len = this.length;
  const result = new Array(len);
  for (let i = 0; i < len; i += 1) {
    if (i in this) {
      const item = this[i];
      const mappedValue = callback.call(callbackThis, item, i, this);
      result[i] = mappedValue;
    }
  }

  return result;
};

console.log([1, 2, 3].myMap((num) => num * 2));
