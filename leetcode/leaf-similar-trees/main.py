"""
Binary tree traversal (depth-first search).
"""
from collections import deque
from pprint import pprint
from typing import Generator, List


class BTreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def traverse_binary_tree(root: BTreeNode) -> List[int]:
    """
    Depth-first search traversal.

    Get values of all nodes where left is None and right is None.
    """
    if root.left is None and root.right is None:
        return [root.val]

    left_values = []
    right_values = []

    if root.left is not None:
        left_values = traverse_binary_tree(root.left)

    if root.right is not None:
        right_values = traverse_binary_tree(root.right)

    return left_values + right_values


def depth_first_search(root: BTreeNode) -> Generator[int, None, None]:
    """
    Depth-first search traversal without datastructure.
    """
    if root is not None:
        if root.left is None and root.right is None:
            yield root.val

        yield from depth_first_search(root.left)  # Yield all yields
        yield from depth_first_search(root.right)  # Yield all yields


def bredth_treversal(root: BTreeNode):
    values = []
    level = deque([root])

    while level:
        n = level.popleft()
        if n.left is None:
            if n.right is None:
                values.append(n.val)
            else:
                level.append(n.right)
        else:
            if n.right is None:
                level.append(n.left)
            else:
                level.append(n.right)
                level.append(n.left)

    return values


# def are_leaf_similar(root1: BTreeNode, root2: BTreeNode) -> bool:
#     """Determine wheather 2 trees are leaf-similar."""
#     if root1.left is None and root1.right is None:
#         if root2.left is None and root2.right is None:
#             return root1.val == root2.val
#         else:
#             return False
#     else:
#         if root2.left is None and root2.right is None:
#             return False
#         else:
#             return


# def are_leaf_similar(root1: BTreeNode, root2: BTreeNode) -> bool:
#     """
#     Determine wheather 2 trees are leaf-similar.

#     Based on amount of leaves and their values using bredth traversal.
#     """
#     values1 = []
#     leaves1 = deque([root1])
#     values2 = []
#     leaves2 = deque([root2])

#     # While leaves exists (aren't empty)
#     while True:
#         node1 = leaves1.popleft()
#         node2 = leaves2.popleft()

#         # Traverse 1-st tree
#         if node1.left is None:
#             if node1.right is None:
#                 # Finial node
#                 values1.append(node1.val)
#             else:
#                 # Right node exists
#                 leaves1.append(node1.right)
#         else:
#             if node1.right is None:
#                 # Left node exists
#                 values1.append(node1.left)
#             else:
#                 # Both nodes exist
#                 leaves1.append(node1.right)
#                 leaves1.append(node1.left)

#         # Traverse 2-nd tree
#         if node2.left is None:
#             if node2.right is None:
#                 # Finial node
#                 values2.append(node2.val)
#             else:
#                 # Right node exists
#                 leaves2.append(node2.right)
#         else:
#             if node2.right is None:
#                 # Left node exists
#                 values2.append(node2.left)
#             else:
#                 # Both nodes exist
#                 leaves2.append(node2.right)
#                 leaves2.append(node2.left)

#         if leaves1:
#             if leaves2:
#                 continue
#             else:
#                 return False
#         else:
#             if leaves2:
#                 return False
#             else:
#                 break

#     if len(values1) != len(values2):
#         return False

#     for v1, v2 in zip(values1, values2):
#         if v1 != v2:
#             return False

#     return True


def are_leaf_similar(root1: BTreeNode, root2: BTreeNode) -> bool:
    """
    Determine wheather 2 trees are leaf-similar.

    Based on amount of leaves and their values using depth-first traversal.
    """
    return list(depth_first_search(root1)) == list(depth_first_search(root2))


if __name__ == "__main__":
    n9 = BTreeNode(val=4)
    n8 = BTreeNode(val=7)
    n7 = BTreeNode(val=8)
    n6 = BTreeNode(val=9)
    n5 = BTreeNode(val=2, left=n8, right=n9)
    n4 = BTreeNode(val=6)
    n3 = BTreeNode(val=1, left=n6, right=n7)
    n2 = BTreeNode(val=5, left=n4, right=n5)
    n1 = BTreeNode(val=3, left=n2, right=n3)
    n11 = n1

    n9 = BTreeNode(val=8)
    n8 = BTreeNode(val=9)
    n7 = BTreeNode(val=2, left=n8, right=n9)
    n6 = BTreeNode(val=4)
    n5 = BTreeNode(val=7)
    n4 = BTreeNode(val=6)
    n3 = BTreeNode(val=1, left=n6, right=n7)
    n2 = BTreeNode(val=5, left=n4, right=n5)
    n1 = BTreeNode(val=3, left=n2, right=n3)
    n12 = n1

    print(list(depth_first_search(n11)))
    print(list(depth_first_search(n12)))

    print(are_leaf_similar(n11, n12))
