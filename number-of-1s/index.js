/**
 * @param {number} n
 * @return {number}
 */
// var hammingWeight = function(n) {
//     let oneCount = 0;
//     const binStr = n.toString(2);
//     for (const c of binStr) {
//         if (c === '1') {
//             oneCount += 1;
//         }
//     }
//     return oneCount;
// };

var hammingWeight = function (n) {
  let oneCount = 0;
  let setBit = 1;
  while (setBit <= n) {
    if ((n & setBit) > 0) {
      oneCount += 1;
    }
    setBit *= 2;
  }
  return oneCount;
};

/**
Time: O(32 bits int) => O(1)
Space: O(1 + 1) => O(1)
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n !== 0) {
    count += 1;
    n &= n - 1;
  }
  return count;
};
