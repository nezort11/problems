/**

Cases:

- [1, 2, 3, 4, 5] => 3

- [1, 2, 3, 4, 5, 6] => 4

- [1, 2, 3] => 2

- [1, 2] => 2

- [1] => 1

- [] => never

Approach:

- determine linked list length - O(n)

- determine middle node index = Math.ceil(length / 2)

- find middle node with required index - O(n / 2) => O(n)

- return

 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  if (!head.next) {
    return head;
  }

  let listLength = 2;
  let nextNode = head.next; // 2
  while (
    nextNode.next // 3
  ) {
    nextNode = nextNode.next;
    listLength += 1;
  }
  // nextNode should be last node

  const middleIndex = Math.floor(listLength / 2);

  let nodeIndex = 1;
  nextNode = head.next;
  while (nodeIndex !== middleIndex) {
    nextNode = nextNode.next;
    nodeIndex += 1;
  }
  // nextNode should be middle node

  return nextNode;
};
