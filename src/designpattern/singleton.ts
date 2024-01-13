import { Mutex } from 'async-mutex';

class Singleton {
  private static lockLock: Mutex = new Mutex();
  private static lock: Mutex | null = null;
  private static instances: Map<typeof Singleton, Singleton> = new Map();

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  static getInstance<T extends Singleton>(
    this: new () => T,
    shared: boolean = true
  ): T {
    if (!Singleton.instances.has(this)) {
      const release = Singleton.lockLock.acquire();
      try {
        if (!Singleton.lock) {
          Singleton.lock = new Mutex();
        }
      } finally {
        release();
      }

      release = Singleton.lock.acquire();
      try {
        if (!Singleton.instances.has(this)) {
          const instance = new this();
          instance.__init__();
          Singleton.instances.set(this, instance);
          this.prototype.__init__ = function () {};
        }
      } finally {
        release();
      }
    }

    if (!shared) {
      if (Singleton.instances.get(this)?.__isShared === undefined) {
        Singleton.instances.get(this).__isShared = false;
      } else {
        throw new Error('Singleton is already created.');
      }
    }

    return Singleton.instances.get(this) as T;
  }

  private __init__(): void {
    // Initializations for the singleton instance
  }

  withLock<T>(callback: () => T): T {
    Singleton.lock?.acquire();
    try {
      return callback();
    } finally {
      Singleton.lock?.release();
    }
  }

  share(): void {
    Singleton.instances.get(this.constructor)?.__isShared = true;
  }
}

// Usage
class MySingleton extends Singleton {
  // Your code for the derived singleton class
}

const instance1 = MySingleton.getInstance();
const instance2 = MySingleton.getInstance();

console.log(instance1 === instance2); // Output: true

instance1.withLock(() => {
  // Perform operations with instance1 inside the lock
});

instance1.share();