from solver import Solver
from matrix import Vector


def get_matrix_from_file(filename):
    with open(filename) as f:
        return [
            list(map(eval, map(str.strip, line.split(",")))) for line in f.readlines()
        ]


def main():
    a = get_matrix_from_file("matrix.txt")
    b = [e for row in get_matrix_from_file("b.txt") for e in row]
    s = Solver(a, b)
    cramer = s.cramer()
    lu = s.lu_substitution()
    print(cramer)
    print(lu)
    print((Vector(cramer) - Vector(lu)).norm())


if __name__ == "__main__":
    main()
