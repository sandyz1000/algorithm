
/* The Turing machine (TM) serves two needs in theoretical computer science:

Formal Definition of a Turing machine

A deterministic Turing machine can be defined as a 7-tuple

M = (Q, Σ, Γ, δ, b, q0, qf)
with
    Q is a finite, non-empty set of states
    Γ is a finite, non-empty set of the tape alphabet
    Σ is the set of input symbols with Σ ⊂ Γ
    δ is a partially defined function, the transition function:
    δ : (Q \ {qf}) x Γ → Q x Γ x {L,N,R}
    b ∈ &Gamma \ Σ is the blank symbol
    q0 ∈ Q is the initial state
    qf ∈ Q is the set of accepting or final states

------------------------------------------
Implementation:
------------------------------------------

We implement a Turing Machine in Python as a class. We define another class for the read/write
tape of the Turing Machine. The core of the tape inside the class Tape is a dictionary,
which contains the entries of the tape. This way, we can have negative indices. A Python list is
not a convenient data structure, because Python lists are bounded on one side, i.e. bounded by 0.

We define the method __str__(self) for the class Tape. __str__(self) is called by the built-in
str() function. The print function uses also the str function to calculate the "informal" string
representation of an object, in our case the tape of the TM. The method get_tape() of our class
TuringMachine makes use of the str representation returned by __str__.

With the aid of the method __getitem__(), we provide a reading access to the tape via indices.
The definition of the method __setitem__() allows a writing access as well, as we can see e.g. in
the statement
self.__tape[self.__head_position] = y[1]
of our class TuringMachine implementation.

The class TuringMachine:
We define the method __str__(self), which is called by the str() built-in function and by the print
statement to compute the "informal" string representation of an object, in our case the string
representation of a tape.

1. The class of languages defined by a TM, i.e. structured or recursively enumerable languages
2. The class of functions a TM is capable to compute, i.e. the partial recursive functions

 */

export class Tape {
  static blankSymbol = " ";
  private tape: Record<number, string> = {};

  constructor(tapeString: string = "") {
    tapeString.split("").forEach((symbol, index) => {
      this.tape[index] = symbol;
    });
  }

  toString(): string {
    let s = "";
    const minUsedIndex = Math.min(...Object.keys(this.tape).map(Number));
    const maxUsedIndex = Math.max(...Object.keys(this.tape).map(Number));
    for (let i = minUsedIndex; i < maxUsedIndex; i++) {
      s += this.tape[i];
    }
    return s;
  }

  get(index: number): string {
    return this.tape[index] || Tape.blankSymbol;
  }

  set(index: number, char: string): void {
    this.tape[index] = char;
  }
}

export class TuringMachine {
  private tape: Tape;
  private headPosition: number;
  private blankSymbol: string;
  private currentState: string;
  private transitionFunction: Record<string, [string, string, "R" | "L"]>;
  private finalStates: Set<string>;

  constructor(
    tapeString: string = "",
    blankSymbol: string = " ",
    initialState: string = "",
    finalStates: string[] | null = null,
    transitionFunction: Record<string, [string, string, "R" | "L"]> | null = null
  ) {
    this.tape = new Tape(tapeString);
    this.headPosition = 0;
    this.blankSymbol = blankSymbol;
    this.currentState = initialState;

    this.transitionFunction = transitionFunction || {};
    this.finalStates = new Set(finalStates || []);
  }

  getTape(): string {
    return this.tape.toString();
  }

  step(): void {
    const charUnderHead = this.tape.get(this.headPosition);
    const x = `${this.currentState},${charUnderHead}`;
    if (x in this.transitionFunction) {
      const y = this.transitionFunction[x];
      this.tape.set(this.headPosition, y[1]);
      if (y[2] === "R") {
        this.headPosition += 1;
      } else if (y[2] === "L") {
        this.headPosition -= 1;
      }
      this.currentState = y[0];
    }
  }

  isFinal(): boolean {
    return this.finalStates.has(this.currentState);
  }
}

if (require.main === module) {
  const initial_state = "init";
  const accepting_states = ["final"];
  const transition_function: Record<string, [string, string, "R" | "L" | "N"]> = {
    "init,0": ["init", "1", "R"],
    "init,1": ["init", "0", "R"],
    "init, ": ["final", " ", "N"],
  };
  const final_states = new Set(["final"]);

  const t = new TuringMachine("010011 ", " ", initial_state, accepting_states, transition_function);

  console.log("Input on Tape:\n" + t.getTape());

  while (!t.isFinal()) {
    t.step();
  }

  console.log("Result of the Turing machine calculation:");
  console.log(t.getTape());
}
