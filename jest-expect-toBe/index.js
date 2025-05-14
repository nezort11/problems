/**
 * interface Matcher {
 *  toBe(data: any): void
 * }
 */
/**
 * @param {any} input
 * @returns {Matcher & {not: Matcher}}
 */
function myExpect(input) {
  return {
    toBe: (value) => {
      if (!Object.is(input, value)) {
        throw new Error();
      }
    },
    not: {
      toBe: (value) => {
        if (Object.is(input, value)) {
          throw new Error();
        }
      },
    },
  };
}
