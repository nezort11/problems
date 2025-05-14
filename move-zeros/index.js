/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**

Approach:

1) Sort

Sort - Timesort/Quicksort (Chrome), Merge sort (Firefox)
Time: O(n logn)
Space: O(n)

= NO NEED TO SORT ONLY 0 should be moved

2) O(n) - ? = <2 pointers>

In-place = only can swap 2 values

e.g.

[0, 1, 2, 3, 4, 5, 12]

[12, 1, 2, 3, 4, 5, 0] = NO!

e.g. 1:
[0, 1, 2, 3, 4, 5, 12]
[1, 0, 2, 3, 4, 5, 12]
[1, 2, 0, 3, 4, 5, 12]
[1, 2, 3, 0, 4, 5, 12]
[1, 2, 3, 4, 0, 5, 12]
[1, 2, 3, 4, 5, 0, 12]
[1, 2, 3, 4, 5, 12, 0]

e.g. 2: [0,1,0,3,12]
[0,1,0,3,12]
[1,0,0,3,12]
[1,3,0,0,12]
[1,3,12,0,0]
 */
// var moveZeroes = function(nums) {
//     nums.sort((a, b) => {
//         if (a === 0) {
//             return +1;
//         }
//         if (b === 0) {
//             return -1;
//         }
//         return 0;
//     })
// };
var moveZeroes = function (nums) {
  if (nums.length <= 1) {
    return nums;
  }

  // [0,1,0,3,12]
  // [1,0,0,3,12]
  // [0,0,0,3,12]
  // [1,1,0,0,12]

  let ptr = 0;
  let i = 1;
  while (i < nums.length) {
    if (nums[ptr] !== 0) {
      ptr++;
      // if ptr crossed i
      if (ptr === i) {
        i++;
      }
      continue;
    }
    if (nums[i] === 0) {
      i++;
      continue;
    }

    // state:
    // nums[ptr] is 0
    // nums[i] is not 0

    nums[ptr] = nums[i];
    nums[i] = 0;
  }
};
