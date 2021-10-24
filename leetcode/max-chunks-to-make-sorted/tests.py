from main import Permutation


def test_1():
    assert len(Permutation([4, 3, 2, 1, 0]).chunks()) == 1


def test_2():
    assert len(Permutation([1, 0, 2, 3, 4]).chunks()) == 4

