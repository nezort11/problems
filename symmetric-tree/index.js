/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
/**
Approach:

1. Recursive traversal (DFS)

- check that 2 nodes are mirror recursively
- Time: O(n)
- Space: O(n) - call stack size

*early return!!

2. BFS traversal

- Time: O(n)
- Space: O(n)

*late return

 */
var isSymmetric = function (root) {
  return areSymmetric(root.left, root.right);
};

function areSymmetric(left, right) {
  if (!left && !right) {
    return true;
  }
  if (left?.val !== right?.val) {
    return false;
  }

  return (
    areSymmetric(left.left, right.right) &&
    areSymmetric(left.right, right.left)
  );
}
