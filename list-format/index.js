/** Format list
 *
 * - unique - filter elements and remove duplicates
 * - sort - sort in alphabetic order (A-Z)
 * - length - number of items displayed full
 *
 * Items edge cases:
 * - no items => empty string
 * - only 1 item => return item
 *

 */

/**
 * @param {Array<string>} items
 * @param {{sorted?: boolean, length?: number, unique?: boolean}} [options]
 * @return {string}
 */
function listFormat(items, options = {}) {
  /**
   * Items cases:
   * - items length = 0 => empty string
   * - items length = 1 => item
   * - items length = 2 => "and"
   * - items length > 2 => "," + "and"
   */
  if (options.length <= 0) {
    options.length = undefined;
  }

  let resultItems = items.filter((item) => item);
  if (options.unique) {
    const itemsSet = new Set();
    const uniqueItems = [];
    for (const item of resultItems) {
      if (!itemsSet.has(item)) {
        uniqueItems.push(item);
        itemsSet.add(item);
      }
    }
    resultItems = uniqueItems;
  }
  if (options.sorted) {
    resultItems.sort();
  }

  if (resultItems.length === 0) {
    return "";
  }
  if (resultItems.length === 1) {
    return items[0];
  }

  /** Length cases:
   * - items.length = 3, length = 2 => <1 other>
   * - items.length = 3, length = 3 => <normal>
   * - items.length = 3, length = 4 => <normal>
   */

  let leftItemsLength = resultItems.length - 1;
  if (options.length && options.length < resultItems.length) {
    leftItemsLength = options.length;
  }
  const leftItems = resultItems.slice(0, leftItemsLength);

  let rightItemsFormatted;
  if (options.length && options.length < resultItems.length) {
    const rightItemsLength = resultItems.length - leftItems.length;
    rightItemsFormatted = `${rightItemsLength} ${
      rightItemsLength === 1 ? "other" : "others"
    }`;
  } else {
    rightItemsFormatted = resultItems?.at(-1);
  }

  return leftItems.join(", ") + " and " + rightItemsFormatted;
}

console.log(listFormat([]) === ""); // ''

console.log(listFormat(["Bob"])); // 'Bob'
console.log(listFormat(["Bob", "Alice"])); // 'Bob and Alice'

console.log(listFormat(["Bob", "Ben", "Tim", "Jane", "John"]));
// 'Bob, Ben, Tim, Jane and John'

console.log(
  "lol",
  listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
    length: 100,
  })
); // 'Bob, Ben, Tim and 2 others'

console.log(
  listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
    length: 4,
  })
); // 'Bob, Ben, Tim, Jane and 1 other'

console.log(
  listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
    length: 3,
    sorted: true,
  })
); // 'Ben, Bob, Jane and 2 others'

console.log(
  listFormat(["Bob", "Ben", "Tim", "Jane", "John", "Bob"], {
    length: 3,
    unique: true,
  })
); // 'Bob, Ben, Tim and 2 others'

console.log(
  listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
    length: 3,
    unique: true,
  })
); // 'Bob, Ben, Tim and 2 others'

console.log(listFormat(["Bob", "Ben", "", "", "John"])); // 'Bob, Ben and John'
