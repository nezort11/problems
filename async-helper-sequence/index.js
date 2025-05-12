/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs) {
  return function (callback, data) {
    (async () => {
      let funcData = data;
      try {
        for (const func of funcs) {
          funcData = await new Promise((resolve, reject) => {
            func((error, data) => {
              if (error) {
                reject(error);
              } else {
                resolve(data);
              }
            }, funcData);
          });
        }

        callback(undefined, funcData);
      } catch (error) {
        callback(error, undefined);
      }
    })();
  };
}
