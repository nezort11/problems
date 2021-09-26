from math import factorial
from collections import Counter


def m_substrings(s, m):
    return [s[i : i + m] for i in range(0, len(s) - m + 1)]


def substrings_len(s):
    n = len(s)
    return n * (n + 1) / 2


def check_unique(ss):
    return len(Counter(ss)) == len(ss)


def solution1(s):
    """Find longest unique (without repeating characters) substring.
    Algorithmic complexity: O(n)."""
    n = len(s)

    # Find all possible substrings: O(n)
    substrings = []
    for m in range(1, n + 1):
        substrings += m_substrings(s, m)

    # Filter substrings: O(n^2)
    unique_substings = filter(check_unique, substrings)

    # Find longest substring: O(n)
    longest_unique_substring = max(unique_substings, key=lambda ss: len(ss))

    # print(longest_unique_substring)
    # print(len(longest_unique_substring))


if __name__ == "__main__":
    s = "aabbeadacebt"
    solution1(s)
