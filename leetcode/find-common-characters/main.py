from collections import Counter


def find_common_characters(words: list[str]) -> list[str]:
    if len(words) == 0:
        return []
    if len(words) == 1:
        return words

    words = sorted(words, key=len)
    word1 = Counter(words[0])
    word2 = Counter(words[1])
    common = word1 & word2
    if len(common) == 0:
        return []

    for i in range(2, len(words)):
        common &= Counter(words[i])
        if len(common) == 0:
            return []

    return list(common.elements())


if __name__ == "__main__":
    words = ["bella", "label", "roller"]
    assert find_common_characters(words) == ["e", "l", "l"]
