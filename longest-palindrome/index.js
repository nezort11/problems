/**
 * Cases:
 * - "abccccdd" => "dccaccd" => 7
 *
 * - "a" => "a" => 1
 *
 * - "aa" => 2
 *
 * - "Abc" => 1
 *
 * - "" => 0
 * - "aaa" => 3
 * - ""
 *
 * Palindrome:
 * start-to-end = end-to-start
 *
 * center - can be both 1, 3, 5, etc. and 2, 4, 6, 8
 * other - must be 2, 4, 6, 8, etc.
 *
 * so number of palindrome = number or even pairs + 1 (in center if exists)
 *
 * Complexity:
 * - computational - O(n)
 * - space - O(26 + 26) = O(1)
 */
function longestPalindrome(s) {
  const chars = {};
  for (const c of s) {
    chars[c] = (chars[c] ?? 0) + 1;
  }

  let charPairs = 0;
  let hasOddChar = false;
  for (const [char, count] of Object.entries(chars)) {
    charPairs = charPairs + Math.floor(count / 2);
    if (count % 2 === 1) {
      hasOddChar = true;
    }
  }

  return charPairs * 2 + (hasOddChar ? 1 : 0);
}
