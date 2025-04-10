/** Function.prototype.call clone  // function runtime invoketion
 *
 * Function.prototype.call(func, this, arguments)
 */

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
  const functionInvokeId = Symbol();
  thisArg = thisArg || globalThis;
  thisArg[functionInvokeId] = this;
  try {
    return thisArg[functionInvokeId](...argArray);
  } finally {
    delete thisArg[functionInvokeId];
  }
};

function Dog(name, weight) {
  this.name = name;
  this.weight = weight;
}

const pet = { color: "red" };

Dog.myCall(pet, "Snoopy", 14);

console.log("pet", pet);
