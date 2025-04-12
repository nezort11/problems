const count = (str: string) => {
  const counter = {};
  for (const c of str) {
    counter[c] = (counter[c] ?? 0) + 1;
  }
  return counter;
};

/**
 * Cases:
 * - ransomNote = "a", magazine = "b" => false
 * - ransomNote = "aa", magazine = "ab" => false
 * - ransomNote = "aa", magazine = "aab" => true
 * - randomNote = "", magazine = "a" => never
 *
 * Algorithm:
 *
 * - count letters in magazine
 * { "a": 3, "b": 2 }
 *
 * - count letters in ransomNote
 * { "a": 2, "b": 1 }
 *
 * - Compare counters
 *
 * Complexity:
 * - Algorithmic - O(n) + O(m) + O(n) = O(n + m + n) = O(n + m)
 * - Space
 *  - xxO(n) + O(n) = 2O(n) = O(n)xx
 *  - O(26) + O(26) = O(1)
 */
function canConstruct(ransomNote: string, magazine: string): boolean {
  const magazineCount = count(magazine);
  const ransomNoteCount = count(ransomNote);

  for (const noteLetter in ransomNoteCount) {
    const noteLetterCount = ransomNoteCount[noteLetter];
    const magazineLetterCount = magazineCount[noteLetter];
    if (noteLetterCount <= magazineLetterCount) {
      continue;
    } else {
      return false;
    }
  }

  return true;
}
