from collections import deque


def exchange(coin):
    """Exchange 1 coin into 3 smaller coins."""
    return [coin//2, coin//3, coin//4]


def max_amount(n):
    """Return max amount of coins you can get via exchanging."""
    process_queue = deque([n])
    result = []

    while process_queue:
        coin = process_queue.popleft()
        if coin >= 12:
            process_queue.extend(exchange(coin))
        else:
            result.append(coin)

    return sum(result)


if __name__ == '__main__':
    while True:
        try:
            n = int(input())
            assert 0 <= n <= 10**9
        except (EOFError, ValueError, AssertionError):
            break
        print(max_amount(n))
