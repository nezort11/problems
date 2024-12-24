type Func = (arg: any) => any;

function pipe(funcs: Array<Func>): Func {
  return (arg) => {
    let result = arg;
    for (const func of funcs) {
      result = func(result);
    }
    return result;
  };
}

const times = (y) => (x) => x * y;
const plus = (y) => (x) => x + y;
const subtract = (y) => (x) => x - y;
const divide = (y) => (x) => x / y;

console.log(pipe([times(2), times(3)])(2));

console.log(pipe([times(2), plus(3), times(4)])(2));

console.log(pipe([times(2), subtract(3), divide(4)])(2));
