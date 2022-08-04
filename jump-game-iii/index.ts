function canReach(
  arr: number[],
  start: number,
  visited = new Set<number>()
): boolean {
  // Fail exit
  if (start < 0 || start > arr.length - 1 || visited.has(start)) {
    return false;
  }
  // Success exit
  if (arr[start] === 0) {
    return true;
  }
  visited.add(start);

  // Recursion can reach left? otherwise can reach right?
  return (
    canReach(arr, start - arr[start], visited) ||
    canReach(arr, start + arr[start], visited)
  );
}

console.log(canReach([0, 0], 0));
