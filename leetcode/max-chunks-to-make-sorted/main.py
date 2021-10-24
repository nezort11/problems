from itertools import chain


def check_if_sorted(arr):
    for i in range(len(arr) - 1):
        if arr[i] > arr[i + 1]:
            return False
    return True


def verify_chunks(chunks):
    return check_if_sorted(list(chain.from_iterable([sorted(c) for c in chunks])))


class Permutation:
    def __init__(self, arr):
        self.arr = arr

    def chunks(self):
        # 1. Make all possible chunks
        chunks = []
        for i in range(len(self.arr)):
            if self.arr[i] > i:
                chunks.append((i, self.arr[i]))
            else:
                chunks.append((self.arr[i], i))

        # 2. Sort chunks
        chunks.sort()

        # 3. Merge chunks
        result = []
        while len(chunks) > 1:
            left = chunks.pop(0)
            right = chunks.pop(0)
            # If mergable
            if left[1] >= right[0]:
                if left[1] >= right[1]:
                    chunks.insert(0, left)
                else:
                    chunks.insert(0, (left[0], right[1]))
            else:
                result.append(left)
                chunks.insert(0, right)
        result += chunks

        return result
