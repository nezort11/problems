// 1) brute force - O(n^2)
// hash map? cache computation
// grouping and merging graph
// O(n) = greedy!

function* range(start: number, stop: number, step = 1) {
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}

// const normalizeGas = (gases: number[]) => {

// }

const sameSigns = (a: number, b: number) => {
  return a >= 0 === b >= 0;
};

// function canCompleteCircuit(gas: number[], cost: number[]): number {
//   const gasLeft = new Array(gas.length);
//   let totalGasLeft = 0;
//   for (const index of range(0, gas.length)) {
//     gasLeft[index] = gas[index] - cost[index];
//     totalGasLeft += gasLeft[index];
//   }

//   if (totalGasLeft < 0) {
//     return -1;
//   }

//   console.log(gasLeft);

//   // group profit gases by value sign
//   const gases: { index: number; value: number }[] = [];
//   let gasIndex = 0;
//   for (const index of range(0, gasLeft.length)) {
//     const gas = gasLeft[index];

//     if (index !== 0) {
//       const prevGas = gasLeft[index - 1];
//       if (!sameSigns(prevGas, gas)) {
//         gasIndex += 1;
//       }
//     }

//     if (gases[gasIndex] === undefined) {
//       gases[gasIndex] = { index: index, value: 0 };
//     }
//     gases[gasIndex].value += gas;
//   }

//   // concat same sign gases (in circle)
//   const lastGas = gases[gases.length - 1];
//   if (sameSigns(gases[0].value, lastGas.value)) {
//     gases[0].index = lastGas.index;
//     gases[0].value += lastGas.value;
//     gases.pop();
//   }

//   console.log(gases);

//   return 0;
// }

// const absIndex = (index: number, length: number) => {
//   if (index < 0) {
//     return length + index;
//   } else {
//     return index;
//   }
// };

// O(n) greedy - 4 ms Beats 36.32%
function canCompleteCircuit(gas: number[], cost: number[]): number {
  let startStationIndex = 0;
  let endStationIndex = 0;
  let tripTank = gas[0] - cost[0];

  while (true) {
    console.log(startStationIndex, endStationIndex, tripTank);
    // startStationIndex is either 0 or negative
    if (gas.length + startStationIndex - endStationIndex === 1) {
      if (tripTank < 0) {
        return -1;
      } else {
        return startStationIndex && gas.length + startStationIndex;
      }
    }

    // if we are in debt - move backwards
    if (tripTank < 0) {
      startStationIndex -= 1;
      tripTank += gas.at(startStationIndex) - cost.at(startStationIndex);
    }
    // if we are in profit - move forwards
    else {
      endStationIndex += 1;
      tripTank += gas.at(endStationIndex) - cost.at(endStationIndex);
    }
  }
}

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));

console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3]));

console.log(canCompleteCircuit([3, 1, 1], [1, 2, 2]));

console.log(canCompleteCircuit([5, 1, 2, 3, 4], [4, 4, 1, 5, 1]));

console.log(canCompleteCircuit([4, 5, 3, 1, 4], [5, 4, 3, 4, 2]));
