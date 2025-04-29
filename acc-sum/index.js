/**
 * @param {number} num
 */
// function sum(num) {
//   const arr = [];
//   const add = (n) => {
//     arr.push(n);
//     return add;
//   }
//   add[Symbol.toPrimitive] = (hint) => {
//     return arr.reduce((acc, val) => acc + val, 0);
//   }

//   add(num);
//   return add;
// }
function sum(num) {
  const f = (n) => sum(num + n);
  f[Symbol.toPrimitive] = () => num;
  return f;
}

const sum1 = sum(1);
console.log(+sum1);

const sum7 = sum1(6);
console.log(+sum7);

const sum8 = sum1(7);
console.log(+sum8);

const sum4 = sum1(3);
console.log(+sum4);

const sum11 = sum7(4);
console.log(+sum11);

console.log(sum1(2) == 3); // true
console.log(sum1(3) == 4); // true
console.log(sum(1)(2)(3) == 6); // true
console.log(sum(5)(-1)(2) == 6); // true
