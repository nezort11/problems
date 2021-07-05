import math
import matplotlib.pyplot as plt

def pair_distance(p1, p2):
    """
    Calculate distance between 2 points.
    """
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)

def find_closest_pair(points):
    """
    Find the closest pair of points.
    """
    points = points.copy()
    closest_pair = None
    closest_pair_distance = float('inf')

    # Iterate over all points 
    for i, p in enumerate(points):
        del points[i]
        # Iterate over all points from p
        for p2 in points:
            pd = pair_distance(p, p2)
            if pd < closest_pair_distance:
                closest_pair = [p, p2]
                closest_pair_distance = pd

    return closest_pair

def plot_closest_pair(points):
    """
    Plot points and highlight closest pair.
    """
    closest_pair = find_closest_pair(points)

    # Plot points and closest pair
    fig, ax = plt.subplots()
    ax.scatter([p[0] for p in points], [p[1] for p in points])
    ax.scatter([closest_pair[0][0], closest_pair[1][0]], [closest_pair[0][1], closest_pair[1][1]], color='red')
    plt.show()