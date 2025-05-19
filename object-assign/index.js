const isAnyObject = (val) =>
  (typeof val === "object" || typeof val === "function") && val !== null;

const isEnumerable = (val) => isAnyObject(val) || typeof val === "string";

function* getAllOwnProperties(obj) {
  for (const propertyName of Object.getOwnPropertyNames(obj)) {
    yield propertyName;
  }
  for (const propertyName of Object.getOwnPropertySymbols(obj)) {
    yield propertyName;
  }
}

/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError("target is null or undefined");
  }
  if (!isAnyObject(target)) {
    // wrap primitive in Object
    return Object(target);
  }

  for (const source of sources) {
    // ignore non-string primitives
    if (!isEnumerable(source)) {
      continue;
    }
    // in case source is always Iterable (Symbol.iterator)
    // for (const key of source) {
    //   target[key] = source[key]; // shallow copy every source property
    // }

    // iterate over all properties with enumerable: true flag - Object.getOwnPropertyDescriptors)
    for (const propertyKey of getAllOwnProperties(source)) {
      const propertyDescriptor = Object.getOwnPropertyDescriptor(
        source,
        propertyKey
      );
      if (propertyDescriptor.enumerable) {
        Object.defineProperty(target, propertyKey, propertyDescriptor);
      }
    }
  }
  return target;
}
