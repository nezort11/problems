# a = integer list
# i = a element indecies
# ai = every element in the a
# n = a length
# dict(i, S) = distance between i-th element and other
# k = length of elments in S
# f(i) = minimum distance with S
# S  = all possible combination of non i-th elements

def tuple_set(a, k):
    """
    Return set of unique item combination tuples.
    Set - position-less (order-independent) list

    :param a: list of elements
    :param k: number of element in tuple
    :return: set of item tuples (ex. {(1,2,3), (2, 2, 2)})
    """
    if k <= 0:
        return set()
    elif len(a) < k:
        return set()
    elif k == 1:
        return {*a}
    else:
        s = set()
        for i, ai in enumerate(a):
            left = a[i+1:]
            level_below = k - 1
            if level_below == 1:
                for c in tuple_set(left, level_below):
                    s.add((ai, c))
            else:
                for c in tuple_set(left, level_below):
                    s.add((ai,) + c)
        return s


def S(a, i, k):
    """
    Find unique set of a's elements (tuples) excluding i-th.
    1. exlude i-th element from a
    2. find all unique combinations

    :param a: element list
    :param i: exluding index
    :param k: number of element in tuple
    :return: item tuple set
    """
    a2 = a.copy()
    del a2[i]

    s = tuple_set(a2, k)
    return s


def dist(a, i, s):
    """Return distance between ai element and ajs elements."""
    return sum([abs(a[i] - aj) for aj in s])


def f(a, i, k):
    """Computes smallest distance between ai and possible sets."""
    return min([dist(a, i, s) for s in S(a, i, k)])


if __name__ == "__main__":
    # Take input
    nk_input = input()
    a_input = input()

    # Validate input
    try:
        # ValueError
        n, k = nk_input.split()
        a = a_input.split()
        # ValueError
        # TODO: research isnumeric, isdecimal, isalnum or isdigit
        n = int(n)
        k = int(k)
        a = list(map(int, a))
        # AssertionError
        assert 2 <= n <= 300_000 and 1 <= k < n
        assert len(a) == n
        assert all(map(lambda ai: 1 <= ai <= 10**9, a))
    except Exception:
        print("Input validating error!")
    else:
        print(*[f(a, i, k) for i, _ in enumerate(a)])
