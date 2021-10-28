# from collections import defaultdict
from collections import Counter


class BinaryTree:
    def __init__(self, n, left, right):
        self.n = n
        self.l = left
        self.r = right

    def is_valid(self):
        references_count = Counter(self.l + self.r)
        count_references_count = Counter(
            [references_count.get(i, 0) for i in range(self.n)]
        )
        if count_references_count.get(0, 0) != 1:
            return False

        for count in count_references_count:
            if count > 1:
                return False

        return True
