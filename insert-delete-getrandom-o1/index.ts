const rand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class IndexedSet<T> {
  private values: Map<T, number>;
  private indices: Map<number, T>;
  private length_: number;

  constructor() {
    this.values = new Map();
    this.indices = new Map();
    this.length_ = 0;
  }

  add(value: T) {
    if (this.values.has(value)) {
      return;
    }

    this.values.set(value, this.length_);
    this.indices.set(this.length_, value);
    this.length_ += 1;
  }

  remove(value: T) {
    if (!this.values.has(value)) {
      return;
    }

    const index = this.values.get(value)!;
    const lastValue = this.indices.get(this.length_ - 1)!;
    this.indices.set(index, lastValue);
    this.values.set(lastValue, index);
    this.values.delete(value);
    this.indices.delete(this.length_ - 1);
    this.length_ -= 1;
  }

  has(value: T) {
    return this.values.has(value);
  }

  get(index: number) {
    return this.indices.get(index);
  }

  get length() {
    return this.length_;
  }
}

class RandomizedSet {
  private indexedSet: IndexedSet<number>;

  constructor() {
    this.indexedSet = new IndexedSet();
  }

  insert(val: number): boolean {
    if (this.indexedSet.has(val)) {
      return false;
    }

    this.indexedSet.add(val);
    return true;
  }

  remove(val: number): boolean {
    if (!this.indexedSet.has(val)) {
      return false;
    }

    this.indexedSet.remove(val);
    return true;
  }

  getRandom(): number {
    const randomIndex = rand(0, this.indexedSet.length - 1);

    return this.indexedSet.get(randomIndex);
  }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

const val = 8;

var obj = new RandomizedSet();
var param_1 = obj.insert(val);
console.log(param_1);
var param_2 = obj.remove(val);
console.log(param_2);
obj.insert(9);
obj.insert(19);
obj.insert(119);
obj.insert(99);
var param_3 = obj.getRandom();
console.log(param_3);
