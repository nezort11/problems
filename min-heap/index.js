/**
How to get minimul element:

- sorting - O(N logN)

- min heap? - (logN)


- hash map?
- another stack or array?

=> O(1) => hash map?

what i can do in O(1) on push , pop

1) push - ?
{
    [val] - ?
}

 */

var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  const min = this.minStack[this.minStack.length - 1] ?? Infinity;
  this.minStack.push(Math.min(val, min));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.minStack.pop();
  return this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
