/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
/**

Approach:

1 BFS compare two leaves
- ?

2 Recursion
- compare left and right should be the same + compare same value

Time: O(n) - traverse all nodes
Space: O(n) - callstack size
 */
var isSameTree = function (p, q) {
  if (!p && !q) {
    return true;
  }
  // val or null
  if (p?.val !== q?.val) {
    return false;
  }
  return isSameTree(p?.left, q?.left) && isSameTree(p?.right, q?.right);
};
