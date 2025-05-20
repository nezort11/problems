function* range(start: number, stop: number, step = 1) {
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}

// algo O(2n), space O(2n + n) - 25ms
// function productExceptSelf(nums: number[]): number[] {
//   const productStart = {};
//   const productEnd = {};
//   for (const numsIndex of range(0, nums.length)) {
//     const numStart = nums[numsIndex];
//     const prevProd = productStart[numsIndex - 1] ?? 1;
//     productStart[numsIndex] = prevProd * numStart;
//     const numsEndIndex = nums.length - 1 - numsIndex;
//     const numEnd = nums[numsEndIndex];
//     const nextProd = productEnd[numsEndIndex + 1] ?? 1;
//     productEnd[numsEndIndex] = nextProd * numEnd;
//   }
//   // console.log("productStart", productStart);
//   // console.log("productEnd", productEnd);
//   const productExcept = new Array(nums.length);
//   for (const numsIndex of range(0, nums.length)) {
//     const startProduct = productStart[numsIndex - 1] ?? 1;
//     const endProduct = productEnd[numsIndex + 1] ?? 1;
//     productExcept[numsIndex] = startProduct * endProduct;
//   }
//   return productExcept;
// }

// algo O(2n), space O(1 + n) - 25ms
// function productExceptSelf(nums: number[]): number[] {
//   const productExcept = new Array(nums.length);
//   for (const numsIndex of range(0, nums.length)) {
//     const numStart = nums[numsIndex];
//     const prevProd = productExcept[numsIndex - 1] ?? 1;
//     productExcept[numsIndex] = prevProd * numStart;
//   }
//   let productFromEnd = 1;
//   for (const numsIndex of range(nums.length - 1, -1, -1)) {
//     const prevNum = productExcept[numsIndex - 1] ?? 1;
//     productExcept[numsIndex] = prevNum * productFromEnd;
//     productFromEnd *= nums[numsIndex];
//   }

//   return productExcept;
// }

function restoringDivision(dividend: number, divisor: number) {
  let quotient = 0;
  let remainder = 0;

  // We use a 32-bit simulation (assume 32-bit integers for this example)
  for (let i = 31; i >= 0; i--) {
    // Shift remainder left by 1 and bring down the next bit of the dividend
    remainder = (remainder << 1) | ((dividend >> i) & 1);

    // Shift quotient left to make room for the next bit
    quotient <<= 1;

    // Subtract divisor if remainder is >= divisor
    if (remainder >= divisor) {
      remainder -= divisor;
      quotient |= 1; // Set the least significant bit of the quotient
    }
  }

  return quotient;
}

// O(n)
function productExceptSelf(nums: number[]): number[] {
  let product = 1;
  for (const num of nums) {
    product *= num;
  }

  const productExcept = new Array(nums.length);
  for (const numsIndex of range(0, nums.length)) {
    const num = nums[numsIndex];
    productExcept[numsIndex] = restoringDivision(product, num);
  }

  return productExcept;
}

console.log(productExceptSelf([1, 2, 3, 4]));

console.log(productExceptSelf([-1, 1, 0, -3, 3]));

/**
input:  arr = [8, 10, 2]
output: [20, 16, 80] # by calculating: [10*2, 8*2, 8*10]

input:  arr = [2, 7, 3, 4,]
output: [84, 24, 56, 42] # by calculating:


Approach:
(1) Brute force
Time: O(N^2)
Space: O(1)

- calculate all O(N-1) products

(2) O(N) without division

Space: O(2N) = O(N)

input:  arr = [2,      7,     3,    4,    8,     2,   4,     3]

leftProduct = [2,     14,     42,   168, 1344, 2688, 10752, 32256]

rightProduct = [32256, 16128, 2304, 768, 192,    24,  12,      3]

result = [...]

^


Edge cases:

input:  arr = [2]
output => [0]

input:  arr = []
output => []
 */

function arrayOfArrayProducts(arr) {
  if (arr.length === 1) {
    return [];
  }

  const leftProduct = new Array(arr.length);
  leftProduct[0] = arr[0];
  const rightProduct = new Array(arr.length);
  rightProduct[arr.length - 1] = arr[arr.length - 1];

  for (let i = 1; i < arr.length; i++) {
    leftProduct[i] = leftProduct[i - 1] * arr[i];
  }
  for (let i = arr.length - 2; i >= 0; i--) {
    rightProduct[i] = arr[i] * rightProduct[i + 1];
  }

  const result = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    const lp = leftProduct[i - 1];
    const rp = rightProduct[i + 1];
    // e.g. [2]
    // if (lp === undefined && rp === undefined) {
    //     result[i] = 0;
    //     continue;
    // }
    // e.g. [2, 3]
    result[i] = (lp ?? 1) * (rp ?? 1);
  }

  return result;
}
