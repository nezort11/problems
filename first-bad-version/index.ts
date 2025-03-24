/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

/*

Binary search:

- recursion - BAD DECISION!! (too hard)

- imperative loop = while(...), for - x


Solve first, refactor later!


[0, 1, 2, 3, 4, 5, 6]

=> 3


[0, 1, 2]

*/

// var solution = function (isBadVersion: any) {
//   const findBadVersion = (n: number, start = 0): number => {
//     console.log("start", start, "n", n);
//     if (n === 1) {
//       return 0;
//     }

//     const middle = start + Math.floor(n / 2);
//     console.log("middle", middle);
//     if (isBadVersion(middle)) {
//       return findBadVersion(middle);
//     } else {
//       return middle + findBadVersion(start + n - middle - 1, middle + 1) + 1;
//     }
//   };

//   return findBadVersion;
// };

var solution = function (isBadVersion: any) {
  return function (n: number): number {
    let start = 0,
      end = n - 1;
    while (true) {
      const middle = start + Math.floor((end - start + 1) / 2);
      if (isBadVersion(middle)) {
        if (isBadVersion(middle - 1)) {
          end = middle - 1;
        } else {
          return middle;
        }
      } else {
        start = middle + 1;
      }
    }
  };
};

// var solution = function (isBadVersion: (version: number) => boolean) {
//   return function (n: number): number {
//     let start = 1,
//       end = n;
//     while (start < end) {
//       const middle = Math.floor(start + (end - start) / 2);
//       if (isBadVersion(middle)) {
//         end = middle; // Keep searching in the left half
//       } else {
//         start = middle + 1; // Move to the right half
//       }
//     }
//     return start;
//   };
// };

const find = solution((n) => n >= 1);

console.log(find(1));
