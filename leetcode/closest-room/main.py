from operator import itemgetter


class Hotel:
    def __init__(self, rooms: list[list[int, int]]):
        self.rooms = rooms
        self.rooms_ordered = sorted(self.rooms, key=itemgetter(0))

    def query(self, queries: list[list[int, int]]) -> int:
        return [
            self.find_nearest_fit(self.find_nearest(prefer_pos), prefer_pos, prefer_size)
            for prefer_pos, prefer_size in queries
        ]

    def find_nearest(self, prefer_pos: int) -> int:
        """Return index of the room nearest to the :prefer_pos: in ordered rooms."""

        # Out of bounds
        if prefer_pos < self.rooms_ordered[0][0]:
            return 0

        if prefer_pos > self.rooms_ordered[-1][0]:
            return -1

        middle_i = len(self.rooms_ordered) // 2
        while True:
            middle = self.rooms_ordered[middle_i][0]
            left = self.rooms_ordered[middle_i - 1][0]
            right = self.rooms_ordered[middle_i + 1][0]

            if prefer_pos < middle:
                # Between left and middle
                if prefer_pos >= left:
                    if abs(left - prefer_pos) <= abs(middle - prefer_pos):
                        return middle_i - 1
                    else:
                        return middle_i
                middle_i //= 2
            elif middle < prefer_pos:
                # Between middle and right
                if prefer_pos <= right:
                    if abs(right - prefer_pos) <= abs(middle - prefer_pos):
                        return middle_i + 1
                    else:
                        return middle_i
                middle_i += (len(self.rooms_ordered) - middle_i) // 2
            else:
                return middle

    def find_nearest_fit(self, i: int, prefer_pos: int, prefer_size: int) -> int:
        """Return position of the nearest to :prefer_pos: room around :i:-th room that fits :prefer_size:."""
        if self.rooms_ordered[i][1] >= prefer_size:
            return self.rooms_ordered[i][0]

        # Search around i-th room
        j = 1
        while True:
            left_i = i - j
            right_i = i + j
            left = right = left_fit_delta = right_fit_delta = None

            # 1. check boundries
            if left_i >= 0:
                left = self.rooms_ordered[left_i]
                # 2. check size
                if left[1] >= prefer_size:
                    left_fit_delta = abs(left[0] - prefer_pos)

            if right_i < len(self.rooms_ordered):
                right = self.rooms_ordered[right_i]
                if right[1] >= prefer_size:
                    right_fit_delta = abs(right[0] - prefer_pos)

            if left_fit_delta:
                if right_fit_delta:
                    # 3. compare deltas
                    if left_fit_delta <= right_fit_delta:
                        return left[0]
                    else:
                        return right[0]
                else:
                    return left[0]
            else:
                if right_fit_delta:
                    return right[0]
                else:
                    return -1

            j += 1


if __name__ == "__main__":
    pass
