/**
 * @param {character[][]} grid
 * @return {number}
 */
/**

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Input: grid = [
  ["1","1","0","0","0"],
  ["1","0","1","0","1"],
  ["0","0","1","0","1"],
  ["0","0","1","1","1"]
]
Output: 3

  ["1","1",   ,   ,   ],
  ["1",   ,"1",   ,"1"],
  [   ,   ,"1",   ,"1"],
  [   ,   ,"1","1","1"]

Approach:

(1) DFS + visited + counter when non-first-visited

N - number of cells in grid
Time: O(N) - in worst case will visit all cells
Space: O(N) - in worst case all cells are islands

Check left-right neighboards , because will be iterating from top left

{
    0_0: 0,
    0_1: 0,
    1_0: 0,
    1_1: 0

    2_2: 1,


}


 */
var numIslands = function (grid) {
  const visited = new Set();
  let count = 0;

  const visit = (row, col) => {
    // is out of bounds
    if (
      row < 0 ||
      row > grid.length - 1 ||
      col < 0 ||
      col > grid[0].length
    ) {
      return;
    }
    // not a graph node
    if (grid[row][col] !== "1") {
      return;
    }
    // was already visited
    if (visited.has(`${row},${col}`)) {
      return;
    }

    visited.add(`${row},${col}`);
    // recursively visit neighboar nodes
    visit(row, col + 1);
    visit(row + 1, col);
    visit(row, col - 1);
    visit(row - 1, col);
  };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const i = grid[row][col];
      if (i === "1" && !visited.has(`${row},${col}`)) {
        count++;
        visit(row, col);
      }
    }
  }

  return count;
};
