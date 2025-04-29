const isObject = (val) => {
  return typeof val === "object" && val !== null;
};

/**
 * @param {any} obj
 * @param {target} target
 * @return {boolean}
 */
function myInstanceOf(obj, target) {
  if (!isObject(obj)) {
    return false;
  }
  if (typeof target !== "function") {
    throw new TypeError(
      "Right-hand side of 'instanceof' is not an object"
    );
  }
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === target.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

class A {}
class B extends A {}
const b = new B();
console.log(myInstanceOf(b, B)); // true
console.log(myInstanceOf(b, A)); // true
console.log(myInstanceOf(b, Object)); // true

function C() {}
console.log(myInstanceOf(b, C)); // false
C.prototype = B.prototype;
console.log(myInstanceOf(b, C)); // true
C.prototype = {};
console.log(myInstanceOf(b, C)); // false
