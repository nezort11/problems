/**

- Diameter = max height of left + max height of right

1. Traverse the tree (iterate over nodes)
- recursion (DFS)
- queue
- stack (bottom to up)

Complexity:
- Algorithmic - O(n) - iterate over all nodes

- Space - O(n) - store recursive call stack for n calls
 */

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
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  if (!root) {
    return 0;
  }

  let maxDiameter = 0;
  // NO MEMOIZATION NEEDED
  var heightOfBinaryTree = function (root) {
    const leftHeigh = root.left ? 1 + heightOfBinaryTree(root.left) : 0;
    const rightHeigh = root.right ? 1 + heightOfBinaryTree(root.right) : 0;
    const height = Math.max(leftHeigh, rightHeigh);
    const diameter = leftHeigh + rightHeigh;
    if (diameter > maxDiameter) {
      // console.log('new diameter', diameter);
      maxDiameter = diameter;
    }
    // console.log('height', 'left', leftHeigh, 'right', rightHeigh, 'height', height);
    return height;
  };

  // void recursive height calculation procedure with diameter side effect
  heightOfBinaryTree(root);

  return maxDiameter;
};
