/**
 * @param {number} x
 * @return {boolean}
 */
// var isPalindrome = function(x) {
//     const xs = String(x);
//     for (let i = 0; i < xs.length / 2; i++) {
//         if (xs[i] !== xs[xs.length - 1 - i]) {
//             return false;
//         }
//     }
//     return true;
// };

/**
123 => 321

1100 => 12
0011

121:
0b1111001

xor

0b0000110


121 => 121


bitwise:
- and
- or
- xor
- shift

math:
- module division %
- integer division

 */
// var isPalindrome = function(x) {
//     const xs = String(x);
//     for (let i = 0; i < xs.length / 2; i++) {
//         if (xs[i] !== xs[xs.length - 1 - i]) {
//             return false;
//         }
//     }
//     return true;
// };

function getNumLen(x) {
  let d = 1;
  let len = 0;
  while (x % d !== x) {
    d *= 10;
    len++;
  }
  return len;
}

// 121, 0 => 1
// 121, 1 => 2
// 121, 2 => 1
function getDigit(num, len, i) {
  const d = Math.pow(10, len - i);
  const d2 = d / 10;
  const modulo = num % d;
  return Math.floor(modulo / d2);
}

var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }

  const len = getNumLen(x);
  for (let i = 0; i < len / 2; i++) {
    if (getDigit(x, len, i) !== getDigit(x, len, len - 1 - i)) {
      return false;
    }
  }
  return true;
};
