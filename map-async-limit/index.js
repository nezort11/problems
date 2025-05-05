/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * Cases:
 * - [1, 2, 3, 4, 5], size = 3
 * - [1, 2, 3], size = 10
 * - [], size = 100
 * - [1, 2, 3, ..., 100], size = 1
 * - [1, 2, 3, 4, 5], size = undefined
 *
 * @return {Promise}
 */
export default function mapAsyncLimit(iterable, callbackFn, size) {
  if (iterable.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    // Create `size` number of macrotasks using callbackFn + iterable item
    const chunkSize = Math.min(
      iterable.length,
      size ?? Number.POSITIVE_INFINITY
    );

    const results = [];
    let itemsProcessed = 0;

    let itemIteratorIndex = chunkSize - 1;
    let itemError;
    const abortController = new AbortController();
    const processItem = (itemIndex) => {
      const item = iterable[itemIndex];
      callbackFn(item)
        .then((result) => {
          // cancel resolve logic if error occuried
          // IDEALLY: create an abort controller for each of processItem
          if (abortController.signal.aborted) {
            return;
          }

          // Save item result to the specific item index
          results[itemIndex] = result;
          itemsProcessed += 1;

          // if there is a next item in the iterator
          if (iterable.length > itemIteratorIndex + 1) {
            itemIteratorIndex += 1;
            processItem(itemIteratorIndex);
          } else {
            // if all items were resolved and not more in the queue (very last macrotask)
            if (itemsProcessed === iterable.length) {
              resolve(results);
            } else {
              // wait for all other macrotasks to resolve
            }
          }
        })
        .catch((error) => {
          abortController.abort();
          reject(error);
        });
    };

    for (let itemIndex = 0; itemIndex < chunkSize; itemIndex += 1) {
      processItem(itemIndex);
    }
  });
}

async function fetchUpperCase(q: string) {
  // Fake API service that converts a string to uppercase.
  const res = await fetch("https://uppercase.com?q=" + q);
  return await res.text();
}

// Only a maximum of 2 pending requests at any one time.
const results = await mapAsyncLimit(
  ["foo", "bar", "qux", "quz"],
  fetchUpperCase,
  2
);
console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
