/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
Cases:
- [] => []
- [1] => [1]

- [1, 2] => [2, 1]
- [3, 2, 1] => [1, 2, 3]
- [1 -> 2 -> 3 -> 4 -> 5] => [5 -> 4 -> 3 -> 2 -> 1]

Mutation:
- mutate original nodes?

Complexity:
- Computational - O(n)

- Space
Result - O(n)
Space - O(1)
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head) {
    return null;
  }
  if (!head.next) {
    return head;
  }

  // 2+

  // tail
  let currentEl = { val: head.val, next: null }; // 1

  let nextCurrentEl = head.next; // 2

  while (nextCurrentEl !== null) {
    // recreate current node
    // link to previous node
    // save current node
    currentEl = { val: nextCurrentEl.val, next: currentEl }; // 2

    // create next current node
    nextCurrentEl = nextCurrentEl.next; // 3 or null

    // <iterate until next current node is null>
  }

  return currentEl;
};
