/* 
Observer design pattern try to facilitate one to many relationship in software engineering.
Eg: Several even listener
will listen handle mouse click on the user interface item.
Advantages:
1. Maintain loose coupling between subject and observer
2. Subject can keep any no of observer
3. An observer can be changed at runtime.

*/

abstract class AbstractSubjectI {
  abstract registerObserver(observer: Observer): void;
  abstract notifyObservers(): void;
  abstract unregisterObserver(observer: Observer): void;
}

class Subject extends AbstractSubjectI {
  private observerList: Observer[];
  private curTime: number | null;

  constructor() {
    super();
    this.observerList = [];
    this.curTime = null;
  }

  registerObserver(observer: Observer): boolean {
    if (!this.observerList.includes(observer)) {
      this.observerList.push(observer);
      return true;
    }
    return false;
  }

  unregisterObserver(observer: Observer): boolean {
    const index = this.observerList.indexOf(observer);
    if (index !== -1) {
      this.observerList.splice(index, 1);
      return true;
    }
    return false;
  }

  notifyObservers(): void {
    this.curTime = Date.now();
    for (const observer of this.observerList) {
      observer.notify(this.curTime);
    }
  }
}

abstract class Observer {
  abstract notify(unixTimestamp: number): void;
}

class EUTimeObserver extends Observer {
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  notify(unixTimestamp: number): void {
    const time = new Date(unixTimestamp).toLocaleString("en-US", {
      timeZone: "Europe/London",
    });
    console.log(`Observer ${this.name} says ${time}`);
  }
}

class USATimeObserver extends Observer {
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  notify(unixTimestamp: number): void {
    const time = new Date(unixTimestamp).toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(`Observer ${this.name} says ${time}`);
  }
}

const subject = new Subject();

const observer1 = new EUTimeObserver("EU Time");
subject.registerObserver(observer1);

const observer2 = new USATimeObserver("USA Time");
subject.registerObserver(observer2);

setTimeout(() => {
  subject.notifyObservers();
}, 2000);

setTimeout(() => {
  console.log("Notifying observers completed");
}, 4000);