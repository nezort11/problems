function* range(start: number, stop: number, step = 1) {
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}

const mapRomanToInt = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

function romanToInt(s: string): number {
  let sumInt = 0;
  for (const sIndex of range(0, s.length)) {
    const sDigit = s[sIndex];
    const sDigitNext = s[sIndex + 1];
    const sDigitValue = mapRomanToInt[sDigit];

    if (
      (sDigit === "I" && (sDigitNext === "V" || sDigitNext === "X")) ||
      (sDigit === "X" && (sDigitNext === "L" || sDigitNext === "C")) ||
      (sDigit === "C" && (sDigitNext === "D" || sDigitNext === "M"))
    ) {
      sumInt -= sDigitValue;
      continue;
    }
    sumInt += sDigitValue;
  }
  return sumInt;
}

console.log(romanToInt("III"));

console.log(romanToInt("LVIII"));

console.log(romanToInt("MCMXCIV"));
