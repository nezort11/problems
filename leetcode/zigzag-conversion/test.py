import unittest
from main import convert


class ZigZagConversionTestCase(unittest.TestCase):
    def test_example_1(self):
        s = "PAYPALISHIRING"
        num_rows = 3
        self.assertEqual(convert(s, num_rows), "PAHNAPLSIIGYIR")

    def test_example_2(self):
        s = "PAYPALISHIRING"
        num_rows = 4
        self.assertEqual(convert(s, num_rows), "PINALSIGYAHRPI")

    def test_numerows_2(self):
        s = "SUPERISTO"
        num_rows = 2
        self.assertEqual(convert(s, num_rows), "SPRSOUEIT")

    def test_numrows_is_1(self):
        s = "BLABLABL"
        num_rows = 1
        self.assertEqual(convert(s, num_rows), s)