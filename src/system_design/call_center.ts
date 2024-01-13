
/* Call Center Design

Imagine you have a call center with three levels of employees: respondent, manager and director.
An incoming telephone call must be first allocated to a respondent who is free. If the respondent
can't handle the call, he or she must escalate the call to a manager. If the manager is not free
or not able to handle it, then the call should be escalated to a director. Design the classes and
data structures for this problem. Implement a method dispatchCaLL() which assigns a call to the
first available employee.

==SOLUTION==

All three ranks of employees have different work to be done, so those specific functions are
profile specific. We should keep these things within their respective class.
There are a few things which are common to them, like address, name, job title, and age. These
things can be kept in one class and can be extended or inherited by others.
Finally, there should be one CallHandler class which would route the calls to the correct person.

Note that on any object-oriented design question, there are many ways to design the objects.
Discuss the trade-offs of different solutions with your interviewer. You should usually design
for long-term code flexibility and maintenance. */



enum Rank {
  OPERATOR = 0,
  SUPERVISOR = 1,
  DIRECTOR = 2,
}

enum CallState {
  READY = 0,
  IN_PROGRESS = 1,
  COMPLETE = 2,
}

/* 
  Employee is a super class for the Director, Manager, and Respondent classes. It is
  implemented as an abstract class since there should be no reason to instantiate an Employee
  type directly
*/
class Employee {
  employeeId: number;
  name: string;
  rank: Rank;
  call: Call | null;
  callCenter: CallCenter | null;

  constructor(employeeId: number, name: string, rank: Rank, callCenter: CallCenter | null) {
    this.employeeId = employeeId;
    this.name = name;
    this.rank = rank;
    this.call = null;
    this.callCenter = callCenter;
  }

  takeCall(call: Call): void {
    this.call = call;
    this.call.employee = this;
    this.call.state = CallState.IN_PROGRESS;
  }

  completeCall(): void {
    if (this.call) {
      this.call.state = CallState.COMPLETE;
      this.callCenter.notifyCallCompleted(this.call);
    }
  }

  escalateCall(): void {

  }

  protected _escalateCall(): void {
    if (this.call) {
      this.call.state = CallState.READY;
      const call = this.call;
      this.call = null;
      this.callCenter.notifyCallEscalated(call);
    }
  }
}

class Operator extends Employee {
  constructor(employeeId: number, name: string) {
    super(employeeId, name, Rank.OPERATOR, null);
  }

  escalateCall(): void {
    if (this.call) {
      this.call.level = Rank.SUPERVISOR;
      this._escalateCall();
    }
  }
}

class Supervisor extends Employee {
  constructor(employeeId: number, name: string) {
    super(employeeId, name, Rank.SUPERVISOR, null);
  }

  escalateCall(): void {
    if (this.call) {
      this.call.level = Rank.DIRECTOR;
      this._escalateCall();
    }
  }
}

class Director extends Employee {
  constructor(employeeId: number, name: string) {
    super(employeeId, name, Rank.DIRECTOR, null);
  }

  escalateCall(): void {
    // Directors must be able to handle any call
    throw new Error('Directors must be able to handle any call');
  }
}

/* 
Call represents a call from a user. A call has a minimum rank and is assigned to the first
    employee who can handle it.
*/
class Call {
  state: CallState;
  level: Rank;
  employee: Employee | null;

  constructor(rank: Rank) {
    this.state = CallState.READY;
    this.level = rank;
    this.employee = null;
  }
}

class CallCenter {
  operators: Operator[];
  supervisors: Supervisor[];
  directors: Director[];
  queuedCalls: Call[];

  constructor(operators: Operator[], supervisors: Supervisor[], directors: Director[]) {
    this.operators = operators;
    this.supervisors = supervisors;
    this.directors = directors;
    this.queuedCalls = [];
  }

  dispatchCall(call: Call): void {
    if (![Rank.OPERATOR, Rank.SUPERVISOR, Rank.DIRECTOR].includes(call.level)) {
      throw new Error(`Invalid call rank: ${call.level}`);
    }

    let employee: Employee | null = null;

    if (call.level === Rank.OPERATOR) {
      employee = this._dispatchCall(call, this.operators);
    }

    if (call.level === Rank.SUPERVISOR || !employee) {
      employee = this._dispatchCall(call, this.supervisors);
    }

    if (call.level === Rank.DIRECTOR || !employee) {
      employee = this._dispatchCall(call, this.directors);
    }

    if (!employee) {
      this.queuedCalls.push(call);
    }
  }

  private _dispatchCall(call: Call, employees: Employee[]): Employee | null {
    for (const employee of employees) {
      if (!employee.call) {
        employee.takeCall(call);
        return employee;
      }
    }
    return null;
  }

  notifyCallEscalated(call: Call): void {
    // Implementation for notifying call escalated
  }

  notifyCallCompleted(call: Call): void {
    // Implementation for notifying call completed
  }

  dispatchQueuedCallToNewlyFreedEmployee(call: Call, employee: Employee): void {
    // Implementation for dispatching queued call to a newly freed employee
  }
}

if (require.main === module) {
  // Entry point logic goes here
}
