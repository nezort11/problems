# Terminology:
# non-oriented graph - no relations from one node to another
# simple graph - graph without loops and even
# good graph - graph with 1 node with relations to all other
# different graphs - 1 different node relation
# n - number of nodes
# k
# It is magic. How 1 base case + recursion can solve complex-for problems?
# list(), dict(), tuple(), set() - convert iterable
# [,], {:}, (,), {,} - make iterable from elements
# [*iterable], (*iterable), {*iterable} - convert iterable

# Algorithm:
# 1. find all posibles
# 2. filter to the result

# Programming: procedure, functional, object-oriented

from collections import Counter


def tuple_set(a, k):
    """
    Return set of unique item combination tuples.
    Set - position-less (order-independent) list

    :param a: list of elements
    :param k: number of element in tuple
    :return: set of item tuples (ex. {(1,2,3), (2, 2, 2)})
    """
    if k <= 0:
        return set()
    elif len(a) < k:
        return set()
    elif k == 1:
        return {*a}
    else:
        s = set()
        for i, ai in enumerate(a):
            b = a[i+1:]
            below = k - 1
            if below == 1:
                for c in tuple_set(b, below):
                    s.add((ai, c))
            else:
                for c in tuple_set(b, below):
                    s.add((ai,) + c)
        return s


def all_relations(nodes):
    # Base case
    if len(nodes) == 0:
        return set()
    # Recursive case
    else:
        first_node = nodes[0]
        left_nodes = nodes[1:]
        # Base relations
        rels = {(first_node, ln) for ln in left_nodes}
        # Recursive relations
        rels.update(all_relations(left_nodes))
        return rels


if False:
    # Take
    n = '3'

    # Validate
    try:
        n = int(n)
        assert 1 <= n <= 5000
    except Exception as e:
        print("Input error!")
        print(e)
    else:
        pass

    nodes = range(1, n + 1)
    ts = all_relations(nodes)
    print("All unique relations between nodes in non-oriented graph:")
    from pprint import pprint
    pprint(ts)

    graphs = tuple_set(list(ts), n)
    print("All possible unique graphs:")
    pprint(graphs)

    all_possible = {}
    # Different connections (from 0 to max)

    print("All possible graphs of nodes:")
    all_possible = [tuple(tuple_set(list(ts), con))
                    for con in range(0, n)]
    pprint(all_possible)


# Non-oriented graph = set/list of tuples/sets


def has_loop(graph):
    """Find graph loop."""
    for node1, node2 in graph:
        if node1 == node2:
            return True
    return False


def has_multiple_edges(graph):
    """Count all edges in graph.
    Another way would be to repr graph as set not list.
    """
    c = Counter(graph)
    for v in c.values():
        if v > 1:
            return True
    return False


def is_simple(graph):
    """Determine whether graph is simple."""
    return not has_loop(graph) and not has_multiple_edges(graph)


def has_one_n_minus_1_node(graph):
    """Determine whether graph has one n-1 node."""
    # Node edges count
    edge_count = {}

    # Count number of edges for every node
    for node1, node2 in graph:
        edge_count.setdefault(node1, 0)
        edge_count.setdefault(node2, 0)
        edge_count[node1] += 1
        edge_count[node2] += 1

    found = False
    for count in edge_count.values():
        node_count = len(edge_count)
        if count == node_count - 1:
            # If found > 1 such nodes
            if found:
                return False
            found = True

    return found


def is_good(graph):
    """Graph is good when it's normal and have 1 multinode."""
    return is_simple(graph) and has_one_n_minus_1_node(graph)


if __name__ == '__main__':
    pass
