import unittest

from main import RomanNumber


class RomanNumberTests(unittest.TestCase):
    def test_1_to_roman(self):
        ri = RomanNumber(1)
        self.assertEqual(str(ri), "I")

    def test_10_to_roman(self):
        ri = RomanNumber(10)
        self.assertEqual(str(ri), "X")

    def test_129_to_roman(self):
        ri = RomanNumber(129)
        self.assertEqual(str(ri), "CXXIX")

    def test_294_to_roman(self):
        ri = RomanNumber(294)
        self.assertEqual(str(ri), "CCXCIV")

    def test_1994_to_roman(self):
        ri = RomanNumber(1994)
        self.assertEqual(str(ri), "MCMXCIV")


if __name__ == "__main__":
    unittest.main()
