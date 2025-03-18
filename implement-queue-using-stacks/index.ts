// Implement 1 FIFO (queue ~ linked list) using 2 LIFOs (stacks ~ array)

class MyQueue {
  private stack1: number[] = [];
  private stack2: number[] = [];

  constructor() {}

  push(x: number): void {
    this.stack1.push(x);
    console.log(this.stack1);
  }

  private reverseCloneCacheStack() {
    const stackLength = this.stack1.length;
    for (let i = 0; i < stackLength; i++) {
      this.stack2.push(this.stack1.pop());
    }
  }

  pop(): number {
    if (this.stack2.length === 0) {
      this.reverseCloneCacheStack();
    }
    return this.stack2.pop();
  }

  peek(): number {
    if (this.stack2.length === 0) {
      this.reverseCloneCacheStack();
    }
    console.log(this.stack2);
    return this.stack2.at(-1);
  }

  empty(): boolean {
    return this.stack1.length + this.stack2.length === 0;
  }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

const myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
console.log(myQueue.peek()); // return 1
console.log(myQueue.pop()); // return 1, queue is [2]
console.log(myQueue.empty()); // return false
