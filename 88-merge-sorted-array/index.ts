// import axios from "axios";
// import _ from "lodash";
// import moment from "moment";
// import BigNumber from "bignumber.js";

console.log("Hello, World2!");

/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  const nums3 = [];
  let i = 0;
  let j = 0;
  while (i + j < m + n) {
    const n1 = nums1[i];
    const n2 = nums2[j];
    console.log("i, j", i, j);
    if (j >= n) {
      nums3[i + j] = n1;
      i += 1;
    } else if (i >= m) {
      nums3[i + j] = n2;
      j += 1;
    } else if (j >= n || n1 <= n2) {
      nums3[i + j] = n1;
      i += 1;
    } else {
      nums3[i + j] = n2;
      j += 1;
    }
  }

  nums1.splice(0, nums1.length, ...nums3);
}

const nums1_ = [1, 2, 3, 0, 0, 0];
const m_ = 3;
const nums2_ = [2, 5, 6];
const n_ = 3;

merge(nums1_, m_, nums2_, n_);

console.log(nums1_);
