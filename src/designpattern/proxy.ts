/* Proxy pattern provide with an same interface to another class. The client code works directly with
proxy, which will delegate call to the main class.

Advantages:
-------------------------
1. Protect the real component from undue complexity

2. Provide security to main component by wrapping the main class with proxy and add extra level
of indirection

3. Facilitating interaction with remote system, by managing the network connection and
transmission route and deleting call to remote object

4. Can be used to optimize the performance using caching of heavily of frequently used objects.

Disadvantages:
-------------------------
1. Increase in response time, since proxy facilitate lazy initialization the response time will
increase when the connection is established for the first time. */

abstract class AbstractSubject {
    abstract sort(reverse?: boolean): void;
  }
  
  class RealSubject extends AbstractSubject {
    digits: number[];
  
    constructor() {
      super();
      this.digits = Array.from({ length: 10000000 }, () => Math.random());
    }
  
    sort(reverse: boolean = false): void {
      this.digits.sort();
      if (reverse) {
        this.digits.reverse();
      }
    }
  }
  
  class ProxySubject extends AbstractSubject {
    static cachedObject: RealSubject | null = null;
    static referenceCount: number = 0;
  
    constructor() {
      super();
      if (ProxySubject.cachedObject === null) {
        ProxySubject.cachedObject = new RealSubject();
        ProxySubject.referenceCount += 1;
      }
    }
  
    sort(reverse: boolean = false): void {
      ProxySubject.sort(reverse);
    }
  
    private static sort(reverse: boolean): void {
      if (ProxySubject.cachedObject !== null) {
        ProxySubject.cachedObject.sort(reverse);
      }
    }
  
    destroy(): boolean {
      if (ProxySubject.referenceCount > 0) {
        ProxySubject.referenceCount -= 1;
      }
  
      if (ProxySubject.referenceCount === 0 && ProxySubject.cachedObject !== null) {
        ProxySubject.cachedObject = null;
        return true;
      }
  
      return false;
    }
  }
  
  // Example usage:
  const proxy = new ProxySubject();
  proxy.sort(); // Sort without reversing
  proxy.sort(true); // Sort with reversing
  
  console.log(proxy);
  proxy.destroy(); // Call destroy to manage the cleanup
  