/* 
Design and implement a hash table which uses chaining (linked lists) to handle collisions

Suppose we are implementing a hash table that looks like Hash<K, V>. That is, the hash table maps
from objects of type K to objects of type V.

Another common implementation for a hash table is to use a binary search tree as the underlying
 data structure. Retrieving an element will no longer be 0(1) (although, technically it's not
0(1) if there are many collisions), but it prevents us from creating an unnecessarily large
array to hold items.


 */

class Cell<K, V> {
  key: K;
  value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }

  equivalent(otherKey: K): boolean {
    return this._equivalent(otherKey);
  }

  private _equivalent(otherKey: K): boolean {
    // Assuming key is an object with an 'equals' method
    // Implement the 'equals' method accordingly
    // For simplicity, we'll assume it always exists for now
    return this.key === otherKey;
  }

  getKey(): K {
    return this.key;
  }

  getValue(): V {
    return this.value;
  }
}

class Hash<K, V> {
  MAX_SIZE: number;
  items: Array<Array<Cell<K, V> | null>>;

  constructor() {
    this.MAX_SIZE = 10;
    this.items = new Array(this.MAX_SIZE).fill(null).map(() => []);
  }

  // Really, really stupid hash.
  hashCodeOfKey(key: K): number {
    return String(key).length % this.items.length;
  }

  put(key: K, value: V): void {
    const x = this.hashCodeOfKey(key);

    const collided = this.items[x];

    // Look for items with the same key and replace if found
    for (const c of collided) {
      if (c && c.equivalent(key)) {
        collided.splice(collided.indexOf(c), 1);
        break;
      }
    }

    const cell = new Cell(key, value);
    collided.push(cell);
  }

  get(key: K): V | null {
    const x = this.hashCodeOfKey(key);
    const collided = this.items[x];

    for (const c of collided) {
      if (c && c.equivalent(key)) {
        return c.getValue();
      }
    }

    return null;
  }
}

if (typeof module !== 'undefined' && module.parent) {
  // This block will not be executed when the script is imported as a module
  const hashTable = new Hash<string, number>();
  hashTable.put("this", 1);
  hashTable.put("coder", 2);
  hashTable.put("this", 4);
  hashTable.put("hi", 5);

  console.log(hashTable.get("this")); // Output: 4
  console.log(hashTable.get("coder")); // Output: 2
  console.log(hashTable.get("invalidKey")); // Output: null

  // Additional operations can be performed based on the use case
}
