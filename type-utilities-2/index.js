export function isArray(value) {
  return (
    isObject(value) && Object.getPrototypeOf(value) === Array.prototype
  );
}

export function isFunction(value) {
  return (
    isObject(value) && Object.getPrototypeOf(value) === Function.prototype
  );
}

export function isObject(value) {
  return (
    // ant values without Object.prototype but which type is "object"
    (typeof value === "object" && value !== null) ||
    // any values that have Object.prototype in it's prototype chain (Function, etc.)
    value instanceof Object
  );
}

export function isPlainObject(value) {
  return (
    // value that does not has prototype chain at all or only has Object.prototype in it
    typeof value === "object" &&
    value !== null &&
    (Object.getPrototypeOf(value) === null ||
      Object.getPrototypeOf(value) === Object.prototype)
  );
}
