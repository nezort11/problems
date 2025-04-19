/**
 * @param {Object} obj
 * @return {Object}
 */
/**
 * Cases:
 *
 * - { a: { b: null, c: undefiend }} =>
 * {a.b: null, a.c: undefined}
 *
 * - { g: 123, "a.b": 23, a: { b: 132, c: false }} =>
 * { g: 123, a.b: 132, a.c: false }
 *
 * - { a: 42, foo: 89 }
 *
 * - [1, { a: 'hi' }, 3] => never?
 * { 0: 1, 1.a: hi, 2: 3 }
 *
 * - { foo: { '': { '': 1 bar: 2 } } } =>
 * { foo: 1, foo.bar: 2 }
 * *empty string = root
 *
 *
 * Approach:
 *
 * - check if object or array?
 *
 * - recursive squashing
 *
 * - joining, delete object
 */

const isObject = (val) => {
  return typeof val === "object" && val !== null;
};

// obj = plain obj or array
export default function squashObject(obj) {
  const result = {}; // always obj > array

  for (const key in obj) {
    const val = obj[key];

    if (isObject(val)) {
      const valObj = squashObject(val); // squashed obj

      // const objKey =
      for (const valObjKey in valObj) {
        let valKey;
        if (key === "" && valObjKey === "") {
          valKey = "";
        } else if (key === "") {
          valKey = valObjKey;
        } else if (valObjKey === "") {
          valKey = key;
        } else {
          valKey = `${key}.${valObjKey}`;
        }
        result[valKey] = valObj[valObjKey];
      }
    } else {
      result[key] = val;
    }
  }

  return result;
}
