/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
/**
Cases:

-


Approach:

(1)
- convert linked list into array
- iterate over array with 2 pointers

n - length of linked list
Time: O(n) + O(n) = O(n)
Space: O(n) - for array of all elements

(2)
Time: O(N)
Space: O(1)

- Time: 3 * O(N)

e.g. [1 -> 2 -> 3 -> 2 -> 1]
[1, 2]
[1, 2, 3]

- determine linked list lengh

- (split) linked list into 2 linked lists

- edit nodes >= middle element index
[1, 2, 2, 1] => 4 / 2 => 2-nd index

[1 -> 2 -> 3 -> 2 -> 1]

prev ptr + ptr

prev ptr at [1] - set next to null

current ptr:
- save next to tempNext
- set next to prev
- set ptr to saved tempNext



[1 -> 2 -> 3 <- 2 <- 1]
=
start [1 -> 2 -> 3]
end [1 -> 2 -> 3]

- compare 2 linked lists - 2 iterations

- reverse linked list back into 1 (merge)

Time: O(n)
Space: O(1) - in place linked list modifications
 */
var isPalindrome = function (head) {
  let listLength = 0;
  let ptr = head;
  while (ptr) {
    listLength += 1;
    ptr = ptr.next;
  }
  if (listLength === 1) {
    return true;
  }

  const middleNodeIndex = Math.floor(listLength / 2);

  let prevPtr = head; // previous node
  ptr = head.next; // current node
  let nodeIndex = 1;
  while (ptr) {
    // save next ptr into temp var
    const nextPtr = ptr.next;

    if (nodeIndex === middleNodeIndex) {
      prevPtr.next = null;
      ptr.next = null;
    }
    if (nodeIndex > middleNodeIndex) {
      ptr.next = prevPtr;
    }

    // iterate
    prevPtr = ptr;
    ptr = nextPtr;
    nodeIndex += 1;
  }

  // *prevPtr now is tail (last node)
  const tail = prevPtr;

  ptr = head;
  let ptr2 = tail;
  while (ptr && ptr2) {
    if (ptr.val !== ptr2.val) {
      return false;
    }

    ptr = ptr.next;
    ptr2 = ptr2.next;
  }

  return true;
};
