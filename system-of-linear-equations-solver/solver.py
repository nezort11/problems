from matrix import NonSingularMatrix, set_column


class Solver:
    """Solver of system of liner algebraic equations."""

    def __init__(self, a: NonSingularMatrix, b):
        """Init solver with the A matrix from equation:
        A * x = b
        """
        assert a.m == len(b)
        self.a = a
        self.b = b

    def cramer(self):
        """Solve using Cramer's rule."""
        return [
            set_column(self.a, j, self.b).det() / self.a.det()
            for j in range(0, self.a.n)
        ]
