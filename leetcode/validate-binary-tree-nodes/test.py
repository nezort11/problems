import pytest
from main import BinaryTree


def test_1():
    assert BinaryTree(4, [1, -1, 3, -1], [2, -1, -1, -1]).is_valid()


def test_2():
    assert not BinaryTree(4, [1, -1, 3, -1], [2, 3, -1, -1]).is_valid()


def test_3():
    assert not BinaryTree(2, [1, 0], [-1, -1]).is_valid()


def test_4():
    assert not BinaryTree(6, [1, -1, -1, 4, -1, -1], [2, -1, -1, 5, -1, -1]).is_valid()


def test_5():
    assert not BinaryTree(4, [1, 0, 3, -1], [-1, -1, -1, -1]).is_valid()
