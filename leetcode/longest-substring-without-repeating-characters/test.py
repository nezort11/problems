"""
Compare first and second algorithms.
n1 = 1
Solution1:  0.14416010499999998
Solution2:  0.02623387299999999

n2 = 10
Solution1:  35.046323184
Solution2:  0.13966691699999956
"""
from solution1 import solution1
from solution2 import longest_unique_substring

from timeit import timeit

if __name__ == "__main__":
    s = "aabbeadacebfhybaiwnoimacuoqnoa"
    print("Solution1: ", timeit(lambda: solution1(s), number=100))
    print("Solution2: ", timeit(lambda: longest_unique_substring(s), number=100))

    s2 = s * 10
    print("Solution1: ", timeit(lambda: solution1(s2), number=100))
    print("Solution2: ", timeit(lambda: longest_unique_substring(s2), number=100))
