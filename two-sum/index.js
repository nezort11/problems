/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/**
Approach:

(1) Brute force all combinations
Time: O(N^2)
Space: O(1)

(2) Find number to find by subtracing from target
e.g.

9 - 2 => 7?
9 - 7 => 2?
9 - 11 => -3?
 */
var twoSum = function (nums, target) {
  const numMap = {};
  for (let i = 0; i < nums.length; i++) {
    numMap[nums[i]] = i;
  }

  for (let i = 0; i < nums.length; i++) {
    const num2i = numMap[target - nums[i]];
    if (num2i !== undefined && num2i !== i) {
      return [i, num2i];
    }
  }
};

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
/**

(1) Hash map + pointer
Time: O(n)
Space: O(n)
lookup is O(1)

^ Your solution must use only constant extra space.
(WITHOUT HASH MAP)

(2) Binary search??
search is O(logn)

Time: O(n logn) - decreasing O(n logn)
Space: O(1)

(3) 2 pointers / sliding window
Time: O(n)
Space: O(1)

e.g.

1, 4, 5, 7, 11  => 9?

1
left = 1
rigth = 11
sum = 12 > 9 => decrease

2
left = 1
rigth = 7
sum = 8 < 9 => increase


 */
var twoSum = function (numbers, target) {
  let start = 0;
  let end = numbers.length - 1;
  while (numbers[start] + numbers[end] !== target) {
    const sum = numbers[start] + numbers[end];
    if (sum > target) {
      end--;
    } else {
      start++;
    }
  }
  return [start + 1, end + 1];
};
