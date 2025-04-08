/** Deep Clone
 *
 * Input
 * - primitive
 * - non-primitive
 *
 * Output:
 * - primitive
 * - unique non-primitive
 *
 *
 * - If value is primitive then return primitive
 * - If value is non-primitive then:
 * 1 create new object with the same prototype as original one
 * 2 deep-clone all properties into new object
 * 3 return object
 */

/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
  if (!(typeof value === "object" && value !== null)) {
    return value;
  }

  const clonedValue = Object.create(Object.getPrototypeOf(value));
  for (const key of Object.keys(value)) {
    clonedValue[key] = deepClone(value[key]);
  }
  return clonedValue;
}

const obj1 = { user: { role: "admin" } };
const clonedObj1 = deepClone(obj1);

clonedObj1.user.role = "guest"; // Change the cloned user's role to 'guest'.
clonedObj1.user.role; // 'guest'
obj1.user.role; // Should still be 'admin'.

const obj2 = { foo: [{ bar: "baz" }] };
const clonedObj2 = deepClone(obj2);

obj2.foo[0].bar = "bax"; // Modify the original object.
obj2.foo[0].bar; // 'bax'
clonedObj2.foo[0].bar; // Should still be 'baz'.
