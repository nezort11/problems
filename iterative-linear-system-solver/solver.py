from dataclasses import dataclass
from pprint import pprint
from typing import List, Union

import numpy as np

from decomposition import Decomposition
from matrix import Matrix


@dataclass
class Options:
    """Options passed to the Jacobi and Seidel methods."""

    repeat: bool = True
    max_iterations: int = 100
    accuracy: float = 1e-3


@dataclass
class Result:
    """Result of the iterative solving method."""

    x: list[float]
    error: list[float]
    iterations: int


class Solver:
    """Solver for system of liner algebraic equations."""

    def __init__(self, a: List[List[Union[int, float]]], b: List[Union[int, float]]):
        """
        Init solver with equation **input**:

        A * x = b
        """
        assert len(b) == len(a), "B should be the same size as A"

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

        Return x
        """

        def get_errors(
            a: Matrix, b: list[Union[int, float]], x: list[Union[int, float]]
        ) -> List[float]:
            """Calculate error to determine whether method is converging.

            Retrun error list for every equation in the system.
            """
            # Make x vector from list (for multiplication)
            vector_x = Matrix([x])
            ax = a * x

            return [
                # Error = difference between left and right of the equation
                sum(ax[i]) - b[i]
                for i in range(ax.m)
            ]

        assert self.a.m == self.a.n, "A must be a square matrix"

        # Check is diagonally dominant (convergable)
        assert self.a.is_diagonally_dominant()

        # X vector
        x_old = [0] * len(self.a)
        x_new = [None] * len(self.a)
        iteration = 0
        error_old = get_errors(self.a, self.b, x_old)  # initial iteration error
        print("Iteration:", iteration)
        pprint(x_old)

        while True:
            # Iterate over diagonal (iteration)
            for i in range(self.a.m):
                s = 0
                # Iterate over columns (items)
                for j in range(self.a.n):
                    # Skip diagonal
                    if j != i:
                        # Coefficient * older x
                        s += self.a[i, j] * x_old[j]

                x_new[i] = (self.b[i] - s) / self.a[i, i]

            x_old = x_new
            iteration += 1
            error_new = get_errors(self.a, self.b, x_old)
            print("Iteration:", iteration)
            pprint(x_old)

            if not options.repeat:
                break

            if iteration == options.max_iterations:
                break

            # Check accuracy (method converged)
            if all([error <= options.accuracy for error in error_new]):
                break

            # Method is stopped converging when is error stopped decressing)
            if not all([en < eo for en, eo in zip(error_new, error_old)]):
                break

            error_old = error_new

        return Result(x_old, error_old, iteration)

    def seidel(self, options: Options):
        """
        Solve linear system using Gauss-Seidel iterative method.
        """
        a = self.a.values
        m = len(a)
        b = self.b

        x = [0.0] * m
        iteration = 0
        converged = False

        while not converged and iteration != options.max_iterations:
            x_new = np.copy(x)
            for i in range(m):
                s1 = sum(a[i][j] * x_new[j] for j in range(i))
                s2 = sum(a[i][j] * x[j] for j in range(i + 1, m))
                x_new[i] = (b[i] - s1 - s2) / a[i][i]

            accuracy = np.sqrt(sum((x_new[i] - x[i]) ** 2 for i in range(m)))
            converged = accuracy <= options.accuracy
            x = x_new
            iteration += 1

        return Result(x_new, accuracy, iteration)
