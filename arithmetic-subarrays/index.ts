function range(size: number, startAt = 0) {
  return [...Array(size)].map((_, i) => i + startAt);
}

function getCanBeRearrangedArithmetic(nums: number[]) {
  nums.sort((a, b) => a - b);
  const differences = range(nums.length - 1, 1).map(
    (i) => nums[i] - nums[i - 1]
  );
  return new Set(differences).size === 1;
}

function checkArithmeticSubarrays(nums: number[], l: number[], r: number[]) {
  return range(l.length).map((i) =>
    getCanBeRearrangedArithmetic(nums.slice(l[i], r[i] + 1))
  );
}

console.log(checkArithmeticSubarrays([4, 6, 5, 9, 3, 7], [0, 0, 2], [2, 3, 5]));
