def is_valid_walk(walk):
    if len(walk) != 10:
        return False

    coords = [0, 0]

    for s in walk:
        if s == 'n':
            coords[1] -= 1
        elif s == 's':
            coords[1] += 1
        elif s == 'e':
            coords[0] -= 1
        elif s == 'w':
            coords[0] += 1

    if coords == [0, 0]:
        return True

    return False


if __name__ == '__main__':
    is_valid_walk(['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', ])
