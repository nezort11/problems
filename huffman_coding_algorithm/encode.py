from operator import itemgetter
from pprint import pprint
from copy import deepcopy


def humman_frequency_tree():
    # Huffamn binary tree
    tree = {}
    # Huffman binary tree (with codes 0/1 instead of frequency)
    while len(freq) > 1:
        # Find minimums frequency in the dict item tuples
        left_node = min(freq.items(), key=itemgetter(1))
        freq.pop(left_node[0])
        right_node = min(freq.items(), key=itemgetter(1))
        freq.pop(right_node[0])

        # Calculate new node based on previous nodes
        new_node = (
            left_node[0] + right_node[0],
            left_node[1] + right_node[1]
        )
        freq.update([new_node])

        # Add nodes to tree
        tree[left_node] = new_node
        tree[right_node] = new_node
        tree[new_node] = None


def huffman_encode(s):
    """
    Compress string loseless using huffman coding algorithm.
    :param s: byte string to encode
    :returns: encoded string
    """
    # Set of all unique characters
    chars = set()
    for c in s:
        chars.add(c)

    # Character frequency hash table
    freq = {}
    for c in chars:
        freq[c] = s.count(c)
    freq2 = deepcopy(freq)

    # Huffamn binary tree
    tree = {}
    # Hash table of codes for all nodes
    node_codes = {}
    while len(freq) > 1:
        # Find minimums frequency in the dict item tuples
        left_node = min(freq.items(), key=itemgetter(1))
        freq.pop(left_node[0])
        right_node = min(freq.items(), key=itemgetter(1))
        freq.pop(right_node[0])

        # Calculate new node based on previous nodes
        new_node = (
            left_node[0] + right_node[0],
            left_node[1] + right_node[1]
        )
        freq.update([new_node])

        # Add nodes to tree
        tree[left_node] = new_node
        tree[right_node] = new_node
        # Root node
        tree[new_node] = None

        # Node codes
        if left_node[1] == right_node[1]:
            node_codes[left_node] = 0
            node_codes[right_node] = 1
        elif left_node[1] < right_node[1]:
            node_codes[left_node] = 0
            node_codes[right_node] = 1
        else:
            node_codes[left_node] = 1
            node_codes[right_node] = 0

    # Transform tree into huffman codes hash table
    codes = {}
    for c in chars:
        parent = (c, freq2[c])
        codes[c] = str(node_codes[parent])
        child = tree[parent]
        while tree[child]:
            codes[c] += str(node_codes[child])
            child = tree[child]

    pprint(chars)
    pprint(freq)
    pprint(tree)
    pprint(node_codes)
    pprint(codes)

    s2 = ''.join([codes[c] for c in s])
    print(s, f'{len(s)*8} bit;', s2, f'{len(s2)//8} bit')

# def huffman_encode():
#       huffman encode in subfunction style


if __name__ == '__main__':
    s = "Hello, World!"
    huffman_encode(s)
