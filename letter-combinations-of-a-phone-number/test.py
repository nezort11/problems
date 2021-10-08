import unittest
from main import PhoneNumber


class TestPhoneNumberLetterCombinations(unittest.TestCase):
    def test_combinations_23(self):
        digits = "23"
        self.assertEqual(
            PhoneNumber(digits).letter_combinations(),
            ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"],
        )

    def test_combinations_empty(self):
        digits = ""
        self.assertEqual(PhoneNumber(digits).letter_combinations(), [])

    def test_combinations_234(self):
        digits = "234"
        self.assertEqual(
            PhoneNumber(digits).letter_combinations(),
            [
                "adg",
                "adh",
                "adi",
                "aeg",
                "aeh",
                "aei",
                "afg",
                "afh",
                "afi",
                "bdg",
                "bdh",
                "bdi",
                "beg",
                "beh",
                "bei",
                "bfg",
                "bfh",
                "bfi",
                "cdg",
                "cdh",
                "cdi",
                "ceg",
                "ceh",
                "cei",
                "cfg",
                "cfh",
                "cfi",
            ],
        )
