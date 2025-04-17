/** Deep omit - 11m
 *
 * Cases:
 *
 * - 123, [b] => never
 * - [1, 2, 3], [c, d] => never
 *
 * - { a: 1, b: 2, c: 3}, [b] => { a: 1, c: 3}
 * - { a: 1, b: 2, c: 3}, [] => { a: 1, b: 2, c: 3}
 * - { }, [b, c, d] => { }
 *
 * - [{ a: 1, b: 2, c: 3}], [b] => [{ a: 1, c: 3}]
 *
 * - mutate? or return new?
 *
 * - recursive deep omit
 */

const isObject = (val) => {
  return typeof val === "object" && val !== null;
};

/**
 * @param {any} val
 * @param {Array<string>} keys
 * @returns any
 */
export default function deepOmit(val, keys) {
  if (!isObject(val)) {
    return val;
  }
  if (val instanceof Array) {
    return val.map((item) => deepOmit(item, keys));
  }

  const keysSet = new Set(keys);
  const result = {};
  for (const key in val) {
    if (keysSet.has(key)) {
      continue;
    }
    result[key] = deepOmit(val[key], keys);
  }

  return result;
}
