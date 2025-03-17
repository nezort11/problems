/*
https://chatgpt.com/c/677c0b9f-3594-8012-9e7a-d0f431018794

---

### **Problem: Build a Custom Object-Oriented Framework**

**Description:**
You are tasked with building a lightweight object-oriented framework in JavaScript that mimics some of the behavior of modern class-based programming using prototypes. The framework should allow developers to define "classes," create instances, and support inheritance. You cannot use ES6 `class` syntax; instead, you must rely on JavaScript prototypes.

---

**Requirements:**

1. **Define a "Class":**
   - Create a function `createClass` that defines a new "class." It should take a constructor function and an optional prototype object that defines methods or properties for the class.

2. **Instance Creation:**
   - Implement a `newInstance` method for creating new instances of the class. Ensure the instances inherit from the class prototype.

3. **Inheritance:**
   - Support inheritance so that one "class" can extend another. Implement a method like `extendClass` to achieve this.

4. **Method Overriding and Super Calls:**
   - Allow derived classes to override methods of their parent class. Provide a way to call the parent class's method from the overridden method (e.g., `super` functionality).

5. **Prototype Chain Exploration:**
   - Provide utility functions to inspect the prototype chain of an object, like `getPrototypeChain` which returns an array of prototypes up to `Object.prototype`.

---

**Example Usage:**

```javascript
// Step 1: Define a base class
const Animal = createClass(function (name) {
    this.name = name;
}, {
    speak: function () {
        return `${this.name} makes a noise.`;
    }
});

// Step 2: Create an instance
const dog = newInstance(Animal, "Dog");
console.log(dog.speak()); // Output: "Dog makes a noise."

// Step 3: Extend the class
const Dog = extendClass(Animal, function (name, breed) {
    Animal.call(this, name); // Call the parent constructor
    this.breed = breed;
}, {
    speak: function () {
        return `${this.name} barks.`;
    }
});

// Step 4: Create a derived instance
const beagle = newInstance(Dog, "Beagle", "Hound");
console.log(beagle.speak()); // Output: "Beagle barks."

// Step 5: Inspect prototype chain
console.log(getPrototypeChain(beagle));
// Output: [Dog.prototype, Animal.prototype, Object.prototype]
```

---

### **Stretch Goals:**

1. **Method Chaining:**
   - Add support for method chaining by making methods return `this` where applicable.

2. **Private Properties:**
   - Implement a way to add private properties to instances, accessible only via closures.

3. **Mixins:**
   - Support mixins to allow multiple inheritance-like behavior by merging properties from multiple sources into a class.

4. **Custom Prototypes:**
   - Allow users to specify custom prototypes beyond the typical inheritance hierarchy.

---

This problem involves creating, using, and manipulating prototypes in a variety of ways, helping you deeply understand their mechanics and applications. Would you like an example implementation or further breakdown of any part?
*/

function createClass(construct, proto = Object()) {
  const c = new Function();
  c.prototype.constructor = construct;
  c.prototype.__proto__ = proto;
  // c.__proto__ = proto;
  // c.constructor = construct;
  // prototype.constructor = ;
  // c.call()
  // c.call(1);
  return c;
}

function extendClass(cls, construct, proto) {
  cls.__proto__ = proto;
  cls.constructor = construct;
  return cls;
}

function newInstance(cls, ...args) {
  return new cls.constructor(...args);
}

const Animal = createClass(
  function (name) {
    this.name = name;
  },
  {
    speak: function () {
      return `${this.name} makes a noise.`;
    },
  }
);

console.log(Animal.call);

const Dog = extendClass(
  Animal,
  function (name, breed) {
    Animal.call(this, name); // Call the parent constructor
    this.breed = breed;
  },
  {
    speak: function () {
      return `${this.name} barks.`;
    },
  }
);

const beagle = newInstance(Dog, "Beagle", "Hound");
