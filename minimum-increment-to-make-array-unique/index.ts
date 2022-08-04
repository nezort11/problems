function count(array: number[]) {
  const result: { [value: string]: number } = {};
  for (const value of array) {
    result[value] = (result[value] || 0) + 1;
  }
  return result;
}

function termial(num: number) {
  let result = 0;
  for (let i = 1; i <= num; i++) {
    result += i;
  }
  return result;
}

function minIncrementForUnique(nums: number[]) {
  const numsCount = count(nums);

  let result = 0;
  let endNum = -1;
  Object.entries(numsCount).map(([num, freq]) => {
    if (+num <= endNum) {
      // Add the difference
      result += (endNum - +num + 1) * freq;

      // Shift next end
      endNum += freq;
    } else {
      // Define next end
      endNum = +num + freq - 1;
    }

    if (freq > 1) {
      // Add the value frequency
      result += termial(freq - 1);
    }
  });

  return result;
}

// console.log(minIncrementForUnique([1, 1, 2]));
console.log(count([1, 1, 1, 1, 2, 3, 4]));
