console.log("hello, world");

function majorityElement(nums: number[]): number {
  const numsCounter: Record<number, number> = {};
  for (let num of nums) {
    numsCounter[num] = (numsCounter[num] ?? 0) + 1;
  }
  // Solution 1
  // const numsCounterEntries = Object.entries(numsCounter);
  // const numsCounterValues = Object.values(numsCounter);
  // const maxNumsValue = Math.max(...numsCounterValues);
  // const maxNumsValueKey = numsCounterEntries.find(
  //   (numsCounterEntry) => numsCounterEntry[1] === maxNumsValue
  // )!;
  // return +maxNumsValueKey[0];

  // Solution 2
  // return +Object.entries(numsCounter).reduce((acc, val) =>
  //   val[1] > acc[1] ? val : acc
  // )[0];

  // Solution 3
  return +(
    Object.entries(numsCounter)
      .sort((a, b) => a[1] - b[1])
      .at(-1)?.[0] ?? 0
  );
}

console.log(majorityElement([3, 2, 3]));
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));
