from copy import deepcopy
from functools import cache
from typing import Union


class Matrix:
    """
    Class representing 2D matrix.
    """

    def __init__(self, values: list[list[Union[int, float]]]):
        # Assert list is in matrix form
        n = len(values[0])
        for row in values:
            assert len(row) == n

        self.values = deepcopy(values)

    def __getitem__(self, key):
        if isinstance(key, tuple):
            # Return element
            return self.values[key[0]][key[1]]
        elif isinstance(key, int):
            # Return row
            return self.values[key]

    @property
    def m(self):
        """Return number of matrix rows."""
        return len(self.values)

    @property
    def n(self):
        """Return number of matrix columns."""
        return len(self.values[0])

    def __len__(self):
        """
        Return number of rows in the matrix.
        """
        return self.m

    @cache
    def det(self) -> int:
        """
        Calculate matrix determinant.
        """
        # Base case
        if self.m == 2 and self.n == 2:
            return self[0, 0] * self[1, 1] - self[0, 1] * self[1, 0]

        # Recursive case
        return sum([e * self._alg_add(0, j) for j, e in enumerate(self[0])])

    def _alg_add(self, i, j) -> int:
        """
        Calculate ij algebraic addition of the matrix.
        """
        if i + j % 2 == 0:
            return self._minor(i, j)
        else:
            return -self._minor(i, j)

    def _minor(self, i, j) -> int:
        """
        Calculate ij minor of the matrix.
        """
        return exclude_ij(self, i, j).det()

    def __sub__(self, other):
        """
        Subtract 2 matrices.
        """
        assert self.m == other.m and self.n == other.n
        return Matrix(
            [[self[i, j] - other[i, j] for j in range(self.n)] for i in range(self.m)]
        )

    def norm(self) -> int:
        """
        Calculate the norm of the matrix.
        """
        return max([abs(e) for row in self.values for e in row])

    def __mul__(self, other):
        """Matrix by vector multiplication."""
        v = other[0]
        assert self.n == len(v)
        return Matrix(
            [sum([self[i, j] * v[j] for j in range(self.n)]) for i in range(self.m)]
        )

    def is_diagonally_dominant(self):
        # Go through the rows
        d_is_greater = False
        for i in range(self.m):
            d = self[i, i]
            o = sum(map(abs, self[i])) - abs(d) # E |e| without i-th
            if d > o:
                d_is_greater = True
            elif d == 0:
                continue
            else:
                return False

        return d_is_greater


def exclude_ij(m: Matrix, i: int, j: int) -> Matrix:
    """
    Return new matrix witout i-th row and j-th column.
    """
    new_values = []
    for row_i, row in enumerate(m.values):
        if row_i != i:
            new_values.append(row[:j] + row[j + 1 :])

    return Matrix(new_values)
