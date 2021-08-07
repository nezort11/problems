import unittest
from main import (
    has_loop, has_multiple_edges, has_one_n_minus_1_node,
    is_simple, is_good
)


class TestGraphDetermination(unittest.TestCase):
    """Tests about how graph function should behave."""

    def test_has_loop(self):
        """Test graph has a loop."""
        self.assertTrue(has_loop({
            (1, 2),
            (1, 3),
            (2, 3),
            (2, 2),
        }), "Graph has a loop")
        self.assertFalse(has_loop({
            (2, 3),
            (2, 4),
            (2, 5),
            (3, 4),
            (4, 5),
        }), "Graph doesn't have a loop")

    def test_has_multiple_edges(self):
        """Test graph has multiple edges."""
        self.assertTrue(has_multiple_edges([
            (1, 2),
            (1, 3),
            (2, 3),
            (2, 3),
        ]), "Graph has multiple edges")
        self.assertFalse(has_multiple_edges({
            (1, 2),
            (2, 3),
            (3, 4),
            (2, 4),
        }), "Graph doesn't have multiple edges")

    def test_is_simple(self):
        """Test graph is simple."""
        self.assertTrue(is_simple({
            (4, 5),
            (4, 6),
            (4, 7),
            (5, 7),
            (7, 8),
        }), "Graph is simple")
        self.assertFalse(is_simple({
            ("one", "two"),
            ("one", "three"),
            ("four", "five"),
            ("five", "five"),
        }), "Graph has a loop")
        self.assertFalse(is_simple([
            ('a', 'b'),
            ('a', 'c'),
            ('c', 'b'),
            ('c', 'b'),
        ]), "Graph has multiple edges")

    def test_has_one_n_minus_1_node(self):
        """Test graph have one (n-1)-power node."""
        self.assertTrue(has_one_n_minus_1_node({
            (1, 2),
            (1, 3),
            (1, 4),
            (1, 5),
            (2, 3),
            (2, 4),
            (3, 5),
        }), "Should have only one (n-1)-power node: (1)")
        self.assertFalse(has_one_n_minus_1_node({
            (1, 2),
            (1, 3),
            (1, 4),
            (2, 3),
            (2, 4),
        }), "Have two (n-1) nodes: (1) and (2)")

    def test_is_good(self):
        """Test graph is good."""
        self.assertTrue(is_good({
            (1, 2),
            (1, 3),
            (1, 4),
            (4, 5),
            (5, 2),
            (1, 5),
        }), "Graph is \"good\"")
        self.assertFalse(is_good({
            (1, 2),
            (1, 3),
            (1, 4),
            (2, 3),
            (2, 4),
        }), "Have two (n-1) nodes: (1) and (2)")


if __name__ == '__main__':
    unittest.main()
