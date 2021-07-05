import math
import matplotlib.pyplot as plt

def pair_distance(p1, p2):
    """
    Calculate distance between 2 points.
    """
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)

def find_closest_pair(points):
    """
    Find the closest pair of points using divide-and-conquer technique.

    :param points: List of tuples representing 2D points.
    :returns: List of 2 tuples representing closest pair of points.
    """
    # Base cases
    if len(points) == 1:
        return None
    elif len(points) == 2:
        return (points[0], points[1])
    elif len(points) == 3:
        d1 = pair_distance(points[0], points[1])
        d2 = pair_distance(points[0], points[2])
        d3 = pair_distance(points[1], points[2])
        if d1 < d2:
            if d1 < d3:
                return (points[0], points[1])
            else:
                return (points[1], points[2])
        else:
            if d2 < d3:
                return (points[0], points[2])
            else:
                return (points[1], points[2])

    # Sort points by x
    points = sorted(points, key=lambda p: p[0])

    # Divide points by x in 2
    m = len(points) // 2
    points_left = points[:m]
    points_right = points[m:]
    closest_left_pair = find_closest_pair(points_left)
    closest_right_pair = find_closest_pair(points_right)
    dl = pair_distance(*closest_left_pair)
    dr = pair_distance(*closest_right_pair)
    
    # Find shortest distance and pair
    if dl < dr:
        closest_pair = closest_left_pair
        d = dl
    else:
        closest_pair = closest_right_pair
        d = dr

    # Find points in the middle
    middle_points = []
    for p in points:
        if m - d <= p[0] <= m + d: # [m-d, m+d]
            middle_points.append(p)

    # Sort middle points by y
    middle_points.sort(key=lambda p: p[1])

    # Check for pairs in the middle that are less then shortest distance
    for i, mp in enumerate(middle_points):
        # Check only next 7 points (7 + 1 = limit when < d)
        for next_mp in middle_points[i+1:i+1 + 7]:
            mp_distance = pair_distance(mp, next_mp)
            if  mp_distance < d:
                closest_pair = (mp, next_mp)
                d = mp_distance
    
    return closest_pair

def plot_closest_pair(points):
    """
    Plot/visualize all points and highlight the closest pair.
    """
    closest_pair = find_closest_pair(points)
    # Plot points
    fig, ax = plt.subplots()
    ax.scatter([p[0] for p in points], [p[1] for p in points])
    ax.scatter([closest_pair[0][0], closest_pair[1][0]], [closest_pair[0][1], closest_pair[1][1]], color='red')
    plt.show()
