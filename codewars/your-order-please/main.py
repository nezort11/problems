from operator import itemgetter


def order(s):
    words, nums = s.split(), []
    # transform to: filter(str.isdigit, [w for w in words]
    for w in words:
        for c in w:
            if c.isdigit():
                nums.append(int(c))

    return ' '.join([w for w, _ in
                     sorted(zip(words, nums), key=itemgetter(1))])


# def short(s):
#     return ' '.join([s.split()[int(n)-1] for n in ''.join([c if c.isdigit() else '' for w in s.split() for c in w])])

def short(s):
    return ' '.join(sorted(s.split(), key=lambda w: int(filter(str.isdigit, w)))


if __name__ == '__main__':
    print(short('g3ood 4of the2 pe6ople th5e Fo1r'))
