from collections import OrderedDict

ROMAN_NUMBER_SYMBOLS = OrderedDict()
ROMAN_NUMBER_SYMBOLS[1000] = "M"
ROMAN_NUMBER_SYMBOLS[900] = "CM"
ROMAN_NUMBER_SYMBOLS[500] = "D"
ROMAN_NUMBER_SYMBOLS[400] = "CD"
ROMAN_NUMBER_SYMBOLS[100] = "C"
ROMAN_NUMBER_SYMBOLS[90] = "XC"
ROMAN_NUMBER_SYMBOLS[50] = "L"
ROMAN_NUMBER_SYMBOLS[40] = "XL"
ROMAN_NUMBER_SYMBOLS[10] = "X"
ROMAN_NUMBER_SYMBOLS[9] = "IX"
ROMAN_NUMBER_SYMBOLS[5] = "V"
ROMAN_NUMBER_SYMBOLS[4] = "IV"
ROMAN_NUMBER_SYMBOLS[1] = "I"


class RomanNumber:
    def __init__(self, num):
        self.num = num

    def _decimal_to_roman(self):
        """Convert decimal integer to roman integer in O(13)."""
        num = self.num
        roman_number = ""
        for number, symbol in ROMAN_NUMBER_SYMBOLS.items():
            roman_number += symbol * (num // number)
            num %= number
        return roman_number

    def __str__(self):
        return self._decimal_to_roman()
