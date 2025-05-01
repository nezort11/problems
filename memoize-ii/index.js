/**
 * @param {Function} fn
 * @return {Function}
 */
/**
Cases:

- args [2, 2] => calc
- args [2, 2] => memoized
- args [1, 3] => calc

- args [x, y, z] === args [x, y, z] cuz
x === x
y === y
z === z

Approach:

- shallow equal but one the argument-level
[2, 2] === [2, 2]

Map<x,
    Map<y,
        Map<z,
            Map<
                i: Map<...>
                Root: result>
            >
        >
    >
>

2 = Map
    > 2
        > 4
        > 9
    > 3?


*Map cache tree hierarchy

- Map, WeekMap

 */

const ROOT_VALUE = Symbol();

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    let mapIterator = cache;
    if (args.length === 0 && mapIterator.has(ROOT_VALUE)) {
      return mapIterator.get(ROOT_VALUE);
    }
    for (let argIndex = 0; argIndex < args.length; argIndex += 1) {
      const arg = args[argIndex];
      if (mapIterator.has(arg)) {
        mapIterator = mapIterator.get(arg);
      } else {
        break; // if arg is not present in cache object than is not cached
      }
      // if last argument
      if (argIndex === args.length - 1) {
        if (mapIterator.has(ROOT_VALUE)) {
          const cachedResult = mapIterator.get(ROOT_VALUE);
          return cachedResult;
        }
      }
    }

    const result = fn(...args);

    mapIterator = cache;
    if (args.length === 0) {
      mapIterator.set(ROOT_VALUE, result);
    }
    for (let argIndex = 0; argIndex < args.length; argIndex += 1) {
      const arg = args[argIndex];
      // console.log('arg2', arg);
      let submap;
      if (mapIterator.has(arg)) {
        submap = mapIterator.get(arg);
      } else {
        submap = new Map();
        mapIterator.set(arg, submap);
      }
      mapIterator = submap;

      // if last argument
      if (argIndex === args.length - 1) {
        mapIterator.set(ROOT_VALUE, result);
      }
    }

    return result;
  };
}

// let callCount = 0;
// const memoizedFn = memoize(function (a, b) {
//     callCount += 1;
//     return a + b;
// });
// memoizedFn(2, 3) // 5
// memoizedFn(2, 1) // 5
// memoizedFn(2, 3) // 5
// console.log(callCount) // 2
