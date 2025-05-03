/*
https://leetcode.com/problems/promise-time-limit/description/
and yandex

Дана асинхронная функция fn и время t в миллисекундах, нужно вернуть новую версию этой функции,
выполнение которой ограничено заданным временем. Функция fn принимает аргументы,
переданные в эту новую функцию.

Возвращаемая функция работает по следующим правилам:

- если fn выполнится за заданное время t, то функция резолвит полученные данные
- если fn не выполнится за заданное время t, то функция реджектит строку "Time limit exceeded"
*/

/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
const timeLimited = function (fn, t) {
  return function (...args) {
    let timeoutId = undefined;

    return Promise.race([
      fn.call(this, ...args),

      new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => reject("Time limit exceeded"), t);
      }),
    ]).finally(() => clearTimeout(timeoutId));
  };
};

const asyncF = () => {
  return new Promise((resolve, reject) => setTimeout(resolve, 2000));
};

const fLimited = timeLimited(asyncF, 1000);

try {
  console.log(fLimited());
} catch (error) {
  console.error(error);
}
