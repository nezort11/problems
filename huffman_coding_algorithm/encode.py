from operator import itemgetter
from timeit import timeit
from struct import pack
from sys import byteorder


def huffman_encode(s):
    """
    Compress given string lose-less using Huffman coding algorithm.
    :param s: byte string to encode
    :returns: encoded string
    """
    # Unique sorted list (avoid randomness)
    chars = sorted(list(set([c for c in s])))

    # Character frequency hash table {chars: freq}
    freq = dict([(c, s.count(c)) for c in chars])

    # Huffman tree hash table {node: node}
    tree = {}
    # Node sides hash table {chars: 0|1}
    sides = {}
    # Non-processed nodes set
    non_processed = freq.copy()

    # One non-processed node will be always left
    while len(non_processed) > 1:
        # Find node with minimum frequency (chars, freq)
        left_node = min(non_processed.items(), key=itemgetter(1))
        non_processed.pop(left_node[0])

        # Find node with minimum frequency (chars, freq)
        right_node = min(non_processed.items(), key=itemgetter(1))
        non_processed.pop(right_node[0])

        # Create new node from left and right (chars, freq)
        new_node = (
            left_node[0] + right_node[0],
            left_node[1] + right_node[1]
        )
        freq.update([new_node])
        non_processed.update([new_node])

        # Node sides {chars: 0|1}
        sides[left_node[0]] = 0
        sides[right_node[0]] = 1

        # Add nodes to tree hash table {node: node}
        tree[left_node[0]] = new_node[0]
        tree[right_node[0]] = new_node[0]

        # Root node
        tree[new_node[0]] = None

    # Transform tree into huffman codes (binary tree)
    codes = {}
    for c in chars:
        node = c
        codes[c] = str(sides[node])
        node2 = tree[node]

        # Go throught the tree to the root
        while tree[node2]:
            # Prepend character from the start (e.g. 1010 - right, left, right, left)
            codes[c] = str(sides[node2]) + codes[c]
            node2 = tree[node2]

    # Binary coding string
    s2 = ''.join([codes[c] for c in s])

    return s2, codes, chars
    # print(
    #     f'Initial: "{s}", {len(s)*8} bit',
    #     f'Final: {s2}, {len(s2)} bit',
    #     sep='\n'
    # )


def encode_file(s):
    """Compress given string and write to the file."""
    # Convert string to binary string
    coding, _, chars = huffman_encode(s)
    # Convert binary string to bytes
    coding_number = int(coding, 2)
    coding_bytes = coding_number.to_bytes(
        (len(coding) + 7) // 8, byteorder=byteorder)

    # Write binary bytes
    with open('out.txt', 'wb') as f:
        f.write(coding_bytes)

    # Max huffman tree depth (max codes length)
    # max_tree_depth = max(map(len, codes.values()))

    # Write codes into file (how?)

    # Write all unique characters in the string
    # to regenerate codes based on the same code
    # with open('chars.txt', 'w') as f:
    #     unique_s = ''.join([c for c in chars])
    #     f.write(unique_s)


def decode_file():
    """Decompresses/decodes huffman coding file with unique chars."""
    # with open('chars.txt') as f:
    #     unique_s = f.read()

    # Read encoded data
    with open('out.txt', 'rb') as f:
        encoded_data = f.read()

    encoded_s2 = int.from_bytes(encoded_data, byteorder=byteorder)
    encoded_s2 = bin(encoded_s2)
    encoded_s2 = encoded_s2.lstrip('0b')
    inv_codes = {v: k for k, v in codes.items()}

    msg = ''
    bits = ''
    for b in encoded_s2:
        bits += b

        c = inv_codes.get(bits, None)
        if c:
            msg += c
            bits = ''


if __name__ == '__main__':
    # String for encoding
    s = "Hello, World!"

    s2, codes, chars = huffman_encode(s)
    print('Coding bitstring:', s2)
    print('Character codes:')
    from pprint import pprint
    pprint(codes)
    print('Used characters:')
    from pprint import pprint
    pprint(chars)

    encode_file(s)
