/**
 * @param {string} s
 * @return {number}
 */
/**
Cases:

- "abcabcbb" => 3

1 = "a"

2? = "ab"
3? = "abc"
4? = "abca" => "bcab" => "cabc" => "abcb" => "bcbb"

Алгоритмы:
1. brute force
2. sliding window = 2 pointers (....[...]....)

Approach:
- инкрементирующийся поиск максимального числа c увелечением
- с шифтом вправо при возникновении дубликата

1.

- "bbbbb" => 1
- "pwwkew" => 3

- "" => 0
- "x" => 1
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length < 2) {
    return s.length;
  }

  // const substrCount = {
  //     [s[0]]: 1,
  // }
  const substrSet = new Set();
  substrSet.add(s[0]);
  let maxUniqueLength = 1;
  let startIndex = 0;
  for (let endIndex = 1; endIndex < s.length; endIndex += 1) {
    const endChar = s[endIndex];

    // add new char to substr
    // substrCount[endChar] = (substrCount[endChar] ?? 0) + 1;

    // check if sub str unique
    // let isSubstrUnique = true;
    // for (const countKey in substrCount) {
    //     const count = substrCount[countKey];
    //     if (count > 1) {
    //         isSubstrUnique = false;
    //         break;
    //     }
    // }
    // console.log('end char');
    while (substrSet.has(endChar)) {
      const startChar = s[startIndex];
      substrSet.delete(startChar);
      startIndex += 1;
    }
    substrSet.add(endChar);
    // console.log(startIndex, endIndex);

    maxUniqueLength = Math.max(maxUniqueLength, endIndex - startIndex + 1);

    // if (!isSubstrUnique) {
    //     // if not unique
    //     // remove char from substring and shift start index
    //     const startChar = s[startIndex];
    //     substrCount[startChar] = (substrCount[startChar] ?? 0) - 1;
    //     startIndex += 1;
    // } else {
    //     // if unique let it extend and update max length
    //     maxUniqueLength = Math.max(maxUniqueLength, endIndex - startIndex + 1);
    // }
  }

  return maxUniqueLength;
};
