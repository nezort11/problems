/** https://leetcode.com/problems/3sum

Purpose of problem to reduce from O(n^3) to O(n^2) ?!?!
- impossible to solve in O(n logn)

Подход:

- (1) Brute force -
Time: O(N^3)
Space: ?

- (2)
nums = [-1,0,1,2,-1,-4]

-4, -1, -1 , 0 , 1 , 2

to sum up to = 0:
- equal negative = equal positive

- if have 0 => similar numbers e.g. -2 and 2 , -4 and 4

^ pointer + check have zero (in Set)

Time: O(N)
iteratve over negative nums:
- check if have abs(num) positive => push to result

if dont have 0 =>
- find 2 positive and 1 negative = 0
- find 2 negative and 1 positive

^ 2 pointers  + hashmap

(1) 2 Pointers ~ brute force all possible combinations

- add all numbers to set/hash map  - O(n)
- iterate over n in nums

[-2, ..., 0, ... 2]
- check if have 0 in nums => check if have -n in nums => add to result -n, 0, n

[-2, ... -1, ..., 3]
- if not have 0
- check if have abs(-2 + -1) in set (have 3?)


(1) Brute force - combinations of all <3 numbers that sum up to 0>
Time: O(~n^3  / 2)
Space: O(n)

(2) Sort O(n logn) + find?

Improve time complexity:
- linear - O(n)
or at least
- logorithmic - O(n logn)

[-1,0,1,2,-1,-4]


sort - O(n logn):
[-4, -1, -1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 12]

[-4, ..., 0, ..., 12]

12 =>
: 12 & -12 & 0
: 12 & -11 & -1
: 12 & -10 & -2
: 12 & -...

Cases:
-4 & 4 & 0

-4 & 7 & -3


{
    -4 : 1
    -1 : 2
    0 : 1
    1 : 1
    2 : 1
}

- if have 0 num
- if have some num 2+ times

negatives:
-4
-4 -1
-1 -1

positives:
1, 2
3

?**/

var threeSum = function (nums) {
  nums.sort((a, b) => a - b);

  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    // skip in case of duplicates
    if (i > 0 && num === nums[i - 1]) {
      continue;
    }

    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const sum = num + nums[l] + nums[r];
      if (sum > 0) {
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        res.push([num, nums[l], nums[r]]);
        l++;
        // shift l in case of duplicates
        while (nums[l] === nums[l - 1] && l < r) {
          l++;
        }
      }
    }
  }

  return res;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var threeSum = function(nums) {
//     const numSet = new Set();
//     let zeroCount = 0;
//     for (const num of nums) {
//         numSet.add(num);
//         if (num === 0) {
//             zeroCount++;
//         }
//     }

//     const result = new Set();
//     if (zeroCount >= 3) {
//         result.add('0_0_0');
//     }

//     const haveZero = numSet.has(0);
//     for (let numIndex = 0; numIndex < nums.length; numIndex++) {
//         const num = nums[numIndex];
//         if (num >= 0) {
//             continue;
//         }

//         // if (haveZero && numSet.has(Math.abs(num))) {
//         //     result.add(`${num}_0_${Math.abs(num)}`);
//         // }

//         for (let i = 0; i < nums.length; i++) {
//             const num2 = nums[i];
//             if (num2 === 0 || i === numIndex) {
//                 continue;
//             }
//             console.log('num, num2', num, num2);

//             if (numSet.has(-(num + num2))) {
//                 if (num2 < num) {
//                     result.add(`${num2}_${num}_${Math.abs(num + num2)}`);
//                 } else {
//                     result.add(`${num}_${num2}_${Math.abs(num + num2)}`);
//                 }
//             }
//         }
//     }

//     const result2 = [];
//     for (const key of result) {
//         result2.push(key.split('_').map(Number));
//     }
//     return result2;
// };
