/**
Cases:

- ab#c = ac , ad#c = ac => true

- ab## = "", c#d# = "" => true

- s = "a#c" = c, t = "b" = b

Edge cases:

- s = "" , t = ""  => true
- s = "a" , t = "a"  => true
- s = "###" , t = "##"  => true
- s = "#####a" , t = "###a"  => true
- s = "a#######" , t = "a####"  => true

Approach:

1. 2 stacks
- push all characters into stacks
- pop in case "#" (backspace)
- compare size of stacks + compare every characters

Time: O(M) + O(N) + O(MN) = O(max(M N))
Space: 2 * O(MN) = O(2MN)

2. Reverse iteration and comparing

Time: O(M + N) = O(M N)
Space: O(1 + 1) = O(1)

e.g.   s = "ab#c", t = "ad#c"

start at end:
- ptr1 -> "c" and ptr2 -> "c"

if any of characters is "#" then need to increment backspace counter
and continue mooving left

if previously had any backspace count then need to skip this character and
decrement backspace count

if same letters than continue iterating left
- decerement both pointer s both by -1

if not same characters then
return false (break) - because not same already

repeat it all until one of the pointers reaches -1
(both are -1 => because still need to check if character with out of bounds)

if none of the strings have any more letters to the left then
return true (the same string)

if one of the strings still have some chars
then return false
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  if (s === t) {
    return true;
  }

  let sPtr = s.length - 1;
  let tPtr = t.length - 1;
  let sBackspaceCount = 0;
  let tBackspaceCount = 0;
  while (sPtr >= 0 || tPtr >= 0) {
    const sc = s[sPtr];
    const tc = t[tPtr];

    if (sc === "#") {
      sBackspaceCount += 1;
      sPtr -= 1;
      continue;
    }
    if (tc === "#") {
      tBackspaceCount += 1;
      tPtr -= 1;
      continue;
    }

    if (sBackspaceCount > 0 && sc !== undefined) {
      sBackspaceCount -= 1;
      sPtr -= 1;
      continue;
    }
    if (tBackspaceCount > 0 && tc !== undefined) {
      tBackspaceCount -= 1;
      tPtr -= 1;
      continue;
    }

    if (sc !== tc) {
      return false;
    } else {
      sPtr -= 1;
      tPtr -= 1;
      continue;
    }
  }

  return true;
};
