// Необходимо реализовать метод groupBy, расширяющий стандартные методы массивов.
// Метод должен возвращать сгруппированную версию массива - объект,
// в котором каждый ключ является результатом выполнения переданной функции fn(arr[i]),
// а каждое значение - массивом, содержащим все элементы исходного массива с этим ключом.

Array.prototype.groupBy = function (func) {
  const group = {}; // hashmap for primitive or Map for non-primitive
  for (const item of this) {
    // or using for index, forEach, reduce
    const key = func(item); // key is primitive? or non-primitive?
    if (key in group) {
      // key in object, hasOwnProperty(key)
      group[key].push(item);
    } else {
      group[key] = [item];
    }
  }
  return group;
};

// Пример 1
const array1 = [{ id: 1 }, { id: 1 }, { id: 2 }];

const fn = (item) => item.id;

console.log(array1.groupBy(fn));
// {
//   1: [{ id: 1 }, { id: 1 }],
//   2: [{ id: 2 }]
// }

// Пример 2
const array2 = [1, 2, 3];
console.log(array2.groupBy(String)); // { "1": [1], "2": [2], "3": [3] }

// Пример 3
const array3 = [3.3, 0.5, 1.4];
console.log(array3.groupBy(Math.round)); // { "3": [3.3], "1": [0.5, 1.4] }
