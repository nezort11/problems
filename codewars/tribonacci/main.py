def tribonacci(signature, n):
    while len(signature) < n:
        signature.append(sum(signature[-3:]))
    return signature[:n] if n < 3 else signature

if __name__ == '__main__':
    # Time: 1949ms
    return tribonacci([0, 1, 1], 10)
