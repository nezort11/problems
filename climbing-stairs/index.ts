/**
 * Cases:
 * - n = 1 => 1
 * 1
 *
 * - n = 2 => 2
 * 1 + 1
 * 2
 *
 * - n = 3 => 3
 * 1 + 1 + 1
 * 1 + 2
 * 2 + 1
 *
 * - n = 4 => 5
 * 1 + 1 + 1 + 1
 * 1 + 1 + 2
 * 1 + 2 + 1
 * 2 + 1 + 1
 * 2 + 2
 *
 * - n = 5 => 8
 * 1 + 1 + 1 + 1 + 1
 * 1 + 1 + 1 + 2
 * 1 + 1 + 2 + 1
 * 1 + 2 + 1 + 1
 * 2 + 1 + 1 + 1
 * 1 + 2 + 2
 * 2 + 1 + 2
 * 2 + 2 + 1
 *
 * Complexity:
 * - Algorithmic
 * O(n - 2) = O(n)
 *
 * - Space
 * O(3) => O(1)
 */
function climbStairs(n: number): number {
  if (n <= 2) {
    return n;
  }

  let prev = 1;
  let current = 2;
  let prev_;
  for (let i = 3; i < n; i += 1) {
    // NOT WORKING:
    // (prev = current), (current = prev + current);

    prev_ = prev;
    prev = current;
    current = prev_ + current;

    // In-place (destructive assignment)
    // [prev, current] = [current, prev + current];
  }
  return prev + current;
  // return climbStairs(n - 2) + climbStairs(n - 1);
}

console.log(climbStairs(3));
console.log(climbStairs(4));
console.log(climbStairs(5));
