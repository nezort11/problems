function* range(start: number, stop: number, step = 1) {
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i;
  }
}

// O(nlogn)
function hIndex(citations: number[]): number {
  const sortedCitations = citations.sort((a, b) => a - b); // toSorted
  console.log(sortedCitations);
  let h = 0;
  for (const citationIndex of range(0, sortedCitations.length, 1)) {
    const citation = sortedCitations[citationIndex];
    const citationsHad = sortedCitations.length - citationIndex;
    console.log(citationIndex, citation, citationsHad);
    h = Math.max(h, Math.min(citation, citationsHad));
    if (citation > citationsHad) {
      break;
    }
  }

  return h;
}

console.log(hIndex([3, 0, 6, 1, 5]));

// console.log(hIndex([1, 3, 1]));

// console.log(hIndex([1, 9, 10]));

// console.log(hIndex([100]));
