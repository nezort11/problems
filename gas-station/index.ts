// 1) brute force - O(n^2)
// hash map? cache computation
// grouping and merging graph

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

function canCompleteCircuit(gas: number[], cost: number[]): number {
  const gasLeft = new Array(gas.length);
  let totalGasLeft = 0;
  for (const index of range(0, gas.length)) {
    gasLeft[index] = gas[index] - cost[index];
    totalGasLeft += gasLeft[index];
  }

  if (totalGasLeft < 0) {
    return -1;
  }

  console.log(gasLeft);

  // group profit gases by value sign
  const gases: { index: number; value: number }[] = [];
  let gasIndex = 0;
  for (const index of range(0, gasLeft.length)) {
    const gas = gasLeft[index];

    if (index !== 0) {
      const prevGas = gasLeft[index - 1];
      if (!sameSigns(prevGas, gas)) {
        gasIndex += 1;
      }
    }

    if (gases[gasIndex] === undefined) {
      gases[gasIndex] = { index: index, value: 0 };
    }
    gases[gasIndex].value += gas;
  }

  // concat same sign gases (in circle)
  const lastGas = gases[gases.length - 1];
  if (sameSigns(gases[0].value, lastGas.value)) {
    gases[0].index = lastGas.index;
    gases[0].value += lastGas.value;
    gases.pop();
  }

  console.log(gases);

  return 0;
}

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));

console.log(canCompleteCircuit([2, 3, 4], [3, 4, 3]));
