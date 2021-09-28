from operator import itemgetter

def to_hill_i(i, hill_top):
    """Convert string index to the hill index.

    Hill is what I call a combination of numbers that is rising and
    than falling back: 0123454321.

    Hill top is the maximum (top) number/index in the hill.
    """
    hill_max_i = hill_top * 2
    offset_from_top = abs((i % hill_max_i) - hill_top)
    return hill_top - offset_from_top


def convert(s, num_rows):
    """Convert given string into the zigzag form by num_rows rows.

    Converting is made from left to right, from top to bottom.
    """
    if num_rows == 1:
        return s

    s_conv = sorted(enumerate(s), key=lambda p: to_hill_i(p[0], num_rows - 1))
    return ''.join([c for i, c in s_conv])
