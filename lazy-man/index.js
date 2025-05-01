// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

const delay = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */
function LazyMan(name, logFn) {
  const queue = [`Hi, I'm ${name}.`];

  const laziness = {
    eat(food) {
      queue.push(`Eat ${food}.`);
      return laziness;
    },
    sleep(time) {
      queue.push(time);
      return laziness;
    },
    sleepFirst(time) {
      queue.unshift(time);
      return laziness;
    },
  };

  queueMicrotask(async () => {
    while (queue.length > 0) {
      const task = queue.shift();
      if (typeof task === "string") {
        logFn(task);
      } else {
        await delay(task);
        logFn(
          `Wake up after ${task} ${task === 1 ? "second" : "seconds"}.`
        );
      }
    }
  });

  return laziness;
}

// LazyMan('Jack', console.log)

// LazyMan('Jack', console.log)
//   .eat('banana')
//   .eat('apple')
// // Hi, I'm Jack.
// // Eat banana.
// // Eat Apple.

// LazyMan('Jack', console.log)
//   .eat('banana')
//   .sleep(10)
//   .eat('apple')
//   .sleep(1)
// // Hi, I'm Jack.
// // Eat banana.
// // Wake up after 10 seconds.
// // Eat Apple.
// // Wake up after 1 second.

LazyMan("Jack", console.log).eat("banana").sleep(1).eat("apple");

// LazyMan('Jack', console.log)
//   .eat('banana')
//   .sleepFirst(10)
//   .eat('apple')
//   .sleep(1)
// // Wake up after 10 seconds.
// // Hi, I'm Jack.
// // Eat banana
// // Eat apple
// // Wake up after 1 second.
