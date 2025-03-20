export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

export default function classNames(...args: Array<ClassValue>): string {
  const classes = [];

  for (let arg of args) {
    // console.log("arg", arg);
    // recursively spread arrays and objects
    if (typeof arg === "object" && arg !== null) {
      let arrObject = [];
      if (Array.isArray(arg)) {
        arrObject = arg;
      } else {
        for (const [key, val] of Object.entries(arg)) {
          // true
          if (val) {
            arrObject.push(key);
          }
        }
      }

      arg = classNames(...arrObject);
    }

    // only non-empty strings and non-zero/nan numbers
    if ((typeof arg === "string" || typeof arg === "number") && arg) {
      classes.push(arg);
    }
  }

  return classes.join(" ");
}

console.log(classNames("foo", "bar")); // 'foo bar'
console.log(classNames("foo", { bar: true })); // 'foo bar'
console.log(classNames({ "foo-bar": true })); // 'foo-bar'
console.log(classNames({ "foo-bar": false })); // ''
console.log(classNames({ foo: true }, { bar: true })); // 'foo bar'
console.log(classNames({ foo: true, bar: true })); // 'foo bar'
console.log(classNames({ foo: true, bar: false, qux: true })); // 'foo qux'
