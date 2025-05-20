/**
252. Meeting Rooms
Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), determine if a person could attend all meetings.

Example 1:

Input: [[0,30],[5,10],[15,20]]
Output: false

0   5   10    15    20    30
|**************************|

0   5   10    15    20    30
    ******    ********

Example 2:

Input: [[7,10],[2,4]]
Output: true

2    4      7   10
|****|      |****|


NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.


Подходы:

N - количество интервалов

(1) Брут форс - перебор всех интервалов со всеми другими
Время: O(<<N^2), Память: O(1)

- проверять что каждый интервал не пересекается с каждым из правых

e.g.

N = 4
Время: 6
[[1, 2], [4, 5], [8, 9], [11, 12]]


(2)
Время: O(N logN) , Память: O(N) (зависит от алгоритма сортировки)

К примеру - отсортировать все интервалы и смотреть пересекается ли каждый интервал с близ лежащим интервалом

2    4      7   10      12  14
|****|      |****|      |****|

(3) Время: O(N) - ?



 */

// const intersect = (a, b, a2, b2) => {
//   if (a2 > b || b2 < a) {
//     return false;
//   }
//   return true;
// };

function canAttendMeetings(intervals) {
  // if (intervals.length === 1) {
  //   return true;
  // }

  // sort intervals based on start time
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    const prevInterval = intervals[i - 1];
    const currInterval = intervals[i];
    if (currInterval[0] > prevInterval[1]) {
      return false;
    }
  }

  return true;
}
