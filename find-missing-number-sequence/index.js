/**
 * @param {number[]} numbers
 * @return {number}
 *
 * Cases:
 * - [1, 3, 0] => 2 (0, 1, 2, 3)
 * - [1] => 0
 * - [3, 0, 4, 2, 1] => 5
 * - [0] => 1
 * - [] => never
 * - [0, 3] => never
 * - [3] => never
 */
// export default function findMissingNumberInSequence(numbers) {
//   const numberSet = new Set();
//   // O(n)
//   for (const num of numbers) {
//     numberSet.add(num);
//   }

//   // O(n + 1) => O(n)
//   for (const n = 0; n <= numbers.length; n += 1) {
//     if (numberSet.has(n)) {
//       continue;
//     } else {
//       return n;
//     }
//   }

//   return; // never
// }

var missingNumber = function (numbers) {
  let missingNumber = 0;
  for (let i = 0; i < numbers.length; i++) {
    missingNumber += i + 1 - numbers[i];
  }
  return missingNumber;
};
