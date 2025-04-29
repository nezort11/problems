/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
/**

Cases:
- [], 1 => return
- [1], 1 => [[1]
- []

Approach:

1 Map indecies to location

0 => [0, 0]
1 => [1, 0]
2 => [2, 0]
3 => [3, 0]
4 => [4, 0]
5 => [-0, 1]
6 => [-1, 1]
7 => [-2, 1]

rowIndex = index % 5 (rows count)
e.g. index = 6 => [1, 1] cell

1 = 6 % 5
1 = 6 // 5

but it should be [3, 1]

3 = 5 - (6 % 5) - 1
 */
Array.prototype.snail = function (rowsCount, colsCount) {
  if (this.length === 0) {
    return [];
  }
  if (rowsCount * colsCount !== this.length) {
    return [];
  }

  // create empty matrix
  const result = new Array(rowsCount);
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex += 1) {
    result[rowIndex] = new Array(colsCount);
  }

  for (let i = 0; i < this.length; i += 1) {
    let rowIndex = i % rowsCount;
    let colIndex = Math.floor(i / rowsCount);

    // if odd column then make in reverse direction
    if (colIndex % 2 === 1) {
      rowIndex = rowsCount - 1 - rowIndex; // reverse index from end
    }

    result[rowIndex][colIndex] = this[i];
  }

  return result;
};

/**
 * const arr = [1,2,3,4];
 * arr.snail(1,4); // [[1,2,3,4]]
 */
