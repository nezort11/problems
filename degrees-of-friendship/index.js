/** = Dijkstra algorithm without edge cost in non-direct cyclic graph (not Direct-Asyclic-Graph)

each user's friendships are represented by rows

and each column represents a user


           u0 u1 u2 u3
friends = [[0 1 0], u0
           [1 0 1], u1
           [0 1 0]] u2

u0 <-> u1 <-> u2
^              ^
|             /
V           /
u3 <-> u4 </

                        uA  uB
friend_distance(friends, 0, 1) # => 1  u0 => u1
friend_distance(friends, 1, 2) # => 1. u1 => u2
friend_distance(friends, 0, 2) # => 2.  u0 => u1 => u2
friend_distance(friends, 0, 3) # => -1 !!

Approach:

(1)
Matrix 2D = graph (loops, direct)

- Find shortest path from A to B in graph

- Dijkras  = BFS + visited set

u0 <-> u1 <-> u2
^              ^
|             /
V           /
u3 <-> u4 </

1.
visited []
queue [u0]

2.
visited [u0]
queue [u1, u3]

3.
visited [u0, u1, u3]
queue [u2, u4]
preQueue

4. found u2 in queue

now iteration count = shortest path // 2

Compelxity:

xxx N - number of "nodes" in graph
xxx Time: O(n)

N - nubmer of users
N^2 = graph edges (non-direct graph edges)

Time: O(N^2)
Space: O(N) = visited + queues // depends on numbers edges

Algorithm:

- create empty visited set , queue1, queue2 , iterCounter = 0

- pop all from queue1
if queue1 is empty then
    if queue2 is not empty:
        push all from queue2 to queue1
        iterCounter += 1

- poped element - find all edgest with other users

- if check that some edge is not in visited set (O(1))
    push all edges to the queue

- if popped element is userB = then return iterCounter
 */

function friendDistance(friends, userA, userB) {
  const visited = new Set();
  let queue1 = [userA];
  let queue2 = [];
  let iterCounter = 0;

  while (queue1.length > 0) {
    const user1 = queue1.pop();

    if (user1 === userB) {
      return iterCounter;
    }

    /**
u0 <-> u1 <-> u2
^              ^
|             /
V           /
u3 <-> u4 </

         [[0 1 0],
           [1 0 1],
           [0 1 0]]
 */

    // find all friendships
    for (let user2 = 0; user2 < friends.length; user2++) {
      const friendship = friends[user2][user1]; // 0 or 1
      if (friendship === 1) {
        if (visited.has(user2)) {
          continue;
        }
        queue2.push(user2);
      }
    }

    // after processed user1 - mark as visited
    visited.add(user1);

    if (queue1.length === 0) {
      if (queue2.length === 0) {
        return -1;
      }

      queue1 = queue2;
      queue2 = [];

      iterCounter++; // finished new path length iteration
    }
  }

  return -1;
}

// Russia
// debug your code below
const friends = [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0],
];

console.log(friendDistance(friends, 0, 1));
console.log(friendDistance(friends, 1, 2));
console.log(friendDistance(friends, 0, 2));
