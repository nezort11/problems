/**
 * @param {number[]} nums
 * @return {boolean}
 */
/**
Cases:
- [1, 2, 3] => false
- [1, 1, 1] => true
- [1] => false
- [] => false

Complexity:
- Algorithmic - O(n)
- Space - O(n)

Approash:
- Set (hash map)
 */
var containsDuplicate = function (nums) {
  if (nums.length < 2) {
    return false;
  }

  const numsSet = new Set();
  for (const num of nums) {
    if (numsSet.has(num)) {
      return true;
    } else {
      numsSet.add(num);
    }
  }

  return false;
};
