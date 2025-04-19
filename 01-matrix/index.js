/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
/**
Approach:

1) Simpler - multiple iterations over matrix util all cells are computed
- O(n^2)

2) Hard - iterate only once over every cell - "like infection, spreading"
- O(n)

- if 0 => 0

- if 1 => check cells around and make Math.min of all dispances
- if cell near is not yet calculated - calculate
- to not get into the circular loop - dont request to compute the same cell twice

- if there is 0 cell near - then assign 0 to it
(there should be at least 0 cell in matrix)
- if there is no 0 cells around - ask to compute - and then do Math.min

- in result all cell in matrix should be computed

Approaches to "spread":

- recursion + state

- queue? = not possible cuz cant finish before computing other cells

- DFS, BFS

Cases:
[
    0
]

[
    0, 1
    0, 1
]

[
    0, 1, 0     0, 1, 0
    0, 1, 1 =>  0, 1, 1
    0, 1, 1     0, 1, 2
]
 */
// var updateMatrix = function (mat) {
//   // create same-size empty matrix
//   const outputMat = new Array(mat.length);
//   for (let i = 0; i < outputMat.length; i += 1) {
//     outputMat[i] = new Array(mat[i].length);
//   }
//   console.log(outputMat, outputMat.length, outputMat[0].length);

//   const getCell = (m, i, j) => {
//     if (i < 0 || i > m.length - 1) {
//       return Infinity;
//     }
//     if (j < 0 || j > m[i].length - 1) {
//       return Infinity;
//     }
//     return m[i][j];
//   };

//   const computeCellDistance = (i, j) => {
//     console.log(outputMat, i, j);
//     // memoized output cell
//     const outputCell = getCell(outputMat, i, j);
//     if (outputCell !== undefined) {
//       // if (outputCell === -1) {
//       //     // is currently blocked
//       //     return Infinity;
//       // } else {
//       return outputCell;
//       // }
//     }

//     const cell = getCell(mat, i, j);
//     // is 0
//     if (cell === 0) {
//       outputMat[i][j] = 0;
//       return 0;
//     }
//     // out of bound
//     if (cell === Infinity) {
//       return Infinity;
//     }

//     let leftCell = getCell(mat, i, j - 1);
//     let rightCell = getCell(mat, i, j + 1);
//     let topCell = getCell(mat, i - 1, j);
//     let bottomCell = getCell(mat, i + 1, j);

//     // cell has 0 near? (flat search)
//     if (Math.min(leftCell, rightCell, topCell, bottomCell) === 0) {
//       outputMat[i][j] = 1;
//       return 1;
//     }

//     // near cells have 0 near?... etc. (recursive search)
//     // outputMat[i][j] = -1; // is currently blocked
//     outputMat[i][j] = Infinity; // is currently blocked

//     leftCell = computeCellDistance(i, j - 1);
//     outputMat[i][j] = Math.min(outputMat[i][j], leftCell + 1);
//     rightCell = computeCellDistance(i, j + 1);
//     outputMat[i][j] = Math.min(outputMat[i][j], rightCell + 1);
//     topCell = computeCellDistance(i - 1, j);
//     outputMat[i][j] = Math.min(outputMat[i][j], topCell + 1);
//     bottomCell = computeCellDistance(i + 1, j);
//     outputMat[i][j] = Math.min(outputMat[i][j], bottomCell + 1);

//     console.log(leftCell, rightCell, topCell, bottomCell);
//     // const minDistance = Math.min(leftCell, rightCell, topCell, bottomCell);
//     // if (minDistance === Infinity) {
//     //     console.log('minDistance is Infinity');
//     //     return computeCellDistance(i, j);
//     // }
//     // const distance = minDistance + 1;
//     // outputMat[i][j] = distance;
//     // return distance;
//     return outputMat[i][j];
//   };

//   let zeroIndex = [0, 0];
//   for (let i = 0; i < outputMat.length; i += 1) {
//     for (let j = 0; j < mat[i].length; j += 1) {
//       // computeCellDistance(i, j);
//       if (mat[i][j] === 0) {
//         zeroIndex = [i, j];
//         break;
//       }
//     }
//   }
//   computeCellDistance(...zeroIndex);
//   for (let i = 0; i < outputMat.length; i += 1) {
//     for (let j = 0; j < mat[i].length; j += 1) {
//       computeCellDistance(i, j);
//     }
//   }

//   // console.log('result', outputMat);
//   return outputMat;
// };

var updateMatrix = function (mat) {
  // create same-size empty matrix
  const outputMat = new Array(mat.length);
  for (let i = 0; i < outputMat.length; i += 1) {
    outputMat[i] = new Array(mat[i].length);
  }

  const priorityQueue = [];
  for (let i = 0; i < mat.length; i += 1) {
    for (let j = 0; j < mat[i].length; j += 1) {
      const cell = mat[i][j];
      if (cell === 0) {
        outputMat[i][j] = 0;
        priorityQueue.push([i, j]);
      }
    }
  }

  const computeCell = (i, j, val) => {
    // skip if out of bounds
    if (i < 0 || i > mat.length - 1) {
      return;
    }
    if (j < 0 || j > mat[i].length - 1) {
      return;
    }

    const outputVal = outputMat[i][j];
    // prevent duplicate cells in queue
    if (outputVal === undefined) {
      outputMat[i][j] = val;
      priorityQueue.push([i, j]);
    }
  };

  while (priorityQueue.length > 0) {
    const cell = priorityQueue.shift();

    const val = outputMat[cell[0]][cell[1]];
    // compute cells around the cell
    computeCell(cell[0] - 1, cell[1], val + 1);
    computeCell(cell[0] + 1, cell[1], val + 1);
    computeCell(cell[0], cell[1] - 1, val + 1);
    computeCell(cell[0], cell[1] + 1, val + 1);
  }

  return outputMat;
};
