DIGIT_LETTERS = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
}


def combine(str1, str2):
    return [c1 + c2 for c1 in str1 for c2 in str2]


def combine_list(lst, str2):
    return [str1 + c2 for str1 in lst for c2 in str2]


class PhoneNumber:
    def __init__(self, digits):
        assert len(digits) <= 4
        self.digits = digits

    def letter_combinations(self):
        letters = [DIGIT_LETTERS[d] for d in self.digits]

        if len(letters) == 0:
            return []

        if len(letters) == 1:
            return [c for c in letters[0]]

        a = letters[0]
        b = letters[1]
        result = combine(a, b)

        for i in range(2, len(letters)):
            result = combine_list(result, letters[i])

        return result
