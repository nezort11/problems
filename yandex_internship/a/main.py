#
# This program determines whether you can make ai elements be equal
# by adding 1 to first k elements.
# And if you can, what is the min number of operations.
#

def can_equal(n, ai):
    # Check ascending sort order
    for i, _ in enumerate(ai):
        # Check bound element
        if i + 1 < n:
            # Check ascending pair
            if ai[i] > ai[i+1]:
                # Terminate a program
                return -1

    # Calculate number of operations
    return ai[-1] - ai[0]


if __name__ == '__main__':
    # Take input
    n = int(input())
    ai = list(map(int, input().split()))

    # Validate input
    assert 1 <= n <= 100_000, "Number of elements should be in [1, 100000]!"
    assert len(ai) == n, "Number of values not equal to n!"

    print(can_equal(n, ai))
