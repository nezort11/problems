const square = (x) => x * x;
const times2 = (x) => x * 2;
const sum = (a, b) => a + b;

function compose2(...funcs) {
  if (funcs.length === 0) {
    throw new Error("no funcs passed");
  }

  return function (...args) {
    let result = undefined;
    for (let i = funcs.length - 1; i >= 0; i -= 1) {
      const func = funcs[i];
      if (i === funcs.length - 1) {
        result = func(...args);
      } else {
        result = func(result);
      }
    }

    return result;
  };
}

function compose(...funcs) {
  return function (...args) {
    return funcs.reduceRight((acc, f) => [f(...acc)], args)[0];
  };
}

console.log(compose(square, times2)(2) === square(times2(2)));
console.log(
  compose(square, times2, sum)(3, 4) === square(times2(sum(3, 4)))
);
// console.log(compose()(3, 4) === square(times2(sum(3, 4))));
console.log(compose(square, times2, sum)(3) === square(times2(sum(3))));
