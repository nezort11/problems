type ArrayValue = any | Array<ArrayValue>;

// reduce (too many heap allocation) vs imperative

export default function flatten(value: Array<ArrayValue>): Array<any> {
  // if (!Array.isArray(value)) {
  //   throw new TypeError("argument is not an Array");
  // }
  const flattenArr = [];
  for (const item of value) {
    if (Array.isArray(item)) {
      flattenArr.push(...flatten(item));
    } else {
      flattenArr.push(item);
    }
  }
  return flattenArr;
}

// Single-level arrays are unaffected.
console.log(flatten([1, 2, 3])); // [1, 2, 3]

// Inner arrays are flattened into a single level.
console.log(flatten([1, [2, 3]])); // [1, 2, 3]
console.log(
  flatten([
    [1, 2],
    [3, 4],
  ])
); // [1, 2, 3, 4]

// Flattens recursively.
console.log(flatten([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]
