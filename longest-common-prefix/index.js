/**
 * @param {string[]} strs
 * @return {string}
 */

/**
Cases:
- strs = ["flower","flow","flight"] => "fl"
- strs = ["dog","racecar","car"] => ""
- strs = ["dog"] => "dog"
- strs = [] => ? null or ""
- strs = [""] => ""

Approach:

1. Iterate over strs and reduce/slice prefix:

N - length of strs
M - average length of strs[i]
* 1 < M < 200 => O(1)

- Time: O(N M) = O(N) * O(1) = O(N)
- Space: O(1)

save first str as largest prefix

iterate over all strs

iterate over str and compare chars

if equal continue iterating chars
if not equal stop/break and slice max prefix
 */
var longestCommonPrefix = function (strs) {
  let prefix = strs[0];
  for (let strIndex = 1; strIndex < strs.length; strIndex += 1) {
    const str = strs[strIndex];

    if (prefix.length > str.length) {
      // shorten prefix to be of str.length
      prefix = prefix.slice(0, str.length);
    }
    for (let charIndex = 0; charIndex < str.length; charIndex += 1) {
      if (prefix[charIndex] !== str[charIndex]) {
        // reduce prefix to be common with str
        prefix = prefix.slice(0, charIndex);
        break;
      }
    }

    if (prefix === "") {
      break;
    }
  }

  return prefix;
};
