from dataclasses import dataclass
from typing import List, Union

from decomposition import Decomposition
from matrix import Matrix


@dataclass
class Options:
    """Options passed to the Jacobi and Seidel methods."""

    repeat: bool = True
    max_iterations: int = 100
    accuracy: float = 1e-3


class Solver:
    """Solver for system of liner algebraic equations."""

    def __init__(self, a: List[List[Union[int, float]]], b: List[Union[int, float]]):
        """
        Init solver with equation **input**:

        A * x = b
        """
        assert len(b) == len(a)

        self.a = Matrix(a)
        self.b = b

    def lu_substitution(self):
        """
        Solves A * X = B equation.

        1. LU * X = B
        2. Y = U * X
        3. L * Y = B
        4. U * X = Y
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

    def jacobi(self, options: Options):
        """
        Solve linear system using Jacobi iterative method.

        A * x = b
        """
        assert self.a.m == self.a.n, "Must be square matrix."

        # TODO: check is diagonally dominant (for converging)

        # X vector
        x = [0] * len(self.a)

        # TODO: validate solution converging

    def seidel(self, options: Options):
        """
        Solve linear system using Gauss-Seidel iterative method.
        """
