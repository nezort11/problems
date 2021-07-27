from re import match


def can_fit(n, rows, m, groups):
    """Determine wheather passengers can fit into the plane."""

    def print_plane(plane):
        """Converts rows to strings and join with newline."""
        plane_str = '\n'.join([''.join(row) for row in plane])
        print(plane_str, end='\n')

    def seat_to_letter(seat_i):
        """Converts seat index in the row string into letter."""
        # Convert negative indecies to absolute
        if seat_i < 0:
            row_len = len(plane[0])
            seat_i = row_len + seat_i

        # Move index 1 character left ('_')
        if seat_i > 3:
            seat_i -= 1

        # Offset 'A' by seat index
        return chr(ord('A') + seat_i)

    # String to list of characters (data structure)
    plane = [[seat for seat in row] for row in rows]

    # Try to fit every group
    for group in groups:
        # Parse group
        num, side, position = group.split()
        num = int(num)

        # Flag if fill in any row
        fit = False

        # Try to fit in every row
        for row_i, row in enumerate(plane):
            # Split row in 2 sides (for convinient access)
            left = row[:3]
            right = row[-3:]

            # Middle index (for index modification)
            middle = 3

            # 4 seperate logic
            if side == 'left':
                if position == 'window':
                    # Left window
                    seats = left[:num]
                    seat_span = range(0, num)
                else:
                    # Left aisle
                    seats = left[-num:]
                    seat_span = range(middle - num, middle)
            else:
                if position == 'window':
                    # Rigth window
                    seats = right[-num:]
                    seat_span = range(-num, 0)
                else:
                    # Right aisle
                    seats = right[:num]
                    seat_span = range(middle, middle + num)

            # If have enought space
            fit = all([seat == '.' for seat in seats])

            if fit:
                # Seats in row-letter format (1B, 4C, 2F)
                seats_rl = [f'{row_i+1}{seat_to_letter(seat_i)}'
                            for seat_i in seat_span]

                # Mark fit seats with 'X'
                for seat_i in seat_span:
                    plane[row_i][seat_i] = 'X'

                # User output
                print(f"Passengers can take seats at: {' '.join(seats_rl)}")
                print_plane(plane)

                # Mark booked seats with '#'
                for seat_i in seat_span:
                    plane[row_i][seat_i] = '#'

                # Skip other rows
                break

        # If group can't fit in any row
        if not fit:
            print("Cannot fulfill passengers requirements")


if __name__ == "__main__":
    # Take input
    n = int(input("Enter number of rows: "))
    rows = []
    for _ in range(n):
        row = input()
        rows.append(row)

    m = int(input("Enter number of passenger groups: "))
    groups = []
    for _ in range(m):
        group = input()
        groups.append(group)

    # Validate input
    try:
        assert 1 <= n <= 100
        for row in rows:
            assert match(r'(\.|#){3}_(\.|#){3}$', row)
        assert 1 <= m <= 100
        for group in groups:
            assert match(r'[1-3] (left|right) (aisle|window)$', group)
    except AssertionError as e:
        print("Invalid input, rerun the program.")
    else:
        can_fit(n, rows, m, groups)
