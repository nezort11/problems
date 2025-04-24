/*********************************************************
 * CODE INSTRUCTIONS:                                    *
 * 1) The method findLargestSmallerKey you're            *
 *    asked to implement is located at line 26.          *
 * 2) Use the helper code below to implement it.         *
 * 3) In a nutshell, the helper code allows you to       *
 *    to build a Binary Search Tree.                     *
 * 4) Jump to line 71 to see an example for how the      *
 *    helper code is used to test findLargestSmallerKey. *
 *********************************************************/

/**
 *
 * Cases:
 *
 * - nodes >= 0
 * - num = 0 => -1

 * - num = 1 => find 0
 * - num = 2 => find 0, 1
 * - num = 3 => find 0, 1, 2
 *
 * - num = 7, bst = 20, 9, 25  => -1
 *
 *
 * Approach:
 *
 * - bst search, recursion , custom condition?
 *
 * - get the root (20)
 * - compare root (20) to num (7)
 * if num < root || num = root - return go left (recursive call)
 *
 * if num > root - then
 *  if right < num then
 *   return - go right (recursive call)
 * else
 *   return root
 *
 * - if root have no left/right =>
 *  if root < num => return root
 * else -1
 *
 * Time: O(log n)
 * Space: O(1) - callstack => O(log n) calls
 */

// Constructor to create a new Node
function Node(key) {
  this.key = key;
  this.parent = null;
  this.left = null;
  this.right = null;
}

// Constructor to create a new BST
function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.findLargestSmallerKey = function (num) {
  if (num === 0 || !this.root) {
    return -1;
  }

  console.log("root", this.root.key, "num", num);
  if (num <= this.root.key) {
    if (!this.root.left) {
      return -1;
    } else {
      console.log("recursion?");
      // recursive
      // const leftBst =
      this.root = this.root.left;
      return this.findLargestSmallerKey(num);
    }
  } else {
    console.log("here?");
    if (!this.root.right) {
      return this.root.key;
    } else {
      const currentRootKey = this.root.key;
      this.root = this.root.right;
      const rightRootKey = this.findLargestSmallerKey(num);
      console.log(
        "currentRootKey",
        currentRootKey,
        "rightRootKey",
        rightRootKey
      );
      return Math.max(currentRootKey, rightRootKey);
    }
  }
};

// Creates a new node by a key and inserts it to the BST
BinarySearchTree.prototype.insert = function (key) {
  var root = this.root;

  // 1. If the tree is empty, create the root
  if (!root) {
    this.root = new Node(key);
    return;
  }

  // 2) Otherwise, create a node with the key
  //    and traverse down the tree to find where to
  //    to insert the new node
  var currentNode = root;
  var newNode = new Node(key);

  while (currentNode !== null) {
    if (key < currentNode.key) {
      if (!currentNode.left) {
        currentNode.left = newNode;
        newNode.parent = currentNode;
        break;
      } else {
        currentNode = currentNode.left;
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = newNode;
        newNode.parent = currentNode;
        break;
      } else {
        currentNode = currentNode.right;
      }
    }
  }
};

/*********************************************
 * Driver program to test above function     *
 *********************************************/

// Create a Binary Search Tree
var bst = new BinarySearchTree();
// bst.insert(20);
// bst.insert(9);
// bst.insert(25);
// bst.insert(5);
// bst.insert(12);
// bst.insert(11);
// bst.insert(14);

bst.insert(8);
bst.insert(5);
bst.insert(4);
bst.insert(9);
bst.insert(7);
bst.insert(11);
bst.insert(1);
bst.insert(12);
bst.insert(3);
bst.insert(2);

var result = bst.findLargestSmallerKey(11);

console.log("Largest smaller number is " + result);
