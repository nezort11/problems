function countHillValley(nums: number[]) {
  // Remove all flat places in mountain
  const unflatNums = nums.filter((num, i) => {
    if (nums[i + 1] === num) {
      return false;
    }
    return true;
  });

  let count = 0;
  for (let i = 2; i <= unflatNums.length; i++) {
    const a = unflatNums[i - 2];
    const b = unflatNums[i - 1];
    const c = unflatNums[i];

    // Check hill or valley
    if ((a < b && c < b) || (a > b && c > b)) {
      count += 1;
    }
  }

  return count;
}

