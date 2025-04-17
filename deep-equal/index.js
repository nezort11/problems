/** Deep equal
 *
 * Cases:
 *
 * - 1, 2 => false
 * - true, false => false
 * - 'abc', 'xyz' => false
 *
 * - { a: 1}, 1 => false
 * - false, [2, 3] => false
 * - [1, 2], [2, 3] => false
 * - {}, [] => false?
 * - { [0]: 7 }, [7] => ? (false)
 * - { a: 1 }, { a : 1 } => true
 * - { a: 1 }, { a : 2 } => false (different property value)
 * - { a: 1 }, { a : 1, b: 2 } => false (different object length)
 */

const isPrimitive = (value) => {
  return !(typeof value === "object" && value !== null);
};

const getObjectLength = (obj) => {
  if (obj instanceof Array) {
    return obj.length;
  } else {
    return Object.keys(obj).length;
  }
};

/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
  if (isPrimitive(valueA) || isPrimitive(valueB)) {
    return valueA === valueB;
  }

  // object, object
  if (Object.getPrototypeOf(valueA) !== Object.getPrototypeOf(valueB)) {
    return false;
  }
  if (getObjectLength(valueA) !== getObjectLength(valueB)) {
    return false;
  }

  for (const key in valueA) {
    const va = valueA[key];
    const vb = valueB[key];
    if (!deepEqual(va, vb)) {
      return false;
    }
  }

  return true;
}
