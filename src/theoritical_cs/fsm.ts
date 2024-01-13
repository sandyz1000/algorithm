/* 
A "Finite State Machine" (abbreviated FSM), also called "State Machine" or "Finite State
Automaton" is an abstract machine which consists of a set of states (including the initial state
and one or more end states), a set of input events, a set of output events, and a state
transition function. A transition function takes the current state and an input event as an input
and returns the new set of output events and the next (new) state. Some of the states are used as
"terminal states".

The operation of an FSM begins with a special state, called the start state, proceeds through
transitions depending on input to different states and normally ends in terminal or end states. A
state which marks a successful flow of operation is known as an accept state.

Mathematical Model: A deterministic finite state machine or acceptor deterministic finite
state machine is a quintuple (Σ,S,s0,δ,F), where: Σ is the input alphabet (a finite, non-empty
set of symbols). S is a finite, non-empty set of states. s0 is an initial state, an element of S.
δ is the state-transition function: δ : S x Σ → S (in a non deterministic finite state machine it
would be δ : S x Σ → ℘(S), i.e., δ would return a set of states). (℘(S) is the Power set of S) F
is the set of final states, a (possibly empty) subset of S.

A Simple Example
We want to recognize the meaning of very small sentences with an extremely limited vocabulary and
syntax:
These sentences should start with "Python is" followed by

an adjective or
the word "not" followed by an adjective.
e.g.
"Python is great" → positive meaning
"Python is stupid" → negative meaning
"Python is not ugly" → positive meaning
*/

export class StateMachine {
  private handlers: Record<string, (txt: string) => [string, string]> = {};
  private startState: string | null = null;
  private endStates: string[] = [];

  addState(name: string, handler: (txt: string) => [string, string], endState: boolean = false): void {
    name = name.toUpperCase();
    this.handlers[name] = handler;
    if (endState) {
      this.endStates.push(name);
    }
  }

  setStart(name: string): void {
    this.startState = name.toUpperCase();
  }

  run(cargo: string): void {
    if (!this.startState) {
      throw new Error("must call .setStart() before .run()");
    }

    if (this.endStates.length === 0) {
      throw new Error("at least one state must be an endState");
    }

    let currentState = this.handlers[this.startState];

    while (true) {
      const [newState, newCargo] = currentState(cargo);

      if (this.endStates.includes(newState.toUpperCase())) {
        console.log("reached ", newState);
        break;
      } else {
        currentState = this.handlers[newState.toUpperCase()];
        cargo = newCargo;
      }
    }
  }
}

const positiveAdjectives = ["great", "super", "fun", "entertaining", "easy"];
const negativeAdjectives = ["boring", "difficult", "ugly", "bad"];

function startTransitions(txt: string): [string, string] {
  const [word, rest] = txt.split(' ', 2);
  const newState = word === "Python" ? "Python_state" : "error_state";
  return [newState, rest || ''];
}

function pythonStateTransitions(txt: string): [string, string] {
  const [word, rest] = txt.split(' ', 2);
  const newState = word === "is" ? "is_state" : "error_state";
  return [newState, rest || ''];
}

function isStateTransitions(txt: string): [string, string] {
  const [word, rest] = txt.split(' ', 2);
  let newState = "";
  if (word === "not") {
    newState = "not_state";
  } else if (positiveAdjectives.includes(word)) {
    newState = "pos_state";
  } else if (negativeAdjectives.includes(word)) {
    newState = "neg_state";
  } else {
    newState = "error_state";
  }
  return [newState, rest || ''];
}

function notStateTransitions(txt: string): [string, string] {
  const [word, rest] = txt.split(' ', 2);
  let newState = "";
  if (positiveAdjectives.includes(word)) {
    newState = "neg_state";
  } else if (negativeAdjectives.includes(word)) {
    newState = "pos_state";
  } else {
    newState = "error_state";
  }
  return [newState, rest || ''];
}

function negState(txt: string): [string, string] {
  console.log("Hallo");
  return ["neg_state", ""];
}

if (require.main === module) {
  const m = new StateMachine();
  m.addState("Start", startTransitions);
  m.addState("Python_state", pythonStateTransitions);
  m.addState("is_state", isStateTransitions);
  m.addState("not_state", notStateTransitions);
  m.addState("neg_state", negState, true);
  m.addState("pos_state", null, true);
  m.addState("error_state", null, true);
  m.setStart("Start");
  m.run("Python is great");
  m.run("Python is difficult");
  m.run("Perl is ugly");
}

