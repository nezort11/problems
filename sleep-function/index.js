/**
 * Необходимо написать асинхронную функцию,
 * которая будет "спать" заданное количество миллисекунд,
 * а потом успешно завершаться
 */

function sleep(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}

const startTime = Date.now();

sleep(100).then(() => console.log(Date.now() - startTime));
// Выведет примерно 100
