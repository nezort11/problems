/**
 * A function in javascript has 3 roles;
 * 1. Constructor to create instance
 * How to trigger?
 * When use new keyword (new MyFunc())
 *
 * 2. Pure function
 * How to trigger?
 * Call directly (MyFunc())
 *
 * 3. Object
 * How to trigger?
 * Use property on the Function (MyFunc.prop1)
 */

/**
 *
 * super function object => SuperType prototype => Function prototype => Object prototype => Null prototype => null
 *
 * sub function object => SubType prototype => Function prototype => Object prototype => Null prototype => null
 *
 * SubType prototype => SuperType prototype => Function prototype => Object prototype => Null prototype => null
 */

function SuperType(name) {
  this.name = name;
  this.forSuper = [1, 2];
  this.from = "super";
}
SuperType.prototype.superMethod = function () {};
SuperType.prototype.method = function () {};
SuperType.staticSuper = "staticSuper";

function SubType(name) {
  this.name = name;
  this.forSub = [3, 4];
  this.from = "sub";
}
SubType.prototype.subMethod = function () {};
SubType.prototype.method = function () {};
SubType.staticSub = "staticSub";

// const myExtends = (SuperClass, SubClass) => {
//   // class = constructor function
//   const ExtendedClass = function(...args) {
//     SuperClass.call(this, ...args);
//     SubClass.call(this, ...args);
//   }

//   // const instanceProto = SubClass.prototype;
//   // Object.setPrototypeOf(instanceProto, SuperClass.prototype);
//   // ExtendedClass.prototype = instanceProto;
//   Object.setPrototypeOf(SubClass.prototype, SuperClass.prototype);
//   ExtendedClass.prototype = SubClass.prototype;

//   // const staticProto = {...SuperClass, ...SubClass}; // Object.assign
//   Object.setPrototypeOf(ExtendedClass, SuperClass);

//   return ExtendedClass;
// }

const myExtends = (SuperClass, SubClass) => {
  const ExtendedClass = function (...args) {
    SuperClass.call(this, ...args);
    SubClass.call(this, ...args);
  };

  SubClass.prototype.__proto__ = SuperClass.prototype;
  // ExtendedClass.prototype.__proto__ = SubClass.prototype;
  ExtendedClass.prototype = SubClass.prototype;

  // required for SubClass.staticSub to work with SuperClass.sx taticSuper
  // SubClass.__proto__ = SuperClass;
  // ExtendedClass.__proto__ = SubClass;
  SuperClass.__proto__ = SubClass;
  ExtendedClass.__proto__ = SuperClass;

  return ExtendedClass;
};

const InheritedSubType = myExtends(SuperType, SubType);
console.log("InheritedSubType", typeof InheritedSubType, InheritedSubType);

console.log("Super static", SuperType.staticSuper);
console.log(InheritedSubType.prototype === SubType.prototype);
console.log(
  Object.getPrototypeOf(InheritedSubType) === SuperType.prototype
);
console.log(Object.getOwnPropertyNames(InheritedSubType));
console.log(Object.keys(InheritedSubType));
console.log(
  Object.getOwnPropertyNames(Object.getPrototypeOf(InheritedSubType))
);

console.log("stat", InheritedSubType.staticSuper);
console.log("stat", InheritedSubType.staticSub);

const instance = new InheritedSubType();

// // above should work (almost) the same as follows
// class SubType extends SuperType {}
// const instance = new SubType()
