class Decomposition:
    """
    Decompose matrix into L and U matrices.
    """

    def __init__(self, values):
        """
        Convert matrix A to L/U.

        Store L/U in 1 matrix, as:

        (u11 u12 u13 u14)
        (l21 u22 u23 u24)
        (l31 l32 l33 u34)
        (l41 l42 l43 l44)
        """
        m, n = len(values), len(values[0])

        self.l = [[None] * n for _ in range(m)]
        self.u = [[None] * n for _ in range(m)]

        # Initial
        for i in range(0, m):
            # Elements in columns
            for j in range(0, n):
                self.u[i][j] = 0
                self.l[i][j] = 0
                self.l[i][i] = 1

        # Rows
        for i in range(0, m):
            # Elements in columns
            for j in range(0, n):
                if i <= j:
                    self.u[i][j] = values[i][j] - sum(
                        # [1, i - 1] = [1, i)
                        [self.l[i][k] * self.u[k][j] for k in range(i)]
                    )
                else:
                    self.l[i][j] = (
                        values[i][j]
                        # [1, j - 1] = [1, j)
                        - sum([self.l[i][k] * self.u[k][j] for k in range(j)])
                    ) / self.u[j][j]
