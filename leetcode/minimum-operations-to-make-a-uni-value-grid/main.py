"""
Given the grid MxN of integers and integer x, determine:

1. Is it possible to bring all elements to the same value (equalize).
2. If possible, what is the minimum number of +x/-x operations to do that.
"""
from itertools import groupby


def all_equal(iterable):
    g = groupby(iterable)
    return next(g, True) and not next(g, False)


class Grid:
    def __init__(self, grid, x):
        self.grid = grid
        self.x = x

    def __iter__(self):
        for row in self.grid:
            for e in row:
                yield e

    values = property(lambda self: list(self))

    def _is_equalizable(self):
        """Determine whether grid can be uni-value."""
        return all_equal([e % self.x for e in self.values])

    def operations_to_equalize(self):
        """Return minimum number of operations to make uni-value grid."""
        if not self._is_equalizable():
            return -1

        n = 0
        values = self.values.copy()
        while not all_equal(values):
            avg = sum(values) / len(values)
            i, e = max(enumerate(values), key=lambda v: abs(avg - v[1]))
            if e < avg:
                values[i] += self.x
            else:
                values[i] -= self.x
            n += 1
        
        return n