/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
/**

Approach 1 - "brute force":

- k times iterate over all points to find the minimum distance to origin

= O(n * k) => O(n * n) => O(n^2)
* k <= n (!) => worst case k=n


Aproach 2:

- sort all poinst based on x/y => e.g. [[-4, -3], [-1, -2], [3, 7], [11, 12]]
O(n * log(n))

- sort all poinsta based on euclidian distance!!! => directly

not needed:
- binary search 2 points most closest to origin
O(long(n))

not needed - because already sorted:
- take closest points near origin - "two left/right pointers"
O(k)

 */

const calcEuclideanDistance = (x, y) => {
  // return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  return Math.pow(x, 2) + Math.pow(y, 2); // square root is extensive
};

// sort approach - O(N logN)
// var kClosest = function(points, k) {
//     // sort all points based on distance to origin
//     points.sort((point1, point2) =>
//         calcEuclideanDistance(point1[0], point1[1]) - calcEuclideanDistance(point2[0], point2[1]
//     ));
//     return points.slice(0, k);
// };

const distance = (point) => {
  return point[0] * point[0] + point[1] * point[1];
};

const heapifyDown = (heap, idx, weightFunction) => {
  let left = 2 * idx + 1;
  let right = 2 * idx + 2;
  let smallest = left;

  if (left >= heap.length) {
    return;
  }
  if (
    right < heap.length &&
    weightFunction(heap[left]) > weightFunction(heap[right])
  ) {
    smallest = right;
  }
  if (weightFunction(heap[idx]) > weightFunction(heap[smallest])) {
    const tempHeapIdx = heap[idx];
    heap[idx] = heap[smallest];
    heap[smallest] = tempHeapIdx;
    heapifyDown(heap, smallest, weightFunction);
  }
};

const heapPop = (heap, weightFunction) => {
  const smallestElementIndex = 0;
  const val = heap[smallestElementIndex];
  heap[smallestElementIndex] = heap.pop();
  heapifyDown(heap, smallestElementIndex, weightFunction);
  return val;
};

// min-heap approach - O(N + k log N) = O(k log N)
// k << N
var kClosest = function (points, k) {
  const pivot = Math.floor((points.length - 2) / 2);
  // build min-heap ~O(n)
  for (let i = pivot; i >= 0; i -= 1) {
    heapifyDown(points, i, distance);
  }

  const solution = [];
  for (let i = 0; i < k; i += 1) {
    solution.push(heapPop(points, distance));
  }

  return solution;
};
