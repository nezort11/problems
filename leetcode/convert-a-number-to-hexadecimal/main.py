from collections import deque


def dec_digit_to_hex(d):
    """
    Convert decimal numbers from [0, 15] to hexadecimal digit from [0, F]
    """
    if d < 10:
        return str(d)

    return chr(87 + d)


def positive_dec_to_hex(n: int):
    q: deque = deque()
    while True:
        if n < 16:
            q.appendleft(dec_digit_to_hex(n))
            break

        q.appendleft(dec_digit_to_hex(n % 16))
        n //= 16

    return "".join(q)


def dec_to_hex(n: int):
    if n == 0:
        return "0"

    # From 01..1 (first zero is 1 for negative) to 01...1
    assert -(2 ** 31) <= n <= 2 ** 31 - 1

    if n < 0:
        n = abs(n)  # get value
        n -= 1  # -1 will be saved as just 10...0 (two’s complement)
        n |= 2 ** 31  # set 32-th bit (negative sign)
        bits_31 = 2 ** 31 - 1  # 31 one bits: 01...1
        n ^= bits_31  # inverse bits from 1-th to 31-th

    return positive_dec_to_hex(n)


if __name__ == "__main__":
    # n is signed int32 (-2^31 to +2^31-1)
    #
    # int32 == 2147483647 positive + 2147483648 negative + 1 sign
    #
    print(dec_to_hex(-2147483648))
