/* """
A condition identifies a change of state in the application. This is a synchronization
mechanism where a thread waits for a specific condition and another thread notifies that this
condition has taken place. Once the condition takes place, the thread acquires the lock to get
exclusive access to the shared resource.
""" */

import { Worker, isMainThread, parentPort, workerData, threadId } from 'worker_threads';

export class Mutex {
  locked: boolean;
  queue: never[];
  cond: Condition;
  
  constructor() {
    this.locked = false;
    this.queue = [];
  }

  lock() {
    return new Promise((resolve) => {
      const tryLock = () => {
        if (!this.locked) {
          this.locked = true;
          resolve();
        } else {
          setImmediate(tryLock);
        }
      };
      tryLock();
    });
  }

  unlock() {
    this.locked = false;
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    }
  }
}

export class Condition {
  waiting: never[];
  constructor() {
    this.waiting = [];
  }

  wait(mutex) {
    return new Promise((resolve) => {
      const signal = () => {
        mutex.unlock();
        resolve();
      };

      this.waiting.push(signal);

      if (this.waiting.length === 1) {
        mutex.unlock();
      }
    });
  }

  signal() {
    if (this.waiting.length > 0) {
      const next = this.waiting.shift();
      setImmediate(next);
    }
  }
}

const items = [];
const mutex = new Mutex();
mutex.cond = new Condition();

class Consumer {
  async consume() {
    await mutex.lock();

    if (items.length === 0) {
      console.log("Consumer notify: no item to consume");
      await mutex.cond.wait(mutex);
    }

    items.pop();
    console.log("Consumer notify: consumed 1 item");
    console.log("Consumer notify: items to consume are", items.length);
    mutex.cond.signal();
    mutex.unlock();
  }

  async run() {
    for (let i = 0; i < 20; i++) {
      await this.sleep(10);
      await this.consume();
    }
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export class Producer {
  async produce() {
    await mutex.lock();

    if (items.length === 10) {
      console.log("Producer notify: items produced are", items.length);
      console.log("Producer notify: stop the production!!");
      await mutex.cond.wait(mutex);
    }

    items.push(1);
    console.log("Producer notify: total items produced", items.length);

    mutex.cond.signal();
    mutex.unlock();
  }

  async run() {
    for (let i = 0; i < 20; i++) {
      await this.sleep(5);
      await this.produce();
    }
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

if (isMainThread) {
  const producer = new Worker(__filename);
  const consumer = new Worker(__filename);

  producer.postMessage({ type: 'producer' });
  consumer.postMessage({ type: 'consumer' });

  producer.on('exit', () => console.log('Producer thread exited.'));
  consumer.on('exit', () => console.log('Consumer thread exited.'));
} else {
  const { type } = workerData;
  if (type === 'producer') {
    const producer = new Producer();
    producer.run();
  } else if (type === 'consumer') {
    const consumer = new Consumer();
    consumer.run();
  }
}
