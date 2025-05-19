const isAnyObject = (val) =>
  (typeof val === "object" || typeof val === "function") && val !== null;

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function isEqual(a, b) {
  // primitives, objects, NaN, 0/-0
  if (Object.is(a, b)) {
    return true;
  }
  // no sense for deep equal if one or both are primitives
  if (!(isAnyObject(a) && isAnyObject(b))) {
    return false;
  }
  // if one of the values is array
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
    return false; // Object.prototype !== Array.prototype
  }

  const aKeys = Reflect.ownKeys(a);
  const bKeysLength = Array.isArray(b)
    ? b.length
    : Reflect.ownKeys(b).length;
  if (aKeys.length !== bKeysLength) {
    return false; // different number of keys
  }

  // iterate over property keys and symbols
  for (const key of aKeys) {
    const av = a[key];
    const bv = b[key];

    // if both values are circular to self
    if (a === av && b === bv) {
      continue;
    }
    // if one of the values is circular to self
    // if ((a === av) !== (b === bv)) {
    //   return false;
    // }

    if (!isEqual(av, bv)) {
      return false;
    }
  }

  return true;
}
