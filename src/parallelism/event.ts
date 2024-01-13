/* """
Events are objects that are used for communication between threads. A thread waits for a
signal while another thread outputs it.
Basically, an event object manages an internal flag that can be set to true with the set()
method and reset to false with the clear() method. The wait() method blocks until the flag is true.
"""
 */

class Interval {
    private time: number;
    private counter: number;
    private thresholdCount: number;
    public aList: number[];
  
    constructor(time: number, thresholdCount: number) {
      this.time = time;
      this.counter = 0;
      this.thresholdCount = thresholdCount;
      this.aList = [];
    }
  
    async setInteval(): Promise<void> {
      return new Promise<void>((resolve) => {
        const intervalId = setInterval(() => {
          if (this.counter < this.thresholdCount) {
            this.counter += 1;
            this.getMax();
          } else {
            clearInterval(intervalId);
            resolve();
          }
        }, this.time);
      });
    }
  
    getMax(): void {
      this.aList.push(Math.floor(Math.random() * 10));
    }
  }
  
  const items: number[] = [];
  let eventSet = false;
  
  class Consumer {
    constructor(private items: number[]) {}
  
    async run(): Promise<void> {
      while (true) {
        await sleep(2000);
        if (items.length > 0) {
          const item = items.pop();
          console.log(`Consumer notify: ${item} popped from list`);
        }
      }
    }
  }
  
  class Producer {
    constructor(private items: number[]) {}
  
    async run(): Promise<void> {
      for (let i = 0; i < 100; i++) {
        await sleep(2000);
        const item = Math.floor(Math.random() * 256);
        this.items.push(item);
        console.log(`Producer notify: item N ${item} appended to list`);
        if (!eventSet) {
          console.log('Producer notify: event set');
          eventSet = true;
        }
      }
    }
  }
  
  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  (async () => {
    const intv = new Interval(1000, 15);
    await intv.setInteval();
    console.log(intv.aList);
  
    const consumer = new Consumer(items);
    const producer = new Producer(items);
  
    await Promise.all([consumer.run(), producer.run()]);
  })();
  