/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
/**
 * @param {_Node} node
 * @return {_Node}
 */
/**
- undirected graph using adjacency list!

Approach:

(1) BFS? with visited set

- init <visited> set and <queue> to pop and iterate

(1) <-> (2)
 ^       ^
 |       |
 V       V
(4) <-> (3)

node1 = { val: 1,
  neigbors: [node2, node4]
}

node1 = { val: 1,
  neigbors: [
    {
        val: 2
        neigbors: [node1, node3]
    },
    {
        val: 4
        neigbors: [node1, node3]
    },
  ]
}

nodes:
{
    1: { val: 1, neighboards[this[2], this[4]] },
    2: { val: 2, neighboards[this[1], this[3]] },
    4: { val: 4, neighboards[this[1], this[3]] },
    3: { val: 3, neighboards[this[2], this[4]] }
}

1) iterate over all nodes and create new cloned nodes

2) link new cloned nodes together

3) create pointer to new cloned root

 */
var cloneGraph = function (root) {
  if (!root) {
    return null;
  }

  const queue = [root];
  const visited = new Set();
  visited.add(root.val);

  // {[Node.val]: { val: Node.val, neignboars: [] } }
  const nodes = {};

  while (queue.length > 0) {
    const node = queue.shift();

    if (!(node.val in nodes)) {
      // create new EMPTY cloned NODE
      // and later fill it
      nodes[node.val] = { val: node.val, neighbors: [] };
    }

    for (const neighboar of node.neighbors) {
      // FILL cloned neighboard of node
      if (!(neighboar.val in nodes)) {
        // create EMPTY node NEIGHBOAR cloned node
        nodes[neighboar.val] = { val: neighboar.val, neighbors: [] };
      }
      // push reference to empty cloned node
      nodes[node.val].neighbors.push(nodes[neighboar.val]);

      // only skip processing neighboards multiple times
      // NOT filling neighboards of
      if (visited.has(neighboar.val)) {
        continue;
      }
      queue.push(neighboar);
      visited.add(neighboar.val); // early mark as visited
    }
  }

  return nodes[root.val];
};
