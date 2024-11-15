// JavaScript-version of Python range https://www.w3schools.com/python/ref_func_range.asp
function* range(start: number, stop: number | null, step = 1) {
  if (stop == null) {
    // one param defined
    stop = start;
    start = 0;
  }

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}

const justifyLine = (words: string[], maxWidth: number) => {
  if (words.length === 1) {
    return words[0].padEnd(maxWidth);
  }
  const wordsLength = words.reduce((acc, word) => acc + word.length, 0);
  const spacesNeededCount = maxWidth - wordsLength;
  const spacesBetweenCount = words.length - 1;
  const spacesQuotient = Math.floor(
    spacesNeededCount / spacesBetweenCount
  );
  const spacesRemainder = spacesNeededCount % spacesBetweenCount;

  let justifiedLine = words[0];
  for (const lineWordIndex of range(1, words.length)) {
    const lineWord = words[lineWordIndex];
    const lineWordsSpacesCount =
      spacesQuotient + (lineWordIndex <= spacesRemainder ? 1 : 0);
    const lineWordsSpaces = " ".repeat(lineWordsSpacesCount);
    justifiedLine += lineWordsSpaces + lineWord;
  }
  return justifiedLine;
};

function fullJustify(words: string[], maxWidth: number): string[] {
  let line = "";
  const lines: Array<string> = [];
  for (const wordIndex of range(0, words.length)) {
    const word = words[wordIndex] ?? "";
    console.log(word);
    if (line.length !== 0 && line.length + 1 + word.length > maxWidth) {
      lines.push(line);
      line = "";
    }
    line += (line ? " " : "") + word;
    if (wordIndex === words.length - 1) {
      lines.push(line.padEnd(maxWidth));
    }
  }

  const justifiedLines: Array<string> = [];
  for (const lineIndex of range(0, lines.length - 1)) {
    const line = lines[lineIndex];
    const lineWords = line.split(" ");
    const justifiedLine = justifyLine(lineWords, maxWidth);
    justifiedLines.push(justifiedLine);
  }
  justifiedLines.push(lines.at(-1)!);

  return justifiedLines;
}

// console.log(
//   fullJustify(
//     ["This", "is", "an", "example", "of", "text", "justification."],
//     16
//   )
// );

console.log(
  fullJustify(["Listen", "to", "many,", "speak", "to", "a", "few."], 6)
);

// console.log(
//   fullJustify(["What", "must", "be", "acknowledgment", "shall", "be"], 16)
// );

// console.log(
//   fullJustify(
//     [
//       "Science",
//       "is",
//       "what",
//       "we",
//       "understand",
//       "well",
//       "enough",
//       "to",
//       "explain",
//       "to",
//       "a",
//       "computer.",
//       "Art",
//       "is",
//       "everything",
//       "else",
//       "we",
//       "do",
//     ],
//     16
//   )
// );
