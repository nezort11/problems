interface Array<T> {
  myReduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue?: U
  ): U;
}

Array.prototype.myReduce = function (callbackFn, initialValue) {
  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator = initialValue;

  // Iterate only through own indices
  const properties = Object.getOwnPropertyNames(this);
  for (const property of properties) {
    const index = parseInt(property);
    if (isNaN(index)) {
      continue;
    }

    const item = this[index];
    if (accumulator === undefined) {
      accumulator = item;
      continue;
    }
    const result = callbackFn(accumulator, item, index, this);
    accumulator = result;
  }

  return accumulator;
};

console.log([1, 2, 3].myReduce((prev, curr) => prev + curr, 0)); // 6
console.log([1, 2, 3].myReduce((prev, curr) => prev + curr, 4)); // 10

console.log(["b", "c", "d"].myReduce((prev, curr) => curr + prev, ""));

console.log([1, 2, , , , 3].myReduce((prev, curr) => prev + curr)); // 6

console.log([].myReduce((prev, curr) => prev + curr)); // 6
