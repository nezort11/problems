// This is a JavaScript coding problem from BFE.dev

// class Curry extends Function {
//   private argList = [];

//   constructor(private func: Function) {
//     super("...args", "return this.call(...args)");
//     this.func = func;
//     return this.bind(this);
//   }

//   call() {
//     this.argList.push(...arguments);
//     return this.bind(this);
//   }

//   [Symbol.toPrimitive]() {
//     // return this.func.call(this, this.argList);
//     // return this.func(...this.argList);
//     return this.func.apply(this, this.argList);
//   }
// }

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
// any fn args size function
function curry(fn) {
  const argList = [];
  const curried = (...args) => {
    argList.push(...args);
    return curried;
  };
  curried[Symbol.toPrimitive] = () => {
    return fn(...argList);
  };
  return curried;
}

// static curried function args (does not work for ...args functions) without function statement, applys/etc, concat
// function curry(fn) {
//   const wrapper = (...args) => {
//     if (args.length >= fn.length) {
//       return fn(...args);
//     }
//     return (...args2) => {
//       return wrapper(...args, ...args2);
//     };
//   };
//   return wrapper;
// }

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
// const join = (...args) => {
//   return args.join("_");
// };
const curriedJoin = curry(join);
console.log(curriedJoin(1)(2, 3) + "");
console.log(curriedJoin(1, 2)(3)); // '1_2_3'
console.log(curriedJoin(1, 2, 3));

// const cu = new Curry(join);
// console.log(cu());
