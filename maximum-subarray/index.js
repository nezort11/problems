/**
Cases:

- [-2,1,-3,4,-1,2,1,-5,4] => [4,-1,2,1] => 6

- [1] => [1] => 1

- [5,4,-1,7,8] => [5,4,-1,7,8] => 23

- [-1, -2, -3] => -1

- [-1, -2, -3, 0] => 0
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let maxSum = nums[0];
  let currentSum = 0;

  for (let i = 0; i < nums.length; i += 1) {
    const num = nums[i];
    currentSum += num;

    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
    if (currentSum < 0) {
      currentSum = 0;
    }
  }

  return maxSum;
};
