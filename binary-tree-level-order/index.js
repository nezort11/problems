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
 * @return {number[][]}
 */
/**
Traverse level by level using BFS (queue):
Time: O(n)
Space: O(n)

 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }

  const result = [[root.val]];
  let queue = [root];
  let queue2 = [];
  while (queue.length > 0) {
    const node = queue.shift();

    if (node.left) {
      queue2.push(node.left);
    }
    if (node.right) {
      queue2.push(node.right);
    }

    if (queue.length === 0) {
      if (queue2.length === 0) {
        break;
      }
      queue = queue2;
      result.push(queue2.map((n) => n.val));
      queue2 = [];
    }
  }

  return result;
};
