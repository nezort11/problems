/**

Cases:

- [1 , ... , 999] - start/end

Edge cases:

- overlap with left/right intervals
- no overlap between interval

- no overlap after last interval

- no overlap


Cases:

Find interval with nearest left index:
- [[10, 15], [20, 23]] , [12, 13]  => 0, 0
- [[10, 15], [20, 23]] , [12, 22]  => 0, 1
- [[10, 15], [20, 23]] , [17, 22]  => 0, 1
- [[10, 15], [20, 23]] , [24, 25]  => 1, 1
- [[10, 15], [20, 23]] , [1, 9]    => -1, -1
- [[10, 15], [20, 23]] , [1, 25]   => -1, 1

Find start/end indecies of intervals that intersect with new interval:
- [[10, 15], [20, 23]] , [12, 13]  => 0, 0 => splice
- [[10, 15], [20, 23]] , [12, 22]  => 0, 1
- [[10, 15], [20, 23]] , [17, 22]  => 1, 1
- [[10, 15], [20, 23]] , [24, 25]  => +inf, +inf
- [[10, 15], [20, 23]] , [1, 11]    => 0, 0 => splice
- [[10, 15], [20, 23]] , [1, 9]    => -inf, -inf => unshift
- [[10, 15], [20, 23]] , [1, 25]   => 0, 1


Algorithm:
- O(n) - linear search
- 2 Binary Search + merge - O log n


 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
const getIntervalIntersection = (intervals, newInterval) => {
  const firstInterval = intervals[0];
  if (newInterval[1] < firstInterval[0]) {
    return [-Infinity, -Infinity];
  }
  const lastInterval = intervals[intervals.length - 1];
  if (newInterval[0] > lastInterval[1]) {
    return [+Infinity, +Infinity];
  }

  let startIntervalIndex = 0;
  // if not outside first interval
  if (newInterval[0] > firstInterval[0]) {
    let startIndex = 0;
    let endIndex = intervals.length - 1;
    while (startIndex < endIndex - 1) {
      console.log(
        "startIntervalIndex: startIndex, endIndex",
        startIndex,
        endIndex
      );
      // Binary search
      const rangeLength = endIndex - startIndex + 1;
      const middleIndex = startIndex + Math.floor(rangeLength / 2);
      const middleInterval = intervals[middleIndex];

      if (newInterval[0] >= middleInterval[0]) {
        startIndex = middleIndex;
      } else {
        endIndex = middleIndex;
      }
    }

    console.log(
      "startIntervalIndex: startIndex, endIndex",
      startIndex,
      endIndex
    );
    // if (newInterval[0] >= startIndex) {
    const startInterval = intervals[startIndex];
    if (newInterval[0] <= startInterval[1]) {
      startIntervalIndex = startIndex;
    } else {
      startIntervalIndex = startIndex + 1; // endIndex
    }
    // } else {
    //     startIntervalIndex = startIndex - 1;
    // }
  }

  let endIntervalIndex = intervals.length - 1;
  // if not outside last interval
  if (newInterval[1] < lastInterval[1]) {
    let startIndex = 0;
    let endIndex = intervals.length - 1;
    while (startIndex < endIndex - 1) {
      console.log(
        "endIntervalIndex: startIndex, endIndex",
        startIndex,
        endIndex
      );
      // Binary search
      const rangeLength = endIndex - startIndex + 1;
      const middleIndex = startIndex + Math.floor(rangeLength / 2);
      const middleInterval = intervals[middleIndex];

      if (newInterval[1] >= middleInterval[1]) {
        startIndex = middleIndex;
      } else {
        endIndex = middleIndex;
      }
    }

    console.log(
      "endIntervalIndex: startIndex, endIndex",
      startIndex,
      endIndex
    );
    // if (newInterval[0] >= startIndex) {
    const endInterval = intervals[endIndex];
    if (newInterval[1] < endInterval[0]) {
      endIntervalIndex = startIndex;
    } else {
      endIntervalIndex = startIndex + 1; // endIndex
    }
    // } else {
    //     endIntervalIndex = startIndex - 1;
    // }
  }

  return [
    startIntervalIndex,
    Math.min(intervals.length - 1, endIntervalIndex),
  ];
};

var insert = function (intervals, newInterval) {
  if (intervals.length === 0) {
    return [newInterval];
  }

  // 1+

  intervals = [...intervals];

  const intersection = getIntervalIntersection(intervals, newInterval);
  console.log("intersection", intersection);

  if (intersection[0] === -Infinity) {
    intervals.unshift(newInterval);
  } else if (intersection[0] === Infinity) {
    intervals.push(newInterval);
  } else {
    const intersectionLength = intersection[1] - intersection[0] + 1;
    const startInterval = intervals[intersection[0]];
    const endInterval = intervals[intersection[1]];
    const mergedInterval = [
      Math.min(newInterval[0], startInterval[0]),
      Math.max(newInterval[1], endInterval[1]),
    ];
    intervals.splice(intersection[0], intersectionLength, mergedInterval);
  }

  return intervals;
};
