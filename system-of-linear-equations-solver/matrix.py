from copy import deepcopy
from itertools import chain
from typing import List


class Matrix:
    def __init__(self, values: List[List[int]]):
        # Assert matrix is matrix
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

    def __add__(self, other):
        pass

    def __sub__(self, other):
        pass

    def __mul__(self, other):
        """Matrix multiplication."""
        pass

    def det(self) -> int:
        if self.m == 2 and self.n == 2:
            return self[0, 0] * self[1, 1] - self[0, 1] * self[1, 0]

        # Recursive case
        return sum([e * self._alg_add(0, j) for j, e in enumerate(self[0])])

    def _minor(self, i, j) -> int:
        return exclude_ij(self, i, j).det()

    def _alg_add(self, i, j) -> int:
        if i + j % 2 == 0:
            return self._minor(i, j)
        else:
            return -self._minor(i, j)

    def norm(self):
        pass


def exclude_ij(m: Matrix, i: int, j: int) -> Matrix:
    """Return new matrix with excluded i-row and j-column."""
    new_values = []
    for row_i, row in enumerate(m.values):
        if row_i != i:
            new_values.append(row[:j] + row[j + 1 :])

    return Matrix(new_values)


def set_column(m: Matrix, j, c: List[int]):
    result = deepcopy(m)
    for i in range(0, result.m):
        result[i][j] = c[i]

    return result


class SquareMatrix(Matrix):
    def __init__(self, values: List[List[int]]):
        # Assert matrix is square matrix
        m = len(values)
        for row in values:
            assert len(row) == m

        self.values = deepcopy(values)


class NonSingularMatrix(SquareMatrix):
    def __init__(self, values: List[List[int]]):
        super().__init__(values)
        assert super().det() != 0
