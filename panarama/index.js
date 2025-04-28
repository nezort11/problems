// Вам задана строка, состоящая из пробелов и латинских букв.
// Строка называется панграммой, если она содержит каждую из 26 латинских
// букв хотя бы раз. Определите является ли строка панграммой.
const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function isPangram(text) {
  const charSet = new Set();
  for (const c of text.toLowerCase()) {
    if (
      // if (c.match(/^[a-z]$/)) {
      c.charCodeAt(0) >= "a".charCodeAt(0) &&
      c.charCodeAt(0) <= "z".charCodeAt(0)
    ) {
      charSet.add(c);
    }
  }
  return charSet.size === 26;
}

console.log(
  isPangram(`A pangram or holoalphabetic sentence is a sentence
using every letter of a given alphabet at least once.`)
); // => false

console.log(isPangram("Waltz, bad nymph, for quick jigs vex.")); // => true
