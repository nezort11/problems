const isAnyObject = (val) =>
  (typeof val === "object" || typeof val === "function") && val !== null;

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function isEqual(a, b) {
  // primitives, objects, NaN, 0/-0
  if (Object.is(a, b)) {
    return true;
  }
  // no sense for deep equal if one or both are primitives
  if (!(isAnyObject(a) && isAnyObject(b))) {
    return false;
  }
  // if one of the values is array
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) {
    return false; // Object.prototype !== Array.prototype
  }

  const aKeys = Reflect.ownKeys(a);
  const bKeysLength = Array.isArray(b)
    ? b.length
    : Reflect.ownKeys(b).length;
  if (aKeys.length !== bKeysLength) {
    return false; // different number of keys
  }

  // iterate over property keys and symbols
  for (const key of aKeys) {
    const av = a[key];
    const bv = b[key];

    // if both values are circular to self
    if (a === av && b === bv) {
      continue;
    }
    // if one of the values is circular to self
    // if ((a === av) !== (b === bv)) {
    //   return false;
    // }

    if (!isEqual(av, bv)) {
      return false;
    }
  }

  return true;
}
// function deepEqual(valueA, valueB) {
//   if (isPrimitive(valueA) || isPrimitive(valueB)) {
//     return valueA === valueB;
//   }

//   // object, object
//   if (Object.getPrototypeOf(valueA) !== Object.getPrototypeOf(valueB)) {
//     return false;
//   }
//   if (getObjectLength(valueA) !== getObjectLength(valueB)) {
//     return false;
//   }

//   for (const key in valueA) {
//     const va = valueA[key];
//     const vb = valueB[key];
//     if (!deepEqual(va, vb)) {
//       return false;
//     }
//   }

//   return true;
// }

/**
 * @param {(path: string, config: any) => Promise<any>} getAPI
 * @returns {(path: string, config: any) => Promise<any> & {clearCache: () => void}}
 */
/**
 *
 * Check if there is anythign in cache
 * => if there is then
 *  Check if 1000ms is not passed yet
 *  => if passed => delete the cache entry (invalidate) and continue
 * if not return cache entry
 *
 * if nothing in cache
 *
 * execute getAPI
 *
 *  save result into cache + save the time of the result
 *
 *
 *
 */
function createGetAPIWithMerging(getAPI) {
  // let cache = {};
  let cacheQueue = []; // 5 at max

  const findCacheIndex = (key) => {
    for (let i = 0; i < cacheQueue.length; i++) {
      const cacheQueueItem = cacheQueue[i];
      if (isEqual(cacheQueueItem[0], key)) {
        // cacheQueueItem[1] = val;
        console.log("cacheQueueItem === key", cacheQueueItem[0], key);
        return i;
      }
    }
  };

  const upsertCache = (key, val) => {
    const cacheQueueItemIndex = findCacheIndex(key);
    if (cacheQueueItemIndex === undefined) {
      cacheQueue.push([key, val]);
    } else {
      const cacheQueueItem = cacheQueue[cacheQueueItemIndex];
      cacheQueueItem[1] = val;
    }

    if (cacheQueue.length > 5) {
      cacheQueue.shift();
    }
  };

  const getAPIWithMerging = async (...args) => {
    // const argsKey = JSON.stringify(args);
    // if (argsKey in cache) {
    console.log("args", args);
    console.log("cacheQueue", cacheaQueue);
    const cacheItemIndex = findCacheIndex(args);
    console.log("cacheItemIndex", cacheItemIndex);
    if (cacheItemIndex !== undefined) {
      // const argsCache = cache[argsKey];
      const argsCache = cacheQueue[cacheItemIndex][1];

      const argsCacheTime = argsCache.time;
      // elapsed more than 1000ms
      if (Date.now() - argsCacheTime >= 1000) {
        // delete cache[argsKey];
        cacheQueue.splice(cacheItemIndex, 1);
      } else {
        return argsCache.value; // value or promise
      }
    }

    const resultPromise = getAPI(...args);
    // cache[argsKey] = { time: Date.now(), value: resultPromise };
    upsertCache(args, { time: Date.now(), value: resultPromise });

    const result = await resultPromise;
    // cache[argsKey] = { time: Date.now(), value: result };
    upsertCache(args, { time: Date.now(), value: result });

    return result;
  };
  getAPIWithMerging.clearCache = () => {
    cacheQueue = [];
  };

  return getAPIWithMerging;
}

// const getAPIWithMerging = createGetAPIWithMerging(() => {
//   return Promise.resolve(123);
// })

// getAPIWithMerging('path').then((data) => console.log('data', data));

// const spy = jasmine.createSpy('getAPI')

// let counter = 0

// const getAPI2 = () => {
//   // spy()
//   counter++;
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(1), 100)
//   })
// }
// const getAPIWithMerging = createGetAPIWithMerging(getAPI2)
// getAPIWithMerging('/list', {type: 'bfe', filter:'dev', list: [1,2,3]})
// getAPIWithMerging('/list2', {type: 'bfe', filter:'dev', list: [1,2,3]})
// getAPIWithMerging('/list3', {type: 'bfe', filter:'dev', list: [1,2,3]})
// setTimeout(() => {
//   console.log('counter', counter);
//   // expect(spy.calls.all().length).toBe(3)
//   // done()

// }, 10)

// const spy = jasmine.createSpy('getAPI')

let counter = 0;
const getAPI2 = () => {
  // spy()
  counter++;
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), 100);
  });
};
const getAPIWithMerging = createGetAPIWithMerging(getAPI2);
Promise.all([
  getAPIWithMerging("/list", { type: "bfe" }),
  getAPIWithMerging("/list", { type: "bfe" }),
]).then(
  (data) => {
    // expect(data).toEqual([1,1])
    console.log("data", data);
    // expect(spy.calls.all().length).toBe(1)
    console.log("counter", counter);
    done();
  },
  (error) => {
    // const errorSpy = jasmine.createSpy('error callback')
    // errorSpy()
    // expect(errorSpy).not.toHaveBeenCalled()
    // done()
    console.log("error", error);
  }
);
