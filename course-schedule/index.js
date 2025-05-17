/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
/**
numCourses = 2, prerequisites = [
    [1, 0]
    [1, 3]
]
(1) -> (0) -> X
  \
    -> (3) -> X


numCourses = 2, prerequisites = [
    [1,0],[0,1]
]

  / <- \
(1) -> (0)

^circular dependency


3
prerequisites =
[[1,0],[1,2],[0,1]]

  / -> \
(1) <- (0)
 \
   <- (2)


(0) <- (1)  <-  (2)
        |        ^
         \      /
          -> (3)


numCourses = 2, prerequisites = [
]

(1) -> X  => possible to finish
(0) -> X  => possible to finish

- convert prerequisities array to map for faster access

- check that there is AT LEAST ONE course that i can start without other
(start nodes)

- start traversing the graph using BFS queue

- keep track of all visited nodes to avoid circular traversal

- compare number of visited nodes to number of courses

Task:

- check that there are no ciruclar dependencies
- find start


(2) Recursive solution

Recursively determine whether specific course can be completed
- e.g. to finish course 0 - call finish on course 1 and 2

V - numsCourses
E - prerequisites.length
Time: O(V + E)
Space: O(V + E)

 */
// var canFinish = function(numCourses, prerequisites) {
//     const queue = [];
//     const visited = new Set();

//     const prerequisitesMap = {}; // backwards
//     const requisitesMap = {}; // forward
//     for (const prerequisite of prerequisites) {
//         prerequisitesMap[prerequisite[0]] = true;
//         // prerequisitesMap[prerequisite[0]] ??= [];
//         // prerequisitesMap[prerequisite[0]].push(prerequisite[1]); // need course 1 for 0

//         requisitesMap[prerequisite[1]] ??= [];
//         requisitesMap[prerequisite[1]].push(prerequisite[0]); // course 1 is needed for 0
//     }

//     for (let courseIndex = 0; courseIndex < numCourses; courseIndex++) {
//         // check whether this course needs any prerequisites
//         if (courseIndex in prerequisitesMap) {
//             continue;
//         }
//         // add courses without prerequisites to the queue
//         queue.push(courseIndex);
//         visited.add(courseIndex);
//     }

//     if (visited.size === 0) {
//         return false;
//     }

//     while (queue.length > 0) {
//         const course = queue.shift();

//         // if this course is required for other courses
//         if (course in requisitesMap) {
//             // iterate over all courses that depend on course
//             for (const nextCourse of requisitesMap[course]) {
//                 if (visited.has(nextCourse)) {
//                     continue;
//                 }
//                 visited.add(nextCourse);
//                 queue.push(nextCourse);
//             }
//         }
//     }

//     return visited.size === numCourses;
// };

class CircularCoursesError extends Error {}

var canFinish = function (numCourses, prerequisites) {
  const started = new Set();
  const finished = new Set();

  const prerequisitesMap = {};
  for (const prerequisite of prerequisites) {
    prerequisitesMap[prerequisite[0]] ??= [];
    prerequisitesMap[prerequisite[0]].push(prerequisite[1]); // need course 1 for 0
  }

  const finish = (course) => {
    if (finished.has(course)) {
      return;
    }

    if (started.has(course) && !finished.has(course)) {
      throw new CircularCoursesError();
    }

    started.add(course);
    if (course in prerequisitesMap) {
      for (const prerequisiteCourse of prerequisitesMap[course]) {
        finish(prerequisiteCourse);
      }
    }
    finished.add(course);
  };

  try {
    for (let course = 0; course < numCourses; course++) {
      finish(course);
    }
  } catch (error) {
    if (error instanceof CircularCoursesError) {
      return false;
    }
    throw error;
  }

  return finished.size === numCourses;
};
