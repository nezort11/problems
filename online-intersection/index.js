/*
Даны два отсортированных списка с интервалами присутствия
пользователей в онлайне в течение дня. Начало интервала строго меньше конца.
Нужно вычислить интервалы, когда оба пользователя были в онлайне.
Интервалы указаны в часах, считаем что могут быть часы от 0 до 24.

Кейсы:
- [], [] => never
- [] => never

- i >=0  && i <= 24

- [[0, 0]] => never
- [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], ...]


Подходы:

m - логов пользователя 1
n - логов пользователя 2

1 брут форс - O(m + n * m) = O(m * (1 + n)) = O(mn) = O(k^2)

- быстрее O(n) - не получится?, так как все равно по одному из них придется пройтись

2 два указателя на первом интервале и на втором
(так как отсортированы - можем спокойно двигать в право)

O(m + n)


Алгоритм:
= понять какой из отрезков лишний на данный момент и не пересекается

Отрезки могут:
1 не пересекаться
- пока что - один из отрезков в будущем
- никогда - один из отрезков в сильном прошлом

2 пересекаться
- только с одним из отрезков
- сколько угодно пересечений


Визуализация:
-------*******-------**************----------
***--------****---******---****-***--***-----

1 пересекаются
2 не пересекаются

- до
- после
- внутри
- пересекается


поставить указатель на первый массив на первый лог времени
*/

// end - exclusive (до 15:00 - 14:59)
function intersect(start1, end1, start2, end2) {
  if (start2 < end1 && end2 > start1) {
    const startIntersection = Math.max(start1, start2);
    const endIntersection = Math.min(end1, end2);
    return [startIntersection, endIntersection];
  } else {
    return [];
  }
}

function intersection(user1, user2) {
  let ptr1 = 0;
  let ptr2 = 0;
  const resultIntersect = [];

  while (ptr1 < user1.length && ptr2 < user2.length) {
    console.log("ptr1, ptr2", ptr1, ptr2);
    const [userStart1, userEnd1] = user1[Math.min(user1.length - 1, ptr1)];
    const [userStart2, userEnd2] = user2[Math.min(user2.length - 1, ptr2)];

    const userIntersect = intersect(
      userStart1,
      userEnd1,
      userStart2,
      userEnd2
    );
    if (userIntersect.length > 0) {
      resultIntersect.push(userIntersect);
    }

    if (ptr1 >= user1.length) {
      ptr2 += 1;
      continue;
    }
    if (ptr2 >= user2.length) {
      ptr1 += 1;
      continue;
    }

    if (userEnd2 < userEnd1) {
      ptr2 += 1;
    } else {
      ptr1 += 1;
    }
  }
  return resultIntersect;
}

console.log(
  intersection(
    [
      [8, 12],
      [17, 22],
    ],
    [
      [5, 11],
      [14, 18],
      [20, 23],
    ]
  )
); // [[8, 11], [17, 18], [20, 22]]

console.log(
  intersection(
    [
      [9, 15],
      [18, 21],
    ],
    [
      [10, 14],
      [21, 22],
    ]
  )
); // [[10, 14]]
