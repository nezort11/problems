import _ from "lodash";

function findRightInterval(intervals: number[][]) {
  const sortedIntervals = _.sortBy(
    intervals.map((interval, initialIndex) => _.concat(interval, initialIndex)),
    (interval) => interval[0]
  );

  let result = new Array(intervals.length);
  for (let i = 0; i < sortedIntervals.length; i++) {
    const [, end, initialIndex] = sortedIntervals[i];
    result[initialIndex] = -1;
    for (let j = i; j < sortedIntervals.length; j++) {
      if (sortedIntervals[j][0] >= end) {
        result[initialIndex] = sortedIntervals[j][2];
        break;
      }
    }
  }
  return result;
}

console.log(
  findRightInterval([
    [3, 4],
    [2, 3],
    [1, 2],
  ])
);
