/**
 * @param {Function} constructor
 * @param {any[]} args - argument passed to the constructor
 * `myNew(constructor, ...args)` should return the same as `new constructor(...args)`
 */
// const myNew = (constructor, ...args) => {
//   const instanceThis = {};
//   instanceThis.constructor = constructor;
//   const constructorInstance = instanceThis.constructor(...args);
//   delete instanceThis.constructor; // constructor.call(instanceThis, ...args);
// //   Object.setPrototypeOf(instanceThis, constructor.prototype);
//   instanceThis.__proto__ = constructor.prototype;
//   return constructorInstance || instanceThis;
// };
const myNew = (Constructor, ...args) => {
  const instance = Object.create(Constructor.prototype);
  const result = Constructor.apply(instance, args);
  return result === Object(result) ? result : instance;
};

function BigFrontEnd(name) {
  this.name = name;
}
BigFrontEnd.prototype.code = function () {};
BigFrontEnd.prototype.answer = function () {};
BigFrontEnd.prototype.design = function () {};

const obj = myNew(BigFrontEnd, "dev");

console.log("name", obj.name);
console.log("code", obj.code);
console.log("answer", obj.answer);
console.log("constructor", obj.constructor);

// expect(obj.name).toBe('dev')
// expect(obj.code).toBe(BigFrontEnd.prototype.code)
// expect(obj.answer).toBe(BigFrontEnd.prototype.answer)
// expect(obj.design).toBe(BigFrontEnd.prototype.design)
// expect(Object.getPrototypeOf(obj)).toBe(BigFrontEnd.prototype)
