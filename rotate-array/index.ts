/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
  // Solution 1
  // const shiftIndex = nums.length - k;
  // nums.splice(
  //   0,
  //   nums.length,
  //   ...nums.slice(shiftIndex),
  //   ...nums.slice(0, shiftIndex)
  // );

  // Solution 1
  // for (let j = 0; j < k; j += 1) {
  //   let prevNum = nums[nums.length - 1];
  //   for (let i = 0; i < nums.length; i++) {
  //     const curNum = nums[i];
  //     nums[i] = prevNum;
  //     prevNum = curNum;
  //   }
  // }

  // Solution 2
  k = k % nums.length;
  for (let i = nums.length + k - 1; i >= 0; i -= 1) {
    nums[i] = nums.at(i - k)!;
  }
  nums.length = nums.length - k;
}

const nums1 = [1, 2, 3, 4, 5, 6, 7];
rotate(nums1, 3);
console.log(nums1);

const nums2 = [-1, -100, 3, 99];
rotate(nums2, 2);
console.log(nums2);
