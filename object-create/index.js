const isObject = (val) => {
  return (
    val instanceof Object || (typeof val === "object" && val !== null)
  );
};

/**
 * @param {any} proto
 * @return {object}
 */
function myObjectCreate(proto) {
  if (!isObject(proto)) {
    throw new TypeError("proto can not be primitive");
  }

  const o = {};
  o.__proto__ = proto;
  return o;
}
