from main import Grid


def test_equalizable_even():
    assert Grid([[2, 8], [16, 18]], 2)._is_equalizable()


def test_equalizable_even_not_module():
    assert not Grid([[4, 8], [16, 18]], 4)._is_equalizable()


def test_equalizable_odd_even():
    assert Grid([[3, 6], [9, 18]], 3)._is_equalizable()


def test_example_1():
    assert Grid([[2, 4], [6, 8]], 2).operations_to_equalize() == 4


def test_example_2():
    assert Grid([[1, 5], [2, 3]], 1).operations_to_equalize() == 5


def test_example_3():
    assert Grid([[1, 2], [3, 4]], 2).operations_to_equalize() == -1
