# Subproblem of the problem C.

def set_sets(a, k):
    """
    Find unique combinations of list elements.
    Set is used for uniquness comparison.
    TODO: find computaional complexity (big-O)

    :param a: number list
    :param k: number of digits (list item)
    :return: set of unique number sets (ex. {{1, 2,3}})
    """
    # Ex. a = [1, 2]; k = 3
    if k <= 0:
        return None
    elif len(a) < k:
        return None
    # Ex. a = [1, 2, 3]; k = 3
    elif len(a) == k:
        return a
    # Ex. a = [1, 2, 3, 4, 5]; k = 3
    else:
        # Level (k) element indecies
        for i in range(0, len(n) - k + 1):
            pass


def tuple_set(a, k):
    """Return set of unique item combination tuples."""
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


def all_comb(a, k):
    """
    Not very efficient but simple algorithm.

    Return all possible combinations of items.

    :return: list of list of k elements (ex. [[1,2,3], [1, 2, 2], [1, 3, 2]]).
    """
    # N = number of sets = len(a)! factorial
    # when len(a) == k
    # or: len(a)! k times (ex. 5*4*3, k = 3)
    # product of len(n-1) k times

    # Unique cases
    # if k <= 0:
    #     print(1)
    #     return None
    # if k == 1:
    #     print(2)
    #     return a
    # if len(a) < k:
    #     print(3)
    #     return None
    # if len(a) == k:
    #     print(4)
    #     return [a]

    # Exception
    if k <= 0:
        # No such elements
        return []

    if len(a) < k:
        # No such elements
        return []

    # Recursion escape
    if k == 1:
        return a

    # Verbose implementation:
    # General (recursive) case
    s = []
    for i, ai in enumerate(a):
        # Items left for possible combinations
        # left = a.copy()
        # del left[i]
        left = a[i+1:]

        # Make more unique combinations by prepending element at the beginning
        if k - 1 == 1:
            for comb in all_comb(left, k - 1):
                # Make pair (of elements)
                s.append([ai, comb])
        else:
            for comb in all_comb(left, k - 1):
                # Extend (prepend element)
                s.append([ai] + comb)

    # Consise implementation:
    # s = [[ai, comb] if k - 1 == 1 else [ai] + comb
    #      for i, ai in enumerate(a)
    #      for comb in set_sets2(a[:i] + a[i+1:], k - 1)]

    return s


if __name__ == '__main__':
    # Unique 3-digit numbers
    a = [1, 1, 2, 2]
    k = 3
    # ss = all_comb(a, k)
    ss = tuple_set(a, k)
    from pprint import pprint
    pprint(ss)
