/**
 * @param {number[]} nums
 * @return {number}
 */
/** Single Number
Cases:
- nums = [2,2,1] => 1
- nums = [4,1,2,1,2] => 4
- nums = [1] => 1

Apporach:

create set to add all numbers

if number already appers in set
then delete it from set

at the end set should contain only 1 number!

N - size of nums
Time: O(N)
Space: O(N) in worst case
 */
// var singleNumber = function(nums) {
//     const numSet = new Set();
//     for (const n of nums) {
//         if (numSet.has(n)) {
//             numSet.delete(n); // delete duplicates - unique should be left
//         } else {
//             numSet.add(n);
//         }
//     }

//     // numSet.size MUST BE 1
//     // for (const n of numSet) {
//     //     return n;
//     // }
//     // return Array.from(numSet)[0];
//     // return [...numSet][0];
//     return numSet.values().next().value;
// };
var singleNumber = function (nums) {
  let res = 0;
  for (const n of nums) {
    res ^= n;
  }
  return res;
};
