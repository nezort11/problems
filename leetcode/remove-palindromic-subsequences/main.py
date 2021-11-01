def is_palindrom(s):
    for i in range(len(s) // 2):
        if s[i] != s[-i - 1]:
            return False
    return True


def get_palindroms_from_start(s):
    result = []
    for i in range(1, len(s)):
        if is_palindrom(s[0:i]):
            result.append(i)

    return result


def get_min_steps_to_empty_by_palindrom(s):
    """
    Find minimum number of palindrom subsequences that form given string.
    """
    # Base case
    if is_palindrom(s):
        return 1

    # Recursive case
    return min(
        [
            1 + get_min_steps_to_empty_by_palindrom(s[p:])
            for p in get_palindroms_from_start(s)
        ]
    )


if __name__ == "__main__":
    # s = "babaabaa"
    s = "babaaaa" # bab + aabaa
    print(get_palindroms_from_start(s))
    print(get_min_steps_to_empty_by_palindrom(s))
