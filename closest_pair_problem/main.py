import brute_force
import divide_and_conquer

if __name__ == '__main__':
    points = [(0, 0), (2, 3), (8, 3), (9, 7), (1, 5), (5, 4), (2, 5)]

    print("Brute force:", brute_force.find_closest_pair(points))
    print("Divide and conquer:", divide_and_conquer.find_closest_pair(points))

    divide_and_conquer.plot_closest_pair(points)