function sumZero(n: number): number[] {
  let output = [];
  if (n % 2 !== 0) {
    output.push(0);
  }
  for (let i = 1; i <= ~~(n / 2); i++) {
    output.push(i, -i);
  }
  return output;
}

console.log(sumZero(5));
