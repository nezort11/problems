// Implement Inheritance Using Prototypes:

// - Create a base constructor function, such as Animal, with a method like speak.
// - Define a derived constructor function, like Dog, and set its prototype to an instance of Animal to establish inheritance.
// - Add methods specific to Dog.prototype, and demonstrate that Dog instances inherit from Animal.

/*
prototype = definition

__proto__ = setPrototypeOf = pointer to definition
*/

function Animal() {}

Animal.prototype.speak = function () {
  console.log("Speak!");
};

Animal.prototype.speak2 = function () {
  console.log("Speak2!");
};

Animal.speak3 = () => {
  console.log("Speak3");
};

function Dog() {
  // // this.__proto__ = Animal.prototype;
  // const a = new Animal();
  // // this.__proto__ = a.__proto__;
}

console.assert(Dog === Dog.prototype.constructor);
console.assert(Object.is(Dog, Dog.prototype.constructor));

Dog.prototype.bark = function () {
  console.log("Bark!");
};

// Dog.prototype.speak = Animal.prototype.speak;
// Object.assign(Dog.prototype, Animal.prototype);
Dog.prototype.__proto__ = Animal.prototype;

console.assert(Dog.prototype.speak === Animal.prototype.speak);

console.log(Animal.prototype.speak);

const a = new Animal();
a.speak();
console.assert(a.__proto__ === Animal.prototype);

// console.log(a.);

// const d = new Dog();
// const d = Object.create(Dog.prototype);
const d = Object();
d.__proto__ = Dog.prototype;

// Object.setPrototypeOf(d, Animal.prototype);
// d.__proto__ = Animal.prototype;
//xxx d.prototype = Animal;
d.bark();
// console.log(d.__proto__)
d.speak();
d.speak2();
// d.speak3();
d.__proto__.__proto__.constructor.speak3();
