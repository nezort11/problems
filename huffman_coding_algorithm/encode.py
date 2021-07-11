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
    # Set of all unique characters
    chars = set()
    for c in s:
        chars.add(c)
    chas = list(chars)

    # Character frequency hash table {chars: freq}
    freq = {}
    for c in chars:
        freq[c] = s.count(c)

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
        if left_node[1] == right_node[1]:
            sides[left_node[0]] = 0
            sides[right_node[0]] = 1
        elif left_node[1] < right_node[1]:
            sides[left_node[0]] = 0
            sides[right_node[0]] = 1
        else:
            sides[left_node[0]] = 1
            sides[right_node[0]] = 0

        # Add nodes to tree hash table {node: node}
        tree[left_node[0]] = new_node[0]
        tree[right_node[0]] = new_node[0]

        # Root node
        tree[new_node[0]] = None

    # Transform tree into huffman codes hash table
    codes = {}
    for c in chars:
        node = c
        codes[c] = str(sides[node])
        node2 = tree[node]

        # Go throught the tree to the root
        while tree[node2]:
            codes[c] += str(sides[node2])
            node2 = tree[node2]

    # Binary string
    s2 = ''.join([codes[c] for c in s])

    return s2, codes
    # print(
    #     f'Initial: "{s}", {len(s)*8} bit',
    #     f'Final: {s2}, {len(s2)} bit',
    #     sep='\n'
    # )


if __name__ == '__main__':
    # String for encoding
    s = "Hello, World!"

    # Encode string using Huffman coding (0.6s, 10000 times)
    coding, codes = huffman_encode(s)
    print(coding)

    # Convert binary string to bytes
    coding = int(coding, 2).to_bytes(
        (len(coding) + 7) // 8, byteorder=byteorder)
    print(coding)

    # Convert bit string to packed binary data
    # binary_data = pack('H', coding)

    # Write output to the file
    with open('out.txt', 'wb') as f:
        f.write(coding)

    # Write huffman codes to the file

    # Read encoded data
    with open('out.txt', 'rb') as f:
        encoded_data = f.read()

    print(encoded_data)

    # def bytes2binstr(b, n=None, k=8):
    #     s = '{x:0{m}b}'.format(
    #         m=len(b) * 8, x=int.from_bytes(b, byteorder=byteorder))[:n]
    #     return s

    # encoded_s2 = bytes2binstr(encoded_data)
    encoded_s2 = int.from_bytes(encoded_data, byteorder=byteorder)
    print(bin(encoded_s2))

    encoded_s2 = bin(encoded_s2)
    encoded_s2 = encoded_s2.lstrip('0b')

    inv_codes = {v: k for k, v in codes.items()}

    print(codes)
    print(inv_codes)

    msg = ''
    bits = ''
    for b in encoded_s2:
        bits += b

        c = inv_codes.get(bits, None)
        if c:
            msg += c
            bits = ''

    print(msg)
