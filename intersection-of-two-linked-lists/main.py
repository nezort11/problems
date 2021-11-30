"""
Determine which node is shared between 2 other nodes (linked lists) (pointers).

Algorithms:
- store processed nodes (their ids) in the set
- and than check if new nodes are in there (O(1) to check for relativity)

- 0 if not intersection found (2 lists are at the end).
"""

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        processed = {headA}
        if headB in processed:
            return headB

        processed.add(headB)

        while True:
            if headA.next is None:
                if headB.next is None:
                    return

                # Check B
                if headB.next in processed:
                    return headB.next
                processed.add(headB.next)
                headB = headB.next
            else:
                # Check A
                if headA.next in processed:
                    return headA.next
                processed.add(headA.next)
                headA = headA.next

                if headB.next is not None:
                    # Check B
                    if headB.next in processed:
                        return headB.next
                    processed.add(headB.next)
                    headB = headB.next


if __name__ == "__main__":
    s = Solution()
    s.getIntersectionNode()

