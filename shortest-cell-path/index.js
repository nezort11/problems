// https://www.tryexponent.com/practice/prepare/shortest-cell-path

function shortestCellPath(grid, sr, sc, tr, tc) {
  /**
	@param grid: integer[][]
	@param sr: integer
	@param sc: integer
	@param tr: integer
	@param tc: integer
	@return: integer
	*/

  const queue = [];
  const queue2 = [];
  const visited = new Set();

  queue.push([sr, sc]);

  const bounds = (r, c) => {
    if (r < 0 || c < 0 || r > grid.length - 1 || c > grid[0].length - 1) {
      return false;
    }
    if (visited.has(`${r}_${c}`)) {
      return false;
    }
    if (grid[r][c] === 1) {
      return true;
    }
    return false;
  };

  let pathLength = -1;
  while (queue.length > 0) {
    const cell = queue.pop();
    console.log("cell", cell);
    visited.add(`${cell[0]}_${cell[1]}`);

    if (bounds(cell[0] - 1, cell[1])) {
      queue2.push([cell[0] - 1, cell[1]]);
    }
    if (bounds(cell[0], cell[1] - 1)) {
      queue2.push([cell[0], cell[1] - 1]);
    }
    if (bounds(cell[0] + 1, cell[1])) {
      queue2.push([cell[0] + 1, cell[1]]);
    }
    if (bounds(cell[0], cell[1] + 1)) {
      queue2.push([cell[0], cell[1] + 1]);
    }

    if (cell[0] === tr && cell[1] === tc) {
      // if finish before queue is ended
      return pathLength + 1;
    }

    if (queue.length === 0) {
      console.log("reached end");
      pathLength += 1;
      queue.push(...queue2);
      queue2.length = 0;
    }
  }

  return -1;
}

// debug your code below
const grid = [
  [1, 1, 1, 1],
  [0, 1, 0, 1],
  [1, 1, 1, 1],
];
const sr = 0,
  sc = 0,
  tr = 2,
  tc = 0;

console.log(shortestCellPath(grid, sr, sc, tr, tc)); // 8
