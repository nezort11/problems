"""
This program solves longest unique substring problem by dividing 
string into unique ranges based on the most common character. This 
strings will be then also divided if contain repeating characters 
until unique substring will be found and compared.
"""
from collections import Counter


def split_ranges(s, c):
    """Split the string in substrings that are longest and contain only 1
    occurence of the character."""
    # ranges = []
    occurences = []

    # Find all occurences of the character: O(n)
    for i, char in enumerate(s):
        if char == c:
            occurences.append(i)

    ranges = []

    # First range to 2-d occurence (exluding)
    ranges.append(s[: occurences[1]])

    # Middle cases: O(n)
    for i, occurence in enumerate(occurences[1:-1]):
        # i was shifted initialy
        i += 1

        # From the previous occurency (excluding)
        start = occurences[i - 1] + 1

        # To the next occurency (excluding)
        end = occurences[i + 1]

        ranges.append(s[start:end])

    ranges.append(s[occurences[-2] + 1 :])

    return ranges


def is_unique(s):
    return len(Counter(s)) == len(s)


def longest_unique_substring(s):
    """Call itself recursive."""
    # Check whether is unique: O(n)
    if is_unique(s):
        return s

    # Count all characters: O(n)
    breakpoints = Counter(s)
    # Find most frequent character: O(n)
    most_common_character, freq = max(breakpoints.items(), key=lambda p: p[1])
    # Find uniqe substrings: O(n)
    unique_ranges = split_ranges(s, most_common_character)
    longest_unique_ranges = [longest_unique_substring(range) for range in unique_ranges]
    longest_unique_range = max(longest_unique_ranges, key=lambda range: len(range))

    return longest_unique_range


if __name__ == "__main__":
    s = "aabbeadacebf"
    luss = longest_unique_substring(s)
    print(luss)
