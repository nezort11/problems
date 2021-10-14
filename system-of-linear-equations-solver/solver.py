from typing import List

from decomposition import Decomposition
from matrix import NonSingularMatrix, set_column


class Solver:
    """Solver of system of liner algebraic equations."""

    def __init__(self, a: List[List[int]], b):
        """Init solver with the A matrix from equation:
        A * x = b
        """
        self.a = NonSingularMatrix(a)
        self.b = b

    def cramer(self):
        """Solve using Cramer's rule."""
        return [
            set_column(self.a, j, self.b).det() / self.a.det()
            for j in range(0, self.a.n)
        ]

    def lu_substitution(self):
        """Solves A * X = B equation.
        LU * X = B
        Y = U * X
        L * Y = B
        U * X = Y
        """
        d = Decomposition(self.a.values)

        y = []
        for i in range(len(self.a)):
            y.append(
                self.b[i]
                - sum(
                    # a21 * y1 + a22 * y2 + a23 * y3 = b2
                    d.l[i][j] * y[j]
                    for j in range(i)
                )
            )

        x = []
        # Iterate from the end
        for i in range(len(self.a)):
            ei = -i - 1
            x.append(
                # a21 * x1 + a22 * x2 + a23 * x3 = y2
                (y[ei] - sum([d.u[ei][j] * x[-j - 1] for j in range(ei + 1, 0)]))
                / d.u[ei][ei]
            )
        x.reverse()

        return x
