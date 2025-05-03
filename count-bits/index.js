/**
 * @param {number} n
 * @return {number[]}
 */
/**
Example 1:

Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10
Example 2:


Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:

0 --> 00 => 0/1

1 --> 01 => 1/1

2 --> 10 => 1/2
3 --> 11 => 2/2


4 --> 100 => 1/3. = [i - 2]
5 --> 101 => 2/3. = [i - 2]

6 --> 110 => 2/3. = [i - 4] + 1
7 --> 111 => 3/3. = [i - 4] + 1

[2-3] = [0-1] + [0-1]++
[4-7] = [2-3] + [2-3]++
[8-15] = [4-7] + [4-7]++
[16-31] = [8-15] + [8-15]++

8 --> 1000 => 1/4.   = [4] = [i - 4]
9 --> 1001 => 2/4.   = [5] = [i - 4]
10 --> 1010 => 2/4   = [6] = [i - 4]
11 --> 1011 => 3/4.  = [7] = [i - 4]

12 --> 1100 => 2/4.  = [4] + 1 =
13 --> 1101 => 3/4.  = [5] + 1
14 --> 1110 => 3/4   = [6] + 1
15 --> 1111 => 4/4.  = [7] + 1



16 --> 10000 => 1/5
17 --> 10001 => 2/5
18 --> 10010 => 2/5
19 --> 10011 => 3/5

20 --> 10100 => 2/5
21 --> 10101 => 3/5
22 --> 10110 => 3/5
23 --> 10111 => 4/5

24 --> 11000 => 2/5
25 --> 11001 => 3/5
26 --> 11010 => 3/5
27 --> 11011 => 4/5



0
    1   1       1               1                               1
            2       2   2           2   2       2
                            3               3       3   3
                                                            4


Approach

1. Count bits in every next number every time

2. Generate new based on previous - DYNAMIC PROGRAMMING

[2-3] = [1] + [1]++
[4-7] = [2-3] + [2-3]++
[8-15] = [4-7] + [4-7]++
[16-31] = [8-15] + [8-15]++
 */

// var countBits = function (n) {
//   if (n === 0) {
//     return [0];
//   }
//   if (n === 1) {
//     return [0, 1];
//   }

//   const result = [0, 1];
//   let size = 1;
//   while (true) {
//     let startIndex = result.length - size;

//     // copy size range
//     for (let i = startIndex; i < startIndex + size; i += 1) {
//       const nn = result[i];
//       result.push(nn);
//       if (result.length === n + 1) {
//         return result;
//       }
//     }
//     // copy and increment size range
//     for (let i = startIndex; i < startIndex + size; i += 1) {
//       const nni = result[i] + 1;
//       result.push(nni);
//       if (result.length === n + 1) {
//         return result;
//       }
//     }

//     size *= 2;
//   }
// };

var countBits = function (n) {
  const result = new Array(n + 1);
  result[0] = 0;

  let offset = 1;
  for (let i = 1; i < n + 1; i += 1) {
    if (offset * 2 === i) {
      offset = i;
    }
    result[i] = 1 + result[i - offset];
  }
  return result;
};
