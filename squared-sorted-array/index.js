/**
 * @param {number[]} nums
 * @return {number[]}
 */
/**

Approach:

(1) Map + sort again = O(N logN)

1. map array to squared array - O(N)

2. sort squared array - O(N logN)

=
Time: O(N logN)
Space: O(N)

(2) ? in O(N) ? - in place squaring with 2 pointers = O(N)

1. map array to sorted array = O(N)

e.g. [-4,-1,0,3,10]
will become [16,1,0,9,100]

[...descending..., 0, ...acsending...]

2. sort basedon on square root
- because array may contain negative elements, which when squaring will become descending
will become

Algorithm: - 2 pointers

1
[16,1,0,9,100]
      ^
xxx find point of bending (el1 > el2 && el3 > el2) - ascending in left and right direction

find where (el1 < el2) is starting acsending
= i.e. [2]

Set pointers to [i and i+1]
Start moving pointers and putting smaller elements into new array

result = []

[16,1,0,9,100]
    ^ ^
    l r

result = [0]

[16,1,0,9,100]
    ^   ^
    l   r

result = [0, 1]

[16,1,0,9,100]
 ^      ^
 l      r


Edge cases:
- [-24,-8,-4,-1]

- [-24,-8,-4,-1]

 */
var sortedSquares = function (nums) {
  const result = new Array(nums.length);
  let middleIndex = undefined; // index of first non-negative element (in case no = out of array)
  for (let i = 0; i < nums.length; i++) {
    if (middleIndex === undefined && nums[i] >= 0) {
      middleIndex = i;
    }
    nums[i] *= nums[i];
  }
  middleIndex ??= nums.length;

  let i = 0;
  let left = middleIndex - 1;
  let right = middleIndex;
  while (left >= 0 || right < nums.length) {
    const l = nums[left] ?? Infinity; // Infinity - means out of bounds element
    const r = nums[right] ?? Infinity;
    // find the smallest element between two and shift it more
    // then compare again until both pointers are out of bounds
    if (l < r) {
      result[i] = l;
      left--;
    } else {
      result[i] = r;
      right++;
    }
    i++;
  }

  return result;
};
